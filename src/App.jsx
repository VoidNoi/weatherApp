import { useState } from 'react';
import './App.css';
import Background from './Background';
// import WeatherApi from './WeatherApi';
import WeatherInfo from './WeatherInfo';

function App() {
  return (
    <main className='App'>
      <Background />
      <WeatherInfo />
    </main>
  );
}

export default App;
