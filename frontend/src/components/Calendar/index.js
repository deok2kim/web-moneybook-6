import Component from '@/utils/Component';
import DateBox from '@/components/DateBox/index';
import { setCurrentDate } from '@/utils/common';
import './index.scss';

export default class Calendar extends Component {
  template() {
    if (!this.state.currentMonth || !this.state.accountHistoryPerDay) return;
    let dates = this.createDates();

    dates.forEach((date, i) => {
      const isSameDay =
        setCurrentDate().split('-').join('') ===
        `${this.state.currentMonth}${date < 10 ? '0' + date : date}`;
      dates[i] = `<div class="calendar__container--date-Box" data-month = '${
        this.state.currentMonth + 1
      }' data-date = '${date}' style="background-color:${
        isSameDay ? '#F5F5F5' : ''
      }"></div>`;
      console.log(dates[i]);
    });

    return dates.join('');
  }

  createDates() {
    const date = new Date();
    const viewYear = date.getFullYear();
    const calenderDates = 42;
    const prevLast = new Date(viewYear, this.state.currentMonth - 1, 0);
    const thisLast = new Date(viewYear, this.state.currentMonth, 0);

    const PLDay = prevLast.getDay();
    const TLDate = thisLast.getDate();

    const prevDates = [];
    const thisDates = [...Array(TLDate + 1).keys()].slice(1);

    if (PLDay !== 6) {
      for (let i = 0; i < PLDay + 1; i++) {
        prevDates.unshift('');
      }
    }

    let dates = prevDates.concat(thisDates);

    if (dates.length < calenderDates) {
      dates = dates.concat(new Array(calenderDates - dates.length).fill(' '));
    }

    return dates;
  }

  render() {
    super.render();
    this.$target
      .querySelectorAll('.calendar__container--date-Box')
      .forEach((dateBox) => new DateBox(dateBox, this.state));
  }
}
