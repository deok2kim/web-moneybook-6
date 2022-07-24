const WEEKDAY = [
  '일요일',
  '월요일',
  '화요일',
  '수요일',
  '목요일',
  '금요일',
  '토요일',
];

export const dataProcessing = {
  // 전체 건수 구하기
  getTotal: function (data = []) {
    const [totalIncome, totalExpenditure] = data.reduce(
      (prev, cur) => {
        let [income, expenditure] = prev;
        return cur.isIncome === '지출'
          ? [income, expenditure + cur.amount]
          : [income + cur.amount, expenditure];
      },
      [0, 0],
    );
    return {
      totalCount: data.length,
      totalIncome,
      totalExpenditure,
    };
  },
  // 일별로 나누기
  getDaily: function (data = []) {
    const nextData = [];
    let tmpDailyDataObj = {};
    data.map((d) => {
      const { date, category, content, paymentMethod, amount, isIncome, id } =
        d;
      const itemList = {
        id,
        category,
        content,
        paymentMethod,
        amount,
        isIncome,
      };
      const formattedDate = `${date.getMonth()}월 ${date.getDay()}일`;
      const isEmpty = Object.keys(tmpDailyDataObj).length === 0;
      if (isEmpty) {
        tmpDailyDataObj.date = `${date.getMonth()}월 ${date.getDay()}일`;
        tmpDailyDataObj.dayname = WEEKDAY[date.getDay()];
        tmpDailyDataObj.itemList = [itemList];
        return;
      }
      if (tmpDailyDataObj.date === formattedDate) tmpDailyDataObj.itemList.push(itemList);
      else {
          nextData.push(tmpDailyDataObj);
          tmpDailyDataObj = {};
          tmpDailyDataObj.date = `${date.getMonth()}월 ${date.getDay()}일`;
          tmpDailyDataObj.dayname = WEEKDAY[date.getDay()];
          tmpDailyDataObj.itemList = [itemList];
        }
    });
    nextData.push(tmpDailyDataObj);
    return nextData;
  },
};
