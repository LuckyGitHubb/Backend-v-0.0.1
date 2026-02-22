const saleModel = require('../models/saleModel')
const saleItemModel = require('../models/saleItemModel');
const stockModel = require('../models/stockModel')
const generateUniqueCode = require('../utils/generateUniqueCode');

const addSale = async (req, res) => {
    try {
        const { branchId, items } = req.body;
    const saleCode = await generateUniqueCode("sale", "SAL")
    // 1. Create Sale 
    const sale = await saleModel.create({
        code: saleCode,
        branchId
    });
    for (let item of items) {
        let remainingQty = item.qty;
        const saleItemCode = await generateUniqueCode("saleItem", "SI")
        // 2. Create SaleItem 
        await saleItemModel.create({
            code: saleItemCode,
            saleId: sale._id,
            productId: item.productId,
            qty: item.qty,
            sellingPrice: item.sellingPrice
        });
        // 3. Fetch stock batches (FIFO)
        const stocks = await stockModel.find({
            productId: item.productId,
            branchId,
            qty: { $gt: 0 },
            expiryDate: { $gt: new Date() }
        }).sort({ expiryDate: 1 });
        // 4. Deduct FIFO
        for (let stock of stocks) {
            if (remainingQty === 0) break;
            if (stock.qty >= remainingQty) { stock.qty -= remainingQty; remainingQty = 0; }
            else { remainingQty -= stock.qty; stock.qty = 0; }
            await stock.save();
        }
        if (remainingQty > 0) { throw new Error("Insufficient stock"); }
    }
    res.status(200).json({ message: "Sale completed successfully", status:true });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ data: error, message: 'Internal server error', status: false })
    }
};

const allSale = async (req, res) => {
    try {
        const getAllSale = await saleItemModel.find().populate('productId')
        return res.status(200).json({ data: getAllSale, message: 'Sale items fetched successfully', status:true })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ data: error, message: 'Internal server error', status: false })
    }
}

module.exports = {
    addSale,
    allSale
}