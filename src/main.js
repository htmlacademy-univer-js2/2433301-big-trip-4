import Presenter from './presenter/presenter.js';
import PointModel from './model/point-model.js';

const tripEventsElement = document.querySelector('.trip-events');
const pointModel = new PointModel();
const tripPresenter = new Presenter({
  container: tripEventsElement,
  pointModel
});

tripPresenter.init();
