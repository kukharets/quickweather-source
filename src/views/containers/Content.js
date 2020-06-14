import React from 'react';
import StandAlonePlacesSearch from './StandAloneSearchBlock';
import SelectedPlaceBlock from './placeWeather/SelectedPlaceBlock';
import PlacesList from './PlacesList';

const Content = () => {
  return (
    <div className="content">
      <StandAlonePlacesSearch
        placeholder="...just start typing"
        label="Find place for get weather"
      />
      <SelectedPlaceBlock />
      <PlacesList />
    </div>
  );
};

export default Content;
