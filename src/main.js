import BoardPresenter from "./presenter/board-presenter";
import { RenderPosition, render } from "./render";
import ListFilterView from "./view/list-filter-view/list-filter-view";
import TripInfoView from "./view/trip-info-view/trip-info-view";

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.main__control');
const filterElementContainer = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
const tripMainElement = document.querySelector('.trip-main');
const boardPresenter = new BoardPresenter(tripEventsElement);

render(new ListFilterView(), filterElementContainer);
render(new TripInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);
boardPresenter.init(tripEventsElement);
