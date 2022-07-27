const moneyBookService = require('../service/moneyBookService');
const infoStore = require('../config/infoStore').infoStore;

exports.getMoneyBookData = async (req, res) => {
  try {
    const { date } = req.params;
    data = await moneyBookService.getMoneyBookData(date);
    res.json(data);
  } catch {
    res.json({
      status: infoStore.status.failure,
      message: infoStore.message.getFailure,
    });
  }
};
exports.getMoneyBookRangeData = async (req, res) => {
  try {
    const { start, end } = req.query;
    data = await moneyBookService.getMoneyBookRangeData(start, end);
    res.json(data);
  } catch {
    res.json({
      status: infoStore.status.failure,
      message: infoStore.message.getFailure,
    });
  }
};

exports.addMoneyBookData = async (req, res) => {
  try {
    await moneyBookService.addMoneyBookData(req.body);
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
exports.updateMoneyBookData = async (req, res) => {
  try {
    await moneyBookService.updateMoneyBookData(req.params, req.body);
    res.json({
      status: infoStore.status.success,
      message: infoStore.message.patchSuccess,
    });
  } catch {
    res.json({
      status: infoStore.status.failure,
      message: infoStore.message.patchFailure,
    });
  }
};
exports.deleteMoneyBookData = async (req, res) => {
  try {
    await moneyBookService.deleteMoneyBookData(req.params);
    res.json({
      status: infoStore.status.success,
      message: infoStore.message.deleteSuccess,
    });
  } catch {
    res.json({
      status: infoStore.status.success,
      message: infoStore.message.deleteFailure,
    });
  }
};
