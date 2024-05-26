import AbstractView from '../framework/view/abstract-view';

function createSaveButtonTemplate() {
  return '<button class="event__save-btn  btn  btn--blue" type="submit">Save</button>';
}

export default class SaveButtonView extends AbstractView{
  get template() {
    return createSaveButtonTemplate();
  }
}
