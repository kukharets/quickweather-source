import React from 'react';
import SelectedPlaceBlock from './placeWeather/SelectedPlaceBlock';
import PlacesList from './PlacesList';
import StandAloneSearchBlock from './StandAloneSearchBlock';

const Content = () => {
  return (
    <div className="content">
      <StandAloneSearchBlock
        placeholder="...just start typing"
        label="Find place for get weather"
      />
      <SelectedPlaceBlock />
      <PlacesList />
    </div>
  );
};

export default Content;
