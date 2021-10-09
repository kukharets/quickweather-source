import React from 'react';

import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './views/App';
import store from './state/store';
import 'react-perfect-scrollbar/dist/css/styles.css';
import history from './utils/history';
import './views/styles/App.scss';

render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
