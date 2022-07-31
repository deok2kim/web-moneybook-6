const pool = require('../config/db');

exports.executeQuery = async (sql, args) => {
  const connection = await pool.getConnection();
  const result = await connection.query(sql, args);
  connection.release();
  return result;
};
