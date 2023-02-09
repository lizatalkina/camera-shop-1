import { Camera } from '../../types/camera';

type TapsProps = {
  camera: Camera;
  specifications: boolean;
  information: boolean;
};

function ProductTabs ({camera, specifications, information}: TapsProps): JSX.Element {
  return (
    <div className="tabs__content">
      <div className={ specifications ? 'tabs__element is-active' : 'tabs__element'}>
        <ul className="product__tabs-list">
          <li className="item-list"><span className="item-list__title">Артикул:</span>
            <p className="item-list__text"> {camera.vendorCode}</p>
          </li>
          <li className="item-list"><span className="item-list__title">Категория:</span>
            <p className="item-list__text">{camera.category}</p>
          </li>
          <li className="item-list"><span className="item-list__title">Тип камеры:</span>
            <p className="item-list__text">{camera.type}</p>
          </li>
          <li className="item-list"><span className="item-list__title">Уровень:</span>
            <p className="item-list__text">{camera.level}</p>
          </li>
        </ul>
      </div>
      <div className={ information ? 'tabs__element is-active' : 'tabs__element'}>
        <div className="product__tabs-text">
          {camera.description}
        </div>
      </div>
    </div>
  );
}

export default ProductTabs;
