import FormEditView from '../view/form-edit-view.js';
import TripPointView from '../view/trip-point-view.js';
import { render, replace, remove, } from '../framework/render.js';
import { Mode } from '../const.js';
import { isEscapeButton } from '../utils.js';


export default class PointPresenter {
  #changeData = null;
  #changeMode = null;
  #container = null;
  #pointsModel = null;
  #destinations = null;
  #offers = null;
  #point = null;
  #previewPointComponent = null;
  #editingPointComponent = null;
  #mode = Mode.DEFAULT;

  constructor (container, pointsModel, onDataChange, onModeChange) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#changeData = onDataChange;
    this.#changeMode = onModeChange;
  }

  init(point) {
    this.#point = point;
    this.#destinations = [...this.#pointsModel.destinations];
    this.#offers = [...this.#pointsModel.offers];
    const prevPreviewPointComponent = this.#previewPointComponent;
    const prevEditingPointComponent = this.#editingPointComponent;

    this.#previewPointComponent = new TripPointView(this.#point, this.#destinations, this.#offers);
    this.#editingPointComponent = new FormEditView(this.#point, this.#destinations, this.#offers);
    this.#previewPointComponent.setEditClickHandler(this.#handleEditClick);
    this.#previewPointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#editingPointComponent.setPreviewClickHandler(this.#handlePreviewClick);
    this.#editingPointComponent.setFormSubmitHandler(this.#handleFormSubmit);

    if (prevPreviewPointComponent === null || prevEditingPointComponent === null) {
      render(this.#previewPointComponent, this.#container);
      return;
    }

    switch (this.#mode) {
      case Mode.DEFAULT:
        replace(this.#previewPointComponent, prevPreviewPointComponent);
        break;
      case Mode.EDITING:
        replace(this.#editingPointComponent, prevEditingPointComponent);
        break;
    }

    remove(prevPreviewPointComponent);
    remove(prevEditingPointComponent);
  }

  destroy = () => {
    remove(this.#previewPointComponent);
    remove(this.#editingPointComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#editingPointComponent.reset(this.#point);
      this.#replaceEditingPointToPreviewPoint();
    }
  };

  #escKeyDownHandler = (evt) => {
    if (isEscapeButton(evt)) {
      evt.preventDefault();
      this.#editingPointComponent.reset(this.#point);
      this.#replaceEditingPointToPreviewPoint();
    }
  };

  #replacePreviewPointToEditingPoint = () => {
    replace(this.#editingPointComponent, this.#previewPointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceEditingPointToPreviewPoint = () => {
    replace(this.#previewPointComponent, this.#editingPointComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };

  #handleFormSubmit = (point) => {
    this.#changeData(point);
    this.#replaceEditingPointToPreviewPoint();
  };

  #handleFavoriteClick = () => {
    this.#changeData({...this.#point, isFavorite: !this.#point.isFavorite});
  };

  #handleEditClick = () => {
    this.#replacePreviewPointToEditingPoint();
  };

  #handlePreviewClick = () => {
    this.#editingPointComponent.reset(this.#point);
    this.#replaceEditingPointToPreviewPoint();
  };
}
