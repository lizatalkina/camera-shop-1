import {render, screen} from '@testing-library/react';
import NotFoundScreen from './not-found-screen';
import HistoryRouter from '../../components/history-route/history-route';
import { createMemoryHistory } from 'history';

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <HistoryRouter history = { history }>
        <NotFoundScreen />
      </HistoryRouter>
    );

    expect(screen.getByText(/404. Страница не найдена/i)).toBeInTheDocument();
    expect(screen.getByText(/На главную/i)).toBeInTheDocument();
  });
});
