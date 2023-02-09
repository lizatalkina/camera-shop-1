import ReviewCard from '../review-card/review-card';
import { Review } from '../../types/review';
import { REVIEWS_MAX_COUNT } from '../../const';

type ReviewsListProps = {
  reviews: Review[];
};

function ReviewCardList ({ reviews }: ReviewsListProps): JSX.Element {
  const reviewsToShow = reviews.map((review) => ({ ...review,
    dateTyped: new Date(review.createAt),
  })).sort((a, b) =>
    b.dateTyped.valueOf() - a.dateTyped.valueOf()
  ).slice(0, REVIEWS_MAX_COUNT);
  return (
    <ul className="review-block__list">
      {
        reviewsToShow.map((reviewToShow) => (
          <li className="review-card" key={ reviewToShow.id}>
            <ReviewCard reviewItem = { reviewToShow }/>
          </li>
        ))
      }
    </ul>
  );
}

export default ReviewCardList;
