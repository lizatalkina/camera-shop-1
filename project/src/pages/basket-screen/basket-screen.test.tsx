import HistoryRouter from '../../components/history-route/history-route';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import BasketScreen from './basket-screen';

const history = createMemoryHistory();

describe('Component: BasketScreen', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history = { history }>
        <BasketScreen/>
      </HistoryRouter>
    );
    expect(screen.getByText(new RegExp('Фотоаппарат', 'i'))).toBeInTheDocument();
  });
});
