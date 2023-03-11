import HistoryRouter from '../history-route/history-route';
import { createMemoryHistory } from 'history';
import { makeFakeCamera } from '../../utils/mocks';
import { render, screen } from '@testing-library/react';
import ProductCardsList from './product-cards-list';

const history = createMemoryHistory();
const fakeCameras = Array.from({length: 10}, () => makeFakeCamera());

describe('Component: ProductCardsList', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={ history }>
        <ProductCardsList
          cameras = {fakeCameras}
        />
      </HistoryRouter>
    );
    const productCards = screen.getAllByTestId('product-card');
    expect(productCards.length).toBeGreaterThan(0);
  });
});
