import { createContext, useMemo, useTransition } from 'react';
import { UseTranslationOptions } from 'react-i18next';
import { toast } from 'react-bootstrap';
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

  const context = useMemo(() => ({
    newMessage,
  }));
  return (
    <SocketContext.Provider value={context}>{children}</SocketContext.Provider>
  );
};
export default SocketProvider;
