import {store} from '../store/index';
import { Camera } from './camera';
import { Promo } from './promo';
import { Review } from './review';

export type CatalogData = {
  isCatalogDataLoaded: boolean;
  cameras: Camera[];
  promo: Promo;
  currentPage: number;
};

export type ProductData = {
  camera: Camera | null;
  similarCameras: Camera[];
  reviews: Review[];
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
