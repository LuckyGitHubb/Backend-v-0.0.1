const mongoose = require('mongoose');

const purchaseItemSchema = new mongoose.Schema({
    code: { type: String, unique: true },
    purchaseId: { type: mongoose.Schema.Types.ObjectId, ref: "purchase" },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
    batchNo: String,
    qty: Number,
    expiryDate: Date,
    purchasePrice: Number,
    sellingPrice: Number
})

const purchaseItemModel = mongoose.model('purchaseItem', purchaseItemSchema)
module.exports = purchaseItemModel