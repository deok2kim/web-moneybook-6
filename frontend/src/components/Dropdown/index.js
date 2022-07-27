import Component from '@/utils/Component';
import Alert from '../Alert';
import './index.scss';
import controller from '@/controller';

export default class Dropdown extends Component {
  template() {
    const { theme, dropdownItemList, isInputIncome, isOpenAlert } = this.state;
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
                  <p class="dropdown__title btn-add-payment" id="btn-add-payment-method">추가하기</p>
                <div class="divider" id="alert-con"></div>`
              : ''
          }
        </li>
      </ul>
    `;
  }

  setEvent() {
    this.$target.addEventListener('click', (e) => {
      const { target } = e;
      if (target.closest('#btn-add-payment-method')) {
        controller.setStoreData({
          key: 'isOpenAlert',
          nextState: true,
        });
      }
    });
  }

  render() {
    super.render();
    if (this.state.theme === 'paymentMethod' && this.state.isOpenAlert) {
      new Alert(document.querySelector('#alert-con'));
    }
  }

  dataSubscribe() {
    const isOpenAlert = controller.subscribe({
      $el: this,
      key: 'isOpenAlert',
    });

    this.setState({ ...this.state, isOpenAlert: isOpenAlert.value });
  }
}
