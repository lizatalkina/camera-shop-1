import { productData, setInitialProductState } from './product-data';
import { fetchCameraAction, fetchSimilarCamerasAction, fetchReviewsAction } from '../api-actions';
import { makeFakeCamera, makeFakeReview } from '../../utils/mocks';

const camera = makeFakeCamera();
const reviews = Array.from({length: 5}, () => makeFakeReview(camera.id));
const similarCameras = Array.from({length: 4}, () => makeFakeCamera());

describe('Reducer: productData', () => {
  it('without additional parametrs should return initial state', () => {
    expect(productData.reducer(undefined, {type: 'UNKNOW_ACTION'}))
      .toEqual({
        camera: null,
        similarCameras: [],
        reviews: [],
      });
  });
  it('should update camera by load cameras', () => {
    const state = {
      camera: null,
      similarCameras: [],
      reviews: [],};
    expect(productData.reducer(state, {type: fetchCameraAction.fulfilled.type, payload: camera}))
      .toEqual({
        camera,
        similarCameras: [],
        reviews: []});
  });
  it('should update similar cameras by load similar cameras', () => {
    const state = {
      camera: null,
      similarCameras: [],
      reviews: [],};
    expect(productData.reducer(state, {type: fetchSimilarCamerasAction.fulfilled.type, payload: similarCameras}))
      .toEqual({
        camera: null,
        similarCameras,
        reviews: []});
  });
  it('should update reviews by load reviews', () => {
    const state = {
      camera: null,
      similarCameras: [],
      reviews: [],};
    expect(productData.reducer(state, {type: fetchReviewsAction.fulfilled.type, payload: reviews}))
      .toEqual({
        camera: null,
        similarCameras: [],
        reviews});
  });
  it('should reset initial state', () => {
    const state = {
      camera,
      similarCameras,
      reviews,};
    expect(productData.reducer(state, setInitialProductState()))
      .toEqual({
        camera: null,
        similarCameras: [],
        reviews: []});
  });
});
