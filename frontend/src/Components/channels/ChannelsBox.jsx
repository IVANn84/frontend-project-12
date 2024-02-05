import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Channel from './Channel.jsx';
import Channelicon from '../../icons/Channelicon.jsx';
import { actions as modalsActions } from '../../slices/modalsSlice.js';
import { actions as channelsActions, selectorsChannels } from '../../slices/channelsSlice.js';

const ChannelsBox = () => {
  const { t } = useTranslation();
  const channels = useSelector(selectorsChannels.selectAll);
  const currentChannelId = useSelector(
    (state) => state.channels.currentChannelId,
  );
  const dispatch = useDispatch();
  const handleAddChannel = () => dispatch(modalsActions.openModal({ type: 'addChannel' }));

  const handleChoose = (id) => dispatch(channelsActions.setCurrentChanel(id));
  const handleRemoveChannel = (id) => dispatch(
    modalsActions.openModal({
      type: 'removeChannel',
      extra: { channalId: id },
    }),
  );
  const handleRenameChannel = (id) => dispatch(
    modalsActions.openModal({
      type: 'renameChannel',
      extra: { channalId: id },
    }),
  );
  return (
    <>
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('chat.channels')}</b>
        <Button
          type="button"
          variant="group-vertical"
          className="p-0 text-primary"
          onClick={handleAddChannel}
        >
          <Channelicon />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ul
        id="channels-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {channels.map((channel) => (
          <Channel
            key={channel.id}
            channel={channel}
            handleChoose={handleChoose}
            currentChannelId={currentChannelId}
            handleRemoveChannel={handleRemoveChannel}
            handleRenameChannel={handleRenameChannel}
          />
        ))}
      </ul>
    </>
  );
};
export default ChannelsBox;
