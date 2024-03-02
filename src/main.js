import BoardPresenter from "./presenter/board-presenter";
import ListFilterView from "./view/list-filter-view/list-filter-view";

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.main__control');
const filterElementContainer = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const boardPresenter = new BoardPresenter(tripEventsElement);

render(new ListFilterView(), filterElementContainer);
boardPresenter.init();
