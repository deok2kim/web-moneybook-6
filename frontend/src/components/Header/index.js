import Component from '@/utils/Component';
import './index.scss';
import arrowLeft from '@/assets/images/arrowLeft.svg';
import arrowRight from '@/assets/images/arrowRight.svg';
import 통계 from '@/assets/images/통계.svg';
import 달력 from '@/assets/images/달력.svg';
import 내역 from '@/assets/images/내역.svg';

import { route } from '@/router';

export default class Header extends Component {
  template() {
    return /*html*/ `
      <div class="logo">우아한 가계부</div>
      <div class="month-year">
        <img src=${arrowLeft} />
        <div class="month-year__wrapper">
          <span class="month-year__month">7월</span>
          <span class="month-year__year">2022</span>
        </div>
        <img src=${arrowRight} />
      </div>
      <div class="tab">
        <a href=""><img src=${내역} data-url="/"/></a>
        <a href=""><img src=${달력} data-url="/calendar"/></a>
        <a href=""><img src=${통계} data-url="/statistics"/></a>
      </div>
    `;
  }
  setEvent() {
    this.$target.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.tagName === 'IMG') {
        const { url } = e.target.dataset;
        window.history.pushState({}, {}, url);
        route();
      }
    });
  }
}
