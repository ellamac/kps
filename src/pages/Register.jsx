import * as React from 'react';
import { useAuth } from '../hooks/useAuth';
import GameRegister from '../components/GameRegister';

export const RegisterPage = () => {
  const { user } = useAuth();

  return <GameRegister />;
};
