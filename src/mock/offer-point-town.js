import {getTempDate, getRandomArrayElement, getRandomValue} from '../utils.js';

const POINTS_COUNT = 5;
const IMAGE_COUNT = 4;
const POINT_TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];
const DESTINATIONS = ['Amsterdam', 'Chamonix', 'Washington', 'Chicago', 'New York', 'Moskow', 'Monaco'];
const OFFERS = ['Add luggage', 'Switch to comfort class', 'Add meal', 'Choose seats', 'Travel by train'];
const DESCRIPTIONS = [
  'Fusce tristique felis at fermentum pharetra.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.'
];
const ElementsCount = {
  MIN: 1,
  MAX: 4
};

const IMAGE_URL = 'https://loremflickr.com/248/152?random=';

const getRandomOffer = () => ({
  'id': crypto.randomUUID(),
  'type': getRandomArrayElement(POINT_TYPES),
  'title': getRandomArrayElement(OFFERS),
  'price': getRandomValue()
});

const getRandomPoint = (destination, offers) => ({
  'id': crypto.randomUUID(),
  'basePrice': getRandomValue(),
  'dateFrom': getTempDate({flag: false}),
  'dateTo': getTempDate({flag: true}),
  'destination': destination,
  'description': destination.description,
  'isFavorite': getRandomArrayElement([0, 1]),
  'offers': offers,
  'type': getRandomArrayElement(POINT_TYPES)
});

const getRandomTown = () => ({
  'id': crypto.randomUUID(),
  'name': getRandomArrayElement(DESTINATIONS),
  'photos': Array.from({length: IMAGE_COUNT}, () => `${IMAGE_URL}${getRandomValue()}`),
  'description': getRandomArrayElement(DESCRIPTIONS).repeat(getRandomValue(ElementsCount.MIN, ElementsCount.MAX))
});

export {getRandomOffer, getRandomPoint, getRandomTown,
  POINTS_COUNT, IMAGE_COUNT, POINT_TYPES, DESTINATIONS, OFFERS, IMAGE_URL};
