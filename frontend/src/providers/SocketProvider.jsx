/* eslint-disable no-return-await */
/* eslint-disable no-debugger */
import {
  createContext, useMemo, useCallback,
} from 'react';

export const SocketContext = createContext({});
const SocketProvider = ({ socket, children }) => {
  const newMessage = useCallback(
    async (messageData) => {
      await socket.emitWithAck('newMessage', messageData);
    },
    [socket],
  );

  const newChannel = useCallback(async (newNameChannel) => await socket.emitWithAck('newChannel', {
    name: newNameChannel,
  }), [socket]);

  const removeChannel = useCallback(
    async (channelId) => {
      await socket.emitWithAck('removeChannel', { id: channelId });
    },
    [socket],
  );

  const renameChannel = useCallback(
    async (channelId, newNameChannel) => {
      await socket.emitWithAck('renameChannel', { id: channelId, name: newNameChannel });
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
