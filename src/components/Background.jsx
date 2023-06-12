import React from 'react';
import Stars from '../backgrounds/Stars';
import Clouds from '../backgrounds/Clouds';
import Lightning from '../backgrounds/Lightning';
import Rain from '../backgrounds/Rain';
import Snow from '../backgrounds/Snow';
import useWindowSize from '../utils/useWindowSize';

const Background = ({ isDayTime, weatherType }) => {
  let dayTime = isDayTime ? 'day' : 'night';
  const randomInt = (min, max) => {
    return Math.random() * (max - min + 1) + min;
  };

  let [width, height] = useWindowSize();

  const forecasts = [
    {
      conditions: ['Clouds', 'Mist', 'Haze'],
      background: dayTime,
      animation: <Clouds width={width} height={height} />,
    },
    {
      conditions: ['Drizzle', 'Rain'],
      background: dayTime,
      animation: <Rain randomInt={randomInt} />,
    },
    {
      conditions: ['Thunderstorm'],
      background: 'storm',
      animation: (
        <>
          <Rain randomInt={randomInt} />
          <Lightning randomInt={randomInt} />
        </>
      ),
    },
    {
      conditions: ['Clear'],
      background: dayTime,
      animation: isDayTime ? '' : <Stars width={width} height={height} />,
    },
    {
      conditions: ['Snow'],
      background: dayTime,
      animation: <Snow randomInt={randomInt} width={width} height={height} />,
    },
  ];

  const getForecast = () => {
    for (const forecast of forecasts) {
      if (forecast.conditions.includes(weatherType)) {
        return (
          <div className={`background ${forecast.background}`}>
            {forecast.animation}
          </div>
        );
      }
    }
  };
  return getForecast();
};

export default Background;
