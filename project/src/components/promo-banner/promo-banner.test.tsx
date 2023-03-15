import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakePromo } from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import PromoBanner from './promo-banner';
import { render, screen } from '@testing-library/react';

const mockStore = configureMockStore();
const promoBanner = makeFakePromo();

const store = mockStore({
  CATALOG: {
    promo: promoBanner,
  },
});

const history = createMemoryHistory();

describe('Component: PromoBanner', () => {
  it('should render correctly', () => {
    render(
      <Provider store = { store }>
        <HistoryRouter history = { history }>
          <PromoBanner promo = {promoBanner}/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('promo-banner')).toBeInTheDocument();
    expect(screen.getByText(new RegExp(promoBanner.name, 'i'))).toBeInTheDocument();

  });
});
