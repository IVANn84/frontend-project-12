import axios from 'axios';
import React, { useEffect, useState } from 'react';
import routes from '../hooks/routes';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  if (userId && userId.token) {
    return { Authorization: 'Bearer${userId.token}' };
  }
  return {};
};

// const MainPage = () => <div>MainPage</div>;
const MainPage = () => {
  useEffect(() => {
    const fetchData = async () =>
      await axios.get(routes.usersPath(), { headers: getAuthHeader() });
    fetchData();
  }, []);

  return <div>MainPage</div>;
};
export default MainPage;
