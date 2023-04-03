import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import PromoBanner from '../../components/promo-banner/promo-banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import FilterForm from '../../components/filter-form/filter-form';
import Sorting from '../../components/sorting/sorting';
import ProductCardsList from '../../components/product-cards-list/product-cards-list';
import Pagination from '../../components/pagination/pagination';
import { useAppSelector } from '../../hooks';
import { PAGE_SIZE } from '../../const';
import { getCurrentPage, getPromo, getCameras } from '../../store/catalog-data/selectors';
import { useAppDispatch } from '../../hooks';
import { changeCurrentPage } from '../../store/catalog-data/catalog-data';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useEffect, useRef } from 'react';
// import { fetchCamerasAction } from '../../store/api-actions';

function CatalogScreen (): JSX.Element {
  const didMountRef = useRef(false);
  const [ searchParams ] = useSearchParams();
  const inQueryString = searchParams.toString();
  const currentQuery = useAppSelector((state) => state.CATALOG.query);
  const isQueryStringChanged = inQueryString !== currentQuery;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cameras = useAppSelector(getCameras);
  const promo = useAppSelector(getPromo);
  const currentPage = useAppSelector(getCurrentPage);
  const pageCount = Math.ceil(cameras.length / PAGE_SIZE);
  const currentCameras = cameras.slice((currentPage - 1) * PAGE_SIZE, (currentPage - 1) * PAGE_SIZE + PAGE_SIZE);

  useEffect(() => {
    if (didMountRef.current && isQueryStringChanged) {
      currentQuery === '' ? navigate(AppRoute.Catalog) : navigate(AppRoute.CatalogFilter.replace(':query', `${currentQuery}`));
    }
    didMountRef.current = true;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuery]);

  // useEffect(() => {
  //   dispatch(fetchCamerasAction(inQueryString));
  // }, []);

  const handleChangeCurrentPage = (e: number) => {
    dispatch(changeCurrentPage(e));
  };
  return (
    <>
      <Header/>
      <main>
        <PromoBanner promo = {promo}/>
        <div className="page-content">
          <Breadcrumbs name = {null}/>
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <div className="catalog__aside">
                  <FilterForm/>
                </div>
                <div className="catalog__content">
                  <Sorting/>
                  <ProductCardsList cameras = { currentCameras }/>
                  <Pagination
                    currentPage = {currentPage}
                    pageCount = {pageCount}
                    onChangeCurrentPage = { handleChangeCurrentPage }
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer/>
    </>
  );

}

export default CatalogScreen;
