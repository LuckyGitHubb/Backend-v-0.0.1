const express = require('express');
const { createInvoice, allInvoice } = require('../controller/invoiceController');

const router = express.Router();

router.post('/add/:saleId', createInvoice);
router.post('/all', allInvoice);

module.exports = router;
