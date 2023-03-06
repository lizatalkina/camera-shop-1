import HistoryRouter from '../history-route/history-route';
import { createMemoryHistory } from 'history';
import StarsRate from './stars-rate';
import { render, screen } from '@testing-library/react';
import { STARS_COUNT } from '../../const';
import userEvent from '@testing-library/user-event/';

const history = createMemoryHistory();
describe('Component: StarsRate', () => {
  it('should render correctly', () => {
    const fakeRating = 3;
    render(
      <HistoryRouter history={ history }>
        <StarsRate rating = { fakeRating } />
      </HistoryRouter>
    );
    const stars = screen.queryAllByTestId('star');
    expect(stars).toHaveLength(STARS_COUNT);
  });
  it('should render correctly rating', () => {
    const fakeRating = 3;
    render(
      <HistoryRouter history={ history }>
        <StarsRate rating = { fakeRating } />
      </HistoryRouter>
    );
    const stars = screen.queryAllByTestId('full-star');
    expect(stars).toHaveLength(fakeRating);
  });
  it('should render correctly rating on click', async () => {
    let fakeRating = 0;
    const user = userEvent.setup();
    const {rerender} = render(
      <HistoryRouter history={ history }>
        <StarsRate rating = { fakeRating } />
      </HistoryRouter>
    );
    fakeRating = 1;
    rerender(
      <HistoryRouter history={ history }>
        <StarsRate rating = { fakeRating } />
      </HistoryRouter>
    );
    await user.click(screen.getAllByTestId('star')[fakeRating]);
    expect(screen.queryAllByTestId('full-star')).toHaveLength(1);
  });
});
