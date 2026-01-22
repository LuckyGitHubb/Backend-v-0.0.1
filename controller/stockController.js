const stockModel = require("../models/stockModel");
const generateUniqueCode = require('../utils/generateUniqueCode')

const upsertStock = async (req, res) => {
    try {
        const data = req?.body;
        const { id } = data;
        let stock;

        if(id){
            stock = await stockModel.findByIdAndUpdate(id, data, { new: true })
        }
        else{
            const code = await generateUniqueCode('stock','STK')
            stock = await stockModel.create({...data,code})
        }
        return res.status(200).json({
            data: stock, message: id ?
                'Stock updated successfully' :
                'Stock created successfully',
            status: true
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ data: error, message: 'Internal server error', status: false })
    }
}

const allStock = async (req, res) => {
    try {
        const getAllStock = await stockModel.find({ isDeleted: false })
                            .populate({path:'productId',select:'name code'})
                            .populate({path:'branchId',select:'name code'});
        return res.status(200).json({ data: getAllStock, message: 'Stock fetched successfully', status: true })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ data: error, message: 'Internal server error', status: false })
    }
}

const singleStock = async (req, res) => {
    try {
        const { id } = req.params;
        const stock = await stockModel.findById(id)
                      .populate({path:'productId',select:'name code'})
                      .populate({path:'branchId',select:'name code'});

        return res.status(200).json({
            data: stock,
            message: 'Stock fetched successfully',
            status: true
        });
    } catch (error) {
        return res.status(500).json({
            data: error,
            message: 'Internal server error',
            status: false
        });
    }
};


const deleteStock = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedStock = await stockModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
        return res.status(200).json({ data: deletedStock, message: 'Stock deleted successfully', status: true })
    } catch (error) {
        return res.status(500).json({ data: error, message: 'Internal server error', status: false })
    }
}

module.exports = {
    upsertStock,
    allStock,
    singleStock,
    deleteStock
}