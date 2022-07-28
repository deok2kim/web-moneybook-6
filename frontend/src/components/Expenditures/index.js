import Component from '@/utils/Component';
import './index.scss';
import ExpendituresList from '@/components/ExpendituresList/index';
import { setComma } from '@/utils/common';

export default class Expenditures extends Component {
  template() {
    return `<div class="expenditures__text">
              <div class="expenditures__text--title">이번 달 지출 금액</div>
              <div class="expenditures__text--total-Amount">${setComma(
                this.state.totalExpenditure,
              )}원</div>  
          </div>
          <ul class="expenditures__list--category-list"></ul>`;
  }
  render() {
    if (!this.state.totalExpenditure) return;
    super.render();
    new ExpendituresList(
      this.$target.querySelector('.expenditures__list--category-list'),
      this.state,
    );
  }
}
