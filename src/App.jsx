import React, { useState } from 'react';

import './App.css';
import Background from './Background';
import WeatherInfo from './WeatherInfo';
import WeatherApi from './WeatherApi';
import { kelvinToCelsius, mpsToKmph } from './Convert';

function App() {
  const [forecast, setForecast] = useState();
  const [wind, setWind] = useState();
  const [weatherType, setWeatherType] = useState();

  const isDst = () => {
    Date.prototype.stdTimezoneOffset = function () {
      var jan = new Date(this.getFullYear(), 0, 1);
      var jul = new Date(this.getFullYear(), 6, 1);
      return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
    };

    Date.prototype.isDstObserved = function () {
      return this.getTimezoneOffset() < this.stdTimezoneOffset();
    };

    return new Date().isDstObserved;
  };

  var today = new Date();
  const hours = today.getHours();
  let isDayTime;
  let dawn;
  let dusk;

  if (isDst()) {
    dawn = 7;
    dusk = 21;
  } else {
    dawn = 6;
    dusk = 20;
  }

  isDayTime = hours > dawn && hours < dusk;

  const setData = async () => {
    const data = await WeatherApi();
    data.main.temp = kelvinToCelsius(data.main.temp);
    data.wind.speed = mpsToKmph(data.wind.speed);

    setForecast(data.main);
    setWind(data.wind);
    setWeatherType(data.weather[0].main);
  };

  return (
    <main className='App'>
      <Background isDayTime={isDayTime} weatherType={weatherType} />
      <WeatherInfo
        isDayTime={isDayTime}
        setData={setData}
        forecast={forecast}
        setForecast={setForecast}
        wind={wind}
        weatherType={weatherType}
      />
    </main>
  );
}

export default App;
