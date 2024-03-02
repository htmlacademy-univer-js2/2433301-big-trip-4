import { createElement } from "../../render";
import createTripInfoTemplate from "./create-trip-info-template";

export default class TripInfoView{
  getTemplate() {
    return createTripInfoTemplate();
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
