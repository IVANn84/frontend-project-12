import { createContext, useState } from 'react';

export const authContext = createContext({});

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('userId')).name;
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = (userData) => {
    localStorage.setItem('userId', JSON.stringify(userData));
    setLoggedIn(true);
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  const getAuthHeader = () => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    if (userId && userId.token) {
      return { Authorization: `Bearer ${userId.token}` };
    }
    return {};
  };

  return (
    <authContext.Provider
      value={{ logIn, logOut, loggedIn, getAuthHeader, currentUser }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
