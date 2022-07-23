const pool = require('../config/db');

exports.getCategoryData = async () => {
  try {
    const connection = await pool.getConnection();
    const [data] = await connection.query('SELECT * FROM category');
    return data;
  } catch (err) {
    throw err;
  } finally {
    connection?.release();
  }
};
