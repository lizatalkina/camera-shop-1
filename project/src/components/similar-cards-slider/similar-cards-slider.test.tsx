import HistoryRouter from '../history-router/history-router';
import { createMemoryHistory } from 'history';
import { makeFakeCamera } from '../../utils/mocks';
import { render, screen } from '@testing-library/react';
import SimilarCardsSlider from './similar-cards-slider';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();
const fakeSimilarCameras = Array.from({length: 10}, () => makeFakeCamera());

describe('Component: SimilarCardsSlider', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={ history }>
        <SimilarCardsSlider
          similarCameras = {fakeSimilarCameras}
        />
      </HistoryRouter>
    );
    const prevButton = screen.getByLabelText(/Предыдущий слайд/i);
    const nextButton = screen.getByLabelText(/Следующий слайд/i);
    expect(screen.getByTestId('similar-cards')).toBeInTheDocument();
    expect(prevButton).toHaveAttribute('disabled');
    expect(nextButton).not.toHaveAttribute('disabled');
  });
  it('should change disabled attribute when clicked on the button', async () => {
    const user = userEvent.setup();
    render(
      <HistoryRouter history={ history }>
        <SimilarCardsSlider
          similarCameras = {fakeSimilarCameras}
        />
      </HistoryRouter>
    );
    const prevButton = screen.getByLabelText(/Предыдущий слайд/i);
    const nextButton = screen.getByLabelText(/Следующий слайд/i);
    expect(prevButton).toHaveAttribute('disabled');
    expect(nextButton).not.toHaveAttribute('disabled');
    await(user.click(nextButton));
    expect(prevButton).not.toHaveAttribute('disabled');
    expect(nextButton).not.toHaveAttribute('disabled');
  });
});
