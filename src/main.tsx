import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { App } from '@root/App';

import { ServicesProvider } from '@providers/ServicesProvider';
import { store, persistor } from '@root/store';

import { theme } from '@root/App.styles';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ServicesProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ServicesProvider>
      </PersistGate>
    </Provider>
  </ThemeProvider>,
);
