import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import App from './src/views/App';
import store from './src/state/store';
import history from './src/utils/history';
import './src/views/styles/App.scss';

const RootHtml = () => (
  <ReduxProvider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </ReduxProvider>
);
render(<RootHtml />, document.getElementById('root'));
