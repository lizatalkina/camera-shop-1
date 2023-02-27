import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { store } from './store';
import { fetchCamerasAction, fetchPromoAction } from './store/api-actions';
import { ToastContainer } from 'react-toastify';
import HistoryRouter from './components/history-route/history-route';
import browserHistory from './browser-history';

store.dispatch(fetchCamerasAction());
store.dispatch(fetchPromoAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store = { store }>
      <HistoryRouter history = {browserHistory} >
        <ToastContainer/>
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
);
