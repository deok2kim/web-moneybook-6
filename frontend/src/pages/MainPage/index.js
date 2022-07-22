import Component from '@/utils/Component';
import HistoryInfo from '@/components/HistoryInfo';
import History from '@/components/History';
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
    new HistoryInfo(document.querySelector('.history-info-container'));
    new History(document.querySelector('.history-container'));
  }
}
