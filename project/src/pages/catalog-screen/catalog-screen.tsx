import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import PromoBanner from '../../components/promo-banner/promo-banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import FilterForm from '../../components/filter-form/filter-form';
import Sorting from '../../components/sorting/sorting';
import ProductCardsList from '../../components/product-cards-list/product-cards-list';
import Pagination from '../../components/pagination/pagination';
import { useAppSelector } from '../../hooks';

function CatalogScreen (): JSX.Element {
  const cameras = useAppSelector((state) => state.cameras);
  const promo = useAppSelector((state) => state.promo);

  return (
    <>
      <Header/>
      <main>
        <PromoBanner promo = {promo}/>
        <div className="page-content">
          <Breadcrumbs/>
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <div className="catalog__aside">
                  <FilterForm/>
                </div>
                <div className="catalog__content">
                  <Sorting/>
                  <ProductCardsList cameras = { cameras }/>
                  <Pagination/>
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
