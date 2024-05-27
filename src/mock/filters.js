import { Filter } from '../utils.js';

const generateFilter = (points) => Object.entries(Filter).map(
  ([filterName, filterPoints]) => ({
    name: filterName,
    count: filterPoints(points).length > 0,
  })
);

export { generateFilter };
