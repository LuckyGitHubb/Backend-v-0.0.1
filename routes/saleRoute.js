const express = require('express');
const { addSale,allSale } = require('../controller/saleController');

const router = express.Router();

router.post('/add', addSale);
router.get('/all', allSale);

module.exports = router;
