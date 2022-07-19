import Component from '@/utils/Component';

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
}

export default App;
