import Component from '@/utils/Component';
import './index.scss';
import baedal2 from '@/assets/images/baedal2.jpeg';

export default class Loading extends Component {
  template() {
    return `
      <section class="loading">
        <img src=${baedal2} />
      </section>
    `;
  }
}
