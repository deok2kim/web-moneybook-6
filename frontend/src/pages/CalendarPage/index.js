import Component from '@/utils/Component';
import Week from '@/components/Week/index';
import Calendar from '@/components/Calendar/index';
import TotalSum from '../../components/TotalSum';
import './index.scss';

export default class CalendarPage extends Component {
  template() {
    return `
      <div class="calendarPage">
        <div class="week">
        </div>
        <div class="calendar">
        </div>
        <div class="totalSum"></div>
      </div>
    `;
  }

  render() {
    super.render();
    new Week(document.querySelector('.week'));
    new Calendar(document.querySelector('.calendar'), { month: 7 });
    new TotalSum(document.querySelector('.totalSum'));
  }
}
