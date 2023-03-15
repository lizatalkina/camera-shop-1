import { render, screen } from '@testing-library/react';
import HistoryRouter from '../history-router/history-router';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import Breadcrumbs from './breadcrumbs';
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


describe('Component: Breadcrumbs', () => {
  it('should render correctly', () => {
    render(
      <Provider store = { store }>
        <HistoryRouter history = { history }>
          <Breadcrumbs name = {fakeCamera.name}/>
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getByText(new RegExp(fakeCamera.name, 'i'))).toBeInTheDocument();
  });
});
