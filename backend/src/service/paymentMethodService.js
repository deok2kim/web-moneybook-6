const pool = require('../config/db');

exports.addPaymentMethodData = async (bodyData) => {
  const connection = await pool.getConnection();
  try {
    const { name } = bodyData;
    await connection.query('INSERT INTO payment_method(name) VALUES(?)', [
      name,
    ]);
    return;
  } catch (err) {
    throw err;
  } finally {
    connection?.release();
  }
};

exports.getPaymentMethodData = async () => {
  const connection = await pool.getConnection();
  try {
    const [data] = await connection.query('SELECT * FROM payment_method');
    return data;
  } catch (err) {
    throw err;
  } finally {
    connection?.release();
  }
};

exports.deletePaymentMethodData = async (paramsData) => {
  const connection = await pool.getConnection();
  try {
    const { id } = paramsData;
    await connection.query('DELETE FROM payment_method WHERE id = ?', [id]);
    return;
  } catch (err) {
    throw err;
  } finally {
    connection?.release();
  }
};
