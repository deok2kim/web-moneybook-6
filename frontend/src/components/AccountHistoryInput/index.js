import Component from '@/utils/Component';
import './index.scss';
import minus from '@/assets/images/minus.svg';
import saveDisabled from '@/assets/images/saveDisabled.svg';
import chevronDown from '@/assets/images/chevronDown.svg';
import Dropdown from '../Dorpdown';

export default class AccountHistoryInput extends Component {
  isInputText(input, text) {
    return input ? input : text;
  }
  template() {
    const {
      inputCategory,
      inputDate,
      inputContent,
      inputAmount,
      inputPaymentMethod,
    } = this.state;
    return /*html*/ `
      <section class="input">
        <div class="input-wrapper">
          <p class="input__title">날짜</p>
          <input class="input__content__input" name="inputDate" type="date" placeholder="입력하세요" value="${inputDate}" />
        </div>
        <div class="divider"></div>

        <div class="input-wrapper" id="category">
          <p class="input__title">분류</p>
          <button class="input__content__dropdown">
            <p>${inputCategory ? inputCategory : '선택하세요'}</p>
            <img src=${chevronDown} />
          </button>
          <div id="dropdownCategory" class="dropdown-state"></div>
        </div>
        <div class="divider"></div>

        <div class="input-wrapper input-wrapper--long">
          <p class="input__title">내용</p>
          <input class="input__content__input input__content__input--long" name="inputContent" placeholder="입력하세요" value="${inputContent}" />
        </div>
        <div class="divider"></div>

        <div class="input-wrapper" id="paymentMethod">
          <p class="input__title">결제수단</p>
          <button class="input__content__dropdown">
          <p>${inputPaymentMethod ? inputPaymentMethod : '선택하세요'}</p>
          <img src=${chevronDown} />
          </button>
          <div id="dropdownPaymentMethod" class="dropdown-state"></div>
        </div>
        <div class="divider"></div>

        <div class="input-wrapper input-wrapper--long">
          <p class="input__title">금액</p>
            <div class="input__input-wrapper">
              <img src=${minus} />
              <input class="input__content__input" placeholder="입력하세요" dir="rtl" name="inputAmount" value="${inputAmount}" />
              <p class="input__content__text">원</p>
            </div>
          </div>
        </div>
        <img class="save-btn" src=${saveDisabled} />
      </section>
    `;
  }

  render() {
    super.render();
    const { category, paymentMethod, isPaymentMethod, isIncomeSelected } =
      this.state;
    new Dropdown(this.$target.querySelector('#dropdownCategory'), {
      theme: 'category',
      isIncomeSelected,
      dropdownItemList: category,
    });
    new Dropdown(this.$target.querySelector('#dropdownPaymentMethod'), {
      theme: 'paymentMethod',
      dropdownItemList: paymentMethod,
    });
  }

  setEvent() {
    this.$target.addEventListener('click', (e) => {
      const { target } = e;
      if (target.closest('#category')) {
        const { style } = this.$target.querySelector('#dropdownCategory');
        style.display = style.display === '' ? 'block' : '';
        if (target.className === 'dropdown__title') {
          this.setState({ ...this.state, inputCategory: target.innerHTML });
        }
      } else if (target.closest('#paymentMethod')) {
        const { style } = this.$target.querySelector('#dropdownPaymentMethod');
        style.display = style.display === '' ? 'block' : '';
        if (target.className === 'dropdown__title') {
          this.setState({
            ...this.state,
            inputPaymentMethod: target.innerHTML,
          });
        }
      }
    });

    this.$target.addEventListener('change', (e) => {
      const { name, value } = e.target;
      this.setState({ ...this.state, [name]: value });
    });
  }
}
