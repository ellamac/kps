import React, { useState, useEffect } from 'react';
import '../styles/loading.css';

const Loading = (props) => {
  return (
    <section className='loading wrap'>
      {/*       <div className='element tails'>
        <div className='side-a '>🪨</div>
        <div className='side-b '>👊</div>
      </div>
      <div className='element tails'>
        <div className='side-a'>✂️</div>
        <div className='side-b'>✌️</div>
      </div>
      <div className='element tails'>
        <div className='side-a'>📄</div>
        <div className='side-b'>✋</div>
      </div> */}

      <div className='spinner'></div>
    </section>
  );
};

export default Loading;
