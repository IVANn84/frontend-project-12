import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NotFoundPage, PageLogin } from './Components/Pages.jsx';
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
