import React, { useState, useEffect } from 'react';
import {
  celsiusToFahrenheit,
  fahrenheitToCelsius,
  kmphToMph,
  mphToKmph,
} from '../utils/Convert';
import arrow from '../assets/arrow.png';

const WeatherInfo = ({
  isDayTime,
  setData,
  forecast,
  setForecast,
  wind,
  weatherType,
}) => {
  const [tempUnit, setTempUnit] = useState('C');

  const changeTempUnit = (unit) => {
    const forecastCopy = forecast;
    const windCopy = wind;

    if (unit === 'C') {
      forecastCopy.temp = celsiusToFahrenheit(forecastCopy.temp);
      windCopy.speed = kmphToMph(windCopy.speed);
      setTempUnit('F');
    } else if (unit === 'F') {
      forecastCopy.temp = fahrenheitToCelsius(forecastCopy.temp);
      windCopy.speed = mphToKmph(windCopy.speed);
      setTempUnit('C');
    }

    setForecast(forecastCopy);
  };

  const getDirection = (angle) => {
    var directions = [
      'North',
      'North-East',
      'East',
      'South-East',
      'South',
      'South-West',
      'West',
      'North-West',
    ];
    var index = Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8;
    return directions[index];
  };

  useEffect(() => {
    setData();
  }, []);

  if (forecast != undefined) {
    const { temp, humidity } = forecast;
    const { deg, speed } = wind;

    return (
      <section className='weatherInfo'>
        <div className='infoMiddle'>
          <div className='tempCont'>
            <b className='temperature'>{temp}</b>
            <button
              className='tempBtn'
              onClick={() =>
                tempUnit == 'C' ? changeTempUnit('C') : changeTempUnit('F')
              }
            >
              {'º' + tempUnit}
            </button>
          </div>
        </div>
        <b className='weatherType'>{weatherType}</b>
        <div
          className={`extraInfoCont ${
            isDayTime ? 'extraInfoDay' : 'extraInfoNight'
          }`}
        >
          <div className='extraInfo'>
            <b>Humidity</b>
            <span>{humidity}%</span>
          </div>{' '}
          <div className='extraInfo'>
            <b>Wind</b>
            <img
              className='arrowImg'
              src={arrow}
              style={{
                transform: `rotate(${deg + 100}deg)`,
              }}
              alt={`Wind coming from ${getDirection(deg)}`}
            />
            {speed}
            {tempUnit == 'C' ? ' km/h' : ' mph'}
          </div>
        </div>
      </section>
    );
  }
};

export default WeatherInfo;
