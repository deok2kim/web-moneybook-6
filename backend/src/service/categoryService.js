const pool = require('../config/db');

exports.getCategoryData = async () => {
  const connection = await pool.getConnection();
  try {
    const [data] = await connection.query('SELECT * FROM category');
    return data;
  } catch (err) {
    throw err;
  } finally {
    connection.release();
  }
};
