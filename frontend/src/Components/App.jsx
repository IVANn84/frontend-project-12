import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import NotFoundPage from './NotFoundPage.jsx';
import PageLogin from './PageLogin.jsx';
import ChatPage from './ChatPage.jsx';
import Navbar from './Navbar.jsx';
import { useAuth } from '../hooks/index.jsx';

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
);

export default App;
