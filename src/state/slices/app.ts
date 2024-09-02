import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IGoogleAutocompletePredictionPlace {
  place_id: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}
export interface IGooglePlaceFull extends IGoogleAutocompletePredictionPlace {
  coordinates?: { lat: number; lng: number };
}

interface PlaceState {
  selectedPlace: IGooglePlaceFull | null;
  bookmarkedPlaces: IGooglePlaceFull[];
}

const initialState: PlaceState = {
  selectedPlace: null,
  bookmarkedPlaces: [],
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    actionSelectPlace(state, action: PayloadAction<IGoogleAutocompletePredictionPlace>) {
      state.selectedPlace = action.payload;
    },
    actionUpdateSelectedPlaceData(state, action: PayloadAction<{ lat: number; lng: number }>) {
      if (state.selectedPlace) {
        state.selectedPlace = { ...state.selectedPlace, coordinates: action.payload };
      }
    },
    actionResetSelectedPlace(state) {
      state.selectedPlace = null;
    },
    actionToggleBookmarkPlace(state, action: PayloadAction<IGooglePlaceFull>) {
      const existingIndex = state.bookmarkedPlaces.findIndex((place) => place.place_id === action.payload.place_id);
      if (existingIndex !== -1) {
        state.bookmarkedPlaces.splice(existingIndex, 1);
      } else {
        state.bookmarkedPlaces.unshift(action.payload);
      }
    },
  },
});
export const { actionToggleBookmarkPlace, actionSelectPlace, actionUpdateSelectedPlaceData, actionResetSelectedPlace } =
  appSlice.actions;
export default appSlice.reducer;
