import { SORTING_COLUMNS } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

const createSortingItemTemplate = (column) =>
  `<div class="trip-sort__item  trip-sort__item--${column.type}">
    <input data-sort-type=${column.type} id="sort-${column.type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${column.type}" ${!column.active ? 'disabled' : ''} ${column.defaultSelected ? 'checked' : ''}>
    <label class="trip-sort__btn" for="sort-${column.type}">${column.label}</label>
  </div>`;

const createSortingTemplate = () =>
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${SORTING_COLUMNS.map(createSortingItemTemplate).join('')}
  </form>`;

export default class SortingView extends AbstractView{
  get template() {
    return createSortingTemplate();
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };
}
