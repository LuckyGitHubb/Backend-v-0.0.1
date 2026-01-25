const { default: mongoose } = require("mongoose");

const stockSchema = new mongoose.Schema({
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },  // links to Product
        branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'branch' },   // which branch owns this stock
        batchNo: { type: String },
        code: { type: String },
        qty: { type: Number },        // how many units available
        expiryDate: { type: Date },
        purchasePrice: { type: Number },
        sellingPrice: { type: Number },
        isDeleted: {
                type: Boolean,
                default: false
        }
})

const stockModel = mongoose.model('stock', stockSchema);
module.exports = stockModel