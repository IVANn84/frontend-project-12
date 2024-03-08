import { createContext } from 'react';

export const SocketContext = createContext({});

const SocketProvider = ({ socket, children }) => {
  const sockets = {
    newMessage: async (messageData) => socket.emitWithAck('newMessage', messageData),
    newChannel: async (newNameChannel) => {
      const { data } = await socket.emitWithAck('newChannel', {
        name: newNameChannel,
      });
      return data;
    },
    removeChannel: async (channelId) => socket.emitWithAck('removeChannel', { id: channelId }),
    renameChannel: async (channelId, newNameChannel) => {
      await socket.emitWithAck('renameChannel', {
        id: channelId,
        name: newNameChannel,
      });
    },
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const context = {
    sockets,
  };

  return (
    <SocketContext.Provider value={context}>{children}</SocketContext.Provider>
  );
};
export default SocketProvider;
