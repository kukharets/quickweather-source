import React from 'react';
import Loading from './Loading';

const WeatherSquare = ({ title, data = {} }) => {
  const { value, image } = data;
  return (
    <div className="weather-item">
      <span className="weather-title weather-legend">{title}</span>
      {image ? <span className={`svg-background ${image}`} /> : <Loading />}
      {value ? <span className="weather-title">{value}</span> : <Loading />}
    </div>
  );
};

export default WeatherSquare;
