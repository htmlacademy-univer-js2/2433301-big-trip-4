import {getRandomTown} from '../mock/offer-point-town.js';
import {DESTINATIONS} from '../mock/offer-point-town.js';

export default class TownModel {
  #towns = Array.from({length: DESTINATIONS.length}, getRandomTown);

  getTowns() {
    return this.#towns;
  }
}
