import Component from '@/utils/Component';
import './index.scss';

export default class ExpendituresList extends Component {
  template() {
    return this.state.categorys
      .map(
        ({ color, name, amount, percent }) =>
          `<li class="expenditures__list-item">
          <div class="expenditures__list-item-badge--item-badge" style="background-color:${color};">
            ${name}
          </div>
          <div class="expenditures__list-item-text--item-percent">${percent}%</div>
          <div class="expenditures__list-item-text--item-amount">
            ${amount}
          </div>
        </li>`,
      )
      .join('');
  }

  setEvent() {}
}
