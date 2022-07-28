import Component from '@/utils/Component';
import notFound from '@/assets/images/notFound.png';
import { route } from '@/router';
import './index.scss';

export default class NotFound extends Component {
  template() {
    return `
      <section class="not-found">
        <img src=${notFound} />
        <h1>페이지를 찾을 수 없습니다.</h1>
        <button id="goHome">돌아가기</button>
      </section>
    `;
  }

  setEvent() {
    this.$target.querySelector('#goHome').addEventListener('click', (e) => {
      window.history.pushState({}, {}, '/');
      route();
    });
  }
}
