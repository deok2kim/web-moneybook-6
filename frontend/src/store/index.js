import contorller from '@/controller';

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

  currentYear: {
    key: 'currentYear',
    state: 2022,
    set: function (nextState) {
      this.state = nextState;
    },
    get: function () {
      return this.state;
    },
  },
};

(function () {
  Object.keys(store).map((key) => contorller.setStore(store[key]));
})();
