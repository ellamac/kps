import React, { useState, useEffect } from 'react';

const StatList = ({ scoreBoard }) => {
  return (
    <section className='rank-list'>
      {scoreBoard.map((d, i) => (
        <section className='rank-item'>
          <p className='rank-number'>{i + 1}.</p>
          <details key={i} className='player card'>
            <summary className={`player-summary border ${d.ikakausi}`}>
              {d.nimi}: {d.pisteet}p
            </summary>
            <section className='player-details'>
              <p>Ikäkausi: {d.ikakausi}</p>
              <p>Savun numero: {d.savu_nro}</p>
              <p>Pelejä: {d.pelit_lkm}</p>
              <p>Voittoja: {d.voitot_lkm}</p>
              <p>Häviöitä: {d.haviot_lkm}</p>
            </section>
          </details>
        </section>
      ))}
    </section>
  );
};

export default StatList;
