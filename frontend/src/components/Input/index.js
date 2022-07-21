import Component from '@/utils/Component';
import './index.scss';
import minus from '@/assets/images/minus.svg';
import saveDisabled from '@/assets/images/saveDisabled.svg';
import chevronDown from '@/assets/images/chevronDown.svg';
import Dropdown from '../Dorpdown';

export default class Input extends Component {
  template() {
    return `
      <section class="input">
        <div class="input-wrapper">
          <p class="input__title">날짜</p>
          <input class="input__content__input" placeholder="입력하세요" />
        </div>
        <div class="divider"></div>

        <div class="input-wrapper" id="category">
          <p class="input__title">분류</p>
          <button class="input__content__dropdown">
            <p>선택하세요</p>
            <img src=${chevronDown} />
          </button>
          <div id="dropdownCategory"></div>
        </div>
        <div class="divider"></div>

        <div class="input-wrapper input-wrapper--long">
          <p class="input__title">내용</p>
          <input class="input__content__input input__content__input--long" placeholder="입력하세요" />
        </div>
        <div class="divider"></div>

        <div class="input-wrapper" id="paymentMethod">
          <p class="input__title">결제수단</p>
          <button class="input__content__dropdown">
          <p>선택하세요</p>
          <img src=${chevronDown} />
          </button>
          <div id="dropdownPaymentMethod"></div>
        </div>
        <div class="divider"></div>

        <div class="input-wrapper input-wrapper--long">
          <p class="input__title">금액</p>
            <div class="input__input-wrapper">
              <img src=${minus} />
              <input class="input__content__input" placeholder="입력하세요" dir="rtl" />
              <p class="input__content__text">원</p>
            </div>
          </div>
        </div>
        <img class="save-btn" src=${saveDisabled} />
      </section>
    `;
  }

  setEvent() {
    const $input = document.querySelector('.input');
    $input.addEventListener('click', (e) => {
      if (e.target.closest('#category')) {
        const dummy = ['식비', '생활', '교통', '쇼핑/뷰티', '의료/건강'];
        new Dropdown(document.querySelector('#dropdownCategory'), {
          isPaymentMethod: false,
          dummy,
        });
      } else if (e.target.closest('#paymentMethod')) {
        const dummy = ['현금', '신용카드', '계좌이체'];
        new Dropdown(document.querySelector('#dropdownPaymentMethod'), {
          isPaymentMethod: true,
          dummy,
        });
      }
    });
  }
}
