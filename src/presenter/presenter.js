import TripListView from '../view/trip-list-view.js';
import SortingView from '../view/sorting-view.js';
import { RenderPosition, render } from '../framework/render.js';
import EmptyListView from '../view/empty-list-view.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils.js';
import { SORTING_COLUMNS } from '../const.js';
import { sortPricePoint, sortDayPoint, sortTimePoint } from '../utils.js';


export default class Presenter {
  #sortFormView = new SortingView();
  #tripListView = new TripListView();
  #emptyListView = new EmptyListView();
  #container = null;
  #pointModel = null;
  #points = [];
  #pointPresenter = new Map();
  #currentSortType = null;
  #sourcedPoints = [];

  constructor (container, pointModel) {
    this.#container = container;
    this.#pointModel = pointModel;
  }

  init() {
    this.#points = [...this.#pointModel.points];
    this.#sourcedPoints = [...this.#pointModel.points];
    if (this.#points.length === 0) {
      this.#renderNoPoints();
    }
    else {
      this.#renderSort();
      this.#renderPointList();
    }
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#sourcedPoints = updateItem( this.#sourcedPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #sortPoint = (sortType) => {
    switch (sortType) {
      case SORTING_COLUMNS[0].type: // day
        this.#points.sort(sortDayPoint);
        break;
      case SORTING_COLUMNS[2].type: //time
        this.#points.sort(sortTimePoint);
        break;
      case SORTING_COLUMNS[3].type: //price
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
    const pointPresenter = new PointPresenter(this.#tripListView.element, this.#pointModel, this.#handlePointChange, this.#handleModeChange);
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


