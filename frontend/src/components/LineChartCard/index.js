import Component from '@/utils/Component';
import LineChart from '@/components/LineChart/index';
import './index.scss';

let testData = [
  100000, 300000, 243200, 100000, 1300000, 700000, 600000, 400000, 1300000,
  700000, 600000, 100000,
];
export default class LineChartCard extends Component {
  template() {
    return `
      <div class="lineChartCard__title">생활 카테고리별 추이</div>
      <svg class="lineChartCard__chart--line-Chart" data-width = "700" data-height = "300" viewBox="0, 0, 700, 300">
      </svg>
      <ul class="lineChartCard__xScale">
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
        <li>10</li>
        <li>11</li>
        <li>12</li>
      </ul>
    `;
  }

  render() {
    super.render();
    new LineChart(document.querySelector('.lineChartCard__chart--line-Chart'), {
      monthData: testData,
    });
  }
}
