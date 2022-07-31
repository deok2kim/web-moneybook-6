const { queryStore } = require('../constant/queryStore');
const { executeQuery } = require('../util/executeQuery');

exports.paymentMethodModel = async function (currentAPI, args = []) {
  const query = queryStore.paymentMethod[currentAPI];
  const [data] = await executeQuery(query, args);
  return data;
};
