import { render, screen } from '@testing-library/react';
import HistoryRouter from '../history-route/history-route';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import Footer from './footer';
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


describe('Component: Footer', () => {
  it('should render correctly', () => {
    render(
      <Provider store = { store }>
        <HistoryRouter history = { history }>
          <Footer/>
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getByText(new RegExp('Навигация', 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp('Ресурсы', 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp('Поддержка', 'i'))).toBeInTheDocument();
  });
});
