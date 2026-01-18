const transactionModel = require("../models/transactionModel");

const upsertTransaction = async (req, res) => {
    try {
        const data = req?.body;
        const {id} = data;

            const transaction = id ? 
            await transactionModel.findByIdAndUpdate(id,data, { new: true }) : 
            await transactionModel.create(data)

        return res.status(200).json({ 
            data: transaction, message: id ? 
            'Transaction updated successfully' : 
            'Transaction created successfully',
            status: true 
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ data: error, message: 'Internal server error', status: false })
    }
}

const allTransaction = async (req, res) => {
    try {
        const getAllTransaction = await transactionModel.find({isDeleted:false});
        return res.status(200).json({ data: getAllTransaction, message: 'Transaction fetched successfully', status: true })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ data: error, message: 'Internal server error', status: false })
    }
}

const singleTransaction = async (req, res) => {
    try {
        const { id } = req?.body;
        const transaction = await transactionModel.findById({ _id: id })
        return res.status(200).json({ data: transaction, message: 'Transaction fetched successfully', status: true })
    } catch (error) {
        return res.status(500).json({ data: error, message: 'Internal server error', status: false })
    }
}

const deleteTransaction = async(req,res)=>{
    try{
    const { id } = req.body;
    const deletedTransaction = await transactionModel.findByIdAndUpdate(id,{isDeleted:true},{new:true})
    return res.status(200).json({ data: deletedTransaction, message: 'Transaction deleted successfully', status: true })
    } catch (error) {
        return res.status(500).json({ data: error, message: 'Internal server error', status: false })
    }
}
    
module.exports = {
    upsertTransaction,
    allTransaction,
    singleTransaction,
    deleteTransaction
}