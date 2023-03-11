import { render, screen } from '@testing-library/react';
import HistoryRouter from '../history-route/history-route';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import ProductCard from './product-card';
import { makeFakeCamera } from '../../utils/mocks';
import { Provider } from 'react-redux';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const fakeCamera = makeFakeCamera();

const store = mockStore({
  PRODUCT: {
    camera: fakeCamera,
  },
});


describe('Component: ProductCard', () => {
  it('should render correctly', () => {
    render(
      <Provider store = { store }>
        <HistoryRouter history = { history }>
          <ProductCard camera = {fakeCamera}/>
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getByText(new RegExp(fakeCamera.name, 'i'))).toBeInTheDocument();
  });
});
