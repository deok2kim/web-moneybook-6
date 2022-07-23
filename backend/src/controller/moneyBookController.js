const moneyBookService = require('../service/moneyBookService');

exports.getMoneyBookData = async (req, res) => {
  try {
    data = await moneyBookService.getMoneyBookData();
    res.json(data);
  } catch {
    res.json({ status: 'fail', message: '값을 불러오는데 실패했습니다!' });
  }
};
exports.addMoneyBookData = async (req, res) => {
  try {
    await moneyBookService.addMoneyBookData(req.body);
    res.json({ status: 'ok', message: '정상적으로 값을 넣었습니다!' });
  } catch {
    res.json({ status: 'fail', message: '값이 존재하지 않습니다!' });
  }
};
exports.updateMoneyBookData = async (req, res) => {
  try {
    await paymentMethodService.updateMoneyBookData(req.params, req.body);
    res.json({ status: 'ok', message: '정상적으로 값을 수정했습니다!' });
  } catch {
    res.json({ status: 'fail', message: '값을 수정하는데 실패했습니다!' });
  }
};
exports.deleteMoneyBookData = async (req, res) => {
  try {
    await paymentMethodService.deleteMoneyBookData(req.params);
    res.json({ status: 'ok', message: '정상적으로 값을 삭제했습니다!' });
  } catch {
    res.json({ status: 'fail', message: '값을 삭제하는데 실패했습니다! ' });
  }
};
