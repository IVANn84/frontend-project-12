import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import NotFoundPage from './Components/NotFoundPage.jsx';
import PageLogin from './Components/PageLogin.jsx';
import MainPage from './Components/MainPage.jsx';
import { Button, Navbar } from 'react-bootstrap';
import authContext from './context/index.jsx';
import useAuth from './hooks/index.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };
  return (
    <authContext.Provider value={{ logIn, logOut, loggedIn }}>
      {children}
    </authContext.Provider>
  );
};
const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const locattion = useLocation();
  return auth.loggedIn ? (
    children
  ) : (
    <Navigate
      to="/login"
      state={{ from: locattion }}
    /> /*разобраться с путем login */
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<PageLogin />}></Route>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <MainPage />
              </PrivateRoute>
            }
          ></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
