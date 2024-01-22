import init from './init.js';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(await init());
};

app();
