// import { changeCurrentSliderPage } from '../../store/actions';
// import { useAppDispatch } from '../../hooks';

type SliderControlButtonProps = {
  sliderPageCount: number;
  currentSliderPage: number;
}

// const prevOnClick = () => {
//   // eslint-disable-next-line no-console
//   console.log('slider-controls slider-controls--prev onClick');
//   // eslint-disable-next-line no-alert
//   alert('slider-controls slider-controls--prev onClick');
//   // dispatch(changeCurrentSliderPage({currentSliderPage: currentSliderPage + 1}));
// };

// const nextOnClick = () => {
//   // eslint-disable-next-line no-console
//   console.log('slider-controls slider-controls--next onClick');
//   // eslint-disable-next-line no-alert
//   alert('slider-controls slider-controls--next onClick');
//   // dispatch(changeCurrentSliderPage({currentSliderPage: currentSliderPage - 1}));
// };

function SliderControlButtons ({sliderPageCount, currentSliderPage}: SliderControlButtonProps): JSX.Element {
  // const dispatch = useAppDispatch();

  // const nextOnClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
  //   evt.preventDefault();
  //   // eslint-disable-next-line no-console
  //   console.log('slider-controls slider-controls--next onClick');
  //   // dispatch(changeCurrentSliderPage({currentSliderPage: currentSliderPage - 1}));
  // };

  // const prevOnClick = () => {
  //   // eslint-disable-next-line no-console
  //   console.log('slider-controls slider-controls--prev onClick');
  //   // eslint-disable-next-line no-alert
  //   alert('slider-controls slider-controls--prev onClick');
  //   // dispatch(changeCurrentSliderPage({currentSliderPage: currentSliderPage + 1}));
  // };

  const nextOnClick = () => {
    // eslint-disable-next-line no-console
    console.log('slider-controls slider-controls--next onClick');
    // eslint-disable-next-line no-alert
    alert('slider-controls slider-controls--next onClick');
    // dispatch(changeCurrentSliderPage({currentSliderPage: currentSliderPage - 1}));
  };

  //
  //
  return (
    <button onClick={nextOnClick} className="slider-controls slider-controls--next" type="button" aria-label="Следующий слайд" disabled = {currentSliderPage === sliderPageCount}>
      <svg width="7" height="12" aria-hidden="true">
        <use xlinkHref="#icon-arrow"></use>
      </svg>
    </button>
    // <>
    //   <button onClick={() => prevOnClick()} className="slider-controls slider-controls--prev" type="button" aria-label="Предыдущий слайд" disabled = {currentSliderPage === 1}>
    //     {/* // onClick={(evt) => {
    //     //   evt.preventDefault();
    //     //   // eslint-disable-next-line no-console
    //     //   console.log('slider-controls slider-controls--prev onClick');
    //     //   dispatch(changeCurrentSliderPage({currentSliderPage: currentSliderPage - 1}));
    //     // }}
    //   //> */}
    //     <svg width="7" height="12" aria-hidden="true">
    //       <use xlinkHref="#icon-arrow"></use>
    //     </svg>
    //   </button>
    //   <button onClick={() => nextOnClick()} className="slider-controls slider-controls--next" type="button" aria-label="Следующий слайд" disabled = {currentSliderPage === sliderPageCount}>
    //     <svg width="7" height="12" aria-hidden="true">
    //       <use xlinkHref="#icon-arrow"></use>
    //     </svg>
    //   </button>
    //   {/* <button className="slider-controls slider-controls--next" type="button" aria-label="Следующий слайд" disabled = {currentSliderPage === sliderPageCount}
    //     onClick={(evt) => {
    //       evt.preventDefault();
    //       // eslint-disable-next-line no-console
    //       console.log('slider-controls slider-controls--next onClick');
    //       dispatch(changeCurrentSliderPage({currentSliderPage: currentSliderPage + 1}));
    //     }}
    //   >
    //     <svg width="7" height="12" aria-hidden="true">
    //       <use xlinkHref="#icon-arrow"></use>
    //     </svg>
    //   </button> */}
    // </>
  );
}

export default SliderControlButtons;
