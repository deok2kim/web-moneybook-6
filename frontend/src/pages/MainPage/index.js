import Component from '@/utils/Component';
import AccountHistory from '@/components/AccountHistory';
import AccountHistoryInput from '@/components/AccountHistoryInput';
import controller from '@/controller';
import './index.scss';
import { dataProcessing } from '@/utils/dataProcessing';
import { createAccountHistory } from '@/api/accountHistory';
import { updateAccountHistory } from '@/api/accountHistory';
import Empty from '@/components/Empty';

export default class MainPage extends Component {
  template() {
    return /*html*/ `
      <main class="mainPage">
        <article class="input-bar-container"></article>
        <article class="history-container"></article>
      </main>
    `;
  }

  render() {
    super.render();
    const { categories, paymentMethods } = this.state;
    new AccountHistoryInput(
      this.$target.querySelector('.input-bar-container'),
      {
        categories,
        paymentMethods,
        onCreateAccountHistory: this.handleCreateAccountHistory,
        onUpdateAccountHistory: this.handleUpdateAccountHistory,
      },
    );
    if (!this.state.accountHistory) {
      return;
    }
    if (!this.state.accountHistory.length) {
      new Empty(this.$target.querySelector('.history-container'));
      return;
    }

    new AccountHistory(
      this.$target.querySelector('.history-container'),
      this.state,
    );
  }

  handleCreateAccountHistory = async (data) => {
    const res = await createAccountHistory(data);
    if (res.status === 'ok') {
      this.dataSubscribe();
    }
  };

  handleUpdateAccountHistory = async (data) => {
    const res = await updateAccountHistory(data);
    if (res.status === 'ok') {
      this.dataSubscribe();
    }
  };

  async dataSubscribe() {
    controller.subscribe({
      $el: this,
      key: 'currentMonth',
    });
    const accountHistoryState = controller.subscribe({
      $el: this,
      key: 'accountHistory',
    });
    const accountHistory = await accountHistoryState.value;
    const accountHistoryTotalInfo = dataProcessing.getTotal(accountHistory);
    const accountHistoryDataOfCurrentMonth =
      dataProcessing.getDaily(accountHistory);

    const categoryState = controller.subscribe({
      $el: this,
      key: 'category',
    });
    const categories = await categoryState.value;

    const paymentMethodState = controller.subscribe({
      $el: this,
      key: 'paymentMethod',
    });
    const paymentMethods = await paymentMethodState.value;

    this.setState({
      ...this.state,
      accountHistoryTotalInfo,
      accountHistoryDataOfCurrentMonth,
      accountHistory,
      categories,
      paymentMethods,
    });
  }
}
