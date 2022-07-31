const { queryStore } = require('../constant/queryStore');
const { executeQuery } = require('../util/executeQuery');

exports.moneyBookModel = async function (currentAPI, args = []) {
  const query = queryStore.moneyBook[currentAPI];
  const [data] = await executeQuery(query, args);
  return data;
};
