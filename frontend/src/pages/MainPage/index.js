import Component from '@/utils/Component';
import Input from '../../components/Input';
import './index.scss';
export default class MainPage extends Component {
  template() {
    return `
      <section class="mainPage">
        <h1>Main Page</h1>
      </section>
    `;
  }

  render() {
    super.render();
    new Input(document.querySelector('.mainPage'));
  }
}
