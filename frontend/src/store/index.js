import contorller from '@/controller';
import { getCategory } from '@/api/category';
import { getAccountHistory } from '@/api/accountHistory';

const test_month = 202207;

export const store = {
  currentMonth: {
    key: 'currentMonth',
    state: 202207,
    set: function (nextState) {
      this.state = nextState;
    },
    get: function () {
      return this.state;
    },
  },

  accountHistoryDataOfCurrentMonth: {
    key: 'accountHistoryDataOfCurrentMonth',
    state: getAccountHistory(test_month),
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
