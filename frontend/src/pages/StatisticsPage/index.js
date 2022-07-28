import Component from '@/utils/Component';
import StatisticsCard from '@/components/StatisticsCard/index';
import LineChartCard from '@/components/LineChartCard/index';
import AccountHistory from '@/components/AccountHistory';
import { dataProcessing } from '@/utils/dataProcessing';
import controller from '@/controller';

import './index.scss';

export default class StatisticsPage extends Component {
  template() {
    return `
      <div class="statisticsPage">
        <div class="statisticsCard"></div>
        <div class="lineChartCard"></div>
        <div class="history-container"></div>
      </div>
    `;
  }

  render() {
    super.render();
    if (!Object.keys(this.state).length) return;
    new StatisticsCard(
      this.$target.querySelector('.statisticsCard'),
      this.state,
    );
    new LineChartCard(this.$target.querySelector('.lineChartCard'), this.state);
    if (!this.state.selectedCategory) return;
    new AccountHistory(
      this.$target.querySelector('.history-container'),
      this.state,
    );
  }

  setEvent() {
    this.$target.addEventListener('click', (e) => {
      const nearListItem = e.target.closest('li');
      if (
        nearListItem &&
        nearListItem.className === 'expenditures__list-item'
      ) {
        let currentSelectedCategory = nearListItem.querySelector(
          '.expenditures__list-item-badge--item-badge',
        ).innerText;
        controller.setStoreData({
          key: 'selectedCategory',
          nextState: currentSelectedCategory,
        });
      }
    });
  }
  async dataSubscribe() {
    const currentMonthState = controller.subscribe({
      $el: this,
      key: 'currentMonth',
    });
    const accountHistoryState = controller.subscribe({
      $el: this,
      key: 'accountHistory',
    });
    const accountRangeHistoryState = controller.subscribe({
      $el: this,
      key: 'accountRangeHistory',
    });
    const selectedCategoryState = controller.subscribe({
      $el: this,
      key: 'selectedCategory',
    });
    const categoryState = controller.subscribe({
      $el: this,
      key: 'category',
    });
    const paymentMethodState = controller.subscribe({
      $el: this,
      key: 'paymentMethod',
    });

    const accountHistory = await accountHistoryState.value;
    const accountHistoryTotalInfo = dataProcessing.getTotal(accountHistory);
    const accountHistoryDataOfCurrentMonth =
      dataProcessing.getDaily(accountHistory);
    const categories = await categoryState.value;
    const paymentMethods = await paymentMethodState.value;

    const accountHistoryData = await accountHistoryState.value;
    const categoryExpenditures =
      dataProcessing.getCategoryTotal(accountHistoryData);
    const totalExpenditure =
      dataProcessing.getTotalExpenditure(accountHistoryData);

    const accountRangeHistoryData = await accountRangeHistoryState.value;
    const currentMonthData = await currentMonthState.value;
    const selectedCategory = await selectedCategoryState.value;
    this.setState({
      ...this.state,
      categoryExpenditures,
      totalExpenditure,
      accountRangeHistoryData,
      currentMonthData,
      selectedCategory,
      accountHistoryTotalInfo,
      accountHistoryDataOfCurrentMonth,
      categories,
      paymentMethods,
    });
  }
}
