import Component from '@/utils/Component';
import './index.scss';
import { categoryColors } from '@/constants/categoryColors';

export default class Badge extends Component {
  template() {
    const { title } = this.state;
    return /*html*/ `
      <div class="badge">
        <p class="badge__title">${title}</p>
      </div>
    `;
  }

  render() {
    super.render();
    this.$target.querySelector('.badge').style.backgroundColor =
      categoryColors[this.state.title];
  }
}
