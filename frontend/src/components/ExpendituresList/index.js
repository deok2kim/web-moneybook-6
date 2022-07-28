import Component from '@/utils/Component';
import { setComma } from '@/utils/common';
import './index.scss';

export default class ExpendituresList extends Component {
  template() {
    if (!this.state.categoryExpenditures) return;
    let htmlTemplate = '';
    Object.values(this.state.categoryExpenditures).map(
      ({ name, amount, percent, color }) => {
        htmlTemplate += `<li class="expenditures__list-item">
          <div class="expenditures__list-item-badge--item-badge" style="background-color:${color};">
            ${name}
          </div>
          <div class="expenditures__list-item-text--item-percent">${percent}%</div>
          <div class="expenditures__list-item-text--item-amount">
            ${setComma(amount)}
          </div>
        </li>`;
      },
    );
    return htmlTemplate;
  }
}
