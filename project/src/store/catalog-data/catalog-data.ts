import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, Categories, CamerasTypes, CamerasLevel, OrderType, SortType } from '../../const';
import { CatalogData } from '../../types/state';
import { Promo } from '../../types/promo';
import { fetchCamerasAction, fetchPromoAction } from '../api-actions';
import { makeQueryString } from '../../utils/utils';

const initialState: CatalogData = {
  isCatalogDataLoaded: false,
  cameras: [],
  promo: {} as Promo,
  currentPage: 1,
  price: null,
  priceUp: null,
  category: '' as Categories,
  types: [] as CamerasTypes[],
  levels: [] as CamerasLevel[],
  sort: '' as SortType,
  order: '' as OrderType,
  query: '',
};

export const catalogData = createSlice({
  name: NameSpace.Catalog,
  initialState,
  reducers: {
    changeCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    changePrice: (state, action: PayloadAction<number | null>) => {
      action.payload === 0 ? state.price = null : state.price = action.payload;
      state.query = makeQueryString(state);
    },
    changePriceUp: (state, action: PayloadAction<number | null>) => {
      action.payload === 0 ? state.priceUp = null : state.priceUp = action.payload;
      state.query = makeQueryString(state);
    },
    changeCategory: (state, action: PayloadAction<Categories>) => {
      state.category === action.payload ? state.category = '' as Categories : state.category = action.payload;
      state.query = makeQueryString(state);
    },
    changeType: (state, action: PayloadAction<CamerasTypes>) => {
      const index = state.types.indexOf(action.payload);
      index === -1 ? state.types.push(action.payload) : state.types.splice(index, 1);
      state.query = makeQueryString(state);
    },
    changeLevel: (state, action: PayloadAction<CamerasLevel>) => {
      const index = state.levels.indexOf(action.payload);
      index === -1 ? state.levels.push(action.payload) : state.levels.splice(index, 1);
      state.query = makeQueryString(state);
    },
    changeSort: (state, action: PayloadAction<SortType>) => {
      state.sort = action.payload;
      state.query = makeQueryString(state);
    },
    changeOrder: (state, action: PayloadAction<OrderType>) => {
      state.order = action.payload;
      state.query = makeQueryString(state);
    },
    setInitialFilterState: (state) => {
      state.price = null;
      state.priceUp = null;
      state.category = '' as Categories;
      state.types = [] as CamerasTypes[];
      state.levels = [] as CamerasLevel[];
      state.query = '';
    },
    changeQueryString: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
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

export const { changeCurrentPage, changePrice, changePriceUp, changeCategory, changeType, changeLevel, changeSort, changeOrder, setInitialFilterState, changeQueryString } = catalogData.actions;
