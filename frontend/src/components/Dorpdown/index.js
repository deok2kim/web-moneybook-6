import Component from '@/utils/Component';
import './index.scss';

export default class Dropdown extends Component {
  template() {
    const { category, selectedIncome } = this.state;

    return /* html */ ` 
      <ul class="dropdown">
        ${category
          .filter(({ isIncome }) => selectedIncome === isIncome)
          .map(
            ({ id, name }) => /* html */ `
          <li class="title-wrapper" data-id=${id}>
            <p class="dropdown__title">${name}</p>
            <div class="divider"></div>
          </li>
        `,
          )
          .join('')}
      </ul>
    `;
  }
}
