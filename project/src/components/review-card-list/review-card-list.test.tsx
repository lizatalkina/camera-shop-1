import { render, screen } from '@testing-library/react';
import HistoryRouter from '../history-router/history-router';
import { createMemoryHistory } from 'history';
import ReviewCardList from './review-card-list';
import { makeFakeReview, makeFakeCamera } from '../../utils/mocks';
import { REVIEWS_MAX_COUNT } from '../../const';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();
const fakeCamera = makeFakeCamera();
const fakeReviews = Array.from({length: 10}, () => makeFakeReview(fakeCamera.id));

describe('Component: ReviewCardList', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={ history }>
        <ReviewCardList
          reviews = {fakeReviews}
        />
      </HistoryRouter>
    );
    expect(screen.getByTestId('reviews-block')).toBeInTheDocument();
    const camerasLength = screen.queryAllByTestId('review-card').length;
    expect(camerasLength).toBeLessThanOrEqual(REVIEWS_MAX_COUNT);
  });
  it('show more button should to show new reviews', async () => {
    const user = userEvent.setup();
    render(
      <HistoryRouter history={ history }>
        <ReviewCardList
          reviews = {fakeReviews}
        />
      </HistoryRouter>
    );
    const camerasLength = screen.queryAllByTestId('review-card').length;
    expect(camerasLength).toBeLessThanOrEqual(REVIEWS_MAX_COUNT);
    const showMoreButton = screen.getByText('Показать больше отзывов');
    await(user.click(showMoreButton));
    const newCamerasLength = screen.queryAllByTestId('review-card').length;
    expect(newCamerasLength).toBeGreaterThan(REVIEWS_MAX_COUNT);
  });
});
