import { createContext, useState } from 'react';

export const authContext = createContext({});

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem('userId')).username;

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };
  return (
    <authContext.Provider value={{ logIn, logOut, loggedIn, currentUser }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
