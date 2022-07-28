import Component from '@/utils/Component';

import './index.scss';
import Badge from '@/components/Badge';
import { dataProcessing } from '@/utils/dataProcessing';
import controller from '@/controller';

import AccountHistoryInfo from '@/components/AccountHistoryInfo';

export class HistoryItem extends Component {
  template() {
    const { content, paymentMethod, amount, isIncome } = this.state;
    return /* html */ `
        <div class="history-item__content-wrapper">
          <span class="history-item__category"></span>
          <p class="history-item__content">${content}</p>
        </div>
        <div class="history-item__pay-wrapper">
          <p class="history-item__payment-method">${paymentMethod}</p>
          <p class="history-item__amount">${
            isIncome === '지출' ? '-' : ''
          }${amount}원</p>
        </div>
    `;
  }

  mountBadge() {
    new Badge(this.$target.querySelector('.history-item__category'), {
      title: this.state.category,
    });
  }

  render() {
    super.render();
    this.mountBadge();
  }
}

export class HistoryHeader extends Component {
  template() {
    const { totalIncome, totalExpenditure, date, dayname } = this.state;
    return /*html*/ `
      <section class="history-header">
        <div class="history-header__day-wrapper">
          <p class="history-header__date">${date}</p>
          <p class="history-header__dayname">${dayname}</p>
        </div>
        <div class="history-item__amount-wrapper">
          <p class="history-header__amountTotal">
          ${
            totalIncome > 0 && !this.state.selectedCategory
              ? '수입' + totalIncome
              : ''
          }
          ${
            totalExpenditure > 0 && !this.state.selectedCategory
              ? '지출' + totalExpenditure
              : ''
          }</p>
        </div>
      </section>
      `;
  }
}

class HistoryDaily extends Component {
  mountHeader() {
    new HistoryHeader(this.$target, {
      date: this.state.date,
      dayname: this.state.dayname,
      selectedCategory: this.state.selectedCategory,
      ...dataProcessing.getTotal(this.state.itemList),
    });
  }
  mountHistoryItem() {
    this.state.itemList.forEach((historyItem) => {
      const $nextTarget = document.createElement('section');
      $nextTarget.classList.add('history-item');
      $nextTarget.dataset.id = historyItem.id;
      this.$target.appendChild($nextTarget);
      new HistoryItem($nextTarget, historyItem);
    });
  }
  render() {
    super.render();
    this.mountHeader();
    this.mountHistoryItem();
  }
}

export default class AccountHistory extends Component {
  template() {
    return `
    <section class="history-info-container"></section>
    <section class="history"></section>
    `;
  }

  mountHistoryDaily() {
    const $history = document.querySelector('.history');
    $history.innerHTML = '';
    if (this.state.selectedCategory) {
      this.state.accountHistoryDateOfCurrentMonth =
        this.state.accountHistoryDataOfCurrentMonth.filter((d) => {
          d.itemList = d.itemList.filter(
            (listItem) => listItem.category === this.state.selectedCategory,
          );
          return d.itemList.length === 0 ? false : true;
        });
    }
    this.historyFilter(this.state.accountHistoryDataOfCurrentMonth).forEach(
      (history) => {
        const $nextTarget = document.createElement('section');
        $nextTarget.classList.add('history-daily');
        $history.appendChild($nextTarget);
        new HistoryDaily($nextTarget, {
          ...history,
          selectedCategory: this.state.selectedCategory,
        });
      },
    );
  }

  historyFilter(accountHistories) {
    const { income, expenditure } = this.state.historyFilter;

    const res = accountHistories
      .map((accountHistory) => {
        const filterRes = accountHistory.itemList.filter((item) => {
          if (item.isIncome === '수입' && income) return true;
          if (item.isIncome === '지출' && expenditure) return true;
          return false;
        });
        return { ...accountHistory, itemList: filterRes };
      })
      .filter((history) => history.itemList.length > 0);
    return res;
  }

  mountHistoryInfo() {
    new AccountHistoryInfo(
      this.$target.querySelector('.history-info-container'),
      this.state,
    );
  }

  render() {
    super.render();
    if (this.state.accountHistory.length) this.mountHistoryDaily();
    if (!this.state.selectedCategory) this.mountHistoryInfo();
  }

  setEvent() {
    if (this.state.selectedCategory) return;
    document.querySelector('.mainPage').addEventListener('click', (e) => {
      const $historyItem = e.target.closest('.history-item');
      if ($historyItem) {
        const { id } = $historyItem.dataset;
        const selectedHistoy = this.state.accountHistory.find(
          (history) => history.id === +id,
        );
        if (selectedHistoy) {
          controller.setStoreData({
            key: 'historyEditState',
            nextState: {
              isEditing: true,
              inputs: selectedHistoy,
            },
          });
        }
      }
    });
  }

  dataSubscribe() {
    const historyFilter = controller.subscribe({
      $el: this,
      key: 'historyFilter',
    });

    this.setState({ ...this.state, historyFilter: historyFilter.value });
  }
}
