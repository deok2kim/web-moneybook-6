import Component from '@/utils/Component';
import './index.scss';
import minus from '@/assets/images/minus.svg';
import plus from '@/assets/images/plus.svg';
import saveDisabled from '@/assets/images/saveDisabled.svg';
import saveActive from '@/assets/images/saveActive.svg';
import chevronDown from '@/assets/images/chevronDown.svg';
import Dropdown from '@/components/Dropdown';
import { createAccountHistory } from '../../api/accountHistory';

export default class AccountHistoryInput extends Component {
  template() {
    const {
      inputCategory,
      inputDate,
      inputContent,
      inputAmount,
      inputPaymentMethod,
      inputIsIncome,
      isInputDataFilled,
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
         
            <input class="input__content__input" name="inputCategory" disabled placeholder="선택하세요" value="${inputCategory}" />
            <img src=${chevronDown} />
          </button>
          <div id="dropdownCategory" class="dropdown-state"></div>
        </div>
        <div class="divider"></div>

        <div class="input-wrapper input-wrapper--long">
          <p class="input__title">내용</p>
          <input class="input__content__input input__content__input--long" name="inputContent" placeholder="입력하세요" value="${inputContent.trim()}" />
        </div>
        <div class="divider"></div>

        <div class="input-wrapper" id="paymentMethod">
          <p class="input__title">결제수단</p>
          <button class="input__content__dropdown">
          <input class="input__content__input" name="inputPaymentMethod" placeholder="선택하세요" disabled value="${inputPaymentMethod}" />

          <img src=${chevronDown} />
          </button>
          <div id="dropdownPaymentMethod" class="dropdown-state"></div>
        </div>
        <div class="divider"></div>

        <div class="input-wrapper input-wrapper--long">
          <p class="input__title">금액</p>
            <div class="input__input-wrapper">
            ${
              inputIsIncome === '지출'
                ? `<img src=${minus} class="isIncome-btn" />`
                : `<img src=${plus} class="isIncome-btn" />`
            }
              <input class="input__content__input" placeholder="입력하세요" dir="rtl" name="inputAmount" value="${inputAmount}" />
              <p class="input__content__text">원</p>
            </div>
          </div>
        </div>
        <button disabled="${!isInputDataFilled}">
          <img class="save-btn" src=${
            isInputDataFilled ? saveActive : saveDisabled
          }  />
        </button>
      </section>
    `;
  }

  render() {
    super.render();
    const { category, paymentMethod, inputIsIncome } = this.state;
    new Dropdown(this.$target.querySelector('#dropdownCategory'), {
      theme: 'category',
      inputIsIncome,
      dropdownItemList: category,
    });
    new Dropdown(this.$target.querySelector('#dropdownPaymentMethod'), {
      theme: 'paymentMethod',
      dropdownItemList: paymentMethod,
    });
  }

  setDot(value) {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  validateInput() {
    this.state.isInputDataFilled = [
      ...this.$target.querySelectorAll('input'),
    ].every((input) => {
      return input.value.trim();
    });
  }

  getId(name, inputName) {
    return this.state[name].find((c) => c.name === this.state[inputName]).id;
  }

  setEvent() {
    this.$target.addEventListener('click', (e) => {
      const { target } = e;
      if (target.closest('#category')) {
        const { style } = this.$target.querySelector('#dropdownCategory');
        style.display = style.display === '' ? 'block' : '';
        if (target.className === 'dropdown__title') {
          this.$target.querySelector('input[name="inputCategory"]').value =
            target.innerHTML;
          this.validateInput();
          this.setState({ ...this.state, inputCategory: target.innerHTML });
        }
      } else if (target.closest('#paymentMethod')) {
        const { style } = this.$target.querySelector('#dropdownPaymentMethod');
        style.display = style.display === '' ? 'block' : '';
        if (target.className === 'dropdown__title') {
          this.$target.querySelector('input[name="inputPaymentMethod"]').value =
            target.innerHTML;
          this.validateInput();
          this.setState({
            ...this.state,
            inputPaymentMethod: target.innerHTML,
          });
        }
      } else if (target.className === 'isIncome-btn') {
        let { inputIsIncome } = this.state;
        inputIsIncome = inputIsIncome === '지출' ? '수입' : '지출';
        this.validateInput();
        this.setState({ ...this.state, inputIsIncome });
      } else if (target.className === 'save-btn') {
        if (this.state.isInputDataFilled) {
          this.state.handleCreateAccountHistory({
            category_id: this.getId('category', 'inputCategory'),
            payment_method_id: this.getId(
              'paymentMethod',
              'inputPaymentMethod',
            ),
            amount: parseInt(this.state.inputAmount.replace(/,/g, '')),
            date: this.state.inputDate,
            content: this.state.inputContent,
          });
        }
      }
    });

    this.$target.addEventListener('change', (e) => {
      let { name, value } = e.target;
      if (name === 'inputAmount') {
        value = this.setDot(value);
      }
      this.validateInput();
      this.setState({ ...this.state, [name]: value });
    });
  }
}
