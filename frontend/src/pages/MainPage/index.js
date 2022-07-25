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
    new AccountHistoryInput(
      this.$target.querySelector('.input-bar-container'),
      {
        ...this.state,
        inputCategory: '',
        inputDate: '',
        inputContent: '',
        inputAmount: 0,
        isPaymentMethodOpen: false,
        isIncomeSelected: '지출',
      },
    );

    new AccountHistoryInfo(
      this.$target.querySelector('.history-info-container'),
      this.state,
    );

    new AccountHistory(
      this.$target.querySelector('.history-container'),
      this.state,
    );
  }

  async dataSubscribe() {
    const { key, value } = controller.subscribe({
      $el: this,
      key: 'accountHistory',
    });
    const categoryState = controller.subscribe({
      $el: this,
      key: 'category',
    });
    const paymentMethodState = controller.subscribe({
      $el: this,
      key: 'paymentMethod',
    });
    const accountHistory = await value;
    const accountHistoryTotalInfo = dataProcessing.getTotal(accountHistory);
    const category = await categoryState.value;
    const paymentMethod = await paymentMethodState.value;
    const accountHistoryDataOfCurrentMonth =
      dataProcessing.getDaily(accountHistory);

    this.setState({
      ...this.state,
      accountHistoryTotalInfo,
      accountHistoryDataOfCurrentMonth,
      category,
      paymentMethod,
    });
  }
}
