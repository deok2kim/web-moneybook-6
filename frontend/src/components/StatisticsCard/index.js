import Component from '@/utils/Component';
import DoughnutChart from '@/components/DoughnutChart/index';
import Expenditures from '@/components/Expenditures/index';
import './index.scss';
import { dataProcessing } from '@/utils/dataProcessing';
import controller from '@/controller';

export default class StatisticsCard extends Component {
  template() {
    return `
      <div class="doughnutChart"></div>
      <div class="expenditures"></div>
    `;
  }

  render() {
    super.render();
    new DoughnutChart(document.querySelector('.doughnutChart'), this.state);
    new Expenditures(document.querySelector('.expenditures'), this.state);
  }
}
