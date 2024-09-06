import { createSelector } from 'reselect';
import { RootState } from '@root//store';

const selectAppState = (state: RootState) => state.app;

export const selectSelectedPlace = createSelector([selectAppState], (appState) => appState.selectedPlace);

export const selectBookmarkedPlaces = createSelector(
  [selectAppState, selectSelectedPlace],
  (appState, selectedPlace) => {
    return appState.bookmarkedPlaces.filter((place) => place.place_id !== selectedPlace?.place_id);
  },
);

export const selectIsPlaceBookmarked = (place_id: string) =>
  createSelector(
    [selectAppState],
    (appState) => !!appState.bookmarkedPlaces.find((place) => place.place_id === place_id),
  );
