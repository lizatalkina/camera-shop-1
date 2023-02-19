import React from 'react';
import { Camera } from '../../types/camera';
import { AppRoute } from '../../const';
import { Link } from 'react-router-dom';
import StarsRate from '../stars-rate/stars-rate';

type CameraProps = {
  camera: Camera;
};

function ProductCard ( { camera }: CameraProps): JSX.Element {
  const {id, name, previewImgWebp, previewImgWebp2x, previewImg, previewImg2x, price, rating, reviewCount } = camera;

  return (
    <>
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`${previewImgWebp}, ${previewImgWebp2x}`}/>
          <img src={previewImg} srcSet={previewImg2x} width="280" height="240" alt={name}/>
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <StarsRate rating={rating }/>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewCount}</p>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 }).format(price)}
        </p>
      </div>
      <div className="product-card__buttons">
        <button className="btn btn--purple product-card__btn" type="button">Купить
        </button>
        <Link to={AppRoute.Product.replace(':id', `${id}`)} className="btn btn--transparent">Подробнее
        </Link>
      </div>
    </>
  );
}

export default ProductCard;
