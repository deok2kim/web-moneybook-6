const pool = require('../config/db');

exports.addPaymentMethodData = async (bodyData) => {
  const connection = await pool.getConnection();
};

exports.getPaymentMethodData = async () => {
  const connection = await pool.getConnection();
};

exports.deletePaymentMethodData = async (paramsData) => {
  const connection = await pool.getConnection();
};
