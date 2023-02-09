import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { Camera } from '../types/camera';
import { Promo } from '../types/promo';
import { getCameras, getPromo, getCamera, getSimilarCameras } from './actions';
import { APIRoute } from '../const';

export const fetchCamerasAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCameras',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Camera[]>(APIRoute.Cameras);
    dispatch(getCameras({
      cameras: data
    }));
  },
);

export const fetchPromoAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchPromo',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Promo>(APIRoute.Promo);
    dispatch(getPromo({
      promo: data
    }));
  },
);

export const fetchCameraAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCamera',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<Camera>(`${APIRoute.Cameras}/${id}`);
    dispatch(getCamera({
      camera: data
    }));
  },
);

export const fetchSimilarCamerasAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchSimilarCameras',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<Camera[]>(APIRoute.SimilarCameras.replace(':id', `${id}`));
    dispatch(getSimilarCameras({
      similarCameras: data
    }));
  },
);
