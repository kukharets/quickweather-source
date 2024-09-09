import React, { LegacyRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { actionToggleBookmarkPlace, IGooglePlaceFull, actionResetSelectedPlace, actionSelectPlace } from '@slices/app';

import { selectIsPlaceBookmarked } from '@selectors/app';

import { useWeather } from '@hooks/useWeather';
import { WeatherSquareItem } from '@components/WeatherSquareItem';

import { TextLarge, theme } from '@root/App.styles';
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
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isBookmarked = useSelector(selectIsPlaceBookmarked(data.place_id));
  const { isWeatherDataLoading, parsedWeatherData } = useWeather({ location: data });

  const handleSelectPlace = (e: React.MouseEvent<HTMLDivElement>) => {
    dispatch(actionSelectPlace(data));
  };

  const handleToggleBookmark = (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();
    dispatch(actionToggleBookmarkPlace(data));
  };

  const handleClosePlaceCard = (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();
    searchParams.delete('place_id');
    navigate({ search: searchParams.toString() }, { replace: true });
    dispatch(actionResetSelectedPlace());
  };

  return (
    <PlaceCardWrapper>
      <PlaceCardHeader onClick={handleSelectPlace} $isFullVersion={isFullVersion}>
        <PlaceControls onTouchStart={(e) => e.stopPropagation()} onTouchEnd={(e) => e.stopPropagation()}>
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
