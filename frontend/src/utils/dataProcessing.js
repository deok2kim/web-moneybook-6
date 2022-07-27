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
  // 전체 건수 및 구하기
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
      const {
        date,
        category,
        content,
        payment_method: paymentMethod,
        amount,
        isIncome,
        id,
      } = d;
      const itemList = {
        id,
        category,
        content,
        paymentMethod,
        amount,
        isIncome,
      };
      const FDate = new Date(date);
      const formattedDate = `${FDate.getMonth() + 1}월 ${FDate.getDate()}일`;
      const isEmpty = Object.keys(tmpDailyDataObj).length === 0;
      if (isEmpty) {
        tmpDailyDataObj.date = formattedDate;
        tmpDailyDataObj.dayname = WEEKDAY[FDate.getDay()];
        tmpDailyDataObj.itemList = [itemList];
        return;
      }
      if (tmpDailyDataObj.date === formattedDate)
        tmpDailyDataObj.itemList.push(itemList);
      else {
        nextData.push(tmpDailyDataObj);
        tmpDailyDataObj = {};
        tmpDailyDataObj.date = formattedDate;
        tmpDailyDataObj.dayname = WEEKDAY[FDate.getDay()];
        tmpDailyDataObj.itemList = [itemList];
      }
    });
    nextData.push(tmpDailyDataObj);
    return nextData;
  },
  getTotalIncome: function (data = []) {
    let totalIncome = 0;
    data.map((d) => {
      if (d.isIncome === '수입') totalIncome += d.amount;
    });
    return totalIncome;
  },
  getTotalExpenditure: function (data = []) {
    let totalExpenditure = 0;
    data.map((d) => {
      if (d.isIncome === '지출') totalExpenditure += d.amount;
    });
    return totalExpenditure;
  },
  getTotalPerDay: function (data = []) {
    let totalPerDay = new Map();
    data.map((d) => {
      let currentDay = Number(d.date.split(' ')[0].split('-')[2]);
      let currentDayIncome = d.isIncome === '수입' ? d.amount : 0;
      let currentDayExpendure = d.isIncome === '지출' ? d.amount : 0;

      if (totalPerDay.has(currentDay)) {
        const prevData = totalPerDay.get(currentDay);

        prevData.income += currentDayIncome;
        prevData.expenditure += currentDayExpendure;
        prevData.sum += currentDayIncome - currentDayExpendure;

        totalPerDay.set(currentDay, prevData);
      } else {
        totalPerDay.set(currentDay, {
          income: currentDayIncome,
          expenditure: currentDayExpendure,
          sum: currentDayIncome - currentDayExpendure,
        });
      }
    });
    return totalPerDay;
  },
  getCategoryTotal: function (data = []) {
    const currentMonthTotalExpenditure = this.getTotalExpenditure(data);
    let categoryExpenditures = {};

    const category_colors = {
      생활: '#4a6cc3',
      '의료/건강': '#6ed5eb',
      '쇼핑/뷰티': '#4cb8b8',
      교통: '#94d3cc',
      식비: '#4ca1de',
      '문화/여가': '#d092e2',
      미분류: '#817dce',
    };

    data.map((d) => {
      if (d.isIncome !== '지출') return;
      if (categoryExpenditures[d.category]) {
        categoryExpenditures[d.category].amount += d.amount;
      } else {
        categoryExpenditures[d.category] = {
          amount: d.amount,
          name: d.category,
          color: category_colors[d.category],
        };
      }
    });

    let accIntPercent = 0;
    let accFloatPercent = 0;
    for (let [k, v] of Object.entries(categoryExpenditures)) {
      let curFloatPercent = (v.amount / currentMonthTotalExpenditure) * 100;
      let curIntPercent =
        Math.round(curFloatPercent + accFloatPercent) - accIntPercent;
      accIntPercent += curIntPercent;
      accFloatPercent += curFloatPercent;
      v.percent = curIntPercent;
    }

    return categoryExpenditures;
  },
};
