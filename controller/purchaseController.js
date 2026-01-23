const purchaseModel = require('../models/purchaseModel')
const purchaseItemModel = require('../models/purchaseItemModel');
const stockModel = require('../models/stockModel')
const generateUniqueCode = require('../utils/generateUniqueCode');

const addPurchase = async(req,res)=>{
    const {branchId,items} = req.body;
    const purchase = await purchaseModel.create({
        code: await generateUniqueCode('purchase','PUR'),
        branchId
    })

    for(let item of items){
        const purchaseItemCode = await generateUniqueCode('purchaseItem','PI')
        await purchaseItemModel.create({
            code: purchaseItemCode,
            purchaseId: purchase._id,
            ...item
        })

        await stockModel.create({ 
            code: purchaseItemCode,
            productId: item.productId,
            branchId,
            batchNo: item.batchNo,  
            qty: item.qty,
            expiryDate: item.expiryDate,
            purchasePrice: item.purchasePrice,
            sellingPrice: item.sellingPrice 
        });
    }
    res.json({ message: "Purchase added successfully" });   
}

module.exports = {
    addPurchase
}