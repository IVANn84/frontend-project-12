import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Schema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Минимум 2 буквы')
    .max(50, 'Максимум 50 букв')
    .required('Обязательное поле'),
  passsword: Yup.string()
    .min(2, 'Минимум 2 буквы')
    .max(50, 'Максимум 50 букв')
    .required('Обязательное поле'),
  email: Yup.string().email('Неверный email').required('Обязательное поле'),
});

const FormRegistration = () => (
  <Formik
    initialValues={{ username: '', password: '' }}
    validationShema={Schema}
  >
    {({ errors, touched }) => (
      <Form>
        <h1 className="text-center mb-4">Войти</h1>
        <div className="form-group">
          <label htmlFor="username">Ваш ник</label>
          <Field name="username" className="form-control" />
          {errors.username && touched.username ? (
            <div>{errors.username}</div>
          ) : null}
        <ErrorMessage
          component="div"
          name="username"
        />
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <Field name="password" className="form-control" />
          {errors.passsword && touched.passsword ? (
            <div>{errors.passsword}</div>
          ) : null}
          <button>Войти</button>
        <ErrorMessage
          component="div"
          name="username"
        />
        </div>
      </Form>
    )}
  </Formik>
);

const PageLogin = () => <FormRegistration />;

export default PageLogin;
