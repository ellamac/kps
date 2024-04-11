import * as React from 'react';

import { useAuth } from '../hooks/useAuth';
import UserCreateForm from '../components/UserCreateForm';
import UserLoginForm from '../components/UserLoginForm';
import { createUser } from '../loaders/players';

export const LoginPage = () => {
  const { login } = useAuth();

  return (
    <>
      <UserCreateForm createUser={createUser} />
      <UserLoginForm login={login} />
    </>
  );
};
