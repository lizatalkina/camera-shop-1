import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Camera } from '../../types/camera';

export const getSearchCameras = (state: State): Camera[] => state[NameSpace.Search].camerasSearch;
