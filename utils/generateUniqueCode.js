const counterModel = require('../models/counterModel')

const generateUniqueCode = async(name,prefix)=>{
    const counter = await counterModel.findOneAndUpdate(
        {name},
        {$inc: {seq:1}},
        {new:true, upsert:true}
    )
    return `${prefix}-${counter.seq}`
}

module.exports = generateUniqueCode