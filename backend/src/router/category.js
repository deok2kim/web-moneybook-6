const express = require('express');
const router = express.Router();
const categoryController = require('../controller/categoryController');

router.get('/', categoryController.getCategoryData);

module.exports = router;
