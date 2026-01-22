const express = require('express');
const { upsertStock, allStock, singleStock, deleteStock } = require('../controller/stockController');

const router = express.Router();

router.post('/add', upsertStock);
router.get('/all', allStock);
router.get('/single/:id', singleStock);
router.post('/delete/:id', deleteStock);

module.exports = router;
