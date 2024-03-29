import ReviewCard from '../review-card/review-card';
import { Review } from '../../types/review';
import { REVIEWS_MAX_COUNT } from '../../const';
import { useState } from 'react';

type ReviewsListProps = {
  reviews: Review[];
};

function ReviewCardList ({ reviews }: ReviewsListProps): JSX.Element {
  const [countOfVisibleReviews, setCountOfVisibleReviews] = useState(REVIEWS_MAX_COUNT);
  const reviewsToShow = reviews.map((review) => ({ ...review,
    dateTyped: new Date(String(review.createAt)),
  })).sort((a, b) =>
    b.dateTyped.valueOf() - a.dateTyped.valueOf()
  ).slice(0, countOfVisibleReviews);

  const handleButtonClick = () => {
    setCountOfVisibleReviews(countOfVisibleReviews + REVIEWS_MAX_COUNT);
  };

  return (
    <>
      <ul className="review-block__list" data-testid="reviews-block">
        {
          reviewsToShow.map((reviewToShow) => (
            <li className="review-card" key={ reviewToShow.id} data-testid="review-card">
              <ReviewCard reviewItem = { reviewToShow }/>
            </li>
          ))
        }
      </ul>
      {
        countOfVisibleReviews < reviews.length ? (
          <div className="review-block__buttons" data-testid="show-more-button">
            <button className="btn btn--purple" type="button"
              onClick={handleButtonClick}
            >Показать больше отзывов
            </button>
          </div>
        ) : ''
      }
    </>
  );
}

export default ReviewCardList;
