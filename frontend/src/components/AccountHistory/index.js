import Component from '@/utils/Component';
import AccountHistoryInfo from '@/components/AccountHistoryInfo';
import Badge from '@/components/Badge';
import controller from '@/controller';

import './index.scss';
import { dataProcessing } from '@/utils/dataProcessing';
import { setComma } from '@/utils/common';

export class HistoryItem extends Component {
  template() {
    const { content, paymentMethod, amount, isIncome } = this.state;
    return /* html */ `
        <div class="history-item__content-wrapper">
          <span class="history-item__category"></span>
          <p class="history-item__content">${content}</p>
        </div>
        <div class="history-item__pay-wrapper">
          <p class="history-item__payment-method">${
            paymentMethod ? paymentMethod : ''
          }</p>
          <p class="history-item__amount">${
            isIncome === '지출' ? '-' : ''
          }${setComma(amount)}원</p>
        </div>
    `;
  }

  renderBadge() {
    new Badge(this.$target.querySelector('.history-item__category'), {
      title: this.state.category,
    });
  }

  render() {
    super.render();
    this.renderBadge();
  }
}

export class HistoryHeader extends Component {
  template() {
    const { totalIncome, totalExpenditure, date, dayname, selectedCategory } =
      this.state;
    return /*html*/ `
      <section class="history-header">
        <div class="history-header__day-wrapper">
          <p class="history-header__date">${date}</p>
          <p class="history-header__dayname">${dayname}</p>
        </div>
        <div class="history-item__amount-wrapper">
        ${
          selectedCategory
            ? `
            <p class="history-header__amountTotal">
            ${totalIncome ? '수입 ' + setComma(totalIncome) : ''}
            ${totalExpenditure ? '지출 ' + setComma(totalExpenditure) : ''}</p>
            `
            : ''
        }
        </div>
      </section>
      `;
  }
}

class HistoryDaily extends Component {
  renderHistoryHeader() {
    const { date, dayname, selectedCategory, itemList } = this.state;
    new HistoryHeader(this.$target, {
      date,
      dayname,
      selectedCategory,
      ...dataProcessing.getTotal(itemList),
    });
  }
  renderHistoryItem() {
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
    this.renderHistoryHeader();
    this.renderHistoryItem();
  }
}

export default class AccountHistory extends Component {
  template() {
    return `
      <section class="history-info-container"></section>
      <section class="history"></section>
    `;
  }

  renderHistoryDaily() {
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

  renderHistoryInfo() {
    new AccountHistoryInfo(
      this.$target.querySelector('.history-info-container'),
      {
        accountHistoryTotalInfo: this.state.accountHistoryTotalInfo,
      },
    );
  }

  render() {
    super.render();
    if (this.state.accountHistory.length) this.renderHistoryDaily();
    if (!this.state.selectedCategory) this.renderHistoryInfo();
  }

  setEvent() {
    if (this.state.selectedCategory) return;
    this.$target.addEventListener('click', (e) => {
      const $historyItem = e.target.closest('.history-item');
      if ($historyItem) {
        const { id } = $historyItem.dataset;
        const selectedHistory = this.state.accountHistory.find(
          (history) => history.id === +id,
        );
        if (selectedHistory) {
          controller.setStoreData({
            key: 'historyEditState',
            nextState: {
              isEditing: true,
              inputs: selectedHistory,
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
