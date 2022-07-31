const { moneyBookModel } = require('../model/moneyBookModel');

exports.getMoneyBookMonthData = async (date) => {
  try {
    return await moneyBookModel('getMonthData', [date]);
  } catch (err) {
    throw err;
  }
};

exports.getMoneyBookRangeData = async (start, end) => {
  try {
    return await moneyBookModel('getRangeData', [start, end]);
    return data;
  } catch (err) {
    throw err;
  }
};

exports.addMoneyBookData = async (bodyData) => {
  try {
    const { date, category_id, content, payment_method_id, amount } = bodyData;
    await moneyBookModel('addData', [
      date,
      category_id,
      content,
      payment_method_id,
      amount,
    ]);
  } catch (err) {
    throw err;
  }
};

exports.updateMoneyBookData = async (paramsData, bodyData) => {
  try {
    const { id } = paramsData;
    const { date, category_id, content, payment_method_id, amount } = bodyData;
    await moneyBookModel('updateData', [
      date,
      category_id,
      content,
      payment_method_id,
      amount,
      id,
    ]);
  } catch (err) {
    throw err;
  }
};

exports.deleteMoneyBookData = async (paramsData) => {
  try {
    const { id } = paramsData;
    await moneyBookModel('deleteData', [id]);
  } catch (err) {
    throw err;
  }
};
