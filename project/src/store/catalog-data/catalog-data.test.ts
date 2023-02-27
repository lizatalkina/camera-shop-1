import { catalogData, changeCurrentPage } from './catalog-data';
import { Promo } from '../../types/promo';
import { makeFakeCamera, makeFakePromo } from '../../utils/mocks';
import { fetchCamerasAction, fetchPromoAction } from '../api-actions';

const cameras = Array.from({length: 20}, () => makeFakeCamera());
const promo = makeFakePromo();

describe('Reducer: catalogData', () => {

  it('without additional parametrs should return initial state', () => {
    expect(catalogData.reducer(undefined, {type: 'UNKNOW_ACTION'}))
      .toEqual({
        isCatalogDataLoaded: false,
        cameras: [],
        promo: {} as Promo,
        currentPage: 1,});
  });
  it('should update cameras by load cameras', () => {
    const state = {
      cameras: [],
      isCatalogDataLoaded: false,
      promo: {} as Promo,
      currentPage: 1};
    expect(catalogData.reducer(state, {type: fetchCamerasAction.fulfilled.type, payload: cameras}))
      .toEqual({
        isCatalogDataLoaded: false,
        cameras,
        promo: {} as Promo,
        currentPage: 1});
  });
  it('should update promo by load promo', () => {
    const state = {
      cameras: [],
      isCatalogDataLoaded: false,
      promo: {} as Promo,
      currentPage: 1};
    expect(catalogData.reducer(state, {type: fetchPromoAction.fulfilled.type, payload: promo}))
      .toEqual({
        isCatalogDataLoaded: false,
        cameras: [],
        promo,
        currentPage: 1});
  });

  it('should update current page by change page', () => {
    const state = {
      cameras: [],
      isCatalogDataLoaded: false,
      promo: {} as Promo,
      currentPage: 1};
    expect(catalogData.reducer(state, changeCurrentPage(3)))
      .toEqual({
        isCatalogDataLoaded: false,
        cameras: [],
        promo: {} as Promo,
        currentPage: 3});
  });
});
