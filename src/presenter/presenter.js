import TripListView from '../view/trip-list-view.js';
import SortingView from '../view/sorting-view.js';
import { RenderPosition, render } from '../framework/render.js';
import EmptyListView from '../view/empty-list-view.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils.js';
import TripInfoView from '../view/trip-info-view.js';
import { SORTING_COLUMNS as SortType } from '../const.js';
import { sortPricePoint, sortDayPoint, sortTimePoint } from '../utils.js';


export default class Presenter {
  #sortFormView = new SortingView();
  #tripListView = new TripListView();
  #emptyListView = new EmptyListView();
  #tripInfoView = new TripInfoView();
  #container = null;
  #pointModel = null;
  #points = [];
  #pointPresenter = new Map();
  #currentSortType = null;
  #sourcedBoardPoints = [];

  constructor (container, pointModel) {
    this.#container = container;
    this.#pointModel = pointModel;
  }

  init() {
    this.#points = [...this.#pointModel.points];
    this.#sourcedBoardPoints = [...this.#points];
    if (this.#points.length === 0) {
      this.#renderNoPoints();
    }
    else {
      this.#renderSort();
      render(this.#tripInfoView, document.querySelector('.trip-main'), RenderPosition.AFTERBEGIN);
      this.#renderPointList();
    }
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#sourcedBoardPoints = updateItem( this.#sourcedBoardPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #sortPoint = (sortType) => {
    switch (sortType) {
      case SortType[0].type:
        this.#points.sort(sortDayPoint);
        break;
      case SortType[2].type:
        this.#points.sort(sortTimePoint);
        break;
      case SortType[3].type:
        this.#points.sort(sortPricePoint);
        break;
    }

    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoint(sortType);
    this.#clearPointList();
    this.#renderPointList();
  };

  #renderSort = () => {
    this.#points.sort(sortDayPoint);
    render(this.#sortFormView, this.#container, RenderPosition.AFTERBEGIN);
    this.#sortFormView.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#tripListView.element, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = (from, to) => {
    this.#points
      .slice(from, to)
      .forEach((point) => this.#renderPoint(point));
  };

  #renderNoPoints = () => {
    render(this.#emptyListView, this.#container, RenderPosition.AFTERBEGIN);
  };

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #renderPointList = () => {
    render(this.#tripListView, this.#container);
    this.#renderPoints(0, this.#points.length);
  };
}


