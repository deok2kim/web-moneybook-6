import Component from '@/utils/Component';
import Header from '@/components/Header';
import '@/assets/styles/app.scss';

import { route } from '@/router';
import './store';

class App extends Component {
  template() {
    return `
      <header></header>
      <div class="body"></div>
    `;
  }

  render() {
    super.render();
    new Header(document.querySelector('header'));
    route();
    window.addEventListener('popstate', () => route());
  }
}

export default App;
