import { useState, useEffect } from 'react';
import { getPoints } from '../loaders/points';

export const usePoints = (keyName, defaultValue) => {
  const [points, setPoints] = useState(undefined);

  useEffect(() => {
    updatePoints();
  }, []);

  const updatePoints = async (newValue) => {
    setPoints(undefined);
    console.log('updating points');
    const { currentPoints } = await getPoints();
    console.log('updated points');

    setPoints(
      currentPoints.sort((a, b) => parseInt(b.pisteet) - parseInt(a.pisteet)) ||
        []
    );
  };

  return [points, updatePoints];
};
