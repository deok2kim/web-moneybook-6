import Component from '@/utils/Component';
import MainPage from '@/pages/MainPage';
import CalendarPage from '@/pages/CalendarPage';
import StatisticsPage from '@/pages/StatisticsPage';

class App extends Component {
  template() {
    return `
      <header>
        <span>WEB-MONEYBOOK-6</span>
        <a id="main" href="/">메인</a>
        <a id="calendar" href="/calendar">달력</a>
        <a id="statistics" href="/statistics">통계</a>
      </header>
      <div class="body"></div>
    `;
  }

  setEvent() {
    this.$target.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.tagName === 'A') {
        const { pathname } = e.target;
        window.history.pushState({}, {}, pathname);
        this.route();
      }
    });
  }

  route() {
    const $body = document.querySelector('.body');
    $body.innerHTML = '';

    const { pathname } = location;
    if (pathname === '/') {
      new MainPage($body);
    } else if (pathname === '/calendar') {
      new CalendarPage($body);
    } else if (pathname === '/statistics') {
      new StatisticsPage($body);
    } else {
      $body.innerHTML = '<h1>404 NOT FOUND</h1>';
    }
  }

  init() {
    this.route();
    window.addEventListener('popstate', () => this.route());
  }
}

export default App;
