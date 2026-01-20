const { default: mongoose } = require("mongoose");

const counterSchema = new mongoose.Schema({
    name:{ type: String, required: true },
    seq:{type:Number,default:0}
})

const counterModel = mongoose.model('counter',counterSchema)
module.exports = counterModel