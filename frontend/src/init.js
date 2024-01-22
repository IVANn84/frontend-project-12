import { createInstance } from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import React from 'react';
import store from './slices/index.js';
import { Provider } from 'react-redux';
import resources from './locales/index.js';
import App from './Components/App.jsx';
import io from 'socket.io-client';
import FilterProvider from './context/FilterProvider .jsx';
import SocketProvider from './context/SocketProvider.jsx';
import { actions as channelsActions } from './slices/channelsSlice.js';
import { actions as messagesActions } from './slices/messagesSlice.js';

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

  socket.on('newMessage', (payload) => {
    store.dispatch(messagesActions.addMessage(payload));
  });
  socket.on('newChannel', (payload) =>
    store.dispatch(channelsActions.addChannel(payload))
  );
  socket.on('removeChannel', (channel) =>
    store.dispatch(channelsActions.removeChannel(channel.id))
  );

  socket.on('renameChannel', (channel) =>
    store.dispatch(
      channelsActions.renameChannel({
        id: channel.id,
        changes: { name: channel.name },
      })
    )
  );
  return (
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
  );
};

export default init;
