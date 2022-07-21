import Component from '@/utils/Component';
import DateBox from '@/components/DateBox/index';
import './index.scss';

export default class Calendar extends Component {
  template() {
    let dates = this.createDates();

    dates.forEach((date, i) => {
      dates[i] = `<div class="calendar__container--date-Box" data-month = '${
        this.state.month + 1
      }' data-date = '${date}'></div>`;
    });

    return dates.join('');
  }

  createDates() {
    const date = new Date();
    const viewYear = date.getFullYear();
    const calenderDates = 42;
    const prevLast = new Date(viewYear, this.state.month - 1, 0);
    const thisLast = new Date(viewYear, this.state.month, 0);

    const PLDay = prevLast.getDay();
    const TLDate = thisLast.getDate();

    const prevDates = [];
    const thisDates = [...Array(TLDate + 1).keys()].slice(1);

    if (PLDay !== 6) {
      for (let i = 0; i < PLDay + 1; i++) {
        prevDates.unshift(' ');
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
    for (let dateElement of document.querySelectorAll(
      '.calendar__container--date-Box',
    )) {
      new DateBox(dateElement);
    }
  }
}
