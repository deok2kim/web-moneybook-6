import Component from '@/utils/Component';
import AccountHistoryInfo from '@/components/AccountHistoryInfo';
import AccountHistory from '@/components/AccountHistory';
import Input from '@/components/Input';
import './index.scss';
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
    new Input(document.querySelector('.input-bar-container'));
    new AccountHistoryInfo(document.querySelector('.history-info-container'));
    new AccountHistory(document.querySelector('.history-container'));
  }
}
