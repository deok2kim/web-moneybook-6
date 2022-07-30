import Component from '@/utils/Component';
import './index.scss';
import saveActiveSmall from '@/assets/images/saveActiveSmall.svg';
import saveDefaultSmall from '@/assets/images/saveDefaultSmall.svg';
import controller from '@/controller';
import { setComma } from '@/utils/common';

export default class AccountHistoryInfo extends Component {
  template() {
    const {
      accountHistoryTotalInfo: { totalCount, totalIncome, totalExpenditure },
      historyFilter: { income, expenditure },
    } = this.state;

    return /*html*/ `
      <section class="history-info">
        <div>
          <p class="history-info__title">전체내역 ${setComma(totalCount)}건</p>
        </div>
        <div class="history-info__filter">
          <div class="history-info__wrapper" id="btn-income">
            <img src=${
              income ? saveActiveSmall : saveDefaultSmall
            } id="img-income" />
            <p>수입 ${setComma(totalIncome)}</p>
            </div>
          <div class="history-info__wrapper" id="btn-expenditure">
            <img src=${expenditure ? saveActiveSmall : saveDefaultSmall} />
            <p>지출 ${setComma(totalExpenditure)}</p>
          </div>
        </div>
      </section>
    `;
  }
  setEvent() {
    this.$target.addEventListener('click', (e) => {
      const { target } = e;
      const { income, expenditure } = this.state.historyFilter;
      if (target.closest('#btn-income')) {
        controller.setStoreData({
          key: 'historyFilter',
          nextState: { income: !income, expenditure: expenditure },
        });
      } else if (target.closest('#btn-expenditure')) {
        controller.setStoreData({
          key: 'historyFilter',
          nextState: { income: income, expenditure: !expenditure },
        });
      }
    });
  }

  dataSubscribe() {
    const historyFilter = controller.subscribe({
      $el: this,
      key: 'historyFilter',
    });

    const historyEditState = controller.subscribe({
      $el: this,
      key: 'historyEditState',
    });
    this.setState({
      ...this.state,
      historyFilter: historyFilter.value,
      historyEditState: historyEditState.value,
    });
  }
}
