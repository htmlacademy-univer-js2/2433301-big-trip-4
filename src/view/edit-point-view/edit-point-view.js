import { POINT_EMPTY } from "../../const";
import { createElement } from "../../render";
import createEditPointTemplate from "./create-edit-point-template";

export default class EditPointView {
  constructor({point = POINT_EMPTY, pointDestinations, pointOffers}) {
    this.point = point;
    this.pointDestinations = pointDestinations;
    this.pointOffers = pointOffers;
  }

  getTemplate() {
    return createEditPointTemplate({
      point: this.point,
      pointDestinations: this.pointDestinations,
      pointOffers: this.pointOffers
    });
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}