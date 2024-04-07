import React, { useState, useEffect } from 'react';
import '../styles/loading.css';

const Loading = (props) => {
  return (
    <section className='loading'>
      <div className='element tails'>
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
      </div>
    </section>
  );
};

export default Loading;
