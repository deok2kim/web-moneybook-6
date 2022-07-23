const paymentMethodService = require('../service/paymentMethodService');

exports.addPaymentMethodData = async (req, res) => {
  try {
    await paymentMethodService.addPaymentMethodData(req.body);
    res.json({ status: 'ok', message: '정상적으로 값을 넣었습니다!' });
  } catch {
    res.json({ status: 'fail', message: '값이 존재하지 않습니다!' });
  }
};

exports.getPaymentMethodData = async (req, res) => {
  try {
    const [[data]] = await categoryService.getPaymentMethodData();
    res.json(data);
  } catch {
    res.json({ status: 'fail', message: '값을 불러오는데 실패했습니다!' });
  }
};

exports.deletePaymentMethodData = async (req, res) => {
  try {
    await paymentMethodService.deletePaymentMethodData(req.params);
    res.json({ status: 'ok', message: '정상적으로 값을 삭제했습니다!' });
  } catch {
    res.json({ status: 'fail', message: '값을 삭제하는데 실패했습니다!' });
  }
};
