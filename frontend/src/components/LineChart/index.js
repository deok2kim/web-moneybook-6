import Component from '@/utils/Component';
import './index.scss';

export default class LineChart extends Component {
  template() {
    return `
          <path fill="none" stroke-width="3" stroke="#2AC1BC" d="${this.getPathAttribute(
            this.state.monthData,
          )}"></path>
    `;
  }

  getPathAttribute(data) {
    const coords = this.getCoordinates(data);
    const d = coords.reduce((acc, curr, idx) => {
      const isFirstPoint = idx === 0;
      if (isFirstPoint) return `M ${curr[0]},${curr[1]}`;
      return `${acc} L ${curr[0]} ${curr[1]}`;
    }, '');
    return d;
  }

  getCoordinates(data) {
    const width = this.$target.dataset.width,
      height = this.$target.dataset.height;
    const totalMonth = 12;

    const intervalX = width / (totalMonth - 1);
    const max = Math.max(...data);
    return data.reduce(
      (acc, curr, idx) => [
        ...acc,
        [idx * intervalX, (1 - curr / max) * height],
      ],
      [],
    );
  }
}
