const categoryService = require('../service/categoryService');

exports.getCategoryData = async (req, res) => {
  try {
    data = await categoryService.getCategoryData();
    res.json(data);
  } catch {
    res.json({ status: 'fail', message: '값을 불러오는데 실패했습니다!' });
  }
};
