import React from 'react';
import { connect } from 'react-redux';
import WeatherDetailsBlock from '../components/WeatherDetailsBlock';
import PlaceHeader from './PlaceHeader';

function SelectedPlaceBlock({ selectedPlace, listOpenState }) {
  const { id, dailyWeather: weather } = selectedPlace;

  return id ? (
    <div className={`weather ${listOpenState ? 'collapsed' : ''}`}>
      <PlaceHeader place={selectedPlace} withSaveButton withCloseButton />
      {weather && <WeatherDetailsBlock {...weather} />}
    </div>
  ) : (
    <></>
  );
}

const mapStateToProps = ({ basic, markup }) => {
  const { selectedPlace } = basic;
  const { listOpenState } = markup;
  return {
    selectedPlace,
    listOpenState,
  };
};

export default connect(
  mapStateToProps,
  {},
)(SelectedPlaceBlock);
