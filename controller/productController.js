const productModel = require("../models/productModel");
const generateUniqueCode = require("../utils/generateUniqueCode");

const upsertProduct = async (req, res) => {
    try {
        const data = req?.body;
        const { id } = data;
        let product;

        if(id){
            product = await productModel.findByIdAndUpdate(id, data, { new: true })
        }
        else{
            const code = await generateUniqueCode('product','PRD')
            product = await productModel.create({...data,code})
        }

        return res.status(200).json({
            data: product, message: id ?
                'Product updated successfully' :
                'Product created successfully',
            status: true
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ data: error, message: 'Internal server error', status: false })
    }
}

const allProduct = async (req, res) => {
    try {
        const getAllProduct = await productModel.find({ isDeleted: false });
        return res.status(200).json({ data: getAllProduct, message: 'Product fetched successfully', status: true })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ data: error, message: 'Internal server error', status: false })
    }
}

const singleProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productModel.findById(id);

        return res.status(200).json({
            data: product,
            message: 'Product fetched successfully',
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


const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await productModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
        return res.status(200).json({ data: deletedProduct, message: 'Product deleted successfully', status: true })
    } catch (error) {
        return res.status(500).json({ data: error, message: 'Internal server error', status: false })
    }
}

module.exports = {
    upsertProduct,
    allProduct,
    singleProduct,
    deleteProduct
}