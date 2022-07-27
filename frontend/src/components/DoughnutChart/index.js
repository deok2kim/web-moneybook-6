import Component from '@/utils/Component';
import './index.scss';
export default class DoughnutChart extends Component {
  template() {
    return `
    <svg class="doughnutChart__container" viewBox="0 0 100 100">
    </svg>
    `;
  }

  render() {
    super.render();
    this.createDoughnutChart();
  }

  createDoughnutChart() {
    if (Object.keys(this.state).length === 0) return;
    const colors = [];
    const dataset = [];

    Object.values(this.state.categoryExpenditures).map((data) => {
      dataset.push(data.percent);
      colors.push(data.color);
    });

    const acc = dataset.reduce(
      (arr, v) => {
        const last = arr[arr.length - 1];
        return [...arr, last + v];
      },
      [0],
    );

    dataset.forEach((data, i) => {
      this.appendDoughnutPart(data, acc, i, colors[i]);
    });
  }
  appendDoughnutPart(data, acc, idx, curColor) {
    const total = 100;
    const svg = document.querySelector('.doughnutChart__container');
    const radius = 20;
    const diameter = 2 * Math.PI * radius;

    const ratio = data / total;
    const fillSpace = diameter * ratio;
    const emptySpace = diameter - fillSpace;
    const offset = (acc[idx] / total) * diameter;

    const circle = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'circle',
    );
    circle.setAttribute('cx', '50');
    circle.setAttribute('cy', '50');
    circle.setAttribute('r', String(radius));
    circle.setAttribute('fill', 'transparent');
    circle.setAttribute('stroke', curColor);
    circle.setAttribute('stroke-width', '10');
    circle.setAttribute('stroke-dasharray', `${fillSpace} ${emptySpace}`);
    circle.setAttribute('stroke-dashoffset', String(-offset));

    svg.appendChild(circle);
  }
}
