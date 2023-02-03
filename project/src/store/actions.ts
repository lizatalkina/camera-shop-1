import {createAction} from '@reduxjs/toolkit';
import { AppRoute } from '../const';
import { Camera } from '../types/camera';
import { Promo } from '../types/promo';

export const getCameras = createAction<{
  cameras: Camera[];
}
>('camera/getCameras');

export const redirectToRoute = createAction<AppRoute>('camera/redirectToRoute');

export const getPromo = createAction<{
  promo: Promo;
}
>('camera/getPromo');

export const changeCurrentPage = createAction<{
  currentPage: number;
}
>('camera/changeCurrentPage');

export const getCamera = createAction<{
  camera: Camera;
}
>('camera/getCamera');
