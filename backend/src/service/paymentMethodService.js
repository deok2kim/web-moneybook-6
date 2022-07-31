const { paymentMethodModel } = require('../model/paymentMethodModel');

exports.addPaymentMethodData = async (bodyData) => {
  try {
    const { name } = bodyData;
    await paymentMethodModel('addData', [name]);
  } catch (err) {
    throw err;
  }
};

exports.getPaymentMethodData = async () => {
  try {
    return await paymentMethodModel('getData');
  } catch (err) {
    throw err;
  }
};

exports.deletePaymentMethodData = async (paramsData) => {
  try {
    const { id } = paramsData;
    await paymentMethodModel('deleteData', [id]);
  } catch (err) {
    throw err;
  }
};
