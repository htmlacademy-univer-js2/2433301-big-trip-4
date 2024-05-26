import {getRandomOffer} from '../mock/offer-point-town.js';

export default class OfferModel {
  #offers = null;

  constructor(countOffers) {
    this.#offers = Array.from({length: countOffers}, getRandomOffer);
  }

  getOffers() {
    return this.#offers;
  }
}
