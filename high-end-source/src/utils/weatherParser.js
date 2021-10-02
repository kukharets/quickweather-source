import humidity from '../assets/humidity.svg';
import temperature from '../assets/temperature.svg';

function getSkyImageAndTitle(weather) {
  const {
    cloudsValue,
    currentTimeValue,
    sunriseValue,
    sunsetValue,
    rainValue,
    snowValue,
  } = weather || {};
  const sun =
    currentTimeValue > sunsetValue || currentTimeValue < sunriseValue
      ? 'night'
      : 'day';
  const sky = snowValue > 0 ? 'snow' : rainValue > 0 ? 'rain' : 'cloud';
  let skyImageIndex = 0;
  let skyText = 'Clear';
  switch (sky) {
    case 'snow':
      skyImageIndex = Math.trunc(snowValue * 5);
      skyText = 'Snow';
      break;
    case 'rain':
      skyImageIndex = Math.trunc(rainValue * 5);
      skyText = 'Rain';
      break;
    default:
      skyImageIndex = Math.trunc(cloudsValue / 25);
      if (cloudsValue > 1) {
        skyText = 'Clouds';
      }
  }
  return { image: `${sun}${sky}${skyImageIndex}`, value: skyText };
}

export default function(weatherResponse) {
  const {
    data: {
      clouds: { all: cloudsValue = 0 } = {},
      dt: currentTimeValue,
      main: { humidity: humidityValue, temp: temperatureValue } = {},
      sys: { sunrise: sunriseValue, sunset: sunsetValue } = {},
      wind: { speed: windSpeedValue = 0 } = {},
      rain: { '3h': rainValue } = {},
      snow: { '3h': snowValue } = {},
    } = {},
  } = weatherResponse;

  const { image, value } = getSkyImageAndTitle({
    cloudsValue,
    currentTimeValue,
    sunriseValue,
    sunsetValue,
    rainValue,
    snowValue,
  });

  return {
    sky: { image, value },
    temperature: {
      image: 'temperature',
      value: `${Math.floor(temperatureValue)}°C`,
    },
    wind: { image: 'wind', value: `${windSpeedValue} m/h` },
    humidity: { image: 'humidity', value: `${humidityValue} %` },
  };
}
