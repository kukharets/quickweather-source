import React from 'react';
import WeatherSquare from './WeatherSquare';

function WeatherDetailsBlock(props) {
  const { sky, temperature, wind, humidity } = props;
  return (
    <div className="weather-block">
      <WeatherSquare title="Sky" value={sky.value} image={sky.image} />
      <WeatherSquare
        title="Temperature"
        value={temperature.value}
        image={temperature.image}
      />
      <WeatherSquare title="Wind" value={wind.value} image={wind.image} />
      <WeatherSquare
        title="Humidity"
        value={humidity.value}
        image={humidity.image}
      />
    </div>
  );
}

export default WeatherDetailsBlock;
