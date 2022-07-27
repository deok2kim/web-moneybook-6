import Component from '@/utils/Component';
import './index.scss';

export default class LineChart extends Component {
  template() {
    return '<canvas class="lineChart__chart" width="700px" height="320px"></canvas>';
  }

  render() {
    if (!Object.keys(this.state).length) return;
    super.render();
    this.drawChart();
  }

  drawChart() {
    let data = this.state.monthArray.map(({ year, month }) => {
      let curKey = `${year}${month < 10 ? '0' : ''}${month}`;
      return this.state.monthData[curKey] || 0;
    });

    const canvas = this.$target.querySelector('.lineChart__chart');
    const ctx = canvas.getContext('2d');
    const coords = this.getCoordinates(data).splice(0, 7);
    ctx.strokeStyle = '#2AC1BC';
    let prevX, prevY;

    coords.forEach(([x, y, expenditure], idx) => {
      x += 3;
      idx === 0 ? ctx.moveTo(0, 300) : ctx.moveTo(prevX, prevY);
      ctx.lineTo(x, y);
      prevX = x;
      prevY = y;
      ctx.arc(x, y, 2, 0, 2 * Math.PI);
      ctx.fillText(expenditure, x, y - 10);
      ctx.stroke();
    });
  }

  getCoordinates(data) {
    const width = 700,
      height = 280;
    const totalMonth = 12;
    const intervalX = width / (totalMonth - 1);

    const max = Math.max(...data);
    return data.reduce((acc, curr, idx) => {
      let y = (1 - curr / max) * height + 20;
      return [...acc, [idx * intervalX, y, curr]];
    }, []);
  }
}
