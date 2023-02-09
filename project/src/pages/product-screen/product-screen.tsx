import React from 'react';
import { STARS_COUNT } from '../../const';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchCameraAction, fetchSimilarCamerasAction, fetchReviewsAction } from '../../store/api-actions';
import { useEffect } from 'react';
import ProductTabs from '../../components/product-tabs/product-tabs';
import { useState } from 'react';
import LoadingScreen from '../loading-screen/loading-screen';
import { getCamera, getSimilarCameras, getReviews} from '../../store/actions';
//import SimilarCardsList from '../../components/similar-cards-list/similar-cards-list';
import SimilarCardsSlider from '../../components/similar-cards-slider/similar-cards-slider';
import ReviewCardList from '../../components/review-card-list/review-card-list';

//const SIMILAR_CARDS_SIZE = 3;

function ProductScreen (): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const camera = useAppSelector((state) => state.camera);
  const reviews = useAppSelector((state) => state.reviews);
  const similarCameras = useAppSelector((state) => state.similarCameras);
  //const currentSliderPage = useAppSelector((state) => state.currentSliderPage);
  //const sliderPageCount = Math.ceil(similarCameras.length / SIMILAR_CARDS_SIZE);
  //const currentSliderCameras = similarCameras.slice((currentSliderPage - 1) * SIMILAR_CARDS_SIZE, (currentSliderPage - 1) * SIMILAR_CARDS_SIZE + SIMILAR_CARDS_SIZE);
  const [specifications, setSpecifications] = useState(false);
  const [information, setInformation] = useState(true);

  const handleClick = () => {
    setInformation(!information);
    setSpecifications(!specifications);
  };

  useEffect(() => {
    dispatch(fetchCameraAction(String(id)));
    dispatch(fetchSimilarCamerasAction(String(id)));
    dispatch(fetchReviewsAction(String(id)));
    return () => {
      dispatch(getCamera({camera : null}));
      dispatch(getSimilarCameras({similarCameras : []}));
      dispatch(getReviews({reviews: []}));
    };
  }, [dispatch, id]);

  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, [id]);

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
                    {Array.from({length: STARS_COUNT}, (_, i) => i + 1).map((e, _) =>
                      (
                        <React.Fragment key={e}>
                          <svg width="17" height="16" aria-hidden="true">
                            {
                              e <= camera.rating ? (<use xlinkHref="#icon-full-star"></use>) : (<use xlinkHref="#icon-star"></use>)
                            }
                          </svg>
                        </React.Fragment>))}
                    <p className="visually-hidden">Рейтинг: {camera.rating}</p>
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
                      <button className={specifications ? 'tabs__control is-active' : 'tabs__control'} type="button"
                        onClick = {() => handleClick()}
                      >Характеристики
                      </button>
                      <button className={information ? 'tabs__control is-active' : 'tabs__control'} type="button"
                        onClick = {() => handleClick()}
                      >Описание
                      </button>
                    </div>
                    <ProductTabs camera = {camera} specifications = {specifications} information = {information}/>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="page-content__section">
            <section className="product-similar">
              <div className="container">
                <h2 className="title title--h3">Похожие товары</h2>
                {/* <SimilarCardsList
                  sliderPageCount = { sliderPageCount }
                  currentSliderCameras = { currentSliderCameras }
                  currentSliderPage = { currentSliderPage }
                /> */}
                <SimilarCardsSlider similarCameras = { similarCameras } />
              </div>
            </section>
          </div>
          <div className="page-content__section">
            <section className="review-block">
              <div className="container">
                <div className="page-content__headed">
                  <h2 className="title title--h3">Отзывы</h2>
                  <button className="btn" type="button">Оставить свой отзыв</button>
                </div>
                <ReviewCardList reviews = { reviews }/>
                <div className="review-block__buttons">
                  <button className="btn btn--purple" type="button">Показать больше отзывов
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <a className="up-btn" href="#header">
        <svg width="12" height="18" aria-hidden="true">
          <use xlinkHref="#icon-arrow2"></use>
        </svg>
      </a>
      <Footer/>
    </>
  ) : <LoadingScreen/>;
}

export default ProductScreen;
