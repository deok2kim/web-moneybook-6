import Component from '@/utils/Component';
import controller from '@/controller';
import { createPaymentMethod } from '@/api/paymentMethod';
import './index.scss';
import { deletePaymentMethod } from '../../api/paymentMethod';

export default class Alert extends Component {
  template() {
    const { theme, name } = this.state.alertState.data;
    let title, btnName;
    if (theme === 'add') {
      title = '추가하실 결제수단을 적어주세요';
      btnName = '등록';
    } else if (theme === 'delete') {
      title = '해당 결제수단을 삭제하시겠습니까?';
      btnName = '삭제';
    }
    return /*html*/ `
      <section class="alert-background">
        <form id="form-event-payment-method">
          <div class="alert">
            <span>
              <p>${title}</p>
            </span>
            <span>
              <input 
              name="newPaymentMethod"
              class="alert__input"
              placeholder="입력하세요"
              ${theme === 'delete' ? 'disabled' : ''}
              value="${name || ''}"
              />
            </span>
            <span class="alert__btn-wrapper">
              <button type="button" id="close-alert">취소</button>
              <button class="alert__btn-confirm" id="btn-add-payment-method">${btnName}</button>
            </span>
          </div>
        </form>
      </section>
    `;
  }

  setEvent() {
    this.$target.addEventListener('change', (e) => {
      e.stopPropagation();
    });
    this.$target.addEventListener('click', (e) => {
      e.stopPropagation();
      const { target } = e;
      if (target.id === 'close-alert') {
        controller.setStoreData({
          key: 'alertState',
          nextState: {
            isOpen: false,
            data: {},
          },
        });
      } else if (target.className === 'alert-background') {
        controller.setStoreData({
          key: 'alertState',
          nextState: {
            isOpen: false,
            data: {},
          },
        });
      }
    });
    this.$target
      .querySelector('#form-event-payment-method')
      .addEventListener('submit', (e) => {
        e.stopPropagation();
        e.preventDefault();
        const { theme, id } = this.state.alertState.data;
        if (theme === 'add') {
          const { value } = e.target.elements.newPaymentMethod;
          if (value.trim()) {
            createPaymentMethod({ name: value.trim() });
            controller.setStoreData({
              key: 'alertState',
              nextState: {
                isOpen: false,
                data: {},
              },
            });
            controller.setStoreData({
              key: 'paymentMethod',
              nextState: [],
            });
          }
        } else if (theme === 'delete') {
          deletePaymentMethod({ id });
          controller.setStoreData({
            key: 'alertState',
            nextState: {
              isOpen: false,
              data: {},
            },
          });
          controller.setStoreData({
            key: 'paymentMethod',
            nextState: [],
          });
        }
      });
  }

  dataSubscribe() {
    const alertState = controller.subscribe({
      $el: this,
      key: 'alertState',
    });

    this.setState({ ...this.state, alertState: alertState.value });
  }
}
