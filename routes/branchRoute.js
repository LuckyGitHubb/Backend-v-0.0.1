const express = require('express');
const { upsertBranch, allBranch, singleBranch, deleteBranch } = require('../controller/branchController');

const router = express.Router();

router.post('/add', upsertBranch);
router.get('/all', allBranch);
router.get('/single/:id', singleBranch);
router.post('/delete/:id', deleteBranch);

module.exports = router;
