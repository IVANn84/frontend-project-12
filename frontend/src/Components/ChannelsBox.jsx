import { useSelector } from 'react-redux';
import { selectorsChannels } from '../slices/channelsSlice.js';
import { Dropdown, Button, ButtonGroup } from 'react-bootstrap';
import Channelicon from '../icons/Channelicon.jsx';
import { useTranslation } from 'react-i18next';

const Channel = ({ channel }) => {
  const currentChannelId = useSelector(
    (state) => state.channels.currentChannelId
  );

  const variant = channel.id === currentChannelId ? 'secondary' : null;

  return (
    <li key={channel.id} className="nav-item w-100">
      {channel.removable ? (
        <Dropdown as={ButtonGroup} className="d-flex">
          <Button
            type="button"
            key={channel.id}
            className="w-100 rounded-0 text-start text-truncate"
            onClick={handleChoose}
            variant={variant}
          >
            <span className="me-1">#</span>
            {channel.name}
          </Button>
          <Dropdown.Toggle split className="flex-grow-0" variant={variant}>
            <span className="visually-hidden">{t('channels.menu')}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleRemove(channel.id)}>
              {t('channels.remove')}
            </Dropdown.Item>
            <Dropdown.Item onClick={handleRename(channel.id)}>
              {t('channels.rename')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Button
          type="button"
          key={channel.id}
          className="w-100 rounded-0 text-start text-truncate"
          variant={variant}
        >
          <span className="me-1">#</span>
          {channel.name}
        </Button>
      )}
    </li>
  );
};


const ChannelsBox = () => {
  const { t } = useTranslation();

  const channels = useSelector(selectorsChannels.selectAll);
  return (
    <>
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('chat.channels')}</b>
        <Button
          type="button"
          variant="group-vertical"
          className="p-0 text-primary"
          // onClick={handleAddChannel}
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
          <Channel key={channel.id} channel={channel} />
        ))}
      </ul>
    </>
  );
};
export default ChannelsBox;
