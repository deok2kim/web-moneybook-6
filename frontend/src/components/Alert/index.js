import Component from '@/utils/Component';
import controller from '@/controller';
import { createPaymentMethod } from '@/api/paymentMethod';
import './index.scss';

export default class Alert extends Component {
  template() {
    const title = '추가하실 결제수단을 적어주세요'; // 해당 결제수단을 삭제하시겠습니까?
    const btnName = '등록'; // 취소
    return /*html*/ `
      <section class="alert-background">
        <form id="form-add-payment-method">
          <div class="alert">
            <span>
              <p>${title}</p>
            </span>
            <span>
              <input name="newPaymentMethod" class="alert__input" placeholder="입력하세요"/>
            </span>
            <span class="alert__btn-wrapper">
              <button type="button">취소</button>
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
      if (target.className === 'alert-background') {
        controller.setStoreData({
          key: 'isOpenAlert',
          nextState: false,
        });
      }
    });
    this.$target
      .querySelector('#form-add-payment-method')
      .addEventListener('submit', (e) => {
        e.stopPropagation();
        e.preventDefault();
        const { value } = e.target.elements.newPaymentMethod;
        if (value.trim()) {
          createPaymentMethod({ name: value.trim() });
          controller.setStoreData({
            key: 'isOpenAlert',
            nextState: false,
          });
          controller.setStoreData({
            key: 'category',
            nextState: [],
          });
        }
      });
  }
}
