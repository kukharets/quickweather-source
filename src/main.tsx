import { createRoot } from 'react-dom/client';
import { App } from '@root/App';
import { ThemeProvider } from 'styled-components';
import { theme } from '@root/App.styles';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { Provider } from 'react-redux';
import { ServicesProvider } from '@providers/ServicesProvider';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ServicesProvider>
          <App />
        </ServicesProvider>
      </PersistGate>
    </Provider>
  </ThemeProvider>,
);
