import React from 'react';
import { connect } from 'react-redux';
import SuggestionsList from '../components/SuggestionsList';
import WeatherInfoContainer from '../components/InfoContainer';
import TextFieldWithDelay from '../components/TextFieldWithDelay';
import {
  actionGoogleApiLoad,
  placesAutocompleteRequest,
  actionClearSuggestions,
  actionSelectPlace,
  actionGetPlaceDetails,
} from '../actions/basicActions';

class StandAloneSearchBlock extends React.Component {
  state = {
    value: '',
  };

  static defaultProps = {
    placeholder: '...just start typing',
    label: 'Search Box',
  };

  componentDidMount() {
    window.initMap = this.initMapCallback;
    const scriptEl = document.createElement(`script`);
    scriptEl.src = `https://maps.googleapis.com/maps/api/js?key=[DELETED BY AUTHOR]&callback=initMap&libraries=places&language=en`;
    document.querySelector(`body`).insertAdjacentElement(`beforeend`, scriptEl);
  }

  componentDidUpdate() {
    const {
      selectedPlaceCoordinates,
      selectedPlaceID,
      selectedPlaceDetailsFetchStatus,
      actionGetPlaceDetails,
    } = this.props;

    const needLoadDetails =
      selectedPlaceID &&
      !selectedPlaceCoordinates &&
      !selectedPlaceDetailsFetchStatus;

    needLoadDetails && actionGetPlaceDetails(selectedPlaceID);
  }

  handleInputChange = value => {
    const {
      props: { actionClearSuggestions },
    } = this;
    this.setState({
      value,
    });
    !value && actionClearSuggestions();
  };

  handleDelayInputChange = value => {
    const {
      props: { placesAutocompleteRequest, selectedPlaceDescription },
    } = this;
    if (value && value !== selectedPlaceDescription) {
      placesAutocompleteRequest(value);
    }
  };

  initMapCallback = () => {
    const {
      props: { actionGoogleApiLoad },
    } = this;
    actionGoogleApiLoad();
  };

  actionSelectPlace = placeJson => () => {
    const {
      props: { actionSelectPlace },
    } = this;
    actionSelectPlace(placeJson).then(() =>
      this.setState({ value: placeJson.description }),
    );
  };

  handleBlur = e => {
    const { relatedTarget } = e;
    const {
      props: { actionClearSuggestions, searchBoxSuggestedList },
    } = this;
    const isSuggestionItemClicked =
      relatedTarget &&
      typeof relatedTarget.getAttribute === 'function' &&
      relatedTarget.getAttribute('data-role') === 'suggestion';

    searchBoxSuggestedList.length > 0 &&
      !isSuggestionItemClicked &&
      actionClearSuggestions();
  };

  render() {
    const {
      props: {
        googleApiLoaded,
        placeholder,
        label,
        searchBoxError,
        searchBoxSuggestedList,
        searchBoxSuggestedStoreUpdateTime,
        forInputValue,
      },
      state: { value },
    } = this;

    const isEmptySuggestions = searchBoxSuggestedList.length === 0;
    const isEmptyResponse =
      !!searchBoxSuggestedStoreUpdateTime &&
      isEmptySuggestions &&
      value === forInputValue;

    return (
      <React.Fragment>
        {googleApiLoaded && (
          <>
            <TextFieldWithDelay
              fullWidth
              placeholder={placeholder}
              label={label}
              value={value}
              onChange={this.handleInputChange}
              onChangeAfterDelay={{
                action: this.handleDelayInputChange,
                seconds: 0.5,
              }}
              onBlur={this.handleBlur}
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
            {!isEmptySuggestions && (
              <SuggestionsList
                onListItemClick={this.actionSelectPlace}
                list={searchBoxSuggestedList}
              />
            )}
          </>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ basic }) => {
  const {
    googleApiLoaded,
    searchBoxSuggested: {
      searchBoxSuggestedList,
      searchBoxSuggestedStoreUpdateTime,
      forInputValue,
    },
    searchBoxError,
    selectedPlace: {
      coordinates: selectedPlaceCoordinates,
      place_id: selectedPlaceID,
      detailsFetchStatus: selectedPlaceDetailsFetchStatus,
    } = {},
  } = basic;
  return {
    googleApiLoaded,
    searchBoxSuggestedList,
    searchBoxSuggestedStoreUpdateTime,
    searchBoxError,
    forInputValue,
    selectedPlaceCoordinates,
    selectedPlaceID,
    selectedPlaceDetailsFetchStatus,
  };
};

export default connect(
  mapStateToProps,
  {
    actionGoogleApiLoad,
    placesAutocompleteRequest,
    actionClearSuggestions,
    actionSelectPlace,
    actionGetPlaceDetails,
  },
)(StandAloneSearchBlock);
