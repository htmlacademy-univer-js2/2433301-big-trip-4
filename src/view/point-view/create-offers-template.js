export default function CreateOffersTemplate({pointOffers, offers, point}) {
  return pointOffers.offers.filter(offItem => point.offers.includes(offItem.id)).map(offer => `
  <li class="event__offer">
  <span class="event__offer-title">${offer.title}</span>
  &plus;&euro;&nbsp;
  <span class="event__offer-price">${offer.price}</span>
</li>
  `);
}
