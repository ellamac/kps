import { createContext, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from './useLocalStorage';
import { userExists } from '../loaders/players';
import { getPoints } from '../loaders/points';

const AuthContext = createContext();

export const AuthProvider = ({ children, userData }) => {
  const [user, setUser] = useLocalStorage('user', userData);
  const navigate = useNavigate();

  const loginNew = (data) => {
    setUser(data);
    navigate('/dashboard/profile', { replace: true });
  };

  const login = async (data) => {
    const existingUser = await userExists(data);
    console.log(data, existingUser);
    if (existingUser) {
      const { currentPoints } = await getPoints();
      const userWithPoints = currentPoints.find(
        (u) =>
          u.nimi === existingUser.nimi && u.savu_nro === existingUser.savu_nro
      );
      console.log('test', existingUser, userWithPoints);
      console.log({ ...userWithPoints, ...existingUser });
      setUser({ ...userWithPoints, ...existingUser });
      navigate('/dashboard/profile', { replace: true });
    }
    if (!existingUser) {
      console.log('user doesnt exists');
    }
  };

  const logout = () => {
    setUser(null);
    navigate('/', { replace: true });
  };

  const updateUser = async (data) => {
    setUser({});
    const existingUser = await userExists(data);
    console.log('userupate', data, existingUser);
    console.log(data, existingUser);
    if (existingUser) {
      const { currentPoints } = await getPoints();
      const userWithPoints = currentPoints.find(
        (u) =>
          u.nimi === existingUser.nimi && u.savu_nro === existingUser.savu_nro
      );
      console.log('test', existingUser, userWithPoints);
      console.log({ ...userWithPoints, ...existingUser });
      setUser({ ...userWithPoints, ...existingUser });
    }
    if (!existingUser) {
      setUser(data);
      console.log('user doesnt exists');
    }
  };

  const value = useMemo(
    () => ({
      user,
      login,
      loginNew,
      logout,
      updateUser,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
