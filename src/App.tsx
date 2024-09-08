import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { PlacesSearchAutocomplete } from '@containers/PlacesSearchAutocomplete';
import {
  IGoogleAutocompletePredictionPlace,
  IGooglePlaceFull,
  actionSelectPlace,
  actionUpdateSelectedPlaceData,
} from '@slices/app';

import { selectBookmarkedPlaces, selectSelectedPlace } from '@selectors/app';
import { useGooglePlaces } from '@hooks/useGooglePlaces';
import { PlaceCard } from '@containers/PlaceCard';
import { AppWrapper, BookmarkedPlacesWrapper, MainPageLayout, SearchSectionWrapper } from './App.styles';
import { createGlobalStyle } from 'styled-components';
import { Header } from '@containers/Header';
import { useSwipeAnimation } from '@hooks/useSwipeAnimation';

const GlobalStyle = createGlobalStyle`
    :root {
        overscroll-behavior: none;
    }
`;

export const App = () => {
  const dispatch = useDispatch();
  const selectedPlace = useSelector(selectSelectedPlace);
  const bookmarkedPlaces = useSelector(selectBookmarkedPlaces);
  const { handleGetPlaceDetails, isLoading } = useGooglePlaces();

  const { placeCardRef, onTouchStart, onTouchEnd, resetAnimation } = useSwipeAnimation();
  const location = useLocation();
  const navigate = useNavigate();

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
          {bookmarkedPlaces.map((placeData) => (
            <PlaceCard isLoading={isLoading} key={placeData.place_id} data={placeData} />
          ))}
        </BookmarkedPlacesWrapper>
      </MainPageLayout>
    </AppWrapper>
  );
};
