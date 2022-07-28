import Component from '@/utils/Component';
import Alert from '../Alert';
import './index.scss';
import controller from '@/controller';

import deleteIcon from '@/assets/images/deleteIcon.svg';
import { deletePaymentMethod } from '@/api/paymentMethod';

export default class Dropdown extends Component {
  template() {
    const { theme, dropdownItemList, isInputIncome } = this.state;

    if (!dropdownItemList) return ``;
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
          <li class="dropdwon__title-wrapper" data-id=${id}>
            <div class="title-wrapper">
              <p class="dropdown__title">${name}</p>
              ${
                theme === 'paymentMethod'
                  ? `<button><img data-id=${id} data-name=${name} id="btn-delete-payment-method" src="${deleteIcon}" /></button>`
                  : ''
              }
            </div>
            <div class="divider"></div>
          </li>

        `,
          )
          .join('')}
          ${
            theme === 'paymentMethod'
              ? `<li class="dropdwon__title-wrapper">
                  <p class="title-wrapper btn-add-payment" id="btn-add-payment-method">추가하기</p>
                <div class="divider" id="alert-con"></div>`
              : ''
          }
        </li>
      </ul>
    `;
  }
  async onDeletePaymentMethod(id) {
    const res = await deletePaymentMethod({ id });
    if (res.status === 'ok') {
      controller.setStoreData({
        key: 'category',
        nextState: [],
      });
    }
  }

  setEvent() {
    this.$target.addEventListener('click', (e) => {
      const { target } = e;
      if (target.id === 'btn-delete-payment-method') {
        const { id, name } = target.dataset;
        controller.setStoreData({
          key: 'alertState',
          nextState: {
            isOpen: true,
            data: {
              theme: 'delete',
              id,
              name,
            },
          },
        });
      }

      if (target.closest('#btn-add-payment-method')) {
        controller.setStoreData({
          key: 'alertState',
          nextState: {
            isOpen: true,
            data: {
              theme: 'add',
            },
          },
        });
      }
    });
  }
  render() {
    super.render();
    if (this.state.theme === 'paymentMethod' && this.state.alertState.isOpen) {
      new Alert(document.querySelector('#alert-con'));
    }
  }

  dataSubscribe() {
    const alertState = controller.subscribe({
      $el: this,
      key: 'alertState',
    });

    this.setState({ ...this.state, alertState: alertState.value });
  }
}
