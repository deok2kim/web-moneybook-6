import Component from '@/utils/Component';
import './index.scss';
import arrowLeft from '@/assets/images/arrowLeft.svg';
import arrowRight from '@/assets/images/arrowRight.svg';
import 통계 from '@/assets/images/통계.svg';
import 달력 from '@/assets/images/달력.svg';
import 내역 from '@/assets/images/내역.svg';

export default class Header extends Component {
  template() {
    return `
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
        <img src=${내역} />
        <img src=${달력} />
        <img src=${통계} />
      </div>
    `;
  }
}
