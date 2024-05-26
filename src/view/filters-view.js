import AbstractView from '../framework/view/abstract-view.js';

const isAvailible = (filter) => filter.exists ? '' : 'disabled';

const createFilterTemplate = (filter) =>
  `<div class="trip-filters__filter">
    <input id="filter-${filter.type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" ${isAvailible(filter)} value="${filter.type}">
    <label class="trip-filters__filter-label" for="filter-${filter.type}">${filter.type}</label>
  </div>
  <button class="visually-hidden" type="submit">Accept filter</button>`;

export default class FilterView extends AbstractView{
  #filter = null;

  constructor (filter) {
    super();
    this.#filter = filter;
  }

  get template() {
    return createFilterTemplate(this.#filter);
  }
}
