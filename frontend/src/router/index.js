import MainPage from '@/pages/MainPage';
import CalendarPage from '@/pages/CalendarPage';
import StatisticsPage from '@/pages/StatisticsPage';

export const route = () => {
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
};
