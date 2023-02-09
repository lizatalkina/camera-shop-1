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
}

export const PAGE_SIZE = 9;

export const STARS_COUNT = 5;
