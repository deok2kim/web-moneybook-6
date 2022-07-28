import './index.scss';
import Component from '@/utils/Component';
import { setComma } from '@/utils/common';

export default class DateBox extends Component {
  template() {
    const curDate = parseInt(this.$target.dataset.date);
    const accountHistoryData = this.state.accountHistoryPerDay;

    let dayIncome = 0;
    let dayExpenditure = 0;
    let dayTotal = 0;

    if (curDate && accountHistoryData.has(curDate)) {
      let { income, expenditure, sum } = accountHistoryData.get(curDate);
      dayIncome += income;
      dayExpenditure -= expenditure;
      dayTotal += sum;
    }
    return `
    <ul class="calendar__container--date-Box-contents">
      <li class="calendar__item--data-Box-income">${
        dayIncome === 0 ? '' : setComma(dayIncome)
      }</li>
      <li class="calendar__item--data-Box-expenditure">${
        dayExpenditure === 0 ? '' : setComma(dayExpenditure)
      }</li>
      <li class="calendar__item--data-Box-total">${
        dayTotal === 0 ? '' : setComma(dayTotal)
      }</li>
    </ul>
    <div class="calendar__item--date-Box-text">${curDate ? curDate : ''} </div>
    `;
  }
}
