export const DESTINATION_COUNT = 5;
export const POINT_COUNT = 5;
export const OFFER_COUNT = 9;

export const TYPES = [
  "taxi",
  "bus",
  "train",
  "ship",
  "drive",
  "flight",
  "check-in",
  "sightseeing",
  "restaurant"
];

export const DEFAULTYPE = "flight";

export const POINT_EMPTY = {
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: null,
  isFavorite: false,
  offers: [],
  type: DEFAULTYPE
}
