import controller from '@/controller';
import { getCategory } from '@/api/category';
import { getAccountHistory } from '@/api/accountHistory';
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
    return this.state;
  }

  set(nextState) {
    this.state = nextState;
    return this.subscribers;
  }

  fetch(params) {
    if (!this.fetchFn) return;
    const val = this.fetchFn(params);
    this.set(val);
  }

  enroll() {
    controller.setStore(this);
  }

  init() {
    this.willSubscribeStore
      ? this.fetch(this.willSubscribeStore.state)
      : this.fetch();
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
export const category = new Store('category', [], null, getCategory);
export const paymentMethod = new Store(
  'paymentMethod',
  [],
  null,
  getPaymentMethod,
);
