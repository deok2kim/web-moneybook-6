class Controller {
  constructor() {
    this.subscribers = [];
    this.store = {};
  }

  getSubscribers() {
    return [...this.subscribers];
  }

  subscribe({ $el, key }) {
    const isSubscribe = this.subscribers.findIndex(
      (subscriber) => subscriber.$el === $el,
    );
    if (isSubscribe === -1) {
      this.subscribers.push({
        $el,
        key,
      });
    }
    return this.getStoreData(key);
  }

  unsubscribe({ $el, key }) {
    this.subscribers = this.subscribers.filter(
      (subscriber) => subscriber.$el != $el && subscriber.key != key,
    );
  }

  notify(key) {
    this.subscribers.forEach(
      (subscriber) => subscriber.key === key && subscriber.$el.render(),
    );
  }

  setStore(atom) {
    const { key } = atom;
    this.store[key] = atom;
  }

  getStore() {
    return { ...this.store };
  }

  setStoreData({ key, nextState }) {
    this.store[key].set(nextState);
    this.notify(key);
  }

  getStoreData(key) {
    const [storeKey, storeValue] = Object.entries(this.getStore()).find(
      ([storeKey, value]) => storeKey === key,
    );
    return { key: storeKey, value: storeValue.state };
  }
}

const contorller = new Controller();
export default contorller;
