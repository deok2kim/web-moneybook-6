import Component from '@/utils/Component';
import './index.scss';
//총수입, 총지출, 총계
export default class TotalSum extends Component {
  template() {
    const {
      accountHistoryTotalIncome: totalIncome,
      accountHistoryTotalExpenditure: totalExpenditure,
      accountHistoryTotalSum: totalSum,
    } = this.state;
    return `
      <div class="totalSum__container">
        <div class="totalSum__container--total-Income">
          <div class="totalSum__text--total-Income-Title">총 수입</div>
          <label>  </label>
          <div class="totalSum__text--total-Income-Content">${totalIncome}</div>
        </div>
        <div class="totalSum__container--total-Cost">
          <div class="totalSum__text--total-Cost-Title">총 지출</div>
          <label>  </label>
          <div class="totalSum__text--total-Cost-Content">${totalExpenditure}</div>
        </div>
      </div>
      <div class="totalSum__container">
        <div class="totalSum__container--total-Sum">
          <div class="totalSum__text--total-Sum-Title">총 계</div>
          <label>  </label>
          <div class="totalSum__text--total-Sum-Content">${totalSum}</div>
        </div>
      </div> 
    `;
  }
}
