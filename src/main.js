import DestinationsModel from "./model/destinations-model";
import OffersModel from "./model/offers-model";
import PointsModel from "./model/points-model";
import BoardPresenter from "./presenter/board-presenter";
import { RenderPosition, render } from "./render";
import MockServie from "./service/mock-service";
import ListFilterView from "./view/list-filter-view/list-filter-view";
import TripInfoView from "./view/trip-info-view/trip-info-view";

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.main__control');
const filterElementContainer = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
const tripMainElement = document.querySelector('.trip-main');

const mockService = new MockServie();
const destinationsModel = new DestinationsModel(mockService);
const offersModel = new OffersModel(mockService);
const pointsModel = new PointsModel(mockService);

const boardPresenter = new BoardPresenter({
  container: tripEventsElement,
  destinationsModel,
  offersModel,
  pointsModel
});

render(new ListFilterView(), filterElementContainer);
render(new TripInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);
boardPresenter.init(tripEventsElement);
