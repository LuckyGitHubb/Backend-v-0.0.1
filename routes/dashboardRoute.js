const express = require('express');
const { getDashboardCounts } = require('../controller/dashboardController');

const router = express.Router();

router.get('/counts', getDashboardCounts);

module.exports = router;
