import Component from '@/utils/Component';
import './index.scss';

export default class Dropdown extends Component {
  template() {
    const { dummy } = this.state;

    return /* html */ ` 
      <ul class="dropdown">
        ${dummy
          .map(
            (text) => /* html */ `
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
