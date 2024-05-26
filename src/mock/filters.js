import { Filter } from '../utils.js';

function generateFilter(points) {
  return Object.entries(Filter).map(
    ([filterName, filterPoints]) => ({
      name: filterName,
      count: filterPoints(points).length > 0,
    })
  );
}

export { generateFilter };
