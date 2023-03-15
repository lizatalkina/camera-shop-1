import { render, screen } from '@testing-library/react';
import HistoryRouter from '../history-router/history-router';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import AddReview from './add-review';
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


describe('Component: AddReview', () => {
  it('should render correctly', () => {
    const handleCloseAddReviewModal = jest.fn();
    const handleOpenSuccessPostReviewModal = jest.fn();
    const modalAddReviewIsOpen = true;

    render(
      <Provider store = { store }>
        <HistoryRouter history = { history }>
          <AddReview
            isModalOpened = { modalAddReviewIsOpen }
            onCloseModal = { handleCloseAddReviewModal }
            cameraId = { fakeCamera.id }
            openSuccessPostModal = { handleOpenSuccessPostReviewModal }
          />
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getByTestId('add-review')).toBeInTheDocument();
  });
});
