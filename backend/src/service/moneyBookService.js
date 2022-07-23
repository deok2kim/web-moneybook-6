const pool = require('../config/db');

exports.getMoneyBookData = async () => {
  const connection = await pool.getConnection();
};

exports.addMoneyBookData = async (bodyData) => {
  const connection = await pool.getConnection();
};

exports.updateMoneyBookData = async (paramsData, bodyData) => {
  const connection = await pool.getConnection();
};

exports.deleteMoneyBookData = async (paramsData, bodyData) => {
  const connection = await pool.getConnection();
};
