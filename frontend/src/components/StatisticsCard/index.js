import Component from '@/utils/Component';
import DoughnutChart from '@/components/DoughnutChart/index';
import Expenditures from '@/components/Expenditures/index';
import './index.scss';

const categorys = [
  { name: '생활', percent: 64, amount: '536,460', color: '#4a6cc3' },
  { name: '의료/건강', percent: 15, amount: '536,460', color: '#6ed5eb' },
  { name: '쇼핑/뷰티', percent: 7, amount: '536,460', color: '#4cb8b8' },
  { name: '교통', percent: 6, amount: '536,460', color: '#94d3cc' },
  { name: '식비', percent: 5, amount: '536,460', color: '#4ca1de' },
  { name: '문화/여가', percent: 2, amount: '536,460', color: '#d092e2' },
  { name: '미분류', percent: 1, amount: '10,200', color: '#817dce' },
];

export default class StatisticsCard extends Component {
  template() {
    return `
      <div class="doughnutChart"></div>
      <div class="expenditures"></div>
    `;
  }

  render() {
    super.render();
    new DoughnutChart(document.querySelector('.doughnutChart'), { categorys });
    new Expenditures(document.querySelector('.expenditures'), { categorys });
  }
}
