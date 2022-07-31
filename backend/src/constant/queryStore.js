exports.queryStore = {
  category: {
    getData: 'SELECT * FROM category',
  },
  paymentMethod: {
    addData: 'INSERT INTO payment_method(name) VALUES(?)',
    getData: 'SELECT * FROM payment_method',
    deleteData: 'DELETE FROM payment_method WHERE id = ?',
  },
  moneyBook: {
    getMonthData: `select nt.id, nt.date, nt.content, nt.amount, nt.category_id, ct.name as category, nt.payment_method_id, nt.payment_method, ct.isIncome from (select mb.id, mb.date, mb.content, mb.amount, mb.category_id, pm.name as payment_method, mb.payment_method_id from money_book as mb left join payment_method as pm on mb.payment_method_id = pm.id) as nt left join category as ct on nt.category_id = ct.id where DATE_FORMAT(date, '%Y%m') = DATE_FORMAT(now(), ?) order by date desc`,
    getRangeData: `select nt.id, nt.date, nt.content, nt.amount, nt.category_id, ct.name as category, nt.payment_method_id, nt.payment_method, ct.isIncome from (select mb.id, mb.date, mb.content, mb.amount, mb.category_id, pm.name as payment_method, mb.payment_method_id from money_book as mb left join payment_method as pm on mb.payment_method_id = pm.id) as nt left join category as ct on nt.category_id = ct.id where DATE_FORMAT(date, '%Y%m') BETWEEN ? AND ? order by date desc`,
    addData:
      'INSERT INTO money_book(date, category_id, content, payment_method_id, amount) VALUES(?,?,?,?,?)',
    updateData: `UPDATE money_book SET date = ?, category_id = ?, content = ?, payment_method_id = ?, amount = ? WHERE (id = ?)`,
    deleteData: 'DELETE FROM money_book WHERE id = ?',
  },
};
