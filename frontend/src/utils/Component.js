// import { observe } from '@/observer';

export default class Component {
  constructor($target, state = {}) {
    this.$target = $target;
    this.state = state;

    this.setup();
  }

  template() {
    return '';
  }

  render() {
    this.$target.innerHTML = this.template();
  }

  setEvent() {}

  dataSubscribe() {}

  setup() {
    this.init();
    this.dataSubscribe();
    this.render();
    this.setEvent();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  init() {}
}
