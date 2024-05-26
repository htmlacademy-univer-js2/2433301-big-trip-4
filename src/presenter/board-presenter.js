import { render } from "../render";
import EditPointView from "../view/edit-point-view/edit-point-view";
import EventsListView from "../view/events-list-view/events-list-view";
import ListSortView from "../view/list-sort-view/list-sort-view";
import PointView from "../view/point-view/point-view";

export default class BoardPresenter {
  listSortComponent = new ListSortView();
  eventsListComponent = new EventsListView();

  constructor({container, destinationsModel, offersModel, pointsModel}) {
    this.container = container;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
    this.pointsModel = pointsModel;
    this.points = [...pointsModel.get()];
  }

  init() {
    render(this.listSortComponent, this.container)
    render(this.eventsListComponent, this.container);

    render(new EditPointView({
      point: this.points[0],
      pointDestinations: this.destinationsModel.get(),
      pointOffers: this.offersModel.get()}
      ),
      this.eventsListComponent.getElement());

    this.points.forEach(point => {
      render(
        new PointView({
          point,
          pointDestination: this.destinationsModel.getById(point.destination),
          pointOffers: this.offersModel.getByType(point.type)
        }),
        this.eventsListComponent.getElement()
      )
    })
  }
}
