import { getRandomValueFromArray } from "../utils";
import { CITIES, DESCRIPTION } from "./const";

function generateDestination() {
  const city = getRandomValueFromArray(CITIES)

  return {
    id: crypto.randomUUID(),
    name: city,
    description: DESCRIPTION,
    pictures: [
      {
        src: `https://loremflickr.com/300/200/?randoms=${crypto.randomUUID()}`,
        description: `${city} DESCRIPTION`
      }
    ]
  };
}

export { generateDestination }
