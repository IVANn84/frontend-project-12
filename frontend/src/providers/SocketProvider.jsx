import {
  createContext, useMemo, useTransition, useCallback,
} from 'react';
import { toast } from 'react-toastify';

import { useDispatch } from 'react-redux';
import { addChannel, setCurrentChannel } from '../slices/channelsSlice.js';

export const SocketContext = createContext({});
const SocketProvider = ({ socket, children }) => {
  const { t } = useTransition();
  const dispatch = useDispatch();

  const newMessage = useCallback(
    async (messageData) => {
      await socket.emit('newMessage', messageData, ({ status }) => {
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
    dispatch(addChannel(data));
    dispatch(setCurrentChannel(data.id));
  }, [dispatch, socket]);

  const removeChannel = useCallback(
    async (channelId) => {
      await socket.emit('removeChannel', { id: channelId });
    },
    [socket],
  );

  const renameChannel = useCallback(
    async (channelId, newNameChannel) => {
      await socket.emit('renameChannel', { id: channelId, name: newNameChannel });
    },
    [socket],
  );

  const context = useMemo(
    () => ({
      newMessage,
      newChannel,
      removeChannel,
      renameChannel,
    }),
    [newMessage, newChannel, removeChannel, renameChannel],
  );

  return (
    <SocketContext.Provider value={context}>{children}</SocketContext.Provider>
  );
};
export default SocketProvider;
