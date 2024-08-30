import { Header } from '../organisms/Header';
import { PlacesSearchAutocomplete } from '../organisms/PlacesSearchAutocomplete';
import {
  IGoogleAutocompletePredictionPlace,
  IGooglePlaceFull,
  actionSelectPlace,
  actionUpdateSelectedPlaceData,
} from '../slices/app';
import { useDispatch, useSelector } from 'react-redux';
import { useGooglePlaces } from '../hooks/useGooglePlaces';
import { selectBookmarkedPlaces, selectSelectedPlace } from '../selectors/app';
import { PlaceCard } from '../organisms/PlaceCard';
import { AppWrapper, BookmarkedPlacesWrapper, MainPageLayout } from './App.styles';

export const App = () => {
  const dispatch = useDispatch();
  const { handleGetPlaceDetails, isLoading } = useGooglePlaces();
  const selectedPlace = useSelector(selectSelectedPlace);
  const bookmarkedPlaces = useSelector(selectBookmarkedPlaces);

  const handleSelectPlace = (place: IGooglePlaceFull | IGoogleAutocompletePredictionPlace) => {
    dispatch(actionSelectPlace(place));
    if (!('coordinates' in place) || !place.coordinates) {
      handleGetPlaceDetails(place).then((coordinates) => {
        dispatch(actionUpdateSelectedPlaceData(coordinates));
      });
    }
  };

  return (
    <AppWrapper>
      <Header />
      <MainPageLayout>
        <div>
          <PlacesSearchAutocomplete handleSelectPlace={handleSelectPlace} />
          {!!selectedPlace && <PlaceCard isLoading={isLoading} isFullVersion data={selectedPlace} />}
        </div>
        <BookmarkedPlacesWrapper $isFullVariant={!selectedPlace}>
          {bookmarkedPlaces.map((placeData) => (
            <PlaceCard isLoading={isLoading} key={placeData.place_id} data={placeData} />
          ))}
        </BookmarkedPlacesWrapper>
      </MainPageLayout>
    </AppWrapper>
  );
};
