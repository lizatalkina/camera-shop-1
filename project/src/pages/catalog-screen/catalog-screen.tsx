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

function CatalogScreen (): JSX.Element {
  const cameras = useAppSelector(getCameras);
  const promo = useAppSelector(getPromo);
  const currentPage = useAppSelector(getCurrentPage);
  const pageCount = Math.ceil(cameras.length / PAGE_SIZE);
  const currentCameras = cameras.slice((currentPage - 1) * PAGE_SIZE, (currentPage - 1) * PAGE_SIZE + PAGE_SIZE);

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
                  <Pagination currentPage = {currentPage} pageCount = {pageCount}/>
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
