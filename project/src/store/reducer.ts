import {createReducer} from '@reduxjs/toolkit';
import { Camera } from '../types/camera';
import { Promo } from '../types/promo';
import { getCameras, getPromo, changeCurrentPage, getCamera, getSimilarCameras, changeCurrentSliderPage } from './actions';

type InitialState = {
  cameras: Camera[];
  promo: Promo;
  currentPage: number;
  camera: Camera | null;
  similarCameras: Camera[];
  currentSliderPage: number;
}

const initialState: InitialState = {
  cameras: [],
  promo: {} as Promo,
  currentPage: 1,
  camera: null,
  similarCameras: [],
  currentSliderPage: 1,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getCameras, (state, action) => {
      const { cameras } = action.payload;
      state.cameras = cameras;
    })
    .addCase(getPromo, (state, action) => {
      const { promo } = action.payload;
      state.promo = promo;
    })
    .addCase(changeCurrentPage, (state, action) => {
      const { currentPage } = action.payload;
      state.currentPage = currentPage;
    })
    .addCase(getCamera, (state, action) => {
      const { camera } = action.payload;
      state.camera = camera;
    })
    .addCase(getSimilarCameras, (state, action) => {
      const { similarCameras } = action.payload;
      state.similarCameras = similarCameras;
    })
    .addCase(changeCurrentSliderPage, (state, action) => {
      const { currentSliderPage } = action.payload;
      state.currentSliderPage = currentSliderPage;
    });
});

export { reducer };
