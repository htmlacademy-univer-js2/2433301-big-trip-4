import { createElement } from "../../render";
import createListSortTemplate from "./create-list-sort-template";

export default class ListSortView {
  getTemplate() {
    return createListSortTemplate();
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
