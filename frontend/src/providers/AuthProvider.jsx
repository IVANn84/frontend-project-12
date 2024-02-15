import {
  createContext, useCallback, useMemo, useState,
} from 'react';

export const authContext = createContext({});

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('userId'));
  const [user, setUser] = useState(
    currentUser ? { username: currentUser.username } : null,
  );

  const logIn = useCallback((userData) => {
    localStorage.setItem('userId', JSON.stringify(userData));
    setUser({ username: userData.username });
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('userId');
    setUser(null);
  }, []);

  const context = useMemo(
    () => ({ logIn, logOut, user }),
    [logIn, logOut, user],
  );

  return (
    <authContext.Provider value={context}>{children}</authContext.Provider>
  );
};

export default AuthProvider;
