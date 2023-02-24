import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Camera } from '../../types/camera';
import { Promo } from '../../types/promo';

export const getCameras = (state: State): Camera[] => state[NameSpace.Catalog].cameras;
export const getLoadedCatalogDataStatus = (state: State): boolean => state[NameSpace.Catalog].isCatalogDataLoaded;
export const getPromo = (state: State): Promo => state[NameSpace.Catalog].promo;
export const getCurrentPage = (state: State): number => state[NameSpace.Catalog].currentPage;
