import { Navigate, useOutlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import AppFooter from './AppFooter';
import AppHeader from './AppHeader';

import { Ranking, User } from '@phosphor-icons/react';
export const HomeLayout = () => {
  const { user } = useAuth();
  const outlet = useOutlet();

  if (user) {
    return <Navigate to='/dashboard/profile' replace />;
  }

  return (
    <>
      <AppHeader />

      <main className='main-content'>{outlet}</main>
      <AppFooter
        pages={[
          {
            label: 'Tilastot',
            path: 'points',
            icon: <Ranking size={32} weight='bold' />,
          },
          {
            label: 'Kirjautuminen',
            path: 'login',
            icon: <User size={32} weight='bold' />,
          },
        ]}
      />
    </>
  );
};
