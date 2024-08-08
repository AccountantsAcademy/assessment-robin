import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from 'react-router-dom';
import { Navigation } from './components/nav/navigation';
import Login from './pages/login/login';
import Edit from './pages/edit/edit';
import Overview from './pages/overview/overview';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Register from './pages/register/register';

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
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={'/'} />,
  },
]);

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </StrictMode>
);
