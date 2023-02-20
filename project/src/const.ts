export enum AppRoute {
  Catalog = '/',
  CatalogPage = '/page-:id',
  Product = '/catalog/:id/:type',
  Basket = '/basket',
}

export enum APIRoute {
  Cameras = '/cameras',
  Promo = '/promo',
  SimilarCameras = '/cameras/:id/similar',
  Reviews = '/cameras/:id/reviews',
  SendReview = '/reviews',
}

export const PAGE_SIZE = 9;

export const STARS_COUNT = 5;

export const REVIEWS_MAX_COUNT = 3;

type Adapter = Record<string, string>;
export const USER_REVIEW: Adapter = {
  'user-name': 'userName',
  'user-plus': 'advantage',
  'user-minus': 'disadvantage',
  'user-comment': 'review',
  'rate': 'rating',
};
