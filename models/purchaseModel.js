const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
    code: {type:String},
    branchId: {type:mongoose.Schema.Types.ObjectId,ref:'branch'},
    code: {type:String},
})

const purchaseModel = mongoose.model('purchase', purchaseSchema)
module.exports = purchaseModel