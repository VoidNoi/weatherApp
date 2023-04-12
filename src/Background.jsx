import React from 'react';
import Stars from './Stars';
import Clouds from './Clouds';

const Background = ({ isDayTime }) => {
  return (
    <>
      {isDayTime ? (
        <div>
          <div className='lightBackground'></div>
          <Clouds />
        </div>
      ) : (
        <div>
          <div className='darkBackground'></div>
          <Stars />
        </div>
      )}
    </>
  );
};

export default Background;
