import { AppRoute } from '../../const';
import { Link } from 'react-router-dom';

type BreadcrumbsProps = {
  name: string | null;
};

function Breadcrumbs ({ name }: BreadcrumbsProps): JSX.Element {
  return (
    <div className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          <li className="breadcrumbs__item">
            <Link to={AppRoute.Catalog} className="breadcrumbs__link">Главная
              <svg width="5" height="8" aria-hidden="true">
                <use xlinkHref="#icon-arrow-mini"></use>
              </svg>
            </Link>
          </li>
          {
            name ? (
              <>
                <li className="breadcrumbs__item">
                  <Link to={AppRoute.Catalog} className="breadcrumbs__link">Каталог
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </Link>
                </li>
                <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">{name}</span>
                </li>
              </>
            ) : (
              <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">Каталог</span>
              </li>
            )
          }
        </ul>
      </div>
    </div>
  );
}

export default Breadcrumbs;
