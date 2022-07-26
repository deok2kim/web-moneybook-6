import Component from '@/utils/Component';
import './index.scss';

export default class Dropdown extends Component {
  template() {
    const { theme, dropdownItemList, inputIsIncome } = this.state;
    let item = [];
    if (theme === 'category') {
      item = dropdownItemList.filter(
        ({ isIncome }) => inputIsIncome === isIncome,
      );
    } else if (theme === 'paymentMethod') {
      item = dropdownItemList;
    }
    return /* html */ ` 
      <ul class="dropdown">
        ${item
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
