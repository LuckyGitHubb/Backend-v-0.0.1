const express = require('express');
const { createInvoice } = require('../controller/invoiceController');

const router = express.Router();

router.post('/add', createInvoice);

module.exports = router;
