import React from 'react';
import { Review } from '../../types/review';
import { STARS_COUNT } from '../../const';

type ReviewProps = {
  reviewItem: Review;
}

function formatDate(date: Date | undefined): string {
  return date ? String(date.toLocaleString('ru-ru', { day: 'numeric', month: 'long', year: undefined })) : '';
}

function ReviewCard ({ reviewItem }: ReviewProps): JSX.Element {
  const {userName, dateTyped, rating, advantage, disadvantage, review} = reviewItem;
  const formatedDate = formatDate(dateTyped);
  return (
    <>
      <div className="review-card__head">
        <p className="title title--h4">{userName}</p>
        <time className="review-card__data">{formatedDate}</time>
      </div>
      <div className="rate review-card__rate">
        {Array.from({length: STARS_COUNT}, (_, i) => i + 1).map((e, _) =>
          (
            <React.Fragment key={e}>
              <svg width="17" height="16" aria-hidden="true">
                {
                  e <= rating ? (<use xlinkHref="#icon-full-star"></use>) : (<use xlinkHref="#icon-star"></use>)
                }
              </svg>
            </React.Fragment>))}
        <p className="visually-hidden">Оценка: {rating}</p>
      </div>
      <ul className="review-card__list">
        <li className="item-list"><span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">{advantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{disadvantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">{review}</p>
        </li>
      </ul>
    </>
  );
}

export default ReviewCard;
