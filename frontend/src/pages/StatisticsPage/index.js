import Component from '@/utils/Component';
import StatisticsCard from '@/components/StatisticsCard/index';
import LineChartCard from '@/components/LineChartCard/index';
import AccountHistory from '@/components/AccountHistory';
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
    new StatisticsCard(document.querySelector('.statisticsCard'));
    new LineChartCard(document.querySelector('.lineChartCard'));
    new AccountHistory(document.querySelector('.historys'));
  }

  setEvent() {
    document.querySelector('.statisticsCard').addEventListener('click', (e) => {
      const nearListItem = e.target.closest('li');
      const lineChartCard = document.querySelector('.lineChartCard');
      if (
        nearListItem &&
        nearListItem.className === 'expenditures__list-item'
      ) {
        lineChartCard.style.display = 'flex';
      }
    });
  }
}
