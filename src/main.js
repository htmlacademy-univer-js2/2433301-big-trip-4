import TripInfoView from './view/trip-info-view.js';
import FiltersView from './view/filters-view.js';
import { RenderPosition, render } from './render.js';
import Presenter from './presenter/presenter.js';
import PointModel from './model/point-model.js';

const pageMainElement = document.querySelector('.trip-main');
const filterElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const pointModel = new PointModel();

render(new TripInfoView(), pageMainElement, RenderPosition.AFTERBEGIN);
render(new FiltersView(), filterElement);

const tripPresenter = new Presenter({
  container: tripEventsElement,
  pointModel
});

tripPresenter.init();
