import Component from '@/utils/Component';
import './index.scss';
import saveActiveSmall from '@/assets/images/saveActiveSmall.svg';
import saveDefaultSmall from '@/assets/images/saveDefaultSmall.svg';

export default class HistoryInfo extends Component {
  template() {
    const { income, expenditure, totalCount } = {
      income: 1822480,
      expenditure: 798180,
      totalCount: 13,
    };
    return `
      <section class="history-info tot">
        <div>
          <p class="history_info__title">전체내역 ${totalCount}건</p>
        </div>
        <div class="history-info__filter">
          <div class="history-info__wrapper">
            <img src=${saveDefaultSmall} />
            <p>수입 ${income}</p>
            </div>
          <div class="history-info__wrapper">
            <img src=${saveActiveSmall} />
            <p>지출 ${expenditure}</p>
          </div>
        </div>
      </section>
    `;
  }
}
