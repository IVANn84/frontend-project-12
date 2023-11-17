import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';
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
  // const auth = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(routes.usersPath(), {
        headers: getAuthHeader(),
      });
      const { channels, messages } = data;
      // debugger;
      dispatch(channelsActions.setChannels(channels));
      dispatch(messagesActions.setMessages(messages));
    };

    fetchData();
  }, []);

  return <div>MainPage</div>;
};
export default MainPage;
