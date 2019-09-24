import React from 'react';
import { connect } from 'react-redux';
import StandAlonePlacesSearch from './StandAloneSearchBlock';
import SinglePlaceWeatherBlock from './SelectedPlaceBlock';
import PlacesList from './PlacesList';
import { actionFetchWeather } from '../actions/basicActions';

class Content extends React.Component {
  componentDidMount() {
    const {
      actionFetchWeather,
      selectedPlaceID,
      selectedPlaceCoordinates,
    } = this.props;

    selectedPlaceID &&
      selectedPlaceCoordinates &&
      actionFetchWeather({
        placeID: selectedPlaceID,
        placeCoordinates: selectedPlaceCoordinates,
      });
  }

  componentDidUpdate() {
    const {
      actionFetchWeather,
      selectedPlaceID,
      selectedPlaceCoordinates,
      selectedPlaceDailyWeather,
      selectedPlaceDailyWeatherFetchStatus,
    } = this.props;

    const readyForWeatherFetch =
      selectedPlaceCoordinates &&
      selectedPlaceID &&
      !selectedPlaceDailyWeather &&
      !selectedPlaceDailyWeatherFetchStatus;

    if (readyForWeatherFetch) {
      actionFetchWeather({
        placeID: selectedPlaceID,
        placeCoordinates: selectedPlaceCoordinates,
      });
    }
  }

  render() {
    const {
      props: { listOpenState },
    } = this;
    return (
      <div className={`content${listOpenState ? '_list-opened' : ''}`}>
        <StandAlonePlacesSearch
          placeholder="...just start typing"
          label="Find place for get weather"
        />
        <SinglePlaceWeatherBlock />
        <PlacesList />
      </div>
    );
  }
}
const mapStateToProps = ({ basic, markup }) => {
  const {
    selectedPlace: {
      place_id: selectedPlaceID,
      coordinates: selectedPlaceCoordinates,
      dailyWeather: selectedPlaceDailyWeather,
      dailyWeatherFetchStatus: selectedPlaceDailyWeatherFetchStatus,
    },
  } = basic;
  const { listOpenState } = markup;
  return {
    selectedPlaceID,
    selectedPlaceCoordinates,
    selectedPlaceDailyWeather,
    selectedPlaceDailyWeatherFetchStatus,
    listOpenState,
  };
};

export default connect(
  mapStateToProps,
  {
    actionFetchWeather,
  },
)(Content);
