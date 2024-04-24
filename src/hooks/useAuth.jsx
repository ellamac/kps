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
    const [existingID, existingName] = await userExists(data);
    console.log(data, existingID, existingName);
    if (existingID) {
      const { currentPoints } = await getPoints();
      const userWithPoints = currentPoints.find(
        (u) => u.nimi === existingID.nimi && u.savu_nro === existingID.savu_nro
      );
      console.log('test', existingID, userWithPoints);
      console.log({ ...userWithPoints, ...existingID });
      setUser({ ...userWithPoints, ...existingID });
      navigate('/dashboard/profile', { replace: true });
    }
    if (!existingID) {
      console.log('user doesnt exists');
    }
  };

  const logout = () => {
    setUser(null);
    navigate('/', { replace: true });
  };

  const updateUser = async (data) => {
    setUser({});
    const [existingID, existingName] = await userExists(data);
    console.log('userupate', data, existingID, existingName);
    console.log(data, existingID);
    if (existingID) {
      const { currentPoints } = await getPoints();
      const userWithPoints = currentPoints.find(
        (u) => u.nimi === existingID.nimi && u.savu_nro === existingID.savu_nro
      );
      console.log('test', existingID, userWithPoints);
      console.log({ ...userWithPoints, ...existingID });
      setUser({ ...userWithPoints, ...existingID });
    }
    if (!existingID) {
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
