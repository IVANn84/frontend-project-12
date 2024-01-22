import { createContext, useMemo, useTransition } from 'react';
import { useCallback } from 'react';

export const SocketContext = createContext({});
const SocketProvider = ({ socket, children }) => {
  const { t } = useTransition();

  const newMessage = async (messageData) => {
    socket.emit('newMessage', messageData, (error, response) => {
      // if (error) {
      //   throw new Error(error);
      //   // toast.error('ПИЗДЕЦ!!!');
      // }
    });
  };

  const newChannel = useCallback(
    (newNameChannel) => {
      socket.emit('newChannel', { name: newNameChannel });
    },
    [socket]
  );

  const removeChannel = useCallback(
    (channelId) => {
      socket.emit('removeChannel', { id: channelId });
    },
    [socket]
  );

  const renameChannel = useCallback(
    (channelId, newNameChannel) => {
      socket.emit('renameChannel', { id: channelId, name: newNameChannel });
    },
    [socket]
  );

  const context = useMemo(() => ({
    newMessage,
    newChannel,
    removeChannel,
    renameChannel,
  }));
  return (
    <SocketContext.Provider value={context}>{children}</SocketContext.Provider>
  );
};
export default SocketProvider;
