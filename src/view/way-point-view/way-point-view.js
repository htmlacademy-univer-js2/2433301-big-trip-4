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
  }

  removeElement() {
    this.element = null;
  }
}
