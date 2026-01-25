const mongoose = require('mongoose');

const saleItemSchema = new mongoose.Schema({ 
    code: { type: String, unique: true }, 
    saleId: { type: mongoose.Schema.Types.ObjectId, ref: "sale" }, 
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" }, 
    qty: {type:Number}, 
    sellingPrice: {type: Number} 
});

const saleItemModel = mongoose.model('saleItem', saleItemSchema)
module.exports = saleItemModel