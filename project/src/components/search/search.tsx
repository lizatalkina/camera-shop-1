import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCameraSearch } from '../../store/api-actions';
import { getSearchCameras } from '../../store/search-data/selectors';
import { setInitialSearchState } from '../../store/search-data/search-data';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';

function Search (): JSX.Element {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const dispatch = useAppDispatch();
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
  };
  const findCameras = useAppSelector(getSearchCameras);
  const handleResetClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(setInitialSearchState());
    setQuery('');
  };
  const handleItemClick = (id: string) => {
    navigate(AppRoute.Product.replace(':id', `${id}`).replace(':type', 'information'));
  };

  useEffect(() => {
    if (query.length > 0) {
      dispatch(fetchCameraSearch(query));
    }
    return () => {
      dispatch(setInitialSearchState());
    };
  }, [dispatch, query]);

  return (
    <div className={findCameras.length > 0 ? 'form-search list-opened' : 'form-search'}>
      <form>
        <label>
          <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-lens"></use>
          </svg>
          <input className="form-search__input" type="search" value = { query } onChange = { handleChange } autoComplete="off" placeholder="Поиск по сайту"/>
        </label>
        <ul className="form-search__select-list">
          {
            findCameras.map((findCamera) => (
              <li className="form-search__select-item" tabIndex={0} key={findCamera.id} onClick={() => handleItemClick(String(findCamera.id))}>
                {findCamera.name}
              </li>
            ))
          }
        </ul>
      </form>
      <button className="form-search__reset" type="reset" onClick={handleResetClick}>
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
        <span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
}

export default Search;
