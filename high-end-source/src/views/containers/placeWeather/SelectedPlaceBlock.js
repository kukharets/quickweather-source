import React from 'react';
import { connect } from 'react-redux';
import { WeatherDetailsBlock } from '../../components/WeatherDetailsBlock';
import PlaceHeader from './PlaceHeader';

function SelectedPlaceBlock({
  selectedPlace = {},
  listOpenState,
  weatherData,
}) {
  const { placeID } = selectedPlace;
  return (
    <div className={`weather ${listOpenState ? 'collapsed' : ''}`}>
      {placeID && !listOpenState && (
        <PlaceHeader
          weatherData={weatherData}
          place={selectedPlace}
          withSaveButton
          withCloseButton
        />
      )}
      {placeID && <WeatherDetailsBlock weatherData={weatherData} />}
    </div>
  );
}

const mapStateToProps = ({ placesReducer, weatherReducer }) => {
  const { selectedPlace, listOpenState } = placesReducer;
  const { weatherData } = weatherReducer;
  return {
    selectedPlace,
    listOpenState,
    weatherData,
  };
};

export default connect(mapStateToProps, {})(SelectedPlaceBlock);
