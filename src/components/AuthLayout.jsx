import { Suspense } from 'react';
import { useLoaderData, useOutlet, Await } from 'react-router-dom';

import Alert from '@mui/material/Alert';
import { AuthProvider } from '../hooks/useAuth';

import Loading from './Loading';

export const AuthLayout = () => {
  const outlet = useOutlet();

  const { userPromise } = useLoaderData();

  return (
    <Suspense fallback={<Loading />}>
      <Await
        resolve={userPromise}
        errorElement={<Alert severity='error'>Something went wrong!</Alert>}
        children={(user) => (
          <AuthProvider userData={user}>{outlet}</AuthProvider>
        )}
      />
    </Suspense>
  );
};
