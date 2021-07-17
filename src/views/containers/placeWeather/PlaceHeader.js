import Typography from '@material-ui/core/es/Typography';
import React from 'react';
import { connect } from 'react-redux';
import { isMobile, isTablet } from 'react-device-detect';
import { useMediaQuery } from 'react-responsive/src';
import Star from '../../../assets/star.svg';
import Close from '../../../assets/close.svg';
import {
  actionSelectPlace,
  actionUnselectPlace,
  actionSavePlace,
  actionRemovePlace,
  switchListOpenState,
} from '../../../state/ducks/places/actions';

const PlaceHeader = ({
  place,
  selectedPlaceID,
  additionalClass,
  withSaveButton,
  withCloseButton,
  actionSelectPlace,
  actionUnselectPlace,
  switchListOpenState,
  actionSavePlace,
  actionRemovePlace,
  weatherData
}) => {
  const isDesktop = useMediaQuery({ minWidth: 824 });
  const selectPlace = () => {
    const { place_id } = place;
    if (place_id !== selectedPlaceID) {
      actionSelectPlace(place);
      !isDesktop && switchListOpenState();
    }
  };

  const clickClose = e => {
    e.stopPropagation();
    actionUnselectPlace();
  };

  const clickFavorite = e => {
    e.stopPropagation();
    const { place_id, isFavorite } = place;
    if (isFavorite) {
      actionRemovePlace(place_id);
    } else {
      actionSavePlace();
    }
  };

  const {
    isFavorite,
    dailyWeather: weather,
    structured_formatting: {
      main_text: mainText,
      secondary_text: secondaryText,
    } = {},
  } = place;

  const { sky: { image } = {}, temperature: { value: temperatureValue } = {} } =
  weatherData || {};

  return (
    <div
      onClick={selectPlace}
      className={`place-header ${additionalClass || ''}`}
    >
      <Typography
        color="inherit"
        className={`place-title${secondaryText ? ' border-b' : ''}`}
        variant="h5"
      >
        {mainText}
      </Typography>
      {(temperatureValue || image) && (
        <span className="place-header-weather ">
          {image && <span className={`svg-background ${image}`} />}
          {temperatureValue && (
            <Typography
              className="weather-temperature-text"
              inline
              color="inherit"
              variant="h4"
            >
              {temperatureValue}
            </Typography>
          )}
        </span>
      )}

      <Typography color="inherit" className="place-subtitle">
        {secondaryText}
      </Typography>
      <div className="place-controls">
        {withSaveButton && (
          <Star
            onClick={clickFavorite}
            className={`icon basic-icon ${
              isMobile || isTablet ? 'favorite-icon-mobile' : 'favorite-icon'
            }${isFavorite ? '_active' : ''}`}
          />
        )}
        {withCloseButton && (
          <Close
            onClick={clickClose}
            className={`icon basic-icon close${
              !isMobile && !isTablet ? '_desktop' : ''
            } scalable`}
          />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ placesReducer, markupReducer }) => {
  const {
    savedPlaces: { placesHashList },
    selectedPlace: { place_id: selectedPlaceID },
  } = placesReducer;
  const {
    deviceType: { isDesktop },
  } = markupReducer;
  return {
    placesHashList,
    selectedPlaceID,
    isDesktop,
  };
};

export default connect(mapStateToProps, {
  actionSelectPlace,
  actionUnselectPlace,
  actionSavePlace,
  actionRemovePlace,
  switchListOpenState,
})(PlaceHeader);
