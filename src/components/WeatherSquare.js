import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Card } from '@material-ui/core';

function WeatherSquare(props) {
  const { title, value, image } = props;
  return (
    <Card className="weather-item">
      <Typography variant="h5" className="weather-title weather-legend">
        {title}
      </Typography>
      <span className={`svg-background ${image}`}></span>
      <Typography variant="h5" className="weather-title">
        {value}
      </Typography>
    </Card>
  );
}

export default WeatherSquare;
