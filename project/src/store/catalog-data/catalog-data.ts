import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { CatalogData } from '../../types/state';
import { Promo } from '../../types/promo';
import { fetchCamerasAction, fetchPromoAction } from '../api-actions';

const initialState: CatalogData = {
  isCatalogDataLoaded: false,
  cameras: [],
  promo: {} as Promo,
  currentPage: 1,
};

export const catalogData = createSlice({
  name: NameSpace.Catalog,
  initialState,
  reducers: {
    changeCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.pending, (state) => {
        state.isCatalogDataLoaded = true;
      })
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.cameras = action.payload;
        state.isCatalogDataLoaded = false;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promo = action.payload;
      });
  }
});

export const { changeCurrentPage } = catalogData.actions;
