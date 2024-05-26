import TripListView from '../view/trip-list-view.js';
import CurrentFormView from '../view/current-form-view.js';
import SortingView from '../view/sorting-view.js';
import TripPointView from '../view/trip-point-view.js';
import OpenButtonView from '../view/open-button-view.js';
import { RenderPosition, render, replace } from '../framework/render.js';
import CloseButtonView from '../view/close-button-view.js';
import SaveButtonView from '../view/save-btn-view.js';
import EmptyListView from '../view/empty-list-view.js';
import FilterFormView from '../view/filter-form-view.js';
import FilterView from '../view/filters-view.js';
import TripInfoView from '../view/trip-info-view.js';
import { generateFilter } from '../mock/filters.js';


export default class Presenter {

  #sortFormView = new SortingView();
  #tripListView = new TripListView();
  #emptyListView = new EmptyListView();
  #tripInfoView = new TripInfoView();
  #filterFormView = new FilterFormView();
  #container = null;
  #pointModel = null;
  #points = [];

  constructor ({container, pointModel}) {
    this.#container = container;
    this.#pointModel = pointModel;
  }

  init() {
    this.#points = [...this.#pointModel.getPoints()];
    const pageMainElement = document.querySelector('.trip-main');
    const filterElement = document.querySelector('.trip-controls__filters');
    const filters = generateFilter(this.#points);
    render(this.#filterFormView, filterElement);
    filters.forEach((filter) => render(new FilterView(filter), this.#filterFormView.element));
    if (this.#points.length) {
      render(this.#sortFormView, this.#container);
      render(this.#tripInfoView, pageMainElement, RenderPosition.AFTERBEGIN);
      render(this.#tripListView, this.#container);
      this.#points.forEach((point) => this.#renderPoint(point));
    }
    else {
      render(this.#emptyListView, this.#container);
    }
  }

  #renderPoint (point) {
    const escKeyDownBtnHandler = (evt) => {
      if (evt.key === 'Escape') {
        replacePointToForm();
        document.removeEventListener('keydown', escKeyDownBtnHandler);
      }
    };
    const pointElement = new TripPointView({data: point});
    const formElement = new CurrentFormView({
      data: point,
      onSubmit() {
        replacePointToForm();
        document.removeEventListener('keydown', escKeyDownBtnHandler);
      }});
    const deleteButton = formElement.element.querySelector('.event__reset-btn');
    const openBtn = new OpenButtonView({
      onClick() {
        replaceFormToPoint();
        document.addEventListener('keydown', escKeyDownBtnHandler);
      }});
    const closeButton = new CloseButtonView({
      onClick() {
        replacePointToForm();
        document.removeEventListener('keydown', escKeyDownBtnHandler);
      }});
    const saveButton = new SaveButtonView();

    render(pointElement, this.#tripListView.element);
    render(openBtn, pointElement.element, RenderPosition.BEFOREEND);
    render(saveButton, deleteButton, RenderPosition.BEFOREBEGIN);
    render(closeButton, deleteButton, RenderPosition.AFTEREND);

    function replacePointToForm() { //всплытие
      replace(pointElement, formElement);
    }

    function replaceFormToPoint() { //всплытие
      replace(formElement, pointElement);
    }
  }
}

