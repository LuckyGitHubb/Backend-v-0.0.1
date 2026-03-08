const express = require('express');
const { getDashboardCounts, getInvoicePaymentStats, getMonthlySalesStats, getStockStatusStats } = require('../controller/dashboardController');

const router = express.Router();

router.get('/counts', getDashboardCounts);
router.get('/invoice/payment/stats', getInvoicePaymentStats);
router.get('/sale/monthly/stats', getMonthlySalesStats);
router.get('/stock/status/stats', getStockStatusStats);

module.exports = router;
