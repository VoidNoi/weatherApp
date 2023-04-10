const WeatherApi = () => {
  const id = '5e3297597d232a98e5e4edf9e295caa2';

  const fetchLatlon = async () => {
    return fetch('https://ipapi.co/json/')
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchLocation = async () => {
    const location = await fetchLatlon();

    return fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${id}`
    )
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return fetchLocation();
};

export default WeatherApi;
