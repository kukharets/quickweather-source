import React from 'react';

import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import './views/styles/App.scss';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import App from './views/App';
import store from './state/store';
import 'react-perfect-scrollbar/dist/css/styles.css';
import history from './utils/history';

const theme = createMuiTheme({
  spacing: {
    unit: 5,
  },
  typography: {
    useNextVariants: true,
  },
  palette: {
    text: {
      primary: 'black',
    },
    primary: {
      main: '#368cbf',
      light: '#368cbf',
      ultralight: 'rgba(55,140,189,0.29)',
      contrastText: '#07cf64',
      dark: '#33363b',
    },
    secondary: {
      main: '#7ebc59',
      light: '#7ebc59',
      contrastText: '#eaeaea',
      dark: '#3d8366',
    },
    error: {
      main: '#bf4b06',
      light: '#ffa210',
      contrastText: '#cf5640',
      dark: '#830900',
      response: 'rgb(184,178,178)',
    },
    action: {
      selected: 'rgba(55,140,189,0.29)',
      hover: 'rgba(55,140,189,0.29)',
    },
  },
});

const RootHtml = () => (
  <MuiThemeProvider theme={theme}>
    <ReduxProvider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </ReduxProvider>
  </MuiThemeProvider>
);

render(<RootHtml />, document.getElementById('react-root'));
