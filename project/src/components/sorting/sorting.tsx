import { useAppSelector, useAppDispatch } from '../../hooks';
import { changeSort, changeOrder } from '../../store/catalog-data/catalog-data';
import { SortType, OrderType } from '../../const';

function Sorting (): JSX.Element {
  const dispatch = useAppDispatch();
  const currentSort = useAppSelector((state) => state.CATALOG.sort);
  const currentOrder = useAppSelector((state) => state.CATALOG.order);

  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input type="radio" id="sortPrice" name="sort"
                onClick={() => currentSort === SortType.Rating || currentSort === '' as SortType ? dispatch(changeSort(SortType.Price)) : dispatch(changeSort('' as SortType)) }
              />
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input type="radio" id="sortPopular" name="sort"
                onClick={() => currentSort === SortType.Price || currentSort === '' as SortType ? dispatch(changeSort(SortType.Rating)) : dispatch(changeSort('' as SortType)) }

              />
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input type="radio" id="up" name="sort-icon" aria-label="По возрастанию"
                onClick={() =>
                {
                  currentOrder === OrderType.Desc || currentOrder === '' as OrderType ? dispatch(changeOrder(OrderType.Asc)) : dispatch(changeOrder('' as OrderType));
                  if (currentSort === '' as SortType) {dispatch(changeSort(SortType.Price));}
                }}

              />
              <label htmlFor="up">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input type="radio" id="down" name="sort-icon" aria-label="По убыванию"
                onClick={() =>
                {
                  currentOrder === OrderType.Asc || currentOrder === '' as OrderType ? dispatch(changeOrder(OrderType.Desc)) : dispatch(changeOrder('' as OrderType));
                  if (currentSort === '' as SortType) {dispatch(changeSort(SortType.Price));}
                }}
              />
              <label htmlFor="down">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Sorting;
