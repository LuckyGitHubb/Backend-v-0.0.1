const branchModel = require('../models/branchModel')
const productModel = require('../models/productModel')
const stockModel = require('../models/stockModel')
const saleModel = require('../models/saleModel')

const getDashboardCounts = async (req, res) => {
    try {
        const [branches,products,stocks,sales] = await Promise.all([
            branchModel.countDocuments(),
            productModel.countDocuments(),
            stockModel.countDocuments(),
            saleModel.countDocuments()
        ])

        const counts={branches:branches,products:products,stocks:stocks,sales:sales}
        
        return res.status(200).json({data:counts, message: 'Dashboard Counts fetched successfully', status:true})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ data: error, message: 'Internal server error', status: false })
    }
}

module.exports = {
    getDashboardCounts
}