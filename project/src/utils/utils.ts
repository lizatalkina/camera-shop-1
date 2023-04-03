import { CatalogData } from '../types/state';
import queryString from 'query-string';

export const makeQueryString = (catalogData: CatalogData): string => {
  const filterSortingData = {
    // eslint-disable-next-line camelcase
    price_gte: catalogData.price,
    // eslint-disable-next-line camelcase
    price_lte: catalogData.priceUp,
    category: catalogData.category,
    types: Object.assign([], catalogData.types),
    levels: Object.assign([], catalogData.levels),
    _sort: catalogData.sort,
    _order: catalogData.order,
  };
  const queryParams = queryString.stringify(filterSortingData, {
    skipEmptyString: true,
    skipNull: true
  });
  return queryParams;
};
