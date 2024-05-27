import TownModel from '../model/town-model.js';
import OfferModel from '../model/offer-model.js';

export default class PointModel {
  #points = [];
  #town = new TownModel().towns;
  #offers = new OfferModel().offers;

  init(points) {
    this.#points = points;
  }

  get points() {
    return this.#points;
  }

  get destinations() {
    return this.#town;
  }

  get offers() {
    return this.#offers;
  }
}

