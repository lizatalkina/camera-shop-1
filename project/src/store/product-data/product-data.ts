import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { ProductData } from '../../types/state';
import { fetchCameraAction, fetchSimilarCamerasAction, fetchReviewsAction, postReview } from '../api-actions';

const initialState: ProductData = {
  camera: null,
  similarCameras: [],
  reviews: [],
};

export const productData = createSlice({
  name: NameSpace.Product,
  initialState,
  reducers: {
    setInitialProductState: (state) => {
      state.camera = null;
      state.similarCameras = [];
      state.reviews = [];
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCameraAction.fulfilled, (state, action) => {
        state.camera = action.payload;
      })
      .addCase(fetchSimilarCamerasAction.fulfilled, (state, action) => {
        state.similarCameras = action.payload;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(postReview.fulfilled, (state, action) => {
        state.reviews = action.payload;
      });
  }
});

export const { setInitialProductState } = productData.actions;
