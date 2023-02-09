import ProductCard from '../product-card/product-card';
import { Camera } from '../../types/camera';
import SliderControlButtons from '../slider-control-buttons/slider-control-buttons';

type SliderProps = {
  sliderPageCount: number;
  currentSliderCameras: Camera[];
  currentSliderPage: number;
}

function SimilarCardsList ({ sliderPageCount, currentSliderCameras, currentSliderPage}: SliderProps): JSX.Element {

  return (
    <div className="product-similar__slider">
      <div className="product-similar__slider-list">
        {
          currentSliderCameras.map((currentSliderCamera) => (
            <div className="product-card is-active" key={currentSliderCamera.id}>
              <ProductCard camera = { currentSliderCamera }/>
            </div>
          ))
        }
        <SliderControlButtons
          sliderPageCount = { sliderPageCount }
          currentSliderPage = { currentSliderPage }
        />
      </div>
    </div>
  );
}

export default SimilarCardsList;
