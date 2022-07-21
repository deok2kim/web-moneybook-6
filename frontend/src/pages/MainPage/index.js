import Component from '@/utils/Component';
import HistoryInfo from '../../components/HistoryInfo';
import Input from '../../components/Input';
import './index.scss';
export default class MainPage extends Component {
  template() {
    return `
      <main class="mainPage">
        <article class="input-bar-container"></article>
        <article class="history-info-container"></article>
        
      </main>
    `;
  }

  render() {
    super.render();
    new Input(document.querySelector('.input-bar-container'));
    new HistoryInfo(document.querySelector('.history-info-container'));
  }
}
