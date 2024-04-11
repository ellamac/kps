import { Navigate, useOutlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import AppFooter from './AppFooter';
import AppHeader from './AppHeader';

import { User, Ranking, PlusCircle } from '@phosphor-icons/react';

export const ProtectedLayout = () => {
  const { user } = useAuth();
  const outlet = useOutlet();

  if (!user) {
    return <Navigate to='/' />;
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
            label: 'Rekisteröi peli',
            path: 'register',
            icon: <PlusCircle size={32} weight='bold' />,
          },

          {
            label: user.nimi || 'Profiili',
            path: 'profile',
            icon: <User size={32} weight='bold' />,
          },
        ]}
      />
    </>
  );
};
