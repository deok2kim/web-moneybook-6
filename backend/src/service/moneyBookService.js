const pool = require('../config/db');

exports.getMoneyBookData = async () => {
  const connection = await pool.getConnection();
  try {
    const [data] = await connection.query(
      `SELECT mb.id, mb.date, mb.category_id, ct.name, mb.content, mb.payment_method_id, pm.name, mb.amount FROM money_book mb, payment_method pm, category ct where mb.category_id = ct.category_id AND mb.payment_method_id = pm.payment_method_id`
    );
    return data;
  } catch (err) {
    throw err;
  } finally {
    connection?.release();
  }
};

exports.addMoneyBookData = async (bodyData) => {
  const connection = await pool.getConnection();
  try {
    const { date, category_id, content, payment_method_id, amount } = bodyData;
    await connection.query(
      'INSERT INTO money_book(date, category_id, content, payment_method_id, amount) VALUES(?,?,?,?,?)',
      [date, category_id, content, payment_method_id, amount]
    );
    return;
  } catch (err) {
    throw err;
  } finally {
    connection?.release();
  }
};

exports.updateMoneyBookData = async (paramsData, bodyData) => {
  const connection = await pool.getConnection();
  try {
    const { id } = paramsData;
    const { date, category_id, content, payment_method_id, amount } = bodyData;

    await connection.query(
      `UPDATE money_book SET date = ?, category_id = ?, content = ?, payment_method_id = ?, amount = ? WHERE (id = ?)`,
      [date, category_id, content, payment_method_id, amount, id]
    );
  } catch (err) {
    throw err;
  } finally {
    connection?.release();
  }
};

exports.deleteMoneyBookData = async (paramsData) => {
  const connection = await pool.getConnection();
  try {
    const { id } = paramsData;
    await connection.query('DELETE FROM money_book WHERE id = ?', [id]);
    return;
  } catch (err) {
    throw err;
  } finally {
    connection?.release();
  }
};
