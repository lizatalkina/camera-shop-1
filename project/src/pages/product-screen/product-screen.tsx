import { useEffect, useState } from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchCameraAction, fetchSimilarCamerasAction, fetchReviewsAction } from '../../store/api-actions';
import ProductTabs from '../../components/product-tabs/product-tabs';
import LoadingScreen from '../loading-screen/loading-screen';
import { getCamera, getSimilarCameras, getReviews } from '../../store/product-data/selectors';
import SimilarCardsSlider from '../../components/similar-cards-slider/similar-cards-slider';
import ReviewCardList from '../../components/review-card-list/review-card-list';
import AddReview from '../../components/add-review/add-review';
import ProductReviewSuccess from '../../components/product-review-success/product-review-success';
import StarsRate from '../../components/stars-rate/stars-rate';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { setInitialProductState } from '../../store/product-data/product-data';

function ProductScreen (): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const camera = useAppSelector(getCamera);
  const reviews = useAppSelector(getReviews);
  const similarCameras = useAppSelector(getSimilarCameras);
  const [specifications, setSpecifications] = useState(false);
  const [information, setInformation] = useState(true);
  const [modalAddReviewIsOpen, setModalAddReviewIsOpen] = useState(false);
  const [modalSuccessPostReviewIsOpen, setModalSuccessPostReviewIsOpen] = useState(false);

  const scrollToTop = () =>{
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleClick = () => {
    setInformation(!information);
    setSpecifications(!specifications);
  };

  const openAddReviewFromParent = () => {
    setModalAddReviewIsOpen(true);
    scrollToTop();
  };

  const handleCloseSuccessPostReviewModal = () => {
    setModalSuccessPostReviewIsOpen(false);
  };

  const handleOpenSuccessPostReviewModal = () => {
    setModalSuccessPostReviewIsOpen(true);
  };

  const handleCloseAddReviewModal = () => {
    setModalAddReviewIsOpen(false);
  };

  useEffect(() => {
    dispatch(fetchCameraAction(String(id)));
    dispatch(fetchSimilarCamerasAction(String(id)));
    dispatch(fetchReviewsAction(String(id)));
    return () => {
      dispatch(setInitialProductState());
    };
  }, [dispatch, id]);

  return camera ? (
    <>
      <Header/>
      <main>
        <div className="page-content">
          <Breadcrumbs name = {camera.name}/>
          <div className="page-content__section">
            <section className="product">
              <div className="container">
                <div className="product__img">
                  <picture>
                    <source type="image/webp" srcSet={`${camera.previewImgWebp}, ${camera.previewImgWebp2x}`}/>
                    <img src="img/content/img1.jpg" srcSet={camera.previewImg2x} width="560" height="480" alt={camera.name}/>
                  </picture>
                </div>
                <div className="product__content">
                  <h1 className="title title--h3">{camera.name}</h1>
                  <div className="rate product__rate">
                    <StarsRate rating = { camera.rating }/>
                    <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{camera.reviewCount}</p>
                  </div>
                  <p className="product__price"><span className="visually-hidden">Цена:</span>{new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 }).format(camera.price)}</p>
                  <button className="btn btn--purple" type="button">
                    <svg width="24" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-add-basket"></use>
                    </svg>Добавить в корзину
                  </button>
                  <div className="tabs product__tabs">
                    <div className="tabs__controls product__tabs-controls">
                      <Link to={AppRoute.Product.replace(':id', `${camera.id}`).replace(':type', 'specifications')}>
                        <button className={specifications ? 'tabs__control is-active' : 'tabs__control'} type="button"
                          onClick = {() => handleClick()}
                        >Характеристики
                        </button>
                      </Link>
                      <Link to={AppRoute.Product.replace(':id', `${camera.id}`).replace(':type', 'information')}>
                        <button className={information ? 'tabs__control is-active' : 'tabs__control'} type="button"
                          onClick = {() => handleClick()}
                        >Описание
                        </button>
                      </Link>
                    </div>
                    <ProductTabs camera = {camera} specifications = {specifications} information = {information}/>
                  </div>
                </div>
              </div>
            </section>
          </div>
          {
            similarCameras.length > 0 ?
              (
                <div className="page-content__section">
                  <section className="product-similar">
                    <div className="container">
                      <h2 className="title title--h3">Похожие товары</h2>
                      <SimilarCardsSlider similarCameras = { similarCameras } />
                    </div>
                  </section>
                </div>
              ) : ''
          }
          <div className="page-content__section">
            <section className="review-block">
              <div className="container">
                <div className="page-content__headed">
                  <h2 className="title title--h3">Отзывы</h2>
                  <button className="btn" type="button"
                    onClick = { openAddReviewFromParent }
                  >Оставить свой отзыв
                  </button>
                  <AddReview
                    isModalOpened = { modalAddReviewIsOpen }
                    onCloseModal = { handleCloseAddReviewModal }
                    cameraId = { camera.id}
                    openSuccessPostModal = { handleOpenSuccessPostReviewModal }
                  />
                  <ProductReviewSuccess
                    isModalOpened = { modalSuccessPostReviewIsOpen }
                    onCloseModal = { handleCloseSuccessPostReviewModal }
                    cameraId = { camera.id}
                  />
                </div>
                <ReviewCardList reviews = { reviews }/>
              </div>
            </section>
          </div>
        </div>
      </main>
      <button className="up-btn"
        onClick={scrollToTop}
      >
        <svg width="12" height="18" aria-hidden="true">
          <use xlinkHref="#icon-arrow2"></use>
        </svg>
      </button>
      <Footer/>
    </>
  ) : <LoadingScreen/>;
}

export default ProductScreen;
