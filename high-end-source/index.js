import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';
import App from './src/views/App';
import store from './src/state/store';
import history from './src/utils/history';
import './src/views/styles/App.scss';

const RootHtml = () => (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);
render(<RootHtml />, document.getElementById('root'));
