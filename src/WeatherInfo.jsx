import React, { useState, useEffect } from 'react';
import WeatherApi from './WeatherApi';

const WeatherInfo = () => {
  const [tempUnit, setTempUnit] = useState('C');
  const [forecast, setForecast] = useState();
  const [wind, setWind] = useState();
  const [weatherType, setWeatherType] = useState();

  const kelvinToCelsius = (temperature) => {
    return Math.floor(temperature - 273);
  };
  const celsiusToFahrenheit = (temperature) => {
    return Math.floor(temperature * 1.8 + 32);
  };
  const fahrenheitToCelsius = (temperature) => {
    return Math.floor((temperature - 32) / 1.8);
  };

  const changeTempUnit = (unit) => {
    const forecastCopy = forecast;
    if (unit === 'C') {
      forecastCopy.temp = celsiusToFahrenheit(forecastCopy.temp);
      setTempUnit('F');
    } else if (unit === 'F') {
      forecastCopy.temp = fahrenheitToCelsius(forecastCopy.temp);
      setTempUnit('C');
    }
    setForecast(forecastCopy);
  };

  const setData = async () => {
    const data = await WeatherApi();
    const dataMain = data.main;
    dataMain.temp = kelvinToCelsius(dataMain.temp);
    setForecast(dataMain);
    setWind(data.wind);
    setWeatherType(data.weather[0].main);
  };

  useEffect(() => {
    setData();
  }, []);

  if (forecast != undefined) {
    const { temp, humidity, pressure } = forecast;
    const { deg, gust, speed } = wind;
    return (
      <section className='weatherInfo'>
        <div className='infoMiddle'>
          <b>{temp}</b>
          <button
            onClick={() =>
              tempUnit == 'C' ? changeTempUnit('C') : changeTempUnit('F')
            }
          >
            {tempUnit + 'º'}
          </button>
          <div>
            <span>Humidity: {humidity}%</span>
            <span>Wind: {speed}</span>
          </div>
        </div>
        {weatherType}
      </section>
    );
  }
};

export default WeatherInfo;
