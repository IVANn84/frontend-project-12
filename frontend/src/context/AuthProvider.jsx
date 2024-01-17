import { createContext, useState } from 'react';

export const authContext = createContext({});

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('userId'));
  const [loggedIn, setLoggedIn] = useState(
    currentUser ? { username: currentUser.username } : null
  );

  const logIn = (userData) => {
    localStorage.setItem('userId', JSON.stringify(userData));
    setLoggedIn({ username: userData.username });
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(null);
  };

  const getAuthHeader = () => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    if (userId && userId.token) {
      return { Authorization: `Bearer ${userId.token}` };
    }
    return {};
  };

  return (
    <authContext.Provider value={{ logIn, logOut, loggedIn, getAuthHeader }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
