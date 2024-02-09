import { createInstance } from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import React from 'react';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import store from './slices/index.js';
import resources from './locales/index.js';
import App from './Components/App.jsx';
import FilterProvider from './providers/FilterProvider .jsx';
import SocketProvider from './providers/SocketProvider.jsx';
import ApiProvider from './providers/ApiProvider .jsx';

const rollbarConfig = {
  accessToken: '34607810623f474b9e09d64f3f48df6f',
  environment: 'testenv',
};

const init = async () => {
  const i18n = createInstance();
  const options = {
    resources,
    fallbackLng: 'ru',
  };
  await i18n.use(initReactI18next).init(options);

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <SocketProvider>
            <ApiProvider>
              <FilterProvider>
                <I18nextProvider i18n={i18n}>
                  <React.StrictMode>
                    <App />
                  </React.StrictMode>
                </I18nextProvider>
              </FilterProvider>
            </ApiProvider>
          </SocketProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
