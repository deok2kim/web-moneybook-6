const pool = require('../config/db');

exports.addPaymentMethodData = async (bodyData) => {
  try {
    const connection = await pool.getConnection();
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
  try {
    const connection = await pool.getConnection();
    const [data] = await connection.query('SELECT * FROM payment_method');
    return data;
  } catch (err) {
    throw err;
  } finally {
    connection?.release();
  }
};

exports.deletePaymentMethodData = async (paramsData) => {
  try {
    const connection = await pool.getConnection();
    const { id } = paramsData;
    await connection.query(
      'DELETE FROM payment_method WHERE payment_method_id = ?',
      [id]
    );
    return;
  } catch (err) {
    throw err;
  } finally {
    connection?.release();
  }
};
