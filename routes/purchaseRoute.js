const express = require('express');
const { addPurchase,allPurchase } = require('../controller/purchaseController');

const router = express.Router();

router.post('/add', addPurchase);
router.get('/all', allPurchase);

module.exports = router;
