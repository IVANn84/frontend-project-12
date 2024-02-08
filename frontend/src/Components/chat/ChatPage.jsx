import { Spinner } from 'react-bootstrap';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { actions as messagesActions } from '../../slices/messagesSlice.js';
import { actions as channelsActions } from '../../slices/channelsSlice.js';
import ChannelsBox from '../channels/ChannelsBox.jsx';
import getModalComponent from '../modals/index.js';
import ChatBox from './ChatBox.jsx';
import routes from '../../hooks/routes.js';
import getAuthHeader from '../api/getAuthHeader.js';

import { useApi, useSocket } from '../../hooks/index.js';

const ChatPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [fetching, setFetching] = useState(true);
  const type = useSelector((state) => state.modals.type);
  const {
    addMessage, newChannel, removeChannel, renameChannel,
  } = useApi();
  const { socket } = useSocket();

  useEffect(() => {
    const f = () => {
      socket.on('newMessage', (payload) => addMessage(payload));
      socket.on('newChannel', (payload) => newChannel(payload));
      socket.on('removeChannel', ({ id }) => removeChannel(id));
      socket.on('renameChannel', (channel) => renameChannel(channel));
      return () => {
        socket.off('newMessage', addMessage);
        socket.off('newChannel', newChannel);
        socket.off('removeChannel', removeChannel);
        socket.off('renameChannel', renameChannel);
      };
    };

    const fetchData = async () => {
      try {
        const { data } = await axios.get(routes.usersPath(), {
          headers: getAuthHeader(),
        });
        const { channels, messages } = data;

        dispatch(channelsActions.addChannels(channels));
        dispatch(messagesActions.addMessages(messages));
        setFetching(false);
      } catch (error) {
        if (error.isAxiosError && error.response.status === 401) {
          toast.error(t('notification.notАuthorized'));
        } else {
          toast.error(t('notification.another'));
        }
      }
    };
    f();
    fetchData();
  });

  return fetching ? (
    <div className="h-100 d-flex justify-content-center align-items-center">
      <Spinner animation="border" role="status" variant="primary">
        <span className="visually-hidden">0 сообщений</span>
      </Spinner>
    </div>
  ) : (
    <>
      {getModalComponent(type)}
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <ChannelsBox />
          </div>
          <div className="col p-0 h-100">
            <ChatBox />
          </div>
        </div>
      </div>
    </>
  );
};
export default ChatPage;
