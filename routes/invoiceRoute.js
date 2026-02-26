const express = require('express');
const { createInvoice, allInvoice } = require('../controller/invoiceController');

const router = express.Router();

router.post('/add/:saleId', createInvoice);
router.get('/all', allInvoice);

module.exports = router;
