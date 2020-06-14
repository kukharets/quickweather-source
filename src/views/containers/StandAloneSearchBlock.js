import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import SuggestionsList from '../components/SuggestionsList';
import WeatherInfoContainer from '../components/InfoContainer';
import TextFieldWithDelay from '../components/TextFieldWithDelay';
import {
  requestSuggestionsPlacesStart,
  cleanSuggestions,
  selectSuggestionPlace,
} from '../../state/ducks/searchBox/actions';

const StandAloneSearchBlock = props => {
  const {
    googleMapsApiLoaded,
    placeholder,
    label,
    searchBoxError,
    searchBoxSuggestedList,
    searchBoxSuggestedStoreUpdateTime,
    forInputValue,
    cleanSuggestions,
    selectSuggestionPlace,
    requestSuggestionsPlacesStart,
    selectedPlaceDescription,
    selectedPlace,
  } = props;
  const [value, setValue] = useState('');

  useEffect(() => {
    selectedPlace && setValue(selectedPlace.description);
  }, [selectedPlace]);

  const handleInputChange = value => {
    setValue(value);
    !value && cleanSuggestions();
  };

  const handleDelayInputChange = value => {
    if (value && value !== selectedPlaceDescription) {
      requestSuggestionsPlacesStart(value);
    }
  };

  const selectPlace = placeJson => () => {
    selectSuggestionPlace(placeJson);
  };

  const handleBlur = e => {
    const { relatedTarget } = e;
    const isSuggestionItemClicked =
      relatedTarget &&
      typeof relatedTarget.getAttribute === 'function' &&
      relatedTarget.getAttribute('data-role') === 'suggestion';

    searchBoxSuggestedList && !isSuggestionItemClicked && cleanSuggestions();
  };

  const isEmptyResponse =
    !!searchBoxSuggestedStoreUpdateTime &&
    !searchBoxSuggestedList &&
    value === forInputValue;

  return (
    <span className="search-container">
      {googleMapsApiLoaded && (
        <>
          <TextFieldWithDelay
            fullWidth
            placeholder={placeholder}
            label={label}
            value={value}
            onChange={handleInputChange}
            onChangeAfterDelay={{
              action: handleDelayInputChange,
              seconds: 0.5,
            }}
            onBlur={handleBlur}
          />
          {searchBoxError && (
            <WeatherInfoContainer
              title="Problem with connect to Google API"
              description={`Details: ${searchBoxError}`}
              text={searchBoxError}
              type="error"
            />
          )}
          {isEmptyResponse && (
            <WeatherInfoContainer
              title="No places find for this query"
              text="Please, check input value"
              type="message"
            />
          )}
          {searchBoxSuggestedList && (
            <SuggestionsList
              onListItemClick={selectPlace}
              list={searchBoxSuggestedList}
            />
          )}
        </>
      )}
    </span>
  );
};

const mapStateToProps = ({ googleMapsApiReducer, searchBoxReducer }) => {
  const {
    searchBoxSuggestedList,
    searchBoxSuggestedStoreUpdateTime,
    selectedPlace,
  } = searchBoxReducer;
  const { loaded: googleMapsApiLoaded } = googleMapsApiReducer;
  return {
    googleMapsApiLoaded,
    searchBoxSuggestedList,
    searchBoxSuggestedStoreUpdateTime,
    selectedPlace,
  };
};

export default connect(mapStateToProps, {
  requestSuggestionsPlacesStart,
  cleanSuggestions,
  selectSuggestionPlace,
})(StandAloneSearchBlock);
