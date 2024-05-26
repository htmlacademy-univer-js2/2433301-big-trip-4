import { Filter } from '../utils.js';

function generateFilter(points) {
  return Object.entries(Filter).map(
    ([filterType, filterPoints]) => ({
      type: filterType,
      exists: points.some(filterPoints)
    })
  );
}

export {generateFilter};
