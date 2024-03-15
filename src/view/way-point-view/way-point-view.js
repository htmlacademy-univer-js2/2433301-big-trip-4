import { createElement } from "../../render";
import createWayPointTemplate from "./create-way-point-template";

export default class WayPointView {
  getTemplate() {
    return createWayPointTemplate();
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
