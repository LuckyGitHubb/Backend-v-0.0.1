const express = require('express');
const { addSale } = require('../controller/saleController');

const router = express.Router();

router.post('/add', addSale);

module.exports = router;
