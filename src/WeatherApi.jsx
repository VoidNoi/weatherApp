import React, { useState, useEffect } from 'react';

const WeatherApi = () => {
  const id = '5e3297597d232a98e5e4edf9e295caa2';
  const [forecast, setForecast] = useState();

  const fetchLatlon = async () => {
    try {
      return await fetch('https://ipapi.co/json/')
        .then((response) => response.json())
        .then((info) => {
          return info;
        });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchLocation = async () => {
    const location = await fetchLatlon();
    return await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${id}`
    )
      .then((response) => response.json())
      .then((info) => {
        return info;
      });
  };

  useEffect(() => {
    setForecast(fetchLocation());
  }, []);

  console.log(forecast);

  return <div>WeatherApi</div>;
};

export default WeatherApi;
