import {createReducer} from '@reduxjs/toolkit';
import { Camera } from '../types/camera';
import { Promo } from '../types/promo';
import { getCameras, getPromo } from './actions';

type InitialState = {
  cameras: Camera[];
  promo: Promo;
}

const initialState: InitialState = {
  cameras: [],
  promo: {} as Promo,
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
    });
});

export { reducer };
