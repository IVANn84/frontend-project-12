import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectorsChannels } from '../slices/channelsSlice.js';
import { selectorsMessage } from '../slices/messagesSlice.js';
import Message from './messages/Message.jsx';
import NewMessageForm from './messages/NewMessageForm.jsx';
import { useTranslation } from 'react-i18next';

const ChatBox = () => {
  const { t } = useTranslation();
  const currentChannelId = useSelector(
    (state) => state.channels.currentChannelId
  );

  const currentChannel = useSelector((state) =>
    selectorsChannels.selectById(state, currentChannelId)
  );

  const messages = useSelector(selectorsMessage.selectAll).filter(
    ({ channelId }) => channelId === currentChannelId
  );

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>{`# ${currentChannel.name}`}</b>
        </p>
        <span className="text-muted">
          {`${t('messagesCounter.messages', {
            count: messages.length,
          })}`}
        </span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5 ">
        {messages.map(({ id, username, body }) => (
          <Message key={id} username={username} body={body} />
        ))}
      </div>
      <div className="mt-auto px-5 py-3">
        <NewMessageForm channel={currentChannel} />
      </div>
    </div>
  );
};

export default ChatBox;
