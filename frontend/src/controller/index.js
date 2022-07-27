class Controller {
  constructor() {
    this.subscribers = [];
    this.store = {};
  }

  getSubscribers() {
    return [...this.subscribers];
  }

  subscribe({ $el, key }) {
    this.subscribers = this.subscribers.filter((subscriber) => {
       return subscriber.key !== key || subscriber.$el.constructor.name !== $el.constructor.name;
    });
    this.subscribers.push({
      $el,
      key,
    });
    return this.getStoreData(key);
  }

  unsubscribe({ $el, key }) {
    this.subscribers = this.subscribers.filter(
      (subscriber) => subscriber.$el != $el && subscriber.key != key,
    );
  }

  notify(key) {
    this.subscribers.forEach((subscriber) => {
      if (subscriber.key === key) {
        subscriber.$el.dataSubscribe();
      }
    });
  }

  setStore(atom) {
    const { key } = atom;
    this.store[key] = atom;
  }

  getStore() {
    return { ...this.store };
  }

  setStoreData({ key, nextState }) {
    const subscribers = this.store[key].set(nextState);
    subscribers.map((subscriber) => {
      subscriber.fetch(nextState);
      this.notify(subscriber.key, nextState);
    });
    this.notify(key, nextState);
  }

  getStoreData(key) {
    const [storeKey, storeValue] = Object.entries(this.getStore()).find(
      ([storeKey, value]) => storeKey === key,
    );
    storeValue.fetch();
    return { key: storeKey, value: storeValue.state };
  }
}

const controller = new Controller();
export default controller;
