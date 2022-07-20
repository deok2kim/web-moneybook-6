import { observe } from '@/observer';

export default class Component {
  $target;
  state = {};
  constructor($target, state) {
    this.$target = $target;
    this.state = state;

    this.setup();
    this.init();
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

  setup() {
    // this.state = observable(this.initState()); // state를 관찰한다.
    observe(() => {
      // state가 변경될 경우, 함수가 실행된다.
      this.render();
      this.setEvent();
      this.mounted();
    });
  }
  initState() {
    return {};
  }
  mounted() {}
}
