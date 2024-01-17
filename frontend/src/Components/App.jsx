import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import NotFoundPage from './NotFoundPage.jsx';
import AuthProvider from '../context/AuthProvider.jsx';
import PageLogin from './PageLogin.jsx';
import ChatPage from './ChatPage.jsx';
import Navbar from './Navbar.jsx';
import { useAuth } from '../hooks/index.jsx';
import routes from '../hooks/routes.js';

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
          <Route path={routes.chatPageLogin} element={<PageLogin />}></Route>
          <Route
            path={routes.chatPagePath}
            element={
              <PrivateRoute>
                <ChatPage />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path={routes.chatPageNoFound}
            element={<NotFoundPage />}
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
