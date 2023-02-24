import { Camera } from '../../types/camera';
import ProductCard from '../product-card/product-card';
import { useState } from 'react';

type SliderProps = {
  similarCameras: Camera[];
}

const SIMILAR_CARDS_SIZE = 3;


function SimilarCardsSlider ({similarCameras}: SliderProps ): JSX.Element {
  const sliderPageCount = Math.ceil(similarCameras.length / SIMILAR_CARDS_SIZE);
  const [currentSliderPage, setCurrentSliderPage] = useState(1);

  const handleChangePrev = () => {
    setCurrentSliderPage(currentSliderPage - 1);
  };

  const handleChangeNext = () => {
    setCurrentSliderPage(currentSliderPage + 1);
  };

  return (
    <div className="product-similar__slider">
      <div className="product-similar__slider-list">
        {
          similarCameras.map((similarCamera, i) => (
            <div className={(i > currentSliderPage * 3 - 4) && (i < currentSliderPage * 3) ? 'product-card is-active' : 'product-card'} key={similarCamera.id}>
              <ProductCard camera = { similarCamera }/>
            </div>
          ))
        }
      </div>
      <button style={{ pointerEvents: 'auto' }} className="slider-controls slider-controls--prev" type="button" aria-label="Предыдущий слайд" disabled = {currentSliderPage === 1}
        onClick={handleChangePrev}
      >
        <svg width="7" height="12" aria-hidden="true">
          <use xlinkHref="#icon-arrow"></use>
        </svg>
      </button>
      <button style={{ pointerEvents: 'auto' }} className="slider-controls slider-controls--next" type="button" aria-label="Следующий слайд" disabled = {currentSliderPage === sliderPageCount}
        onClick={handleChangeNext}
      >
        <svg width="7" height="12" aria-hidden="true">
          <use xlinkHref="#icon-arrow"></use>
        </svg>
      </button>
    </div>
  );
}

export default SimilarCardsSlider;
