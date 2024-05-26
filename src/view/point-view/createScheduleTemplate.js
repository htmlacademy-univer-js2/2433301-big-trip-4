import { formatStringToDateTime, formatStringToTime, getPointDuration } from "../../utils";

export default function createScheduleTemplate({dateFrom, dateTo}) {
  return `
  <div class="event__schedule">
  <p class="event__time">
    <time class="event__start-time" datetime="${formatStringToDateTime(dateFrom)}">${formatStringToTime(dateFrom)}</time>
    &mdash;
    <time class="event__end-time" datetime="${formatStringToDateTime(dateTo)}">${formatStringToTime(dateTo)}</time>
  </p>
  <p class="event__duration">${getPointDuration(dateFrom, dateTo)}</p>
</div>`
}
