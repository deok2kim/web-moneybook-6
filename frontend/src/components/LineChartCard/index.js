import Component from '@/utils/Component';
import LineChart from '@/components/LineChart/index';
import LineChartXscale from '@/components/LineChartXscale/index';
import './index.scss';

export default class LineChartCard extends Component {
  template() {
    return `
      <div class="lineChartCard__title">${this.state.selectedCategory} 카테고리별 추이</div>
      <div class="lineChartCard__chart-container" data-width="700" data-height="300"></div>
      <ul class="lineChartCard__xScale"></ul>
    `;
  }

  render() {
    if (Object.keys(this.state).length < 1 || !this.state.selectedCategory) {
      this.$target.style.display = 'none';
      return;
    }
    super.render();

    let monthArray = this.getMonthRange();
    let monthData = this.getMonthRangeData();

    new LineChart(
      this.$target.querySelector('.lineChartCard__chart-container'),
      {
        ...this.state,
        monthData,
        monthArray,
      },
    );

    new LineChartXscale(this.$target.querySelector('.lineChartCard__xScale'), {
      ...this.state,
      monthArray,
    });
  }

  getMonthRange() {
    let monthArray = [];

    let middleTime = String(this.state.currentMonthData);
    let startMonth = parseInt(middleTime.slice(4));
    let startYear = parseInt(middleTime.slice(0, 4));

    if (startMonth < 7) {
      startYear--;
      startMonth += 6;
    } else {
      startMonth -= 6;
    }

    for (let i = startMonth; i < startMonth + 12; i++) {
      monthArray.push({
        year: i > 12 ? startYear + 1 : startYear,
        month: i > 12 ? i - 12 : i,
      });
    }
    return monthArray;
  }

  getMonthRangeData() {
    let monthData = {};
    this.state.accountRangeHistoryData.forEach((d) => {
      if (d.category === this.state.selectedCategory) {
        let time = new Date(d.date.split(' ')[0]);
        let year = String(time.getFullYear());
        let month = String(time.getMonth() + 1);
        let resultTime = parseInt(
          year + (parseInt(month) < 10 ? '0' + month : month),
        );

        if (monthData[resultTime]) monthData[resultTime] += d.amount;
        else monthData[resultTime] = d.amount;
      }
    });
    return monthData;
  }
}
