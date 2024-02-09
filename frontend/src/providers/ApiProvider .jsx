import { createContext, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';

export const apiContext = createContext({});

const ApiProvider = ({ children }) => {
  const dispatch = useDispatch();
  const addMessage = useCallback(
    (payload) => dispatch(messagesActions.addMessage(payload)),
    [dispatch],
  );

  const newChannel = useCallback(
    (payload) => {
      dispatch(channelsActions.addChannel(payload));
    },
    [dispatch],
  );

  const removeChannel = useCallback(
    (id) => dispatch(channelsActions.removeChannel(id)),
    [dispatch],
  );

  const renameChannel = useCallback(
    (channel) => dispatch(channelsActions.renameChannel({
      id: channel.id,
      changes: { name: channel.name },
    })),
    [dispatch],
  );

  const context = useMemo(
    () => ({
      addMessage,
      newChannel,
      removeChannel,
      renameChannel,
    }),
    [addMessage, newChannel, removeChannel, renameChannel],
  );
  return <apiContext.Provider value={context}>{children}</apiContext.Provider>;
};
export default ApiProvider;
