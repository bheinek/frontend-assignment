import {HomePage, LoginPage, SignupPage, NotFoundPage} from '../pages';
import {AuthLayout} from '../layouts/AuthLayout';
import {routes} from './routesList';
import {Route, Routes} from 'react-router-dom';

export default function RootRoutes() {
  return (
    <Routes>
      <Route path={routes.home} element={<HomePage />} />
      <Route element={<AuthLayout />}>
        <Route path={routes.login} element={<LoginPage />} />
        <Route path={routes.signup} element={<SignupPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
