import * as types from './types';
import { createReducer } from '../../index';
import history from '../../../utils/history';

const lastFetchedPlaceLocal = JSON.parse(localStorage.getItem('lastPlace'));
const savedPlacesLocal = JSON.parse(localStorage.getItem('savedPlaces'));

const initialState = {
  selectedPlace: lastFetchedPlaceLocal || {
    dailyWeatherFetchStatus: false,
    detailsFetchStatus: false,
  },
  savedPlaces: {
    placesHashList: savedPlacesLocal || {},
    lastStoreUpdateTime: 1,
  },
  listOpenState: false,
};

const placesReducer = createReducer(initialState)({
  [types.SELECT_PLACE]: (state, action) => {
    localStorage.setItem(
      'lastPlace',
      JSON.stringify({
        ...action.payload,
        dailyWeather: undefined,
      }),
    );
    return {
      ...state,
      selectedPlace: action.payload,
    };
  },
  [types.PLACE_DETAILS_REQUEST_SUCCESS]: (state, action) => {
    const { payload = {} } = action;
    const { place_id } = payload;
    const {
      selectedPlace,
      savedPlaces: { placesHashList },
    } = state;
    const newPlace = {
      ...selectedPlace,
      ...payload,
      isFavorite: !!placesHashList[place_id],
    };
    localStorage.setItem(
      'lastPlace',
      JSON.stringify({ ...newPlace, dailyWeather: undefined }),
    );
    return {
      ...state,
      selectedPlace: newPlace,
    };
  },
  [types.SAVE_PLACE]: state => {
    const {
      selectedPlace,
      savedPlaces: { placesHashList },
    } = state;
    const { place_id } = selectedPlace;
    const newPlace = {
      ...selectedPlace,
      isFavorite: true,
      dailyWeather: undefined,
    };
    const newHashList = Object.assign(
      {},
      {
        [place_id]: newPlace,
      },
      placesHashList,
    );
    localStorage.setItem('savedPlaces', JSON.stringify(newHashList));
    localStorage.setItem(
      'lastPlace',
      JSON.stringify({ ...newPlace, dailyWeather: undefined }),
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
  },
  [types.UNSELECT_PLACE]: state => {
    history.push('');
    localStorage.removeItem('lastPlace');
    return {
      ...state,
      selectedPlace: {
        dailyWeatherFetchStatus: false,
        detailsFetchStatus: false,
      },
    };
  },
  [types.REMOVE_PLACE]: (state, action) => {
    const {
      savedPlaces: { placesHashList },
      selectedPlace,
    } = state;
    const { place_id: selectedID } = selectedPlace;
    const isSelectedPlace = action.payload === selectedID;
    const newHashList = {};
    for (let keys = Object.keys(placesHashList), a = 0; a < keys.length; a++) {
      if (keys[a] === action.payload) {
        continue;
      }
      newHashList[keys[a]] = placesHashList[keys[a]];
    }
    const newPlace = { ...selectedPlace, isFavorite: false };
    if (isSelectedPlace) {
      localStorage.setItem('lastPlace', JSON.stringify(newPlace));
    }
    localStorage.setItem('savedPlaces', JSON.stringify(newHashList));
    return {
      ...state,
      savedPlaces: {
        placesHashList: newHashList,
        lastStoreUpdateTime: new Date().getTime(),
      },
      selectedPlace: isSelectedPlace ? newPlace : selectedPlace,
    };
  },

  [types.SWITCH_LIST_OPEN_STATE]: state => {
    const { listOpenState } = state;
    return {
      ...state,
      listOpenState: !listOpenState,
    };
  },
});

export default { placesReducer };
