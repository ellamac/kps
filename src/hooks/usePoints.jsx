import { useState, useEffect } from 'react';
import { getPoints } from '../loaders/points';

export const usePoints = (keyName, defaultValue) => {
  const [points, setPoints] = useState(undefined);

  useEffect(() => {
    updatePoints();
  }, []);

  const updatePoints = async (newValue) => {
    console.log('updating points');
    const { currentPoints } = await getPoints();
    console.log('updated points');

    setPoints(currentPoints || []);
  };

  return [points, updatePoints];
};
