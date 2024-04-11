import { Route } from 'react-router';
import {
  createBrowserRouter,
  createRoutesFromElements,
  defer,
} from 'react-router-dom';

import Scoreboard from './components/Scoreboard';

import { HomeLayout } from './components/HomeLayout';
import { LoginPage } from './pages/Login';
import { ProtectedLayout } from './components/ProtectedLayout';
import { ProfilePage } from './pages/Profile';

import { AuthLayout } from './components/AuthLayout';
import { RegisterPage } from './pages/Register';

const getUserData = () =>
  new Promise((resolve) =>
    setTimeout(() => {
      const user = window.localStorage.getItem('user');
      resolve(user);
    }, 3000)
  );

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<AuthLayout />}
      loader={() => defer({ userPromise: getUserData() })}
    >
      <Route element={<HomeLayout />}>
        <Route path='login' element={<LoginPage />} />
        <Route path='*' element={<Scoreboard />} />
      </Route>

      <Route path='/dashboard' element={<ProtectedLayout />}>
        <Route path='profile' element={<ProfilePage />} />
        <Route path='register' element={<RegisterPage />} />
        <Route path='*' element={<Scoreboard />} />
      </Route>
    </Route>
  )
);
