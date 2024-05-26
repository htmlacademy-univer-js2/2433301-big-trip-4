import dayjs from 'dayjs';

const HOUR_MINUTES_COUNT = 60;
const TOTAL_DAY_MINUTES_COUNT = 1440;
const DAY_HOUR = 12;
const DAYS_MONTH = 31;
const DATE_FORMAT = 'YYYY-MM-DD';
const DATE_TIME_FORMAT = 'DD/MM/YY hh:mm';
const TIME_FORMAT = 'hh:mm';
let date = dayjs().subtract(getRandomValue(0, DAYS_MONTH), 'day').toDate();

function getRandomValue (minimum = 1, maximum = 1000) { //нужно всплытие
  return Math.floor(Math.random() * (maximum - minimum) + minimum);
}

const getDate = ({flag}) => {
  const minsGap = getRandomValue(0, HOUR_MINUTES_COUNT - 1);
  const hoursGap = getRandomValue(0, DAY_HOUR - 1);
  if (flag) {
    date = dayjs(date).add(minsGap, 'minute').add(hoursGap, 'hour').toDate();
  }
  return date;
};

const getDuration = (dateFrom, dateTo) => {
  const diff = dayjs(dateTo).diff(dayjs(dateFrom), 'm');
  if (Math.ceil(diff / TOTAL_DAY_MINUTES_COUNT) > 1){
    return `${Math.ceil(diff / TOTAL_DAY_MINUTES_COUNT)} D`;
  }
  if (Math.ceil(diff / HOUR_MINUTES_COUNT) > 1){
    return `${Math.ceil(diff / HOUR_MINUTES_COUNT)} H`;
  }
  return `${Math.ceil(diff)} M`;
};

const getTime = (dt) => dayjs(dt).format(TIME_FORMAT);

const getOnlyDate = (dt) => dayjs(dt).format(DATE_FORMAT);

const getMonthAndDate = (dt) => dayjs(dt).format('MMM DD');

const getFullDate = (dt) => dayjs(dt).format(DATE_TIME_FORMAT);

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

export {getRandomArrayElement, getRandomValue, getDate, getDuration, getTime, getOnlyDate, getMonthAndDate, getFullDate};
