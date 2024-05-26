import { getRandomInteger } from "../utils";
import { PRICE } from "./const";

function generateOffer(type) {
  return {
    id: crypto.randomUUID(),
    title: `Offer ${type}`,
    price: getRandomInteger(PRICE.MIN, (PRICE.MAX / 10))
  };
}

export {generateOffer};
