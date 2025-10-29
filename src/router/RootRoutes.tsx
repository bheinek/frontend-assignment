import {HomePage, LoginPage, NotFoundPage} from '../pages';
import {routes} from './routesList';
import {Route, Routes} from 'react-router-dom';

export default function RootRoutes() {
  return (
    <Routes>
      <Route path={routes.home} element={<HomePage />} />
      <Route path={routes.login} element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
