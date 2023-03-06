import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeCamera, makeFakePromo } from '../../utils/mocks';
import HistoryRouter from '../../components/history-route/history-route';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import App from '../../components/app/app';
import { AppRoute } from '../../const';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();
const cameras = Array.from({length: 20}, () => makeFakeCamera());
const promoBanner = makeFakePromo();

const store = mockStore({
  CATALOG: {
    isCatalogDataLoaded: false,
    cameras: cameras,
    promo: promoBanner,
    currentPage: 1,
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

describe('Component: CatalogScreen', () => {
  it('should render correctly', () => {
    window.scrollTo = jest.fn();
    history.push(AppRoute.Catalog);
    render(fakeApp);
    expect(screen.getByTestId('promo-banner')).toBeInTheDocument();
    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
    const productCards = screen.getAllByTestId('product-card');
    expect(productCards.length).toBeGreaterThan(0);
    expect(window.scrollTo).toHaveBeenCalledWith({behavior: 'smooth', top: 0});
  });
  it('CatalogScreenPage should render correctly', async () => {
    history.push(AppRoute.CatalogPage);
    window.scrollTo = jest.fn();

    const mockStoreWithFakeCurrentPage = mockStore({
      CATALOG: {
        isCatalogDataLoaded: false,
        cameras: cameras,
        promo: promoBanner,
        currentPage: 2,
      },
    });

    const user = userEvent.setup();
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
    await user.click(pages[2]);
    expect(await waitFor(() => screen.findByTestId('pagination-item-back'))).toBeInTheDocument();
  });
});
