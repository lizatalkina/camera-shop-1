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

function CatalogScreen (): JSX.Element {
  const dispatch = useAppDispatch();
  const cameras = useAppSelector(getCameras);
  const promo = useAppSelector(getPromo);
  const currentPage = useAppSelector(getCurrentPage);
  const pageCount = Math.ceil(cameras.length / PAGE_SIZE);
  const currentCameras = cameras.slice((currentPage - 1) * PAGE_SIZE, (currentPage - 1) * PAGE_SIZE + PAGE_SIZE);

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
