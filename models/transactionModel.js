const { default: mongoose } = require("mongoose");

const transactionSchema = new mongoose.Schema({
     date: {type:Date},
        type: {type:String},
        amount: {type:String},
        gstRate: {type:String},
        gstAmount: {type:String},
        totalAmount: {type:String},
        paymentMethod: {type:String},
        purpose: {type:String},
        isDeleted:{
                type:Boolean,
                default:false
        }
})

const transactionModel = mongoose.model('transaction',transactionSchema);
module.exports = transactionModel;