import {
  CLEAN_SUGGESTIONS,
  PLACES_AUTOCOMPLETE_REQUEST_ERROR,
  PLACES_AUTOCOMPLETE_REQUEST_SUCCESS,
  GET_PLACE_DETAILS_REQUEST_START,
  GET_PLACE_DETAILS_REQUEST_SUCCESS,
  GET_PLACE_DETAILS_REQUEST_ERROR,
  SELECT_PLACE,
  FETCH_WEATHER_START,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_ERROR,
  SAVE_PLACE,
  REMOVE_PLACE,
  GOOGLE_API_LOAD,
} from '../constans/actionTypes';

const lastFetchedPlace = JSON.parse(localStorage.getItem('lastPlace'));
const savedPlaces = JSON.parse(localStorage.getItem('savedPlaces'));
const INIT_STATE = {
  googleApiLoaded: false,
  searchBoxSuggested: {
    searchBoxSuggestedList: [],
    searchBoxSuggestedStoreUpdateTime: 0,
    forInputValue: undefined,
  },
  searchBoxError: undefined,
  selectedPlace: lastFetchedPlace || {
    dailyWeatherFetchStatus: false,
    detailsFetchStatus: false,
  },
  savedPlaces: {
    placesHashList: savedPlaces || {},
    lastStoreUpdateTime: 1,
  },
  listOpenState: false,
};
export default (state = INIT_STATE, action) => {
  const { payload, type } = action;
  switch (type) {
    case GOOGLE_API_LOAD: {
      return {
        ...state,
        googleApiLoaded: true,
      };
    }
    case PLACES_AUTOCOMPLETE_REQUEST_SUCCESS: {
      const { places, forInputValue } = payload;
      return {
        ...state,
        searchBoxSuggested: {
          searchBoxSuggestedList: places,
          searchBoxSuggestedStoreUpdateTime: new Date().getTime(),
          forInputValue,
        },
        searchBoxError: undefined,
      };
    }
    case PLACES_AUTOCOMPLETE_REQUEST_ERROR:
      return {
        ...state,
        searchBoxError: payload,
        searchBoxSuggested: {
          searchBoxSuggestedList: [],
          searchBoxSuggestedStoreUpdateTime: new Date().getTime(),
        },
      };
    case CLEAN_SUGGESTIONS:
      return {
        ...state,
        searchBoxSuggested: {
          searchBoxSuggestedList: [],
          searchBoxSuggestedStoreUpdateTime: new Date().getTime(),
        },
      };
    case SELECT_PLACE: {
      if (!payload) {
        localStorage.removeItem('lastPlace');
      }
      const {
        savedPlaces: { placesHashList },
      } = state;
      const newSelectedPlace = payload
        ? placesHashList[payload.id]
          ? { ...payload, isFavorite: true }
          : payload
        : {};
      localStorage.setItem('lastPlace', JSON.stringify(newSelectedPlace));
      return {
        ...state,
        selectedPlace: newSelectedPlace,
        searchBoxSuggested: {
          searchBoxSuggestedList: [],
          searchBoxSuggestedStoreUpdateTime: new Date().getTime(),
        },
      };
    }
    case SAVE_PLACE: {
      const {
        selectedPlace,
        savedPlaces: { placesHashList },
      } = state;
      const { id } = selectedPlace;
      const newHashList = Object.assign(
        {},
        {
          [id]: { ...selectedPlace, isFavorite: true, dailyWeather: undefined },
        },
        placesHashList,
      );
      localStorage.setItem('savedPlaces', JSON.stringify(newHashList));
      localStorage.setItem(
        'lastPlace',
        JSON.stringify({
          ...selectedPlace,
          isFavorite: true,
          dailyWeather: undefined,
        }),
      );
      return {
        ...state,
        savedPlaces: {
          placesHashList: newHashList,
          lastStoreUpdateTime: new Date().getTime(),
        },
        selectedPlace: {
          ...selectedPlace,
          isFavorite: true,
        },
      };
    }
    case REMOVE_PLACE: {
      const {
        savedPlaces: { placesHashList },
        selectedPlace,
      } = state;
      const { id: selectedID } = selectedPlace;
      const newHashList = {};
      for (
        let keys = Object.keys(placesHashList), a = 0;
        a < keys.length;
        a++
      ) {
        if (keys[a] === payload) {
          continue;
        }
        newHashList[keys[a]] = placesHashList[keys[a]];
      }
      localStorage.setItem('savedPlaces', JSON.stringify(newHashList));
      return {
        ...state,
        savedPlaces: {
          placesHashList: newHashList,
          lastStoreUpdateTime: new Date().getTime(),
        },
        selectedPlace:
          payload === selectedID
            ? { ...selectedPlace, isFavorite: false }
            : selectedPlace,
      };
    }
    case GET_PLACE_DETAILS_REQUEST_START: {
      const { selectedPlace } = state;
      const isForCurrentPlace = selectedPlace.place_id === payload;
      return {
        ...state,
        selectedPlace: isForCurrentPlace
          ? Object.assign({}, selectedPlace, { detailsFetchStatus: true })
          : selectedPlace,
      };
    }
    case GET_PLACE_DETAILS_REQUEST_SUCCESS: {
      const { selectedPlace } = state;
      const { coordinates, forPlaceId, structured_formatting } = payload;
      const isForCurrentPlace = selectedPlace.place_id === forPlaceId;
      return {
        ...state,
        selectedPlace: isForCurrentPlace
          ? Object.assign({}, selectedPlace, {
              coordinates,
              structured_formatting,
              id: forPlaceId,
            })
          : selectedPlace,
      };
    }
    case GET_PLACE_DETAILS_REQUEST_ERROR: {
      return {
        ...state,
        searchBoxError: payload,
      };
    }
    case FETCH_WEATHER_START: {
      const { selectedPlace } = state;
      const { forPlaceId } = payload;
      const isForCurrentPlace = selectedPlace.place_id === forPlaceId;
      return {
        ...state,
        selectedPlace: isForCurrentPlace
          ? Object.assign({}, selectedPlace, { dailyWeatherFetchStatus: true })
          : selectedPlace,
      };
    }
    case FETCH_WEATHER_SUCCESS: {
      const { selectedPlace } = state;
      const { dailyWeather, forPlaceId } = payload;
      const isForCurrentPlace = selectedPlace.place_id === forPlaceId;
      return {
        ...state,
        selectedPlace: isForCurrentPlace
          ? Object.assign({}, selectedPlace, { dailyWeather })
          : selectedPlace,
      };
    }
    case FETCH_WEATHER_ERROR: {
      const { searchBoxError, selectedPlace } = state;
      const { error, forPlaceId } = payload;
      const isForCurrentPlace = selectedPlace.place_id === forPlaceId;
      return {
        ...state,
        searchBoxError: isForCurrentPlace ? error : searchBoxError,
      };
    }
    default:
      return state;
  }
};
