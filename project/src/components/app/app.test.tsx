import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import App from './app';
import { render, screen } from '@testing-library/react';
import {createMemoryHistory} from 'history';
import { AppRoute } from '../../const';
import HistoryRouter from '../history-router/history-router';
import { makeFakeCamera, makeFakePromo, makeFakeReview } from '../../utils/mocks';
import userEvent from '@testing-library/user-event';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const cameras = Array.from({length: 20}, () => makeFakeCamera());
const promoBanner = makeFakePromo();
const camera = makeFakeCamera();
const similarCameras = Array.from({length: 5}, () => makeFakeCamera());
const fakeReviews = Array.from({length: 5}, () => makeFakeReview(camera.id));

const store = mockStore({
  CATALOG: {
    isCatalogDataLoaded: false,
    cameras: cameras,
    promo: promoBanner,
    currentPage: 1,
  },
  PRODUCT: {
    camera: camera,
    similarCameras: similarCameras,
    reviews: fakeReviews,
  },
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={ store }>
    <HistoryRouter history = { history }>
      <App/>
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render CatalogScreen when user navigate to "/"', () => {
    history.push(AppRoute.Catalog);
    window.scrollTo = jest.fn();

    render(fakeApp);
    expect(screen.getByTestId('promo-banner')).toBeInTheDocument();
    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
    const productCards = screen.getAllByTestId('product-card');
    expect(productCards.length).toBeGreaterThan(0);
    expect(window.scrollTo).toHaveBeenCalledWith({behavior: 'smooth', top: 0});
  });
  it('should render CatalogScreenPage when user navigate to "/page-:id"', async () => {
    history.push(AppRoute.CatalogPage);
    window.scrollTo = jest.fn();

    const mockStoreWithFakeCurrentPage = mockStore({
      CATALOG: {
        isCatalogDataLoaded: false,
        cameras: cameras,
        promo: promoBanner,
        currentPage: 2,
      },
      PRODUCT: {
        camera: null,
        similarCameras: [],
        reviews: [],
      },
    });

    render(
      <Provider store = { mockStoreWithFakeCurrentPage }>
        <HistoryRouter history = { history }>
          <App/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('promo-banner')).toBeInTheDocument();
    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
    const productCards = screen.getAllByTestId('product-card');
    expect(productCards.length).toBeGreaterThan(0);
    expect(window.scrollTo).toHaveBeenCalledWith({behavior: 'smooth', top: 0});

    const pages = screen.getAllByTestId('pagination-item');
    await userEvent.click(pages[1]);
    expect(screen.getByText(/Назад/i)).toBeInTheDocument();
  });
  it('should render ProductScreen when user navigate to "/catalog/:id/:type"', () => {
    history.push(AppRoute.Product.replace(':id', `${camera.id}`).replace(':type', 'information'));

    render(fakeApp);

    expect(screen.getByTestId('product')).toBeInTheDocument();
    expect(screen.getByText(/Похожие товары/i)).toBeInTheDocument();
    expect(screen.getByText(/Отзывы/i)).toBeInTheDocument();
  });
  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText(/404. Страница не найдена/i)).toBeInTheDocument();
    expect(screen.getByText(/На главную/i)).toBeInTheDocument();
  });
});
