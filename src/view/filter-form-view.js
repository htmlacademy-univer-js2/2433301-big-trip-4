import AbstractView from '../framework/view/abstract-view.js';

const createFilterFormTemplate = () =>
  `<form class="trip-filters" action="#" method="get">
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;

export default class FilterFormView extends AbstractView{
  get template() {
    return createFilterFormTemplate();
  }
}
