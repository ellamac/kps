import React, { useState, useEffect } from 'react';

import StatList from './StatList';
import Loading from './Loading';
import { usePoints } from '../hooks/usePoints';

const Main = (props) => {
  const [points, updatePoints] = usePoints();
  return (
    <>
      <h2>Tulokset</h2>
      <button type='button' onClick={updatePoints}>
        päivitä lista
      </button>
      {points && points.length > 0 ? (
        <>
          <section className='stats'>
            <p>
              Pelejä on pelattu{' '}
              {points.reduce((acc, val) => acc + parseInt(val.pelit_lkm), 0) /
                2}
            </p>
            <p>Pelaajia on yhteensä {points.length}</p>
          </section>
          <StatList scoreBoard={points} />
        </>
      ) : (
        <p>{points?.length === 0 ? 'Ei pelejä vielä! ' : 'loading...'}</p>
      )}
    </>
  );
};

export default Main;
