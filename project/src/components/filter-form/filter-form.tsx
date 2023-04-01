import { CATEGORIES, CATEGORIES_OPTIONS, TYPES, TYPES_OPTIONS, LEVELS, LEVEL_OPTIONS, Categories, CamerasTypes, CamerasLevel } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ChangeEvent } from 'react';
import { changePrice, changePriceUp, changeCategory, changeType, changeLevel, setInitialFilterState } from '../../store/catalog-data/catalog-data';

function FilterForm (): JSX.Element {

  const dispatch = useAppDispatch();
  const currentPrice = useAppSelector((state) => state.CATALOG.price);
  const currentPriceUp = useAppSelector((state) => state.CATALOG.priceUp);
  const currentCategory = useAppSelector((state) => state.CATALOG.category);
  const currentTypes = useAppSelector((state) => state.CATALOG.types);
  const currentLevels = useAppSelector((state) => state.CATALOG.levels);

  const handlePriceChange = (
    evt: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = evt.target;
    dispatch(changePrice(Number(value)));
  };

  const handlePriceUpChange = (
    evt: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = evt.target;
    dispatch(changePriceUp(Number(value)));
  };

  return (
    <div className="catalog-filter">
      <form action="#">
        <h2 className="visually-hidden">Фильтр</h2>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Цена, ₽</legend>
          <div className="catalog-filter__price-range">
            <div className="custom-input">
              <label>
                <input type="number" name="price" placeholder="от"
                  onChange = { handlePriceChange }
                />
              </label>
            </div>
            <div className="custom-input">
              <label>
                <input type="number" name="priceUp" placeholder="до"
                  onChange = { handlePriceUpChange }
                />
              </label>
            </div>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Категория</legend>
          {
            CATEGORIES.map((category) => (
              <div className="custom-checkbox catalog-filter__item" key={Math.random()}>
                <label>
                  <input type="checkbox" name={category} checked = { category === currentCategory }
                    onChange = {() => dispatch(changeCategory(category as Categories))}
                  />
                  <span className="custom-checkbox__icon">
                  </span><span className="custom-checkbox__label">{CATEGORIES_OPTIONS[category]}</span>
                </label>
              </div>
            ))
          }
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Тип камеры</legend>
          {
            TYPES.map((type) => (
              <div className="custom-checkbox catalog-filter__item" key={Math.random()}>
                <label>
                  <input type="checkbox" name={type} checked = { currentTypes.indexOf(type as CamerasTypes) !== -1 }
                    onChange = {() => dispatch(changeType(type as CamerasTypes))}
                    disabled = { currentCategory === 'videocamera' && (type === 'snapshot' || type === 'film' )}
                  />
                  <span className="custom-checkbox__icon">
                  </span>
                  <span className="custom-checkbox__label">{TYPES_OPTIONS[type]}</span>
                </label>
              </div>
            ))
          }
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Уровень</legend>
          {
            LEVELS.map((level) => (
              <div className="custom-checkbox catalog-filter__item" key={Math.random()}>
                <label>
                  <input type="checkbox" name={level} checked = { currentLevels.indexOf(level as CamerasLevel) !== -1 }
                    onChange = {() => dispatch(changeLevel(level as CamerasLevel))}
                  />
                  <span className="custom-checkbox__icon"></span>
                  <span className="custom-checkbox__label">{LEVEL_OPTIONS[level]}</span>
                </label>
              </div>
            ))
          }
        </fieldset>
        <button className="btn catalog-filter__reset-btn" type="reset"
          onClick={() => dispatch(setInitialFilterState())}
          disabled = {(currentPrice === 0 && currentPriceUp === 0 && Object.keys(currentCategory).length === 0 && currentTypes.length === 0 && currentLevels.length === 0)}
        >Сбросить фильтры
        </button>
      </form>
    </div>
  );
}

export default FilterForm;
