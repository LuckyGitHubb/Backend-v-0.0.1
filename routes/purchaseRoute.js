const express = require('express');
const { addPurchase } = require('../controller/purchaseController');

const router = express.Router();

router.post('/add', addPurchase);

module.exports = router;
