const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    code: {type:String},
    branchId: {type:mongoose.Schema.Types.ObjectId,ref:'branch'},
    createdAt: { type: Date, default: Date.now }
})

const saleModel = mongoose.model('sale', saleSchema)
module.exports = saleModel