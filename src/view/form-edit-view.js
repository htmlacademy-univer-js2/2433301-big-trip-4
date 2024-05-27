import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { POINT_TYPES } from '../const.js';
import { getDateTime } from '../utils.js';
import { capitalizeString } from '../utils.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import dayjs from 'dayjs';

const createCurrentFormTemplate = (point, destinations, offers) =>
  `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${point.type}.png" alt="Event ${point.type} icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${POINT_TYPES.map((type) => `<div class="event__type-item">
              <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${point.type === type ? 'checked' : ''}>
              <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${capitalizeString(type)}</label>
              </div>`).join('')}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-${point.destinationId}">
            ${point.type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination-${point.destinationId}" value="${destinations[point.destinationId].name}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${destinations.map((town) => `<option value="${town.name}"></option>`).join('')};
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getDateTime(point.dateFrom)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getDateTime(point.dateTo)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
        </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
          ${offers.find((offer) => offer.type === point.type).offers.map((offer) => {
    const checked = point.offerIds.includes(offer.id) ? 'checked' : '';
    return `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}" type="checkbox" name="event-offer-luggage" ${checked}>
      <label class="event__offer-label" for="event-offer-${offer.id}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`;}).join('')}
          </div>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${destinations[point.destinationId].description}</p>

          <div class="event__photos-container">
            <div class="event__photos-tape">
            ${destinations[point.destinationId].photos.map((img) => `<img class="event__photo" src="${img}.jpg" alt="Event photo">`).join('')};
            </div>
          </div>
        </section>
      </section>
    </form>
  </li>
`;

export default class FormEditView extends AbstractStatefulView{
  #destinations = null;
  #offers = null;
  #datepicker = null;

  constructor (point, destinations, offers) {
    super();
    this._state = this.parsePointToState(point);
    this.#destinations = destinations;
    this.#offers = offers;
    this.#setInnerHandlers();
    this.#setDatepickerFrom();
    this.#setDatepickerTo();
  }

  get template() {
    return createCurrentFormTemplate(this._state, this.#destinations, this.#offers);
  }

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setPreviewClickHandler(this._callback.previewClick);
    this.#setDatepickerFrom();
    this.#setDatepickerTo();
  };

  #pointDateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #pointDateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  #pointPriceChangeHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: evt.target.value,
    });
  };

  #setDatepickerFrom = () => {
    this.#datepicker = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        maxDate: this._state.dateTo,
        dateFormat: 'd/m/y H:i',
        onChange: this.#pointDateFromChangeHandler,
      },
    );
  };

  #setDatepickerTo = () => {
    this.#datepicker = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        enableTime: true,
        minDate: this._state.dateFrom,
        dateFormat: 'd/m/y H:i',
        onChange: this.#pointDateToChangeHandler,
      },
    );
  };

  setPreviewClickHandler = (callback) => {
    this._callback.previewClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#previewClickHandler);
  };

  #previewClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.previewClick();
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('.event__save-btn').addEventListener('click', this.#formSubmitHandler);
  };

  #pointDestinationChangeHandler = (evt) => {
    evt.preventDefault();
    const destination = this.#destinations.filter((dest) => dest.name === evt.target.value);
    this.updateElement({
      destinationId: destination[0].id,
    });
  };

  #pointTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offerIds: [],
    });
  };

  #offersChangeHandler = (evt) => {
    evt.preventDefault();
    if (this._state.offerIds.includes(Number(evt.target.id.slice(-1)))) {
      this._state.offerIds = this._state.offerIds.filter((n) => n !== Number(evt.target.id.slice(-1)));
    }
    else {
      this._state.offerIds.push(Number(evt.target.id.slice(-1)));
    }
    this.updateElement({
      offerIds: this._state.offerIds,
    });
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(this.parseStateToPoint(this._state));
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-list').addEventListener('change', this.#pointTypeChangeHandler);
    this.element.querySelector('.event__input').addEventListener('change', this.#pointDestinationChangeHandler);
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#offersChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#pointPriceChangeHandler);
  };

  parsePointToState = (point) => ({...point,
    dateTo: dayjs(point.dateTo).toDate(),
    dateFrom: dayjs(point.dateFrom).toDate()});

  parseStateToPoint = (state) => {
    const point = {...state};
    return point;
  };

  reset = (point) => {
    this.updateElement(
      this.parsePointToState(point),
    );
  };
}
