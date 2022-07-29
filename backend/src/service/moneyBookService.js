const pool = require('../config/db');

exports.getMoneyBookData = async (date) => {
  const connection = await pool.getConnection();
  try {
    const [data] = await connection.query(
      `select nt.id, nt.date, nt.content, nt.amount, nt.category_id, ct.name as category, nt.payment_method_id, nt.payment_method, ct.isIncome from (select mb.id, mb.date, mb.content, mb.amount, mb.category_id, pm.name as payment_method, mb.payment_method_id from money_book as mb left join payment_method as pm on mb.payment_method_id = pm.id) as nt left join category as ct on nt.category_id = ct.id where DATE_FORMAT(date, '%Y%m') = DATE_FORMAT(now(), ?) order by date desc`,
      [date],
    );
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    connection.release();
  }
};

exports.getMoneyBookRangeData = async (start, end) => {
  const connection = await pool.getConnection();
  try {
    const [data] = await connection.query(
      `SELECT mb.id, mb.date, mb.category_id, ct.name as category, mb.content, mb.payment_method_id, pm.name as payment_method, ct.isIncome, mb.amount FROM money_book mb, payment_method pm, category ct where mb.category_id = ct.id AND mb.payment_method_id = pm.id AND DATE_FORMAT(mb.date, '%Y%m') BETWEEN ? AND ? order by date desc`,
      [start, end],
    );
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    connection.release();
  }
};

exports.addMoneyBookData = async (bodyData) => {
  const connection = await pool.getConnection();
  try {
    const { date, category_id, content, payment_method_id, amount } = bodyData;
    await connection.query(
      'INSERT INTO money_book(date, category_id, content, payment_method_id, amount) VALUES(?,?,?,?,?)',
      [date, category_id, content, payment_method_id, amount],
    );
    return;
  } catch (err) {
    throw err;
  } finally {
    connection.release();
  }
};

exports.updateMoneyBookData = async (paramsData, bodyData) => {
  const connection = await pool.getConnection();
  try {
    const { id } = paramsData;
    const { date, category_id, content, payment_method_id, amount } = bodyData;

    await connection.query(
      `UPDATE money_book SET date = ?, category_id = ?, content = ?, payment_method_id = ?, amount = ? WHERE (id = ?)`,
      [date, category_id, content, payment_method_id, amount, id],
    );
  } catch (err) {
    throw err;
  } finally {
    connection.release();
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
    connection.release();
  }
};
