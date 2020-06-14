import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Card } from '@material-ui/core';
import Loading from './Loading';

const WeatherSquare = ({ title, data = {} }) => {
  const { value, image } = data;
  return (
    <Card className="weather-item">
      <Typography variant="h5" className="weather-title weather-legend">
        {title}
      </Typography>
      {image ? <span className={`svg-background ${image}`} /> : <Loading />}
      {value ? (
        <Typography variant="h5" className="weather-title">
          {value}
        </Typography>
      ) : (
        <Loading />
      )}
    </Card>
  );
};

export default WeatherSquare;
