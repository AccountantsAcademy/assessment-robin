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
import Overview from './pages/overview/overview';

import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import Register from './pages/register/register';
import { PostPage } from './pages/post/post-page'
import { setContext } from '@apollo/client/link/context';

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
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'post/:id',
        element: <PostPage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={'/'} />,
  },
]);

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
});

const authLink = setContext((_, { headers }) => {
  // Get the user ID from local storage
  // This is used as `access token`
  const userId = localStorage.getItem('id');
  return {
    headers: {
      ...headers,
      authorization: userId ? `Bearer ${userId}` : "",
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
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
