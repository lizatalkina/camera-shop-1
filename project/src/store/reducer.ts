import {createReducer} from '@reduxjs/toolkit';
import { Camera } from '../types/camera';
import { Promo } from '../types/promo';
import { getCameras, getPromo, changeCurrentPage } from './actions';

type InitialState = {
  cameras: Camera[];
  promo: Promo;
  currentPage: number;
}

const initialState: InitialState = {
  cameras: [],
  promo: {} as Promo,
  currentPage: 1,
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
    });
});

export { reducer };
