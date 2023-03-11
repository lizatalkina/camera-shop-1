import { render, screen } from '@testing-library/react';
import HistoryRouter from '../history-route/history-route';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import ProductReviewSuccess from './product-review-success';
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


describe('Component: ProductReviewSuccess', () => {
  it('should render correctly', () => {
    const handleCloseAddReviewModal = jest.fn();
    const modalAddReviewIsOpen = true;

    render(
      <Provider store = { store }>
        <HistoryRouter history = { history }>
          <ProductReviewSuccess
            isModalOpened = { modalAddReviewIsOpen }
            onCloseModal = { handleCloseAddReviewModal }
            cameraId = { fakeCamera.id }
          />
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getByText(new RegExp('Спасибо за отзыв', 'i'))).toBeInTheDocument();
  });
});
