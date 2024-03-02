import { createElement } from "../../render";
import createEditPointTemplate from "./create-edit-point-template";

export default class EditPointView {
  getTemplate() {
    return createEditPointTemplate();
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
