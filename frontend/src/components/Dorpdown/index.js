import Component from '@/utils/Component';
import './index.scss';

export default class Dropdown extends Component {
  template() {
    const { dummy } = this.state;

    return ` 
      <ul class="dropdown">
        ${dummy
          .map(
            (text) => `
          <li class="title-wrapper">
            <p class="dropdown__title">${text}</p>
            <div class="divider"></div>
          </li>
        `,
          )
          .join('')}
      </ul>
    `;
  }
}
