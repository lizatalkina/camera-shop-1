import { render, screen } from '@testing-library/react';
import HistoryRouter from '../history-router/history-router';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import Header from './header';
import { makeFakeCamera } from '../../utils/mocks';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const history = createMemoryHistory();
const mockStore = configureMockStore(middlewares);
const cameras = Array.from({length: 20}, () => makeFakeCamera());

const store = mockStore({
  CATALOG: {
    isCatalogDataLoaded: false,
    cameras: cameras,
    currentPage: 1,
  },
});


describe('Component: Header', () => {
  it('should render correctly', () => {
    render(
      <Provider store = { store }>
        <HistoryRouter history = { history }>
          <Header/>
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getByText(new RegExp('Каталог', 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp('Гарантии', 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp('Доставка', 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp('О компании', 'i'))).toBeInTheDocument();
  });
});
