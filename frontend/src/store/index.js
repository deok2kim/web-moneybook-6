import controller from '@/controller';
import { getCategory } from '@/api/category';
import {
  getAccountHistory,
  getAccountRangeHistory,
} from '@/api/accountHistory';
import { getPaymentMethod } from '@/api/paymentMethod';

class Store {
  constructor(key, state, willSubscribeStore = null, fetchFn = null) {
    this.subscribers = [];
    this.key = key;
    this.state = state;
    this.willSubscribeStore = willSubscribeStore;
    this.fetchFn = fetchFn;
    this.init();
  }
  get() {
    const { state } = this;
    return state;
  }

  set(nextState) {
    this.state = nextState;
    return this.subscribers;
  }

  fetch() {
    if (!this.fetchFn) return;
    let val;
    if (this.willSubscribeStore) {
      val = this.fetchFn(this.willSubscribeStore.state);
    } else {
      val = this.fetchFn();
    }
    this.set(val);
  }

  enroll() {
    controller.setStore(this);
  }

  init() {
    this.fetch();
    this.enroll();
    this.subscribe();
  }

  subscribe() {
    if (this.willSubscribeStore) {
      this.willSubscribeStore.subscribers.push(this);
    }
  }
}

export const currentMonth = new Store('currentMonth', 202207);
export const accountHistory = new Store(
  'accountHistory',
  [],
  currentMonth,
  getAccountHistory,
);
export const accountRangeHistory = new Store(
  'accountRangeHistory',
  [],
  currentMonth,
  getAccountRangeHistory,
);
export const category = new Store('category', [], null, getCategory);
export const paymentMethod = new Store(
  'paymentMethod',
  [],
  null,
  getPaymentMethod,
);

export const selectedCategory = new Store('selectedCategory', '');

export const historyFilter = new Store('historyFilter', {
  income: true,
  expenditure: true,
});

export const historyEditState = new Store('historyEditState', {
  isEditing: false,
  inputs: {},
});

export const alertState = new Store('alertState', {
  isOpen: false,
  theme: {},
});
