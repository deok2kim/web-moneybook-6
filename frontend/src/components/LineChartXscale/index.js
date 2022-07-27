import Component from '@/utils/Component';
import './index.scss';
export default class LineChartXscale extends Component {
  template() {
    return this.state.monthArray
      .map(
        ({ year, month }) =>
          `<li class="lineChartCard__xScale--item">${month}</li>`,
      )
      .join('');
  }

  render() {
    if (Object.keys(this.state).length < 1) return;
    super.render();
  }
}
