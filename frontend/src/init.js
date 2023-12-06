import { createInstance } from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import React from 'react';
import store from './slices/index.js';
import { Provider } from 'react-redux';
import resources from './locales/index.js';
import App from './Components/App.jsx';
import io from 'socket.io-client';
import AuthProvider from './context/AuthProvider.jsx';
import SocketProvider from './context/SocketProvider.jsx';

const init = async () => {
  const i18n = createInstance();
  const options = {
    resources,
    fallbackLng: 'ru',
    // interpolation: {
    //   escapeValue: false,
    // },
  };
  await i18n.use(initReactI18next).init(options);
  const socket = new io();

  return (
    <Provider store={store}>
      <AuthProvider>
        <SocketProvider socket={socket}>
          <I18nextProvider i18n={i18n}>
            <React.StrictMode>
              <App />
            </React.StrictMode>
          </I18nextProvider>
        </SocketProvider>
      </AuthProvider>
    </Provider>
  );
};

export default init;
