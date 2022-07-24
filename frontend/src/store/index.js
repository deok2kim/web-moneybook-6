import contorller from '@/controller';
import { getCategory } from '@/api/category';

export const store = {
  currentMonth: {
    key: 'currentMonth',
    state: 3,
    set: function (nextState) {
      this.state = nextState;
    },
    get: function () {
      return this.state;
    },
  },

  accountHistoryDataOfCurrentMonth: {
    key: 'accountHistoryDataOfCurrentMonth',
    state: [
      {
        id: 1,
        date: new Date(2022, 7, 20),
        category: '생활/여가',
        content: '테니스 레슨비',
        paymentMethod: '신용카드',
        isIncome: '지출',
        amount: 280000,
      },
      {
        id: 2,
        date: new Date(2022, 7, 20),
        category: '교통',
        content: '택시비',
        paymentMethod: '신용카드',
        isIncome: '지출',
        amount: 9000,
      },
      {
        id: 2,
        date: new Date(2022, 7, 21),
        category: '월급',
        content: '7월 급여',
        paymentMethod: '현금',
        isIncome: '수입',
        amount: 3800000,
      },
    ],
    set: function (nextState) {
      this.state = nextState;
    },
    get: function () {
      return this.state;
    },
  },

  category: {
    key: 'category',
    state: getCategory(),
    get: function () {
      return this.state;
    },
    set: function (nextState) {
      this.state = nextState;
    },
  },
};

(function () {
  Object.keys(store).map((key) => contorller.setStore(store[key]));
})();
