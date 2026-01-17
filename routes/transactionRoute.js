const express = require('express');
const { upsertTransaction, allTransaction, singleTransaction, deleteTransaction } = require('../controller/transactionController');

const router = express.Router();

router.post('/add', upsertTransaction);
router.get('/all', allTransaction);
router.get('/single', singleTransaction);
router.post('/delete', deleteTransaction);

module.exports = router;
