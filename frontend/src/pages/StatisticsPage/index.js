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
        <div class="historys"></div>
      </div>
    `;
  }

  render() {
    super.render();
    new StatisticsCard(document.querySelector('.statisticsCard'), this.state);
    new LineChartCard(document.querySelector('.lineChartCard'), this.state);
  }

  setEvent() {
    this.$target.addEventListener('click', (e) => {
      const nearListItem = e.target.closest('li');
      const lineChartCard = document.querySelector('.lineChartCard');
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
    });
  }
}
