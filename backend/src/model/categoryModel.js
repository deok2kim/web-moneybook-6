const { queryStore } = require('../constant/queryStore');
const { executeQuery } = require('../util/executeQuery');

exports.categoryModel = async function (currentAPI, args = []) {
  const query = queryStore.category[currentAPI];
  const [data] = await executeQuery(query, args);
  return data;
};
