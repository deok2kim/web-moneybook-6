const pool = require('../config/db');

exports.getCategoryData = async () => {
  const connection = await pool.getConnection();
};
