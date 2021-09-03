import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import { connect } from 'react-redux';
import { isMobile, isTablet } from 'react-device-detect';
import Content from './containers/Content';
import { recordDeviceType } from '../state/ducks/common/actions';
import { loadGoogleMapsApiStart } from '../state/ducks/googleApi/actions';
import Header from './components/Header';
import { mobileDevicesHeightCorrector } from '../utils/mobileDevicesHeightCorrector';
import history from '../utils/history';
import { actionFetchWeatherStart } from '../state/ducks/weather/actions';
import { actionSelectPlace } from '../state/ducks/places/actions';
import backgroundImg from '../assets/background.webp';

const App = ({
  loadGoogleMapsApiStart,
  recordDeviceType,
  actionSelectPlace,
  actionFetchWeatherStart,
  googleMapsApiLoaded,
  selectedPlace = {},
}) => {
  useLayoutEffect(() => {
    mobileDevicesHeightCorrector(true);
    loadGoogleMapsApiStart();
    recordDeviceType({
      isDesktop: !isTablet && !isMobile,
    });
  }, []);

  useEffect(() => {
    const { location: { search } = {} } = window;
    if (googleMapsApiLoaded) {
      const place_id = search && search.substr(1);
      const { place_id: selectedPlaceID, coordinates } = selectedPlace;
      if (place_id && (place_id !== selectedPlaceID || !coordinates)) {
        actionSelectPlace({ place_id });
      } else if (coordinates) {
        actionFetchWeatherStart(coordinates);
      }
    }
  }, [googleMapsApiLoaded]);

  const appRef = useRef();

  const [loadedBG, setLoadedBG] = useState(false);
  useEffect(() => {
      if (!loadedBG) {
        const handleLoad = () => {
          setLoadedBG(true);
        };
        const image = new Image();
        image.addEventListener('load', handleLoad);
        image.src = backgroundImg;
        return () => {
          image.removeEventListener('load', handleLoad);
        };
      } else {
        appRef.current.style.background=`url('${backgroundImg}') no-repeat center center fixed`;
      }
  }, [loadedBG]);



  return (
    <div ref={appRef} className='app'>
      <Header />
      <Content />
    </div>
  );
};

const mapStateToProps = ({ googleMapsApiReducer, placesReducer }) => {
  const { loaded: googleMapsApiLoaded } = googleMapsApiReducer;
  const { selectedPlace } = placesReducer;
  return { googleMapsApiLoaded, selectedPlace };
};

export default connect(mapStateToProps, {
  recordDeviceType,
  loadGoogleMapsApiStart,
  actionFetchWeatherStart,
  actionSelectPlace,
})(App);
