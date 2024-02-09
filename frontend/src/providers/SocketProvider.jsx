import {
  createContext, useMemo, useTransition, useCallback,
} from 'react';
import { toast } from 'react-toastify';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { actions as channelsActions } from '../slices/channelsSlice.js';

export const SocketContext = createContext({});
const SocketProvider = ({ children }) => {
  const { t } = useTransition();
  const dispatch = useDispatch();
  const socket = io();

  const newMessage = useCallback(
    async (messageData) => {
      socket.emit('newMessage', messageData, ({ status }) => {
        if (status !== 'ok') {
          toast.error(t('notifications.errMessage'));
        }
      });
    },
    [socket, t],
  );

  const newChannel = useCallback(async (newNameChannel) => {
    const { data } = await socket.emitWithAck('newChannel', {
      name: newNameChannel,
    });
    dispatch(channelsActions.addChannel(data));
    dispatch(channelsActions.setCurrentChanel(data.id));
  }, [dispatch, socket]);

  const removeChannel = useCallback(
    (channelId) => {
      socket.emit('removeChannel', { id: channelId });
    },
    [socket],
  );

  const renameChannel = useCallback(
    (channelId, newNameChannel) => {
      socket.emit('renameChannel', { id: channelId, name: newNameChannel });
    },
    [socket],
  );

  const context = useMemo(
    () => ({
      socket,
      newMessage,
      newChannel,
      removeChannel,
      renameChannel,
    }),
    [socket, newMessage, newChannel, removeChannel, renameChannel],
  );

  return (
    <SocketContext.Provider value={context}>{children}</SocketContext.Provider>
  );
};
export default SocketProvider;
