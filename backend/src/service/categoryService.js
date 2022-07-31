const { categoryModel } = require('../model/categoryModel');

exports.getCategoryData = async () => {
  try {
    return await categoryModel('getData');
  } catch (err) {
    throw err;
  }
};
