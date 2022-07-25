import Component from '@/utils/Component';
import './index.scss';
import saveActiveSmall from '@/assets/images/saveActiveSmall.svg';
import saveDefaultSmall from '@/assets/images/saveDefaultSmall.svg';

import controller from '@/controller';
import { dataProcessing } from '@/utils/dataProcessing';

export default class AccountHistoryInfo extends Component {
  template() {
    if (!this.state.accountHistoryTotalInfo) {
      return 'loading';
    }

    const { totalIncome, totalExpenditure, totalCount } =
      this.state.accountHistoryTotalInfo;
    return /*html*/ `
      <section class="history-info">
        <div>
          <p class="history-info__title">전체내역 ${totalCount}건</p>
        </div>
        <div class="history-info__filter">
          <div class="history-info__wrapper">
            <img src=${saveDefaultSmall} />
            <p>수입 ${totalIncome}</p>
            </div>
          <div class="history-info__wrapper">
            <img src=${saveActiveSmall} />
            <p>지출 ${totalExpenditure}</p>
          </div>
        </div>
      </section>
    `;
  }
}
