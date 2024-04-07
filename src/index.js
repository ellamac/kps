import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
} from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import Register from './components/GameRegister';
import User from './components/User';
import './styles/index.css';
import './styles/form.css';
import './styles/statlist.css';
import './styles/loading.css';

import Main from './components/Main';
const root = ReactDOM.createRoot(document.getElementById('root'));

/* const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: 'main',
        element: <Main />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'you',
        element: <User />,
      },
    ],
  },
]); */
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
