import AbstractView from '../framework/view/abstract-view.js';
import {getDuration, humanizePointDueDate, getTime} from '../utils.js';

const createTripPointTemplate = (point, destinations, offers) =>
  `li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime=${point.dateFrom}>${humanizePointDueDate(point.dateFrom)}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${point.type.toLowerCase()}.png" alt="Event ${point.type} icon">
      </div>
      <h3 class="event__title">${point.type} ${destinations[point.destinationId].name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${point.dateFrom}">${getTime(point.dateFrom)}</time>
          &mdash;
          <time class="event__end-time" datetime="${point.dateTo}">${getTime(point.dateTo)}</time>
        </p>
        <p class="event__duration">${getDuration(point.dateFrom, point.dateTo)}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${point.basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${offers.find((offer) => offer.type === point.type).offers.map((offer) => {
    if (point.offerIds.includes(offer.id)) {
      return `<li class="event__offer">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </li>`;
    }}).join('')}
      </ul>
      <button class="event__favorite-btn ${point.isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </div>
  </li>`;

export default class TripPointView extends AbstractView{
  #point = null;
  #destination = null;
  #offers = null;

  constructor (point, destination, offers) {
    super();
    this.#point = point;
    this.#destination = destination;
    this.#offers = offers;
  }

  get template() {
    return createTripPointTemplate(this.#point, this.#destination, this.#offers);
  }

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };
}
