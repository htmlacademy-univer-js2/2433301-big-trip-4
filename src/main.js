import { render } from './framework/render.js';
import Presenter from './presenter/presenter.js';
import PointModel from './model/point-model.js';
import { generateFilter } from './mock/filters.js';
import FiltersView from './view/filters-view.js';


const filtersContainer = document.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.trip-events');
const pointModel = new PointModel();
const tripPresenter = new Presenter(tripContainer, pointModel);
tripPresenter.init();
const filters = generateFilter(pointModel.points);

render(new FiltersView(filters), filtersContainer);
