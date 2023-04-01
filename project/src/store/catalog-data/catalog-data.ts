import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, Categories, CamerasTypes, CamerasLevel, OrderType, SortType } from '../../const';
import { CatalogData } from '../../types/state';
import { Promo } from '../../types/promo';
import { fetchCamerasAction, fetchPromoAction } from '../api-actions';

const initialState: CatalogData = {
  isCatalogDataLoaded: false,
  cameras: [],
  promo: {} as Promo,
  currentPage: 1,
  price: 0,
  priceUp: 0,
  category: {} as Categories,
  types: [] as CamerasTypes[],
  levels: [] as CamerasLevel[],
  sort: '' as SortType,
  order: '' as OrderType,
};

export const catalogData = createSlice({
  name: NameSpace.Catalog,
  initialState,
  reducers: {
    changeCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    changePrice: (state, action: PayloadAction<number>) => {
      state.price = action.payload;
    },
    changePriceUp: (state, action: PayloadAction<number>) => {
      state.priceUp = action.payload;
    },
    changeCategory: (state, action: PayloadAction<Categories>) => {
      state.category === action.payload ? state.category = {} as Categories : state.category = action.payload;
    },
    changeType: (state, action: PayloadAction<CamerasTypes>) => {
      const index = state.types.indexOf(action.payload);
      index === -1 ? state.types.push(action.payload) : state.types.splice(index, 1);
    },
    changeLevel: (state, action: PayloadAction<CamerasLevel>) => {
      const index = state.levels.indexOf(action.payload);
      index === -1 ? state.levels.push(action.payload) : state.levels.splice(index, 1);
    },
    changeSort: (state, action: PayloadAction<SortType>) => {
      state.sort = action.payload;
    },
    changeOrder: (state, action: PayloadAction<OrderType>) => {
      state.order = action.payload;
    },
    setInitialFilterState: (state) => {
      state.price = 0;
      state.priceUp = 0;
      state.category = {} as Categories;
      state.types = [];
      state.levels = [];
    },
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

export const { changeCurrentPage, changePrice, changePriceUp, changeCategory, changeType, changeLevel, changeSort, changeOrder, setInitialFilterState } = catalogData.actions;
