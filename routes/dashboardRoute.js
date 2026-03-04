const express = require('express');
const { getDashboardCounts, getInvoicePaymentStats } = require('../controller/dashboardController');

const router = express.Router();

router.get('/counts', getDashboardCounts);
router.get('/invoice/payment/stats', getInvoicePaymentStats);

module.exports = router;
