import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import App from './App';
import './styles/App.scss';
import index from './store';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { history } from './helpers/history';

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

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={index}>
      <Router history={history}>
        <Route path="/" component={App} />
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root'),
);
