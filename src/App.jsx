import { useState } from 'react';
import './App.css';
import Background from './Background';
import WeatherApi from './WeatherApi';

function App() {
  return (
    <main className='App'>
      <Background />
      <WeatherApi />
    </main>
  );
}

export default App;
