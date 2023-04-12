import './App.css';
import Background from './Background';
import WeatherInfo from './WeatherInfo';

function App() {
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

  return (
    <main className='App'>
      <Background isDayTime={isDayTime} />
      <WeatherInfo isDayTime={isDayTime} />
    </main>
  );
}

export default App;
