import './index.scss';
import Component from '@/utils/Component';

export default class DateBox extends Component {
  template() {
    const curDate = this.$target.dataset.date;
    return `
    <ul class="calendar__container--date-Box-contents"></ul>
    <div class="calendar__text--date-Box-text">${
      curDate !== ' ' ? Number(this.$target.dataset.date) : curDate
    } </div>
    `;
  }
}
