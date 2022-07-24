import Component from '@/utils/Component';

import './index.scss';
import Badge from '@/components/Badge';
import contorller from '@/controller';
import { dataProcessing } from '@/utils/dataProcessing';

export class HistoryItem extends Component {
  template() {
    const { category, content, paymentMethod, amount } = this.state;
    return /* html */ `
        <div class="history-item__content-wrapper">
          <span class="history-item__category"></span>
          <p class="history-item__content">${content}</p>
        </div>
        <div class="history-item__pay-wrapper">
          <p class="history-item__payment-method">${paymentMethod}</p>
          <p class="history-item__amount">${amount}원</p>
        </div>
    `;
  }
  render() {
    super.render();
    new Badge(this.$target.querySelector('.history-item__category'), {
      title: this.state.category,
    });
  }
}

export class HistoryHeader extends Component {
  template() {
    const { incomeTotal, expenditureTotal, date, dayname } = {
      incomeTotal: '1,800,000',
      expenditureTotal: '1,800,000',
      date: this.state.date,
      dayname: this.state.dayname,
    };
    return /*html*/ `
      <section class="history-header">
        <div class="history-header__day-wrapper">
          <p class="history-header__date">${date}</p>
          <p class="history-header__dayname">${dayname}</p>
        </div>
        <div class="history-item__amount-wrapper">
          <p class="history-header__amountTotal">수입 ${incomeTotal} 지출 ${expenditureTotal}</p>
        </div>
      </section>
      `;
  }
}

class HistoryDaily extends Component {
  render() {
    super.render();

    this.$target.innerHTML = '';
    new HistoryHeader(this.$target, {
      date: this.state.date,
      dayname: this.state.dayname,
    });
    this.state.itemList.forEach((historyItem) => {
      const $nextTarget = document.createElement('section');
      $nextTarget.classList.add('history-item');
      this.$target.appendChild($nextTarget);
      new HistoryItem($nextTarget, historyItem);
    });
  }
}

export default class AccountHistory extends Component {
  template() {
    return `
      <section class="history"></section>
    `;
  }

  render() {
    super.render();
    const $history = document.querySelector('.history');
    $history.innerHTML = '';
    const historyList = dataProcessing.getDaily(
      this.state.accountHistoryDataOfCurrentMonth,
    );
    historyList.forEach((history) => {
      const $nextTarget = document.createElement('section');
      $nextTarget.classList.add('history-daily');
      $history.appendChild($nextTarget);
      new HistoryDaily($nextTarget, history);
    });
  }
  dataSubscribe() {
    const { key, value } = contorller.subscribe({
      $el: this,
      key: 'accountHistoryDataOfCurrentMonth',
    });
    this.state = { ...this.state, [key]: value };
  }
}
