import Component from '@/utils/Component';
import './index.scss';

export default class Week extends Component {
  template() {
    return `
      <div class="week__text--day">일</div>
      <div class="week__text--day">월</div>
      <div class="week__text--day">화</div>
      <div class="week__text--day">수</div>
      <div class="week__text--day">목</div>
      <div class="week__text--day">금</div>
      <div class="week__text--day">토</div>`;
  }
}
