import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';
import { Spinner, Modal } from 'react-bootstrap';
import ChannelsBox from './ChannelsBox.jsx';
import ChatBox from './ChatBox.jsx';
import useAuth from '../hooks/index.jsx';
import routes from '../hooks/routes.js';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }
  return {};
};

const MainPage = () => {
  const dispatch = useDispatch();
  const [fetching, setFetching] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(routes.usersPath(), {
          headers: getAuthHeader(),
        });
        const { channels, messages } = data;

        dispatch(channelsActions.addChannels(channels));
        dispatch(messagesActions.addMessages(messages));
        setFetching(false);
      } catch (error) {
        if (error.isAxiosError && error.response.status === 401) {
          return;
        }
      }
    };

    fetchData();
  }, []);

  return fetching ? (
    <div className="h-100 d-flex justify-content-center align-items-center">
      <Spinner animation="border" role="status" variant="primary">
        <span className="visually-hidden">0 сообщений</span>
      </Spinner>
    </div>
  ) : (
    <>
      {/* <Modal /> */}
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <ChannelsBox />
          </div>
          <div className="col p-0 h-100">
            <ChatBox />
          </div>
        </div>
      </div>
    </>
  );
};
export default MainPage;
