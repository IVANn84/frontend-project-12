import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import React, { useState } from 'react';
import NotFoundPage from './NotFoundPage.jsx';
import PageLogin from './PageLogin.jsx';
import ChatPage from './ChatPage.jsx';
import { Button } from 'react-bootstrap';
import authContext from '../context/index.jsx';
import Navbar from './Navbar.jsx';
import useAuth from '../hooks/index.jsx';

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
    <Navigate to="/login" state={{ from: locattion }} />
  );
};

const App = () => (
    <AuthProvider>
      <BrowserRouter>
        <div className="d-flex flex-column h-100">
          <Navbar />
          <Routes>
            <Route path="/login" element={<PageLogin />}></Route>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <ChatPage />
                </PrivateRoute>
              }
            ></Route>
            <Route path="*" element={<NotFoundPage />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );

export default App;
