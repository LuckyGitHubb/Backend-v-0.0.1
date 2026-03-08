const branchModel = require('../models/branchModel')
const productModel = require('../models/productModel')
const stockModel = require('../models/stockModel')
const saleModel = require('../models/saleModel')
const saleItemModel = require('../models/saleItemModel')
const invoiceModel = require('../models/invoiceModel')

const getDashboardCounts = async (req, res) => {
    try {
        const [branches, products, stocks, sales] = await Promise.all([
            branchModel.countDocuments(),
            productModel.countDocuments(),
            stockModel.countDocuments(),
            saleModel.countDocuments()
        ])

        const counts = { branches: branches, products: products, stocks: stocks, sales: sales }

        return res.status(200).json({ data: counts, message: 'Dashboard Counts fetched successfully', status: true })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ data: error, message: 'Internal server error', status: false })
    }
}

const getInvoicePaymentStats = async (req, res) => {
    try {
        const result = await invoiceModel.aggregate([
            {
                $group: {
                    _id: '$paymentMode',
                    totalAmount: { $sum: '$grandTotal' },
                    count: { $sum: 1 }
                }
            }
        ])
        return res.status(200).json({ data: result, message: 'Invoice payment stats fetched successfully', status: true })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ data: error, message: 'Internal server error', status: false })
    }
}

const getMonthlySalesStats = async (req, res) => {
    try {
        const selectedYear = req.query.year;
        const year = selectedYear || new Date().getFullYear();

        const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
        const endDate = new Date(`${year}-12-31T23:59:59.999Z`);

        const result = await saleItemModel.aggregate([
            {
                $lookup: {
                    from: "sales",
                    localField: "saleId",
                    foreignField: "_id",
                    as: "sale"
                }
            },
            { $unwind: "$sale" },
            {
                $match: {
                    "sale.createdAt": {
                        $gte: startDate,
                        $lte: endDate
                    }
                }
            },
            {
                $addFields: {
                    totalAmount: { $multiply: ["$qty", "$sellingPrice"] }
                }
            },
            {
                $group: {
                    _id: { month: { $month: "$sale.createdAt" } },
                    totalSales: { $sum: "$totalAmount" }
                }
            },
            {
                $project: {
                    _id: 0,
                    monthNumber: "$_id.month",
                    totalSales: 1
                }
            }
        ]);

        // All months
        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        // Fill missing months
        const finalResult = months.map((month, index) => {
            const found = result.find(r => r.monthNumber === index + 1);

            return {
                month,
                totalSales: found ? found.totalSales : 0
            };
        });

        return res.status(200).json({
            year,
            data: finalResult,
            message: "Monthly sales stats fetched successfully",
            status: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: error,
            message: "Internal server error",
            status: false
        });
    }
};

const getStockStatusStats = async (req, res) => {
    try {
        const result = await stockModel.aggregate([{
            $match: { isDeleted: false }
        },
        {
            $project: {
                qty: { $toInt: "$qty" },
                status: {
                    $cond: [{ $eq: [{$toInt:'$qty'}, 0] }, "Out of Stock",
                    {
                        $cond: [{ $lte: [{$toInt:'$qty'}, 5] }, "Low Stock",
                        {
                            $cond: [{ $lte: [{$toInt:'$qty'}, 50] }, "Medium Stock", "High Stock"
                            ]
                        }]
                    }]
                }
            }
        },
        {
            $group: {
                _id:'$status',
                count: {$sum:1}
            }
        }
        ])
        return res.status(200).json({
            data: result,
            message: "Stock status stats fetched successfully",
            status: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: error,
            message: "Internal server error",
            status: false
        });
    }
}

module.exports = {
    getDashboardCounts,
    getInvoicePaymentStats,
    getMonthlySalesStats,
    getStockStatusStats
}