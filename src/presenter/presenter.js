import TripListView from '../view/trip-list-view.js';
import CurrentFormView from '../view/current-form-view.js';
import SortingView from '../view/sorting-view.js';
import TripPointView from '../view/trip-point-view.js';
import OpenButtonView from '../view/open-button-view.js';
import { RenderPosition, render, replace } from '../framework/render.js';
import CloseButtonView from '../view/close-button-view.js';
import SaveButtonView from '../view/save-btn-view.js';

export default class Presenter {

  #sortFormView = new SortingView();
  #tripListView = new TripListView();
  #container = null;
  #pointModel = null;
  #points = [];

  constructor ({container, pointModel}) {
    this.#container = container;
    this.#pointModel = pointModel;
  }

  init() {
    this.#points = [...this.#pointModel.getPoints()];
    render(this.#sortFormView, this.#container);
    render(this.#tripListView, this.#container);
    this.#points.forEach((point) => this.#renderPoint(point));
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

