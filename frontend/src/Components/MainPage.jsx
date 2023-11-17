import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import useAuth from '../hooks/index.jsx';
import routes from '../hooks/routes';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }
  return {};
};

const MainPage = () => {
  
  const dispatch = useDispatch();
  const autch = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(routes.usersPath(), {
        headers: getAuthHeader(),
      });
      const { channels } = data;
      // debugger;
      dispatch(channelsActions.setChannels(channels));
    };

    fetchData();
  }, []);

  return <div>MainPage</div>;
};
export default MainPage;
