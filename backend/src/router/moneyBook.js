const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const moneyBookController = require('../controller/moneyBookController');

router.get('/', moneyBookController.getMoneyBookData);
router.post('/', moneyBookController.addMoneyBookData);
router.patch('/:id', moneyBookController.updateMoneyBookData);
router.delete('/:id', moneyBookController.deleteMoneyBookData);

module.exports = router;
