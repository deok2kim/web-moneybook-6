import Component from '@/utils/Component';
import './index.scss';
import ExpendituresList from '@/components/ExpendituresList/index';

export default class Expenditures extends Component {
  template() {
    return `<div class="expenditures__text">
              <div class="expenditures__text--title">이번 달 지출 금액</div>
              <div class="expenditures__text--total-Amount">100,000</div>  
          </div>
          <ul class="expenditures__list--category-list"></ul>`;
  }
  render() {
    super.render();
    new ExpendituresList(
      document.querySelector('.expenditures__list--category-list'),
      this.state,
    );
  }
}
