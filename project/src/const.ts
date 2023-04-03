export enum AppRoute {
  Catalog = '/',
  CatalogFilter = '/?:query',
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

export const CURRENCY_RUB = 'RUB';

type Adapter = Record<string, string>;
export const USER_REVIEW: Adapter = {
  'user-name': 'userName',
  'user-plus': 'advantage',
  'user-minus': 'disadvantage',
  'user-comment': 'review',
  'rate': 'rating',
};

export enum NameSpace {
  Catalog = 'CATALOG',
  Product = 'PRODUCT',
  Search = 'SEARCH',
}

export enum SortType {
  Price = 'price',
  Rating = 'rating',
}

export enum OrderType {
  Asc = 'asc',
  Desc = 'desc',
}

export enum Categories {
  Photocamera = 'photocamera',
  Videocamera = 'videocamera',
}

export const CATEGORIES = [
  'photocamera',
  'videocamera',
];

type Translation = Record<string, string>;

export const CATEGORIES_OPTIONS: Translation = {
  'photocamera': 'Фотокамера',
  'videocamera': 'Видеокамера',
};

export enum CamerasTypes {
  Digital = 'digital',
  Film = 'film',
  Snapshot = 'snapshot',
  Collection = 'collection',
}

export const TYPES = [
  'digital',
  'film',
  'snapshot',
  'collection',
];

export const TYPES_OPTIONS: Translation = {
  'digital': 'Цифровая',
  'film': 'Плёночная',
  'snapshot': 'Моментальная',
  'collection': 'Коллекционная',
};

export enum CamerasLevel {
  Zero = 'zero',
  NonProfessional = 'non-professional',
  Professional = 'professional',
}

export const LEVELS = [
  'zero',
  'non-professional',
  'professional',
];

export const LEVEL_OPTIONS: Translation = {
  'zero': 'Нулевой',
  'non-professional': 'Любительский',
  'professional': 'Профессиональный',
};
