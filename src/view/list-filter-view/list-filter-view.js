import { createElement } from "../../render";
import createListFilterTemplate from "./create-list-filter-template";

export default class ListFilterView {
  getTemplate() {
    return createListFilterTemplate();
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
