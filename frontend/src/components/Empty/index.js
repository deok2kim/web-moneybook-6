import Component from '@/utils/Component';
// import empty from '@/assets/images/empty.png';
import empty from '@/assets/images/empty.jpeg';
import './index.scss';

export default class Empty extends Component {
  template() {
    return `
      <section class="empty">
        <img src=${empty} />
      </section>
    `;
  }
}
