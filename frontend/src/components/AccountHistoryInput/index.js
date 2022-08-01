import Component from '@/utils/Component';
import './index.scss';
import minus from '@/assets/images/minus.svg';
import plus from '@/assets/images/plus.svg';
import saveDisabled from '@/assets/images/saveDisabled.svg';
import saveActive from '@/assets/images/saveActive.svg';
import chevronDown from '@/assets/images/chevronDown.svg';
import Dropdown from '@/components/Dropdown';
import controller from '@/controller';
import { setComma, setCurrentDate, isDifferent } from '@/utils/common';

export default class AccountHistoryInput extends Component {
  template() {
    let { isInputIncome, isInputDataFilled, inputs } = this.state;

    let { category, date, content, amount, paymentMethod } = inputs;
    return /*html*/ `
      <section class="input">
        <div class="input-wrapper input-wrapper--long">
          <p class="input__title">날짜</p>
          <input class="input__content__input" name="date" type="date" placeholder="입력하세요" value="${
            date ? date : `${setCurrentDate()}`
          }" />
        </div>
        <div class="divider"></div>

        <div class="input-wrapper" id="category">
          <p class="input__title">분류</p>
          <button class="input__content__dropdown">
         
            <input class="input__content__input" name="category" disabled placeholder="선택하세요" value="${category}" />
            <img src=${chevronDown} />
          </button>
          <div id="dropdownCategory" class="dropdown-state"></div>
        </div>
        <div class="divider"></div>

        <div class="input-wrapper input-wrapper--long">
          <p class="input__title">내용</p>
          <input class="input__content__input input__content__input--long" name="content" placeholder="입력하세요" value="${content.trim()}" />
        </div>
        <div class="divider"></div>

        <div class="input-wrapper" id="paymentMethod">
          <p class="input__title">결제수단</p>
          <button type="button" class="input__content__dropdown">
          <input class="input__content__input" name="paymentMethod" placeholder="선택하세요" disabled value="${paymentMethod}" />

          <img src=${chevronDown} />
          </button>
          <div id="dropdownPaymentMethod" class="dropdown-state"></div>
        </div>
        <div class="divider"></div>

        <div class="input-wrapper input-wrapper--long">
          <p class="input__title">금액</p>
            <div class="input__input-wrapper">
            ${
              isInputIncome === '지출'
                ? `<img src=${minus} class="isIncome-btn" />`
                : `<img src=${plus} class="isIncome-btn" />`
            }
              <input class="input__content__input" placeholder="입력하세요" name="amount" value="${setComma(
                amount,
              )}" />
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
    this.$target.innerHTML = this.template();
    const { categories, paymentMethods, isInputIncome } = this.state;
    new Dropdown(this.$target.querySelector('#dropdownCategory'), {
      theme: 'category',
      isInputIncome,
      dropdownItemList: categories,
    });
    new Dropdown(this.$target.querySelector('#dropdownPaymentMethod'), {
      theme: 'paymentMethod',
      dropdownItemList: paymentMethods,
    });
  }

  setDot(value) {
    if (typeof value !== 'string') value = value.toString();
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
    return this.state[name].find((c) => c.name === this.state.inputs[inputName])
      .id;
  }

  dotNumberToPureNumber(dotNumber) {
    if (typeof dotNumber === 'number') return dotNumber;
    return parseInt(dotNumber.replace(/,/g, ''));
  }

  setEvent() {
    this.$target.addEventListener('click', (e) => {
      const { target } = e;
      const $titleWrapper = target.closest('.title-wrapper');
      if (target.closest('#category')) {
        const { style } = this.$target.querySelector('#dropdownCategory');
        style.display = style.display === '' ? 'block' : '';

        if ($titleWrapper) {
          const text =
            $titleWrapper.querySelector('.dropdown__title').innerHTML;
          this.$target.querySelector('input[name="category"]').value = text;
          this.setInputs('category', text);
        }
      } else if (target.closest('#paymentMethod')) {
        const { style } = this.$target.querySelector('#dropdownPaymentMethod');
        style.display = style.display === '' ? 'block' : '';
        if ($titleWrapper) {
          const text =
            $titleWrapper.querySelector('.dropdown__title').innerHTML;
          this.$target.querySelector('input[name="paymentMethod"]').value =
            text;
          this.setInputs('paymentMethod', text);
        }
      } else if (target.className === 'isIncome-btn') {
        this.validateInput();
        this.setState({
          ...this.state,
          isInputIncome: this.state.isInputIncome === '지출' ? '수입' : '지출',
        });
      } else if (target.className === 'save-btn') {
        if (this.state.historyEditState.isEditing) {
          const {
            amount,
            category,
            content,
            date,
            id,
            payment_method: paymentMethod,
          } = this.state.historyEditState.inputs;
          if (
            !isDifferent(
              { amount, category, content, date, id, paymentMethod },
              this.state.inputs,
            )
          )
            return;
          const data = {
            category_id: this.getId('categories', 'category'),
            payment_method_id: this.getId('paymentMethods', 'paymentMethod'),
            amount: this.dotNumberToPureNumber(this.state.inputs.amount),
            date: this.state.inputs.date || setCurrentDate(),
            content: this.state.inputs.content,
            id: this.state.inputs.id,
          };
          controller.setStoreData({
            key: 'historyEditState',
            nextState: {
              isEditing: false,
              inputs: {},
            },
          });
          this.state.onUpdateAccountHistory(data);
        } else if (this.state.isInputDataFilled) {
          const data = {
            category_id: this.getId('categories', 'category'),
            payment_method_id: this.getId('paymentMethods', 'paymentMethod'),
            amount: this.dotNumberToPureNumber(this.state.inputs.amount),
            date: this.state.inputs.date || setCurrentDate(),
            content: this.state.inputs.content,
          };
          this.state.onCreateAccountHistory(data);
        }
      }
    });

    this.$target.addEventListener('change', (e) => {
      const { name, value } = e.target;
      if (name === 'amount') {
        this.setInputs(name, this.dotNumberToPureNumber(value));
      } else {
        this.setInputs(name, value);
      }
    });
  }

  setInputs(name, value) {
    this.validateInput();
    this.setState({
      ...this.state,
      inputs: { ...this.state.inputs, [name]: value },
    });
  }

  dataSubscribe() {
    const historyEditState = controller.subscribe({
      $el: this,
      key: 'historyEditState',
    });
    if (historyEditState.value.isEditing) {
      const {
        amount,
        category,
        content,
        isIncome,
        payment_method: paymentMethod,
        date,
        id,
      } = historyEditState.value.inputs;
      this.setState({
        ...this.state,
        historyEditState: historyEditState.value,
        inputs: {
          date: date.split(' ')[0],
          category,
          content,
          paymentMethod,
          amount,
          id,
        },
        isInputIncome: isIncome,
      });
    } else {
      this.setState({
        ...this.state,
        historyEditState: historyEditState.value,
      });
    }
  }
}
