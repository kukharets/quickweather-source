import React, { useEffect, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Content from './containers/Content';
import { actionRecordLayoutType } from '../state/ducks/common/actions';
import { actionLoadGoogleMapsApiStart } from '../state/ducks/googleApi/actions';
import Header from './components/Header';
import { actionFetchWeatherStart } from '../state/ducks/weather/actions';
import { actionSelectPlace } from '../state/ducks/places/actions';

const App = ({
  googleMapsApiLoaded,
  selectedPlace = {},
  actionLoadGoogleMapsApiStart,
  actionSelectPlace,
  actionRecordLayoutType,
}) => {
  useLayoutEffect(() => {
    actionLoadGoogleMapsApiStart();
  }, []);
  const { location: { search } = {} } = useLocation();

  useEffect(() => {
    if (googleMapsApiLoaded) {
      const placeID = search && search.substr(1);
      const { placeID: selectedPlaceID } = selectedPlace;
      if (placeID && placeID !== selectedPlaceID) {
        actionSelectPlace({ placeID });
      }
    }
  }, [googleMapsApiLoaded]);

  // ToDo move to custom hook for cleanup App code
  useLayoutEffect(() => {
    const calculateLayoutType = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth <= 824) {
        return { isMobile: true };
      }
      return { isDesktop: true };
    };

    actionRecordLayoutType(calculateLayoutType());

    const handleResize = () => {
      actionRecordLayoutType(calculateLayoutType());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="app">
      <Header />
      <Content />
    </div>
  );
};

const mapStateToProps = ({ googleMapsApiReducer, placesReducer }) => {
  const { googleMapsApiLoaded } = googleMapsApiReducer;
  const { selectedPlace } = placesReducer;
  return { googleMapsApiLoaded, selectedPlace };
};

export default connect(mapStateToProps, {
  actionRecordLayoutType,
  actionLoadGoogleMapsApiStart,
  actionFetchWeatherStart,
  actionSelectPlace,
})(App);
