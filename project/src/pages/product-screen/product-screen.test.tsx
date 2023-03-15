import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeCamera, makeFakeReview } from '../../utils/mocks';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-router/history-router';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import ProductScreen from './product-screen';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const camera = makeFakeCamera();
const similarCameras = Array.from({length: 5}, () => makeFakeCamera());
const fakeReviews = Array.from({length: 5}, () => makeFakeReview(camera.id));

const store = mockStore({
  PRODUCT: {
    camera: camera,
    similarCameras: similarCameras,
    reviews: fakeReviews,
  },
});

const history = createMemoryHistory();
history.push(AppRoute.Product.replace(':id', `${camera.id}`).replace(':type', 'information'));

describe('Component: ProductScreen', () => {
  it('should render correctly', async () => {
    render(
      <Provider store = { store }>
        <HistoryRouter history = { history }>
          <Routes>
            <Route
              path={ AppRoute.Product.replace(':id', `${camera.id}`).replace(':type', 'information')}
              element = {
                <ProductScreen/>
              }
            >
            </Route>
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('product')).toBeInTheDocument();
    expect(screen.getByText(/Похожие товары/i)).toBeInTheDocument();
    expect(screen.getByText(/Отзывы/i)).toBeInTheDocument();
    const reviewCount = await screen.findByText(new RegExp(`${camera.reviewCount}`, 'i'));
    expect(reviewCount).toBeInTheDocument();
    const camerasNames = screen.queryAllByText(new RegExp(`${camera.name}`, 'i'));
    expect(camerasNames.length).toBeGreaterThan(1);
    expect(screen.getByTestId('information-button')).toBeInTheDocument();
    expect(screen.getByTestId('specifications-button')).toBeInTheDocument();
  });
});
