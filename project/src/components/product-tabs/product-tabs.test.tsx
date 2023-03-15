import { render, screen } from '@testing-library/react';
import HistoryRouter from '../history-router/history-router';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import ProductTabs from './product-tabs';
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


describe('Component: ProductTabs', () => {
  it('should render correctly', () => {
    let specifications = true;
    let information = false;
    const {rerender} = render(
      <Provider store = { store }>
        <HistoryRouter history = { history }>
          <ProductTabs
            camera = {fakeCamera}
            specifications = {specifications}
            information = {information}
          />
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getByText(new RegExp(fakeCamera.vendorCode, 'i'))).toBeInTheDocument();

    specifications = false;
    information = true;
    rerender(
      <Provider store = { store }>
        <HistoryRouter history = { history }>
          <ProductTabs
            camera = {fakeCamera}
            specifications = {specifications}
            information = {information}
          />
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getByText(new RegExp(fakeCamera.description, 'i'))).toBeInTheDocument();
  });
});
