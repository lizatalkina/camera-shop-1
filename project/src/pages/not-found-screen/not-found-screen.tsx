import { AppRoute } from '../../const';
import { Link } from 'react-router-dom';

function NotFoundScreen (): JSX.Element {
  return (
    <main style={{background: 'linear-gradient(white, #757575)'}}>
      <div className="page-content">
        <div className="container" >
          <h1>404. Страница не найдена</h1>
          <span style={{textDecoration: 'underline'}}>
            <Link to={AppRoute.Catalog}>На главную</Link>
          </span>
        </div>
      </div>
    </main>
  );
}

export default NotFoundScreen;
