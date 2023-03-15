import { render, screen } from '@testing-library/react';
import HistoryRouter from '../history-router/history-router';
import { createMemoryHistory } from 'history';
import ReviewCard from './review-card';
import { makeFakeReview, makeFakeCamera } from '../../utils/mocks';

const history = createMemoryHistory();
const fakeCamera = makeFakeCamera();
const fakeReview = makeFakeReview(fakeCamera.id);

describe('Component: ReviewCard', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={ history }>
        <ReviewCard
          reviewItem = { fakeReview }
        />
      </HistoryRouter>
    );
    expect(screen.getByText(new RegExp(fakeReview.userName, 'i'))).toBeInTheDocument();
  });
});
