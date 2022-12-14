import Component from '@/utils/Component';
import './index.scss';
import arrowLeft from '@/assets/images/arrowLeft.svg';
import arrowRight from '@/assets/images/arrowRight.svg';
import 통계 from '@/assets/images/통계.svg';
import 달력 from '@/assets/images/달력.svg';
import 내역 from '@/assets/images/내역.svg';

import { calculateMonth } from '@/utils/common';

import { route } from '@/router';
import controller from '@/controller';

export default class Header extends Component {
  template() {
    const { currentMonth } = this.state;
    return /*html*/ `
      <div class="logo"><button>우아한 가계부</button></div>
      <div class="month-year">
        <img class="arrow-left arrow" src=${arrowLeft} />
        <div class="month-year__wrapper">
          <span class="month-year__month">${currentMonth % 100}월</span>
          <span class="month-year__year">${parseInt(currentMonth / 100)}</span>
        </div>
        <img class="arrow-right arrow" src=${arrowRight} />
      </div>
      <div class="tab">
        <a href=""><img src=${내역} class="router-btn" data-url="/"/></a>
        <a href=""><img src=${달력} class="router-btn" data-url="/calendar"/></a>
        <a href=""><img src=${통계} class="router-btn" data-url="/statistics"/></a>
      </div>
    `;
  }

  render() {
    super.render();
    this.highlightIcon();
  }
  highlightIcon() {
    [...this.$target.querySelectorAll('.router-btn')].forEach(($el) => {
      $el.classList.remove('router-btn--active');
      if ($el.dataset.url === location.pathname) {
        $el.classList.add('router-btn--active');
      }
    });
  }
  handleMonthClick(isNext) {
    const { currentMonth } = this.state;

    controller.setStoreData({
      key: 'currentMonth',
      nextState: calculateMonth(currentMonth, isNext),
    });
    controller.setStoreData({ key: 'selectedCategory', nextState: '' });
  }

  setEvent() {
    this.$target.addEventListener('click', (e) => {
      const { target } = e;
      e.preventDefault();
      if (target.className === 'router-btn') {
        const { url } = target.dataset;
        if (location.pathname === url) return;
        window.history.pushState({}, {}, url);
        route();
      } else if (target.classList.contains('arrow-right')) {
        this.handleMonthClick(true);
      } else if (target.classList.contains('arrow-left')) {
        this.handleMonthClick(false);
      } else if (target.closest('.logo')) {
        const url = '/';
        window.history.pushState({}, {}, url);
        route();
      }
      this.highlightIcon();
    });
  }

  async dataSubscribe() {
    const currentMonth = controller.subscribe({
      $el: this,
      key: 'currentMonth',
    });
    this.setState({ ...this.state, [currentMonth.key]: currentMonth.value });
  }
}
