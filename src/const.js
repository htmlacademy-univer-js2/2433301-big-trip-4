const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const SORTING_COLUMNS = [
  {
    type: 'day',
    label: 'Day',
    active: true,
    defaultSelected: true,
  },
  {
    type: 'event',
    label: 'Event',
    active: false,
  },
  {
    type: 'time',
    label: 'Time',
    active: true,
  },
  {
    type: 'price',
    label: 'Price',
    active: true,
  },
  {
    type: 'offer',
    label: 'Offer',
    active: false,
  },
];

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export {FilterType, SORTING_COLUMNS, Mode};
