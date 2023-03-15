import HistoryRouter from '../history-router/history-router';
import { createMemoryHistory } from 'history';
import Pagination from './pagination';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();

describe('Component: Pagination', () => {
  it('should render correctly', () => {
    window.scrollTo = jest.fn();
    const onChangeCurrentPage = jest.fn();
    const fakeCurrentPage = 1;
    const fakePageCount = 5;
    render(
      <HistoryRouter history={ history }>
        <Pagination
          currentPage = {fakeCurrentPage}
          pageCount = {fakePageCount}
          onChangeCurrentPage = { onChangeCurrentPage }
        />
      </HistoryRouter>
    );
    expect(window.scrollTo).toHaveBeenCalledWith({behavior: 'smooth', top: 0});
    const pages = screen.getAllByTestId('pagination-item');
    expect(pages.length).toBeGreaterThan(0);
    expect(screen.queryByTestId('pagination-item-back')).not.toBeInTheDocument();
    expect(screen.getByTestId('pagination-item-next')).toBeInTheDocument();
  });
  it('should change buttons when user clicked', async () => {
    window.scrollTo = jest.fn();
    const user = userEvent.setup();
    const onChangeCurrentPage = jest.fn();
    const {rerender} = render(
      <HistoryRouter history={ history }>
        <Pagination
          currentPage = {1}
          pageCount = {5}
          onChangeCurrentPage = { onChangeCurrentPage }
        />
      </HistoryRouter>
    );
    const pages = screen.queryAllByTestId('pagination-item');
    expect(screen.queryByTestId('pagination-item-back')).not.toBeInTheDocument();
    const fakeCurrentPage = 2;
    await user.click(pages[fakeCurrentPage - 1]);
    rerender (
      <HistoryRouter history={ history }>
        <Pagination
          currentPage = {fakeCurrentPage}
          pageCount = {5}
          onChangeCurrentPage = { onChangeCurrentPage }
        />
      </HistoryRouter>
    );
    expect(onChangeCurrentPage).toBeCalled();
    expect(onChangeCurrentPage).nthCalledWith(1, fakeCurrentPage);
    expect(screen.getByTestId('pagination-item-back')).toBeInTheDocument();
  });
});
