import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { State } from '../types/state';
import { Action } from 'redux';
import { makeFakeCamera, makeFakePromo, makeFakeReview } from '../utils/mocks';
import { APIRoute } from '../const';
import { fetchCamerasAction, fetchPromoAction, fetchCameraAction, fetchSimilarCamerasAction, fetchReviewsAction, postReview } from './api-actions';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should dispatch Load_Cameras when GET /cameras', async () => {
    const mockCameras = Array.from({length: 20}, () => makeFakeCamera());
    mockAPI
      .onGet(APIRoute.Cameras)
      .reply(200, mockCameras);

    const store = mockStore();
    await store.dispatch(fetchCamerasAction(''));

    const actions = store.getActions().map(({type}) => type as string);

    expect(actions).toEqual([
      fetchCamerasAction.pending.type,
      fetchCamerasAction.fulfilled.type
    ]);
  });
  it('should dispatch Load_Promo when GET /promo', async () => {
    const mockPromoCamera = makeFakePromo();
    mockAPI
      .onGet(APIRoute.Promo)
      .reply(200, mockPromoCamera);

    const store = mockStore();
    await store.dispatch(fetchPromoAction());

    const actions = store.getActions().map(({type}) => type as string);

    expect(actions).toEqual([
      fetchPromoAction.pending.type,
      fetchPromoAction.fulfilled.type
    ]);
  });
  it('should dispatch Load_Camera when GET /cameras/id', async () => {
    const mockCamera = makeFakeCamera();
    mockAPI
      .onGet(`${APIRoute.Cameras}/${mockCamera.id}`)
      .reply(200, mockCamera);

    const store = mockStore();
    await store.dispatch(fetchCameraAction(String(mockCamera.id)));

    const actions = store.getActions().map(({type}) => type as string);

    expect(actions).toEqual([
      fetchCameraAction.pending.type,
      fetchCameraAction.fulfilled.type
    ]);
  });
  it('should dispatch Load_SimilarCameras when GET /cameras/:id/similar', async () => {
    const mockCamera = makeFakeCamera();
    const mockSimilarCamera = Array.from({length: 5}, () => makeFakeCamera());
    mockAPI
      .onGet(APIRoute.SimilarCameras.replace(':id', `${mockCamera.id}`))
      .reply(200, mockSimilarCamera);

    const store = mockStore();
    await store.dispatch(fetchSimilarCamerasAction(String(mockCamera.id)));

    const actions = store.getActions().map(({type}) => type as string);

    expect(actions).toEqual([
      fetchSimilarCamerasAction.pending.type,
      fetchSimilarCamerasAction.fulfilled.type
    ]);
  });
  it('should dispatch Load_Reviews when GET /cameras/:id/reviews', async () => {
    const mockCamera = makeFakeCamera();
    const mockReviews = Array.from({length: 5}, () => makeFakeReview(mockCamera.id));

    mockAPI
      .onGet(APIRoute.Reviews.replace(':id', `${mockCamera.id}`))
      .reply(200, mockReviews);

    const store = mockStore();
    await store.dispatch(fetchReviewsAction(String(mockCamera.id)));

    const actions = store.getActions().map(({type}) => type as string);

    expect(actions).toEqual([
      fetchReviewsAction.pending.type,
      fetchReviewsAction.fulfilled.type
    ]);
  });
  it('should post review when server return 200 POST /reviews', async () => {
    const store = mockStore();
    const mockCamera = makeFakeCamera();
    const mockReview = makeFakeReview(mockCamera.id);
    const mockReviews = Array.from({length: 5}, () => makeFakeReview(mockCamera.id));
    mockReviews.unshift(mockReview);

    mockAPI
      .onPost(APIRoute.SendReview)
      .reply(200, mockReviews);

    expect(store.getActions()).toEqual([]);
    await store.dispatch(postReview(mockReview));
    const actions = store.getActions().map(({type}) => type as string);
    expect(actions).toEqual([
      postReview.pending.type,
      fetchReviewsAction.pending.type,
      fetchCameraAction.pending.type,
      postReview.fulfilled.type,
    ]);
  });
});
