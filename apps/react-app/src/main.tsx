import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import './styles.css';

import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from 'react-router-dom';
import { Navigation } from './components/nav/navigation';
import { Login } from './pages/login/login';
import Edit from './pages/edit/edit';
import Overview from './pages/overview/overview';

const Layout = () => {
  return (
    <>
      <Navigation />
      <div className="p-4">
        <Outlet />
      </div>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Overview />,
      },
      {
        path: 'edit',
        element: <Edit />,
      },
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={'/'} />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
