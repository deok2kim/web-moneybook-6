import Component from '@/utils/Component';
import './index.scss';
import minus from '@/assets/images/minus.svg';
import saveDisabled from '@/assets/images/saveDisabled.svg';

export default class Input extends Component {
  template() {
    return `
      <section class="input">
        <div class="input-wrapper">
          <p class="input__title">날짜</p>
          <input class="input__content__input" placeholder="입력하세요" />
        </div>
        <div class="divider"></div>

        <div class="input-wrapper">
          <p class="input__title">분류</p>
          <input class="input__content__input" placeholder="선택하세요" />
        </div>
        <div class="divider"></div>

        <div class="input-wrapper input-wrapper--long">
          <p class="input__title">내용</p>
          <input class="input__content__input input__content__input--long" placeholder="입력하세요" />
        </div>
        <div class="divider"></div>

        <div class="input-wrapper">
          <p class="input__title">결제수단</p>
          <input class="input__content__input" placeholder="선택하세요" />
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
}
