import {createBrowserRouter, redirect, Outlet} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import {useTranslation} from 'react-i18next';
import {LoginPage} from './features/auth/LoginPage';
import {RegisterPage} from './features/auth/RegisterPage';
import {TodoListPage} from './features/todos/TodoListPage';
import {TodoDetailPage} from './features/todos/TodoDetailPage';

function RootLayout() {
  const {i18n, t} = useTranslation();

  return (
    <>
      <Helmet
        titleTemplate={`%s - ${t('app.title')}`}
        defaultTitle={t('app.title')}
        htmlAttributes={{lang: i18n.language}}
      >
        <meta name="description" content={t('app.description')} />
      </Helmet>
      <Outlet />
    </>
  );
}

const protectedLoader = () => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    return redirect('/login');
  }
  return null;
};

const publicLoader = () => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    return redirect('/todos');
  }
  return null;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {index: true, loader: () => redirect('/todos')},
      {path: 'login', element: <LoginPage />, loader: publicLoader},
      {path: 'register', element: <RegisterPage />, loader: publicLoader},
      {path: 'todos', element: <TodoListPage />, loader: protectedLoader},
      {
        path: 'todos/:id',
        element: <TodoDetailPage />,
        loader: protectedLoader,
      },
    ],
  },
]);
