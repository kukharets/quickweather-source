import React from 'react';
import WeatherSquare from './WeatherSquare';

export const WeatherDetailsBlock = ({ weatherData = {} }) => {
  const { sky, temperature, wind, humidity } = weatherData;
  return (
    <div className="weather-block">
      <WeatherSquare title="Sky" data={sky} />
      <WeatherSquare title="Temperature" data={temperature} />
      <WeatherSquare title="Wind" data={wind} />
      <WeatherSquare title="Humidity" data={humidity} />
    </div>
  );
};
