import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks';
import { changeCurrentPage } from '../../store/actions';
import { useEffect } from 'react';

type PaginationProps = {
  currentPage: number;
  pageCount: number;
};

function Pagination ({ currentPage, pageCount}: PaginationProps): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {
          currentPage > 1 ? (
            <li className="pagination__item"
              onClick = {(evt) => {
                evt.preventDefault();
                dispatch(changeCurrentPage({currentPage: currentPage - 1}));
              }}
            >
              <Link to={AppRoute.CatalogPage.replace(':id', `${currentPage - 1}`)} className="pagination__link pagination__link--text">Назад
              </Link>
            </li>
          ) : ''
        }
        {Array.from({length: pageCount}, (_, i) => i + 1).map((e, _) =>
          (
            <li className="pagination__item" key={Math.random()}
              onClick = {(evt) => {
                evt.preventDefault();
                dispatch(changeCurrentPage({currentPage: e}));
              }}
            >
              <Link to={AppRoute.CatalogPage.replace(':id', `${e}`)} className={e !== currentPage ? 'pagination__link' : 'pagination__link pagination__link--active'}>{e}
              </Link>
            </li>
          ))}
        {
          currentPage < pageCount ? (
            <li className="pagination__item"
              onClick = {(evt) => {
                evt.preventDefault();
                dispatch(changeCurrentPage({currentPage: currentPage + 1}));
              }}
            >
              <Link to={AppRoute.CatalogPage.replace(':id', `${currentPage + 1}`)} className="pagination__link pagination__link--text">Далее
              </Link>
            </li>
          ) : ''
        }
      </ul>
    </div>
  );
}

export default Pagination;
