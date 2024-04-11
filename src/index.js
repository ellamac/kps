import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import { router } from './App';
import './styles/index.css';
import './styles/form.css';
import './styles/card.css';
import './styles/details.css';
import './styles/loading.css';
import './styles/popup.css';

/* const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: '/ksp',
    element: <App />,
    id: 'app',
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Main />,
        id: 'points',

        loader: getPoints,
      },
      {
        path: '/ksp/login',
        element: <LoginPage />,
        id: 'login',
      },
      {
        path: '/ksp/user',
        element: <User />,
        id: 'user',

        children: [
          {
            path: '/ksp/user/:userId',
            element: <UserProfile />,
            loader: getPlayers,
          },
        ],
      },
      {
        path: '/ksp/register',
        id: 'register',

        element: (
          <ProtectedRoute>
            <Register />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

root.render(<RouterProvider router={router} />); */

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
