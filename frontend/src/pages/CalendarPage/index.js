import Component from '@/utils/Component';
import Week from '@/components/Week/index';
import Calendar from '@/components/Calendar/index';
import TotalSum from '@/components/TotalSum';
import controller from '@/controller';
import { dataProcessing } from '@/utils/dataProcessing';
import './index.scss';

export default class CalendarPage extends Component {
  template() {
    return `
      <div class="calendarPage">
        <div class="week">
        </div>
        <div class="calendar">
        </div>
        <div class="totalSum"></div>
      </div>
    `;
  }

  render() {
    super.render();
    new Week(this.$target.querySelector('.week'));
    new Calendar(this.$target.querySelector('.calendar'), this.state);
    new TotalSum(this.$target.querySelector('.totalSum'), this.state);
  }
  async dataSubscribe() {
    const accountHistoryState = controller.subscribe({
      $el: this,
      key: 'accountHistory',
    });
    const currentMonthState = controller.subscribe({
      $el: this,
      key: 'currentMonth',
    });
    const accountHistory = await accountHistoryState.value;
    const accountHistoryTotalIncome =
      dataProcessing.getTotalIncome(accountHistory);
    const accountHistoryTotalExpenditure =
      dataProcessing.getTotalExpenditure(accountHistory);
    const accountHistoryTotalSum =
      accountHistoryTotalIncome - accountHistoryTotalExpenditure;
    const accountHistoryPerDay = dataProcessing.getTotalPerDay(accountHistory);
    const currentMonth = await currentMonthState.value;

    this.setState({
      ...this.state,
      accountHistoryTotalIncome,
      accountHistoryTotalExpenditure,
      accountHistoryTotalSum,
      accountHistoryPerDay,
      currentMonth,
    });
  }
}
