import { render } from "../render";
import EditPointView from "../view/edit-point-view/edit-point-view";
import EventsListView from "../view/events-list-view/events-list-view";
import ListSortView from "../view/list-sort-view/list-sort-view";
import WayPointView from "../view/way-point-view/way-point-view";

export default class BoardPresenter {
  listSortComponent = new ListSortView();
  eventsListComponent = new EventsListView();

  constructor(boardContainer) {
    this.container = boardContainer;
  }

  init() {
    render(this.listSortComponent, this.container)
    render(this.eventsListComponent, this.container);
    render(new EditPointView(), this.eventsListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new WayPointView(), this.eventsListComponent.getElement());
    }
  }
}
