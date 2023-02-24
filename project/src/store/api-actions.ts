import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { Camera } from '../types/camera';
import { Promo } from '../types/promo';
import { Review } from '../types/review';
import { APIRoute } from '../const';

export const fetchCamerasAction = createAsyncThunk<Camera[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCameras',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Camera[]>(APIRoute.Cameras);
    return data;
  },
);

export const fetchPromoAction = createAsyncThunk<Promo, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchPromo',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Promo>(APIRoute.Promo);
    return data;
  },
);

export const fetchCameraAction = createAsyncThunk<Camera, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCamera',
  async (id, {dispatch, extra: api}) => {
    const { data } = await api.get<Camera>(`${APIRoute.Cameras}/${id}`);
    return data;
  },
);

export const fetchSimilarCamerasAction = createAsyncThunk<Camera[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchSimilarCameras',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<Camera[]>(APIRoute.SimilarCameras.replace(':id', `${id}`));
    return data;
  },
);

export const fetchReviewsAction = createAsyncThunk<Review[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<Review[]>(APIRoute.Reviews.replace(':id', `${id}`));
    return data;
  },
);

export const postReview = createAsyncThunk<Review[], Review, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/postReview',
  async({ cameraId, userName, advantage, disadvantage, review, rating }, { dispatch, extra: api }) => {
    await api.post<Review>(APIRoute.SendReview, {
      cameraId,
      userName,
      advantage,
      disadvantage,
      review,
      rating
    });
    const {data} = await api.get<Review[]>(APIRoute.Reviews.replace(':id', `${cameraId}`));
    return data;
  }
);
