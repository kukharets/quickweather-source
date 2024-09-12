/// <reference types="vite-plugin-svgr/client" />
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowUpIcon from '@assets/arrowup.svg?react';

import { PlacesSearchAutocomplete } from '@containers/PlacesSearchAutocomplete';
import { PlaceCard } from '@containers/PlaceCard';
import { Header } from '@containers/Header';

import {
  IGoogleAutocompletePredictionPlace,
  IGooglePlaceFull,
  actionSelectPlace,
  actionUpdateSelectedPlaceData,
} from '@slices/app';

import { selectBookmarkedPlaces, selectSelectedPlace } from '@selectors/app';

import { useGooglePlaces } from '@hooks/useGooglePlaces';
import { useSwipeAnimation } from '@hooks/useSwipeAnimation';

import {
  AppWrapper,
  Legend,
  BookmarkedPlacesWrapper,
  GlobalStyle,
  MainPageLayout,
  SearchSectionWrapper,
  TextSmall,
  theme,
} from '@root/App.styles';

export const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const selectedPlace = useSelector(selectSelectedPlace);
  const bookmarkedPlaces = useSelector(selectBookmarkedPlaces);

  const { handleGetPlaceDetails, isLoading } = useGooglePlaces();
  const { placeCardRef, legendRef, onTouchStart, onTouchEnd, resetAnimation } = useSwipeAnimation();

  const handleSelectPlace = (place: IGooglePlaceFull | IGoogleAutocompletePredictionPlace) => {
    dispatch(actionSelectPlace(place));
    if (!('coordinates' in place) || !place.coordinates) {
      handleGetPlaceDetails(place).then((coordinates) => {
        dispatch(actionUpdateSelectedPlaceData(coordinates));
      });
    }
  };
  const searchParams = new URLSearchParams(location.search);
  const placeIdFromUrl = searchParams.get('place_id');

  useEffect(() => {
    resetAnimation();
    if (selectedPlace && !placeIdFromUrl) {
      searchParams.set('place_id', selectedPlace.place_id);
      navigate({ search: searchParams.toString() }, { replace: true });
    }
  }, [selectedPlace]);

  useEffect(() => {
    if (placeIdFromUrl && !selectedPlace) {
      handleSelectPlace({ place_id: placeIdFromUrl });
    }
  }, []);

  return (
    <AppWrapper onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <GlobalStyle />
      <Header />
      <MainPageLayout>
        <SearchSectionWrapper>
          <PlacesSearchAutocomplete handleSelectPlace={handleSelectPlace} />
          {!!selectedPlace && (
            <PlaceCard weatherRef={placeCardRef} isLoading={isLoading} isFullVersion data={selectedPlace} />
          )}
        </SearchSectionWrapper>
        <BookmarkedPlacesWrapper $isFullVariant={!selectedPlace}>
          {bookmarkedPlaces.length > 2 && (
            <Legend ref={legendRef}>
              <TextSmall color={theme.colors.primaryLight}>Swipe to expand</TextSmall>
              <ArrowUpIcon />
            </Legend>
          )}
          {bookmarkedPlaces.map((placeData) => (
            <PlaceCard isLoading={isLoading} key={placeData.place_id} data={placeData} />
          ))}
        </BookmarkedPlacesWrapper>
      </MainPageLayout>
    </AppWrapper>
  );
};
