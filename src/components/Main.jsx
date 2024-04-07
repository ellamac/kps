import React, { useState, useEffect } from 'react';

import StatList from './StatList';
import Loading from './loading';

const Main = ({ scoreBoard }) => {
  return (
    <main className='main-content'>
      <h2>Tulokset</h2>
      {scoreBoard && scoreBoard.length > 0 ? (
        <>
          <section className='stats'>
            <p>
              Pelejä on pelattu{' '}
              {scoreBoard.reduce(
                (acc, val) => acc + parseInt(val.pelit_lkm),
                0
              ) / 2}
            </p>
            <p>Pelaajia on yhteensä {scoreBoard.length}</p>
          </section>
          <StatList scoreBoard={scoreBoard} />
        </>
      ) : (
        <Loading />
      )}
    </main>
  );
};

export default Main;
