import { Suspense, lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';

const OrdersPage = lazy(() => import('../pages/OrdersPage/OrdersPage.jsx'));
const ProductsPage = lazy(() => import('../pages/ProductsPage/ProductsPage.jsx'));

const withSuspense = (page) => (
  <Suspense fallback={<p className="state-message">Loading page...</p>}>{page}</Suspense>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/orders" replace />
      },
      {
        path: 'orders',
        element: withSuspense(<OrdersPage />)
      },
      {
        path: 'products',
        element: withSuspense(<ProductsPage />)
      }
    ]
  }
]);
