import Component from '@/utils/Component';
import AccountHistoryInfo from '@/components/AccountHistoryInfo';
import AccountHistory from '@/components/AccountHistory';
import AccountHistoryInput from '@/components/AccountHistoryInput';
import controller from '@/controller';
import './index.scss';
import { dataProcessing } from '@/utils/dataProcessing';
export default class MainPage extends Component {
  template() {
    return /*html*/ `
      <main class="mainPage">
        <article class="input-bar-container"></article>
        <article class="history-info-container"></article>
        <article class="history-container"></article>
      </main>
    `;
  }

  render() {
    super.render();
    if (!this.state.accountHistoryTotalInfo) return;
    new AccountHistoryInput(document.querySelector('.input-bar-container'));
    new AccountHistoryInfo(
      document.querySelector('.history-info-container'),
      this.state,
    );

    new AccountHistory(
      document.querySelector('.history-container'),
      this.state,
    );
  }

  async dataSubscribe() {
    const { key, value } = controller.subscribe({
      $el: this,
      key: 'accountHistory',
    });
    const accountHistory = await value;
    const accountHistoryTotalInfo = dataProcessing.getTotal(accountHistory);
    const accountHistoryDataOfCurrentMonth =
      dataProcessing.getDaily(accountHistory);
    this.setState({
      ...this.state,
      accountHistoryTotalInfo,
      accountHistoryDataOfCurrentMonth,
    });
  }
}
