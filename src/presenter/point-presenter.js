import CurrentFormView from '../view/current-form-view.js';
import TripPointView from '../view/trip-point-view.js';
import { render, replace, remove, } from '../framework/render.js';
import { Mode } from '../const.js';
import { isEscapeButton } from '../utils.js';


export default class PointPresenter {
  #changeData = null;
  #changeMode = null;
  #container = null;
  #point = null;
  #pointModel = null;
  #mode = Mode.DEFAULT;
  #formElement = null;
  #pointElement = null;

  #previewPointComponent = null;
  #editingPointComponent = null;
  #pointsModel = null;

  #destinations = null;
  #offers = null;


  constructor (container, onDataChange, onModeChange) {
    this.#container = container;
    this.#changeData = onDataChange;
    this.#changeMode = onModeChange;
  }

  init(point) {
    this.#point = point;

    const prevPreviewPointComponent = this.#previewPointComponent;
    const prevEditingPointComponent = this.#editingPointComponent;

    this.#previewPointComponent = new TripPointView(this.#point); //, onFavouriteClick: this.#handleFavouriteClick});
    this.#editingPointComponent = new CurrentFormView(this.#point);

    this.#previewPointComponent.setEditClickHandler(this.#handleEditClick);
    this.#previewPointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#editingPointComponent.setPreviewClickHandler(this.#handlePreviewClick);
    this.#editingPointComponent.setFormSubmitHandler(this.#handleFormSubmit);

    if (prevPreviewPointComponent === null || prevEditingPointComponent === null) {
      render(this.#previewPointComponent, this.#container);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#previewPointComponent, prevPreviewPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editingPointComponent, prevEditingPointComponent);
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

  #escKeyDownHandler = (evt) => {
    if (isEscapeButton) {
      evt.preventDefault();
      this.#replaceEditingPointToPreviewPoint();
    }
  };

  #handleFavoriteClick = () => {
    this.#changeData({...this.#point, isFavorite: !this.#point.isFavorite});
  };

  #handleEditClick = () => {
    this.#replacePreviewPointToEditingPoint();
  };

  #handlePreviewClick = (evt) => {
    evt.preventDefault();
    this.#replaceEditingPointToPreviewPoint();
  };

  #handleFormSubmit = (point) => {
    this.#changeData(point);
    this.#replaceEditingPointToPreviewPoint();
  };
}
