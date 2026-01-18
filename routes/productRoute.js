const express = require('express');
const { upsertProduct, allProduct, singleProduct, deleteProduct } = require('../controller/productController');

const router = express.Router();

router.post('/add', upsertProduct);
router.get('/all', allProduct);
router.get('/single/:id', singleProduct);
router.post('/delete/:id', deleteProduct);

module.exports = router;
