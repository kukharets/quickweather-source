import React from 'react';
import { connect } from 'react-redux';
import { WeatherDetailsBlock } from '../../components/WeatherDetailsBlock';
import PlaceHeader from './PlaceHeader';

function SelectedPlaceBlock({
  selectedPlace = {},
  listOpenState,
  weatherData,
}) {
  const { place_id } = selectedPlace;
  return (
    <div className={`weather ${listOpenState ? 'collapsed' : ''}`}>
      {place_id && !listOpenState && (
        <PlaceHeader place={selectedPlace} withSaveButton withCloseButton />
      )}
      {place_id && <WeatherDetailsBlock weatherData={weatherData} />}
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
