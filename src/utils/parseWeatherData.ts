import { WeatherData } from '../slices/weather';
import {
  DayCloud0,
  DayCloud1,
  DayCloud2,
  DayCloud3,
  DayCloud4,
  DayRain1,
  DayRain2,
  DayRain3,
  DayRain4,
  DaySnow1,
  DaySnow2,
  DaySnow3,
  NightCloud0,
  NightCloud1,
  NightCloud2,
  NightCloud3,
  NightCloud4,
  NightRain1,
  NightRain2,
  NightRain3,
  NightRain4,
  NightSnow1,
  NightSnow2,
  NightSnow3,
  Wind,
  Temperature,
  Humidity,
} from '../icons';
import React from 'react';

export interface IWeatherDataItem {
  image: React.FunctionComponent<React.SVGProps<SVGSVGElement>>; // Це тип для React-компонентів SVG
  value: string;
  title: string;
}
export interface ParsedWeatherData {
  sky: IWeatherDataItem;
  temperature: IWeatherDataItem;
  wind: IWeatherDataItem;
  humidity: IWeatherDataItem;
}
interface WeatherIcons {
  [key: string]: {
    [key: string]: {
      [key: number]: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    };
  };
}
const weatherIcons: WeatherIcons = {
  day: {
    cloud: {
      0: DayCloud0,
      1: DayCloud1,
      2: DayCloud2,
      3: DayCloud3,
      4: DayCloud4,
    },
    rain: {
      1: DayRain1,
      2: DayRain2,
      3: DayRain3,
      4: DayRain4,
    },
    snow: {
      1: DaySnow1,
      2: DaySnow2,
      3: DaySnow3,
    },
  },
  night: {
    cloud: {
      0: NightCloud0,
      1: NightCloud1,
      2: NightCloud2,
      3: NightCloud3,
      4: NightCloud4,
    },
    rain: {
      1: NightRain1,
      2: NightRain2,
      3: NightRain3,
      4: NightRain4,
    },
    snow: {
      1: NightSnow1,
      2: NightSnow2,
      3: NightSnow3,
    },
  },
};

export const parseWeather = (data: WeatherData): ParsedWeatherData => {
  const {
    clouds: { all: cloudsValue = 0 } = {},
    dt: currentTime = 0,
    main: { humidity = 0, temp = 0 } = {},
    sys: { sunrise: sunriseTime = 0, sunset: sunsetTime = 0 } = {},
    wind: { speed: windSpeed = 0 } = {},
    rain: { '3h': rainValue = 0 } = {},
    snow: { '3h': snowValue = 0 } = {},
  } = data || {};

  const sun = currentTime > sunsetTime || currentTime < sunriseTime ? 'night' : 'day';
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
  return {
    sky: { title: 'Sky', image: weatherIcons[sun][sky][skyImageIndex], value: skyText },
    temperature: {
      title: 'Temperature',
      image: Temperature,
      value: temp ? `${Math.floor(temp)}°C` : '',
    },
    wind: { title: 'Wind', image: Wind, value: windSpeed ? `${windSpeed} m/h` : '' },
    humidity: { title: 'Humidity', image: Humidity, value: humidity ? `${humidity} %` : '' },
  };
};
