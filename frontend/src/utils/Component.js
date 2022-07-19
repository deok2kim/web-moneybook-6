export default class Component {
  $target;
  state = {};
  constructor($target, state) {
    this.$target = $target;
    this.state = state;
    this.render();
    this.init();
    this.setEvent();
  }

  template() {
    return '';
  }

  render() {
    this.$target.innerHTML = this.template();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  init() {}

  setEvent() {}
}
