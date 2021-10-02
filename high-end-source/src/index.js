import React from 'react';

import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';

import App from './views/App';
import store from './state/store';
import 'react-perfect-scrollbar/dist/css/styles.css';
import history from './utils/history';
import './views/styles/App.scss';

render(
  <ReduxProvider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </ReduxProvider>,
  document.getElementById('root'),
);
