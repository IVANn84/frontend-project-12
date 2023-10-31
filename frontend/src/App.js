import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFoundPage from './Components/NotFoundPage.jsx';
import PageLogin from './Components/PageLogin.jsx';
import MainPage from './Components/MainPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="login" element={<PageLogin />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
