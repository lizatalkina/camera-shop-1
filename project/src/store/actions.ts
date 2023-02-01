import {createAction} from '@reduxjs/toolkit';
import { AppRoute } from '../const';
import { Camera } from '../types/camera';

export const getCameras = createAction<{
  cameras: Camera[];
}
>('camera/getCameras');

export const redirectToRoute = createAction<AppRoute>('camera/redirectToRoute');
