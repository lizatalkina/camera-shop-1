import { render, screen } from '@testing-library/react';
import HistoryRouter from '../history-router/history-router';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import Sorting from './sorting';
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


describe('Component: Sorting', () => {
  it('should render correctly', () => {
    render(
      <Provider store = { store }>
        <HistoryRouter history = { history }>
          <Sorting/>
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getByText(new RegExp('Сортировать', 'i'))).toBeInTheDocument();
  });
});
