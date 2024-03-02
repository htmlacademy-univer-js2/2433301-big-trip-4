import { createElement } from "../../render";
import createEventsListView from "./create-events-list-view";

export default class EventsListView {
  getTemplate() {
    return createEventsListView();
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
