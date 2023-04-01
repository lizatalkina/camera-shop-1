import {store} from '../store/index';
import { Camera } from './camera';
import { Promo } from './promo';
import { Review } from './review';
import { Categories, CamerasTypes, CamerasLevel, OrderType, SortType } from '../const';

export type CatalogData = {
  isCatalogDataLoaded: boolean;
  cameras: Camera[];
  promo: Promo;
  currentPage: number;
  price: number;
  priceUp: number;
  category: Categories;
  types: CamerasTypes[];
  levels: CamerasLevel[];
  sort: SortType;
  order: OrderType;
};

export type ProductData = {
  camera: Camera | null;
  similarCameras: Camera[];
  reviews: Review[];
}

export type SearchData = {
  camerasSearch: Camera[];
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
