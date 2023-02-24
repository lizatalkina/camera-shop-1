import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Camera } from '../../types/camera';
import { Review } from '../../types/review';

export const getCamera = (state: State): Camera | null => state[NameSpace.Product].camera;
export const getSimilarCameras = (state: State): Camera[] => state[NameSpace.Product].similarCameras;
export const getReviews = (state: State): Review[] => state[NameSpace.Product].reviews;
