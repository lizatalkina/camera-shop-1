import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import CatalogScreen from '../../pages/catalog-screen/catalog-screen';
import ProductScreen from '../../pages/product-screen/product-screen';
import BasketScreen from '../../pages/basket-screen/basket-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import { useAppSelector } from '../../hooks';
import { getLoadedCatalogDataStatus } from '../../store/catalog-data/selectors';
import LoadingScreen from '../../pages/loading-screen/loading-screen';

function App(): JSX.Element {
  const isCatalogDataLoaded = useAppSelector(getLoadedCatalogDataStatus);

  if (isCatalogDataLoaded) {
    return (
      <LoadingScreen/>
    );
  }
  return (
    <Routes>
      <Route
        path = { AppRoute.Catalog }
        element = {<CatalogScreen/>}
      />
      <Route
        path = { AppRoute.CatalogPage }
        element = {<CatalogScreen/>}
      />
      <Route
        path = { AppRoute.CatalogFilter }
        element = {<CatalogScreen/>}
      />
      <Route
        path = { AppRoute.Product }
        element = {
          <ProductScreen/>
        }
      />
      <Route
        path = { AppRoute.Basket }
        element = {
          <BasketScreen/>
        }
      />
      <Route
        path='*'
        element = {<NotFoundScreen/>}
      />
    </Routes>
  );
}

export default App;
