import { SearchData } from '../../types/state';
import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { fetchCameraSearch } from '../api-actions';

const initialState: SearchData = {
  camerasSearch: [],
};

export const searchData = createSlice({
  name: NameSpace.Search,
  initialState,
  reducers: {
    setInitialSearchState: (state) => {
      state.camerasSearch = [];
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCameraSearch.fulfilled, (state, action) => {
        state.camerasSearch = action.payload;
      });
  }
});

export const { setInitialSearchState } = searchData.actions;
