const categoryService = require('../service/categoryService');
const infoStore = require('../config/infoStore').infoStore;

exports.getCategoryData = async (req, res) => {
  try {
    data = await categoryService.getCategoryData();
    res.json(data);
  } catch (err) {
    res.json({
      status: infoStore.status.failure,
      message: infoStore.message.getFailure,
    });
  }
};
