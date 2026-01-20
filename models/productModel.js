const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
        name: {type:String},
        code: {type:String},
        category: {type:String},
        unit: {type:String},
        gst: {type:Number},
        hsn: {type:String},
        basePrice: {type:Number},
        isDeleted:{
                type:Boolean,
                default:false
        }
})

const productModel = mongoose.model('product',productSchema);
module.exports = productModel;