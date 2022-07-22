import Component from '@/utils/Component';
import './index.scss';

export default class Badge extends Component {
  template() {
    const { title } = this.state;
    return /*html*/ `
      <div class="badge">
        <p>${title}</p>
      </div>
    `;
  }
}
