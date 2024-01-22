import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { ToastContainer, toast } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import NotFoundPage from './NotFoundPage.jsx';
import Registration from './Registration.jsx';
import AuthProvider from '../context/AuthProvider.jsx';
import PageLogin from './PageLogin.jsx';
import ChatPage from './ChatPage.jsx';
import Navbar from './Navbar.jsx';
import { useAuth } from '../hooks/index.js';
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
          <Route path={routes.NotFoundPage} element={<NotFoundPage />}></Route>
          <Route path={routes.chatSignup} element={<Registration />}></Route>
        </Routes>
        <ToastContainer />
      </div>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
