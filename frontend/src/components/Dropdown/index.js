import Component from '@/utils/Component';
import './index.scss';

export default class Dropdown extends Component {
  template() {
    const { theme, dropdownItemList, isInputIncome } = this.state;
    let item = [];
    if (theme === 'category') {
      item = dropdownItemList.filter(
        ({ isIncome }) => isInputIncome === isIncome,
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
          ${
            theme === 'paymentMethod'
              ? `<li class="title-wrapper">
          <p class="dropdown__title btn-add-payment">추가하기</p>
          <div class="divider"></div>`
              : ''
          }
        </li>
      </ul>
    `;
  }
}
