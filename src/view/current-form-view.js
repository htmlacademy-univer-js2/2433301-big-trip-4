import AbstractView from '../framework/view/abstract-view.js';
import {POINT_TYPES, DESTINATIONS, OFFERS, IMAGES} from '../mock/offer-point-town.js';
import { getRandomValue, getFullDate } from '../utils.js';

const isChecked = (offers, title) => {
  let check = false;
  offers.forEach((offer) => {
    if (offer.title === title) {
      check = true;
      return check;
    }
  });
  return check ? 'checked' : '';
};

const createCurrentFormTemplate = (point) =>
  `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${point.type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
                ${POINT_TYPES.map((type) => `<div class="event__type-item">
                <input id="event-type-${type.toLowerCase()}-1" class="event__${type.toLowerCase()}-input  visually-hidden" type="radio" name="event-type" value="${type.toLowerCase()}">
                <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-1">${type}</label>
              </div>`).join('')};
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${point.type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${point.destination.name}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${DESTINATIONS.map((town) => `<option value="${town}"></option>`).join('')};
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getFullDate(point.dateFrom)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getFullDate(point.dateTo)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
        </div>

      <button class="event__reset-btn" type="reset">Cancel</button>'
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
          ${OFFERS.map((offer) => `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.toLowerCase()}-1" type="checkbox" name="event-offer-${offer.toLowerCase()}" ${isChecked(point.offers, offer)}>
          <label class="event__offer-label" for="event-offer-${offer.toLowerCase()}-1">
            <span class="event__offer-title">${offer}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${getRandomValue()}</span>
          </label>
        </div>`).join('')};

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${point.description}</p>

          <div class="event__photos-container">
            <div class="event__photos-tape">
            ${IMAGES.map((img) => `<img class="event__photo" src="${img}.jpg" alt="Event photo">`).join('')};
            </div>
          </div>
        </section>
      </section>
    </form>
  </li>
`;

export default class CurrentFormView extends AbstractView{
  #point = null;
  #handleSubmit = null;

  constructor ({data, onSubmit}) {
    super();
    this.#point = data;
    this.#handleSubmit = onSubmit;
    this.element.querySelector('form').addEventListener('submit', this.#submitHandler);
  }

  get template() {
    return createCurrentFormTemplate(this.#point);
  }

  #submitHandler = (evt) => {
    evt.preventDefault();
    this.#handleSubmit();
  };
}
