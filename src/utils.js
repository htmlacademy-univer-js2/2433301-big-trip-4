import dayjs from 'dayjs';
import { FilterType } from './const.js';

const HOUR_MINUTES_COUNT = 60;
const TOTAL_DAY_MINUTES_COUNT = 1440;
const DAY_HOUR = 12;
const DAYS_MONTH = 31;
const DATE_FORMAT = 'YYYY-MM-DD';
const DATE_TIME_FORMAT = 'DD/MM/YY hh:mm';
const TIME_FORMAT = 'hh:mm';
let date = dayjs().subtract(getRandomValue(0, DAYS_MONTH), 'day').toDate();

//Random
function getRandomValue (minimum = 1, maximum = 1000) { //нужно всплытие
  return Math.floor(Math.random() * (maximum - minimum) + minimum);
}

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];


//Date
const getTempDate = ({flag}) => {
  const minsGap = getRandomValue(0, HOUR_MINUTES_COUNT - 1);
  const hoursGap = getRandomValue(0, DAY_HOUR - 1);
  if (flag) {
    date = dayjs(date).add(minsGap, 'minute').add(hoursGap, 'hour').toDate();
  }
  return date;
};

const getDaysOutput = (days) => days <= 0 ? '' : `${`${days}`.padStart(2, '0')}D`;

const getHoursOutput = (days, restHours) => (days <= 0 && restHours <= 0) ? '' : `${`${restHours}`.padStart(2, '0')}H`;

const getMinutesOutput = (restMinutes) => `${`${restMinutes}`.padStart(2, '0')}M`;

const getDuration = (dateFrom, dateTo) => {
  const start = dayjs(dateFrom);
  const end = dayjs(dateTo);
  const difference = end.diff(start, 'minute');

  const days = Math.trunc(difference / TOTAL_DAY_MINUTES_COUNT);
  const restHours = Math.trunc((difference - days * TOTAL_DAY_MINUTES_COUNT) / HOUR_MINUTES_COUNT);
  const restMinutes = difference - (days * TOTAL_DAY_MINUTES_COUNT + restHours * HOUR_MINUTES_COUNT);

  const daysOutput = getDaysOutput(days);
  const hoursOutput = getHoursOutput(days, restHours);
  const minutesOutput = getMinutesOutput(restMinutes);

  return `${daysOutput} ${hoursOutput} ${minutesOutput}`;
};

const getTime = (dt) => dayjs(dt).format(TIME_FORMAT);
const getDate = (dt) => dayjs(dt).format(DATE_FORMAT);
const getDateTime = (dt) => dayjs(dt).format(DATE_TIME_FORMAT);
const humanizePointDueDate = (dt) => dayjs(dt).format('DD MMM');


//Filter
const Filter = {
  [FilterType.EVERYTHING] : (points) => points,
  [FilterType.FUTURE] : (points) => dayjs().isBefore(dayjs(points.dateFrom)),
  [FilterType.PAST] : (points) => dayjs().isAfter(dayjs(points.dateTo)),
  [FilterType.PRESENT] : (points) => dayjs().isAfter(dayjs(points.dateFrom)) && dayjs().isBefore(dayjs(points.dateTo))
};


//Sorting
const sortPricePoint = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

const sortDayPoint = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));

const sortTimePoint = (pointA, pointB) => {
  const timePointA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const timePointB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));
  return timePointB - timePointA;
};


//Other
const isEscapeButton = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);

const capitalizeString = (string) => {
  const capFirstString = string[0].toUpperCase();
  const restOfString = string.slice(1);
  return capFirstString + restOfString;
};

export {getRandomArrayElement, getRandomValue, getTempDate, getDuration, getTime, getDate, humanizePointDueDate, getDateTime, Filter, isEscapeButton, updateItem,
  sortDayPoint, sortPricePoint, sortTimePoint, capitalizeString};
