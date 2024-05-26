import {getRandomPoint} from '../mock/offer-point-town.js';
import { OFFERS, POINTS_COUNT } from '../mock/offer-point-town.js';
import {getRandomArrayElement, getRandomValue} from '../utils.js';
import TownModel from '../model/town-model.js';
import OfferModel from '../model/offer-model.js';

export default class PointModel {
  #townModel = new TownModel();
  #towns = this.#townModel.getTowns();

  #points = Array.from({length: POINTS_COUNT}, () => {
    const offerModel = new OfferModel(getRandomValue(0, OFFERS.length));
    const offers = offerModel.getOffers();
    const town = getRandomArrayElement(this.#towns);
    const point = (getRandomPoint(town, offers));
    return point;
  });

  get points() {
    return this.#points;
  }
}

