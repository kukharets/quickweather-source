import { actionToggleBookmarkPlace, IGooglePlaceFull, actionResetSelectedPlace, actionSelectPlace } from '@slices/app';
import { TextLarge, theme } from '@root/App.styles';

import { useDispatch, useSelector } from 'react-redux';
import { selectIsPlaceBookmarked } from '@selectors/app';
import React, { LegacyRef } from 'react';
import { useWeather } from '@hooks/useWeather';
import { WeatherSquareItem } from '@components/WeatherSquareItem';
import {
  CloseIcon,
  Divider,
  FavoriteIcon,
  HeaderShortWeather,
  PlaceCardBody,
  PlaceCardHeader,
  PlaceCardWrapper,
  PlaceControls,
  PlaceDescription,
  PlaceTitle,
} from '@containers/PlaceCard.styles';
export const PlaceCard = ({
  data,
  isLoading,
  isFullVersion,
  weatherRef,
}: {
  data: IGooglePlaceFull;
  isFullVersion?: boolean;
  isLoading: boolean;
  weatherRef?: LegacyRef<HTMLDivElement> | undefined;
}) => {
  const dispatch = useDispatch();

  const isBookmarked = useSelector(selectIsPlaceBookmarked(data.place_id));
  const { isWeatherDataLoading, parsedWeatherData } = useWeather({ location: data });

  const handleSelectPlace = (e: { stopPropagation: () => void; preventDefault: () => void }) => {
    e.stopPropagation();
    dispatch(actionSelectPlace(data));
  };
  const handleToggleBookmark = () => dispatch(actionToggleBookmarkPlace(data));
  const handleClosePlaceCard = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();
    dispatch(actionResetSelectedPlace());
  };

  return (
    <PlaceCardWrapper>
      <PlaceCardHeader onClick={handleSelectPlace} $isFullVersion={isFullVersion}>
        <PlaceControls>
          <FavoriteIcon onClick={handleToggleBookmark} $bookmarked={isBookmarked} />
          {isFullVersion && <CloseIcon onClick={handleClosePlaceCard} />}
        </PlaceControls>
        <PlaceTitle>{data.structured_formatting?.main_text}</PlaceTitle>
        {isFullVersion && (
          <>
            <Divider />
            <PlaceDescription>{data.structured_formatting?.secondary_text}</PlaceDescription>
          </>
        )}
        {!isFullVersion && (
          <HeaderShortWeather>
            <TextLarge color={theme.colors.white}>{parsedWeatherData.temperature.value}</TextLarge>
            <parsedWeatherData.sky.image />
          </HeaderShortWeather>
        )}
      </PlaceCardHeader>
      {isFullVersion && (
        <PlaceCardBody ref={weatherRef}>
          {Object.values(parsedWeatherData)?.map((parsedWeatherDataItem) => (
            <WeatherSquareItem
              isLoading={isWeatherDataLoading || isLoading}
              key={parsedWeatherDataItem.title}
              data={parsedWeatherDataItem}
            />
          ))}
        </PlaceCardBody>
      )}
    </PlaceCardWrapper>
  );
};
