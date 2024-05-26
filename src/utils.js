import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

const MSEC_IN_SEC = 1000
const SEC_IN_MIN = 60
const MIN_IN_HOUR = 60
const HOUR_IN_DAY = 24

const MSEC_IN_HOUR = MSEC_IN_SEC * SEC_IN_MIN * MIN_IN_HOUR
const MSEC_IN_DAY = MSEC_IN_HOUR * HOUR_IN_DAY

function getRandomInteger(a = 0, b = 1) {
  const lower = Math.min(a, b)
  const upper = Math.floor(Math.max(a, b))

  return Math.floor(lower + Math.random() * (upper - lower + 1))
}

function getRandomValueFromArray(items) {
  return items[getRandomInteger(0, items.length - 1)]
}

function formatStringToDateTime(date) {
  return dayjs(date).format("YYYY-MM-DDTHH:mm")
}

function formatStringToShortDate(date) {
  return dayjs(date).format("MMM DD")
}

function formatStringToTime(date) {
  return dayjs(date).format("HH:mm")
}

function capitalize(string) {
  return `${string[0].toUpperCase()}${string.slice(1)}`
}

function getPointDuration(dateFrom, dateTo) {
  const timeDiffInMSEC = dayjs(dateTo).diff(dayjs(dateFrom))
  const duration = dayjs.duration(timeDiffInMSEC)
  const dateFormat = timeDiffInMSEC >= MSEC_IN_DAY ? "DD[D] HH[H]  mm[M]"
    : timeDiffInMSEC >= MSEC_IN_HOUR ? "HH[H] mm[M]"
    : "mm[M]"
  const pointDuration = duration.format(dateFormat)

  return pointDuration
}

function getScheduleDate(date) {
  return dayjs(date).format("DD/MM/YY HH:mm")
}

export {
  getRandomInteger,
  getRandomValueFromArray,
  formatStringToDateTime,
  formatStringToShortDate,
  getPointDuration,
  capitalize,
  getScheduleDate,
  formatStringToTime
}
