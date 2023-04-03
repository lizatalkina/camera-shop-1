import { NameSpace, Categories, CamerasTypes, CamerasLevel, OrderType, SortType } from '../../const';
import { State } from '../../types/state';
import { Camera } from '../../types/camera';
import { Promo } from '../../types/promo';

export const getCameras = (state: State): Camera[] => state[NameSpace.Catalog].cameras;
export const getLoadedCatalogDataStatus = (state: State): boolean => state[NameSpace.Catalog].isCatalogDataLoaded;
export const getPromo = (state: State): Promo => state[NameSpace.Catalog].promo;
export const getCurrentPage = (state: State): number => state[NameSpace.Catalog].currentPage;
export const getPrice = (state: State): number | null => state[NameSpace.Catalog].price;
export const getPriceUp = (state: State): number | null => state[NameSpace.Catalog].priceUp;
export const getCategory = (state: State): Categories => state[NameSpace.Catalog].category;
export const getType = (state: State): CamerasTypes[] => state[NameSpace.Catalog].types;
export const getLevel = (state: State): CamerasLevel[] => state[NameSpace.Catalog].levels;
export const getSort = (state: State): SortType => state[NameSpace.Catalog].sort;
export const getOrder = (state: State): OrderType => state[NameSpace.Catalog].order;
export const getQueryString = (state: State): string => state[NameSpace.Catalog].query;
