import {render, screen} from '@testing-library/react';
import LoadingScreen from './loading-screen';
import HistoryRouter from '../../components/history-router/history-router';
import { createMemoryHistory } from 'history';

describe('Component: LoadingScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <HistoryRouter history = { history }>
        <LoadingScreen />
      </HistoryRouter>
    );

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });
});
