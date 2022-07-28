import Component from '@/utils/Component';
import Header from '@/components/Header';
import '@/assets/styles/app.scss';

import { route } from '@/router';
import './store';
import Loading from './components/Loading';

class App extends Component {
  template() {
    return `
      <header></header>
      <section class="loading-container"></section>
      <div class="body"></div>
    `;
  }

  render() {
    super.render();
    new Header(document.querySelector('header'));
    new Loading(this.$target.querySelector('.loading-container'));
    const initLoading = setTimeout(() => {
      this.$target.querySelector('.loading-container').innerHTML = '';
      clearTimeout(initLoading);
    }, 2000);
    new route();
    window.addEventListener('popstate', () => route());
  }
}

export default App;
