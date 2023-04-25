import React from 'react';
import Stars from './Stars';
import Clouds from './Clouds';
import Lightning from './Lightning';
import Rain from './Rain';

const Background = ({ isDayTime }) => {
  const randomInt = (min, max) => {
    return Math.random() * (max - min + 1) + min;
  };

  return (
    <>
      {isDayTime ? (
        <div className='lightBackground'>
          <Clouds />
        </div>
      ) : (
        <div className='darkBackground'>
          <Rain randomInt={randomInt} />
          <Lightning randomInt={randomInt} />
          {/* <Stars /> */}
        </div>
      )}
    </>
  );
};

export default Background;
