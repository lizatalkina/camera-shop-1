export enum AppRoute {
  Catalog = '/',
  CatalogPage = '/page-:id',
  Product = '/catalog/:id',
  Basket = '/basket',
}

export enum APIRoute {
  Cameras = '/cameras',
  Promo = '/promo',
  SimilarCameras = '/cameras/:id/similar',
  Reviews = '/cameras/:id/reviews',
}

export const PAGE_SIZE = 9;

export const STARS_COUNT = 5;

export const REVIEWS_MAX_COUNT = 3;
