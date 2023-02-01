import {createReducer} from '@reduxjs/toolkit';
import { Camera } from '../types/camera';
import { getCameras } from './actions';

type InitialState = {
  cameras: Camera[];
}

const initialState: InitialState = {
  cameras: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getCameras, (state, action) => {
      const { cameras } = action.payload;
      state.cameras = cameras;
    });
});

export { reducer };
