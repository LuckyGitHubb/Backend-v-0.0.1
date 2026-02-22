const invoiceModel = require("../models/invoiceModel");
const productModel = require("../models/productModel");
const saleItemModel = require("../models/saleItemModel");
const saleModel = require("../models/saleModel");
const generateUniqueCode = require("../utils/generateUniqueCode");


const createInvoice = async (req, res) => {
    try {
        const { saleId } = req.params;
        const { customerName, customerMobile, paymentMode } = req.body;

        // 1. Validate Sale
        const sale = await saleModel.findById(saleId);
        if (!sale) {
            return res.status(404).json({ message: "Sale not found" });
        }

        // 2. Prevent duplicate invoice
        const existingInvoice = await invoiceModel.findOne({ saleId });
        if (existingInvoice) {
            return res.status(400).json({ message: "Invoice already created" });
        }

        // 3. Fetch Sale Items
        const saleItems = await saleItemModel.find({ saleId });

        let items = [];
        let subTotal = 0;
        let gstTotal = 0;

        // 4. Build invoice items (snapshot)
        for (let saleItem of saleItems) {
            const product = await productModel.findById(saleItem.productId);

            const lineTotal = saleItem.qty * saleItem.sellingPrice;
            const gstAmount = (lineTotal * product.gst) / 100;

            subTotal += lineTotal;
            gstTotal += gstAmount;

            items.push({
                productId: product._id,
                productName: product.name,
                hsn: product.hsn,
                qty: saleItem.qty,
                rate: saleItem.sellingPrice,
                gst: product.gst,
                gstAmount,
                total: lineTotal + gstAmount
            });
        }

        // 5. Create Invoice
        const invoice = await invoiceModel.create({
            invoiceNo: await generateUniqueCode("invoice", "INV"),
            saleId: sale._id,
            branchId: sale.branchId,

            customerName,
            customerMobile,

            items,
            subTotal,
            gstTotal,
            grandTotal: subTotal + gstTotal,

            paymentMode
        });

        res.status(200).json({
            message: "Invoice created successfully",
            data:invoice,
            status:true
        });

    } catch (err) {
        res.status(500).json({ error: err.message, message: 'Internal server error', status: false });
    }
};

const allInvoice = async(req,res)=>{
    try {
        const getAllInvoice = await invoiceModel.find()
        return res.status(200).json({data: getAllInvoice, message: 'Invoice fetched successfully', status: true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ data: error, message: 'Internal server error', status: false })
    }
}

module.exports = {
    createInvoice,
    allInvoice
};
