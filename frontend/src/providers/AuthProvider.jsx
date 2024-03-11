/* eslint-disable no-debugger */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable indent */
import {
  createContext, useCallback, useMemo, useState,
} from 'react';

export const authContext = createContext({});

const AuthProvider = ({ children }) => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  const [user, setUser] = useState(
    userId ? { username: userId.username } : null,
  );

  const getAuthHeader = () => ((userId && userId.token) ? userId.token : {});
      // return { Authorization: `Bearer ${userId.token}` };
  const logIn = useCallback((userData) => {
    localStorage.setItem('userId', JSON.stringify(userData));
    setUser({ username: userData.username });
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('userId');
    setUser(null);
  }, []);

  const context = useMemo(
    () => ({
      logIn, logOut, user, getAuthHeader,
    }),
    [logIn, logOut, user, getAuthHeader],
  );

  return (
    <authContext.Provider value={context}>{children}</authContext.Provider>
  );
};

export default AuthProvider;
