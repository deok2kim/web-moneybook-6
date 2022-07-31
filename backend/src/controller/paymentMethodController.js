const paymentMethodService = require('../service/paymentMethodService');
const infoStore = require('../constant/infoStore').infoStore;

exports.addPaymentMethodData = async (req, res) => {
  try {
    await paymentMethodService.addPaymentMethodData(req.body);
    res.json({
      status: infoStore.status.success,
      message: infoStore.message.postSuccess,
    });
  } catch {
    res.json({
      status: infoStore.status.failure,
      message: infoStore.message.postFailure,
    });
  }
};

exports.getPaymentMethodData = async (req, res) => {
  try {
    const data = await paymentMethodService.getPaymentMethodData();
    res.json(data);
  } catch {
    res.json({
      status: infoStore.status.failure,
      message: infoStore.message.getFailure,
    });
  }
};

exports.deletePaymentMethodData = async (req, res) => {
  try {
    await paymentMethodService.deletePaymentMethodData(req.params);
    res.json({
      status: infoStore.status.success,
      message: infoStore.message.deleteSuccess,
    });
  } catch {
    res.json({
      status: infoStore.status.failure,
      message: infoStore.message.deleteFailure,
    });
  }
};
