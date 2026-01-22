const { default: mongoose } = require("mongoose");

const branchSchema = new mongoose.Schema({
        name: {type:String},
        code: {type:String},
        location: {type:String},
        contact: {type:String},
        isDeleted:{
                type:Boolean,
                default:false
        }
})

const branchModel = mongoose.model('branch',branchSchema);
module.exports = branchModel;           