import { IWeatherDataItem } from '@utils/parseWeatherData';
import { TextLarge } from '@root/App.styles';
import { PlaceCardWeatherSquare, Spinner } from './WeatherSquareItem.styles';

export const WeatherSquareItem = ({ data, isLoading }: { data: IWeatherDataItem; isLoading: boolean }) => (
  <PlaceCardWeatherSquare $isLoading={isLoading}>
    {isLoading && <Spinner />}
    <TextLarge> {data.title}</TextLarge>
    <data.image />
    <TextLarge> {data.value}</TextLarge>
  </PlaceCardWeatherSquare>
);
