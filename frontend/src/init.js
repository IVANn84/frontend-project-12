import { createInstance } from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import React from 'react';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import store from './slices/index.js';
import resources from './locales/index.js';
import App from './Components/App.jsx';
import FilterProvider from './context/FilterProvider .jsx';
import SocketProvider from './context/SocketProvider.jsx';
import { actions as channelsActions } from './slices/channelsSlice.js';
import { actions as messagesActions } from './slices/messagesSlice.js';

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
  const socket = io();

  socket.on('newMessage', (payload) => {
    store.dispatch(messagesActions.addMessage(payload));
  });
  socket.on('newChannel', (payload) => store.dispatch(channelsActions.addChannel(payload)));
  socket.on('removeChannel', (channel) => store.dispatch(channelsActions.removeChannel(channel.id)));

  socket.on('renameChannel', (channel) => store.dispatch(
    channelsActions.renameChannel({
      id: channel.id,
      changes: { name: channel.name },
    }),
  ));
  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <FilterProvider>
            <SocketProvider socket={socket}>
              <I18nextProvider i18n={i18n}>
                <React.StrictMode>
                  <App />
                </React.StrictMode>
              </I18nextProvider>
            </SocketProvider>
          </FilterProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
