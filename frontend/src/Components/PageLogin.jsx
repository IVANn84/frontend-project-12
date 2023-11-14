import { useFormik, Formik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import avatar from '../assets/avatar.jpg';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import * as Yup from 'yup';
import useAuth from '../hooks/index.jsx';
import routes from '../hooks/routes.js';
import axios from 'axios';
import { useState, useRef, useEffect } from 'react';

// const Schema = Yup.object().shape({
//   username: Yup.string()
//     .min(2, 'Минимум 2 буквы')
//     .max(20, 'Максимум 20 букв')
//     .required('Обязательное поле'),
//   passsword: Yup.string()
//     .min(2, 'Минимум 2 буквы')
//     .max(20, 'Максимум 20 букв')
//     .required('Обязательное поле'),
// });

const PageLogin = () => {
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const res = await axios.post(routes.loginPath(), values);
        localStorage.setItem('userId', JSON.stringify(res.data));
        auth.logIn();
        navigate(location.state.from);
        // debugger
      } catch (error) {
        if (error.isAxioserroror && error.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw error;
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img
                  src={avatar}
                  className="rounded-circle"
                  alt="Изображение"
                />
              </div>
              <Form
                onSubmit={formik.handleSubmit}
                className="col-12 col-md-6 mt-3 mt-mb-0"
              >
                <h1 className="text-center mb-4">Войти</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={formik.handleChange}
                    name="username"
                    value={formik.values.username}
                    id="username"
                    autoComplete="username"
                    isInvalid={authFailed}
                    required
                    ref={inputRef}
                  />
                  <label htmlFor="username">Ваш ник</label>
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    isInvalid={authFailed}
                    required
                  />
                  <Form.Label htmlFor="password">Пароль</Form.Label>
                  {
                    <Form.Control.Feedback type="invalid" tooltip>
                      Неверное имя пользователя или пароль
                    </Form.Control.Feedback>
                  }
                </Form.Group>
                <Button
                  type="submit"
                  variant="outline-primary"
                  className="w-100 mb-3"
                >
                  Войти
                </Button>
              </Form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>Нет аккаунта ?</span>{' '}
                <Link to="/signup">Регистрация</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
