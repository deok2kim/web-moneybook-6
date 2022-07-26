import Component from '@/utils/Component';
import './index.scss';
import saveActiveSmall from '@/assets/images/saveActiveSmall.svg';
import saveDefaultSmall from '@/assets/images/saveDefaultSmall.svg';

export default class AccountHistoryInfo extends Component {
  template() {
    const { totalIncome, totalExpenditure, totalCount } =
      this.state.accountHistoryTotalInfo;
    return /*html*/ `
      <section class="history-info">
        <div>
          <p class="history-info__title">전체내역 ${totalCount}건</p>
        </div>
        <div class="history-info__filter">
          <div class="history-info__wrapper" id="btn-income">
            <img src=${saveDefaultSmall} id="img-income" />
            <p>수입 ${totalIncome}</p>
            </div>
          <div class="history-info__wrapper" id="btn-expenditure">
            <img src=${saveActiveSmall} />
            <p>지출${totalExpenditure}</p>
          </div>
        </div>
      </section>
    `;
  }
  setEvent() {
    console.log(this.state);
    this.$target.addEventListener('click', (e) => {
      const { target } = e;
      if (target.closest('#btn-income')) {
        const $img = this.$target.querySelector('#img-income');
        $img.attributes.src.value =
          $img.attributes.src.value === saveActiveSmall
            ? saveDefaultSmall
            : saveActiveSmall;
      }
    });
  }
}
