import React from 'react';
import { STARS_COUNT } from '../../const';

type StarsRateProps = {
  rating: number;
};

function StarsRate ({rating}: StarsRateProps): JSX.Element {
  return (
    <React.Fragment>
      {Array.from({length: STARS_COUNT}, (_, i) => i + 1).map((e, _) =>
        (
          <React.Fragment key={e}>
            <svg width="17" height="16" aria-hidden="true" data-testid="star">
              {
                e <= rating ? (<use xlinkHref="#icon-full-star" data-testid="full-star"></use>) : (<use xlinkHref="#icon-star"></use>)
              }
            </svg>
          </React.Fragment>))}
      <p className="visually-hidden">Рейтинг: {rating}</p>
    </React.Fragment>
  );
}

export default StarsRate;
