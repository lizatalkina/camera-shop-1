import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { Camera } from '../types/camera';
import { getCameras } from './actions';
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
