import AbstractView from '../framework/view/abstract-view';

function createOpenButtonTemplate() {
  return `<button class="event__rollup-btn" type="button">
  <span class="visually-hidden">Open event</span>
  </button>`;
}

export default class OpenButtonView extends AbstractView{
  #handleClick = null;

  constructor ({onClick}) {
    super();
    this.#handleClick = onClick;
    this.element.addEventListener('click', this.#clickHandler);
  }

  get template() {
    return createOpenButtonTemplate();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
