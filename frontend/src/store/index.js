import contorller from '@/controller';

export const currentMonth = {
  key: 'currentMonth',
  state: 3,
  set: function (nextState) {
    this.state = nextState;
  },
  get: function () {
    return this.state;
  },
};
export const currentYear = {
  key: 'currentYear',
  state: 2022,
  set: function (nextState) {
    this.state = nextState;
  },
  get: function () {
    return this.state;
  },
};

contorller.setStore(currentMonth);
contorller.setStore(currentYear);
