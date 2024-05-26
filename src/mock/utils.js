import dayjs, { duration } from 'dayjs'
import { getRandomInteger } from '../utils'
import { DURATION } from './const'

let date = dayjs().subtract(getRandomInteger(0, DURATION.DAY), 'day').toDate()

function getDate({next}) {
  const minsGap = getRandomInteger(0, DURATION.MIN);
  const hoursGap = getRandomInteger(0, DURATION.HOUR);
  const daysGap = getRandomInteger(0, DURATION.DAY);

  if (next) {
    date = dayjs(date)
      .add(minsGap, "minute")
      .add(hoursGap, "hour")
      .add(daysGap, "day")
      .toDate();
  }

  return date
}

export {getDate}
