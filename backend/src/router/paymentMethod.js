const express = require('express');
const router = express.Router();
const paymentMethodController = require('../controller/paymentMethodController');

router.post('/', paymentMethodController.addPaymentMethodData);
router.get('/', paymentMethodController.getPaymentMethodData);
router.delete('/:id', paymentMethodController.deletePaymentMethodData);

module.exports = router;
