import {
  createContext, useCallback, useMemo, useState,
} from 'react';

export const authContext = createContext({});

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('userId'));
  const [loggedIn, setLoggedIn] = useState(
    currentUser ? { username: currentUser.username } : null,
  );

  const logIn = useCallback((userData) => {
    localStorage.setItem('userId', JSON.stringify(userData));
    setLoggedIn({ username: userData.username });
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('userId');
    setLoggedIn(null);
  }, []);

  const context = useMemo(
    () => ({ logIn, logOut, loggedIn }),
    [logIn, logOut, loggedIn],
  );

  return (
    <authContext.Provider value={context}>{children}</authContext.Provider>
  );
};

export default AuthProvider;
