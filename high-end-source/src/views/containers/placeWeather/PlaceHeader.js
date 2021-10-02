import React from 'react';
import { connect } from 'react-redux';
import Star from '../../../assets/star.svg';
import Close from '../../../assets/close.svg';
import {
  actionSelectPlace,
  actionUnselectPlace,
  actionSavePlace,
  actionRemovePlace,
  actionSwitchListOpenState,
} from '../../../state/ducks/places/actions';

const PlaceHeader = ({
  place,
  selectedPlaceID,
  additionalClass,
  withSaveButton,
  withCloseButton,
  weatherData,
  layoutType,
  actionSelectPlace,
  actionUnselectPlace,
  actionSwitchListOpenState,
  actionSavePlace,
  actionRemovePlace,
}) => {
  const { isDesktopLayout, isTabletLayout, isMobileLayout } = layoutType;
  const selectPlace = () => {
    const { placeID } = place;
    if (placeID !== selectedPlaceID) {
      actionSelectPlace(place);
      !isDesktopLayout && actionSwitchListOpenState();
    }
  };

  const clickClose = e => {
    e.stopPropagation();
    actionUnselectPlace();
  };

  const clickFavorite = e => {
    e.stopPropagation();
    const { placeID, isFavorite } = place;
    if (isFavorite) {
      actionRemovePlace(placeID);
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
      <span
        className={`place-title${secondaryText ? ' border-b' : ''}`}
      >
        {mainText}
      </span>
      {(temperatureValue || image) && (
        <span className="place-header-weather ">
          {image && <span className={`svg-background ${image}`} />}
          {temperatureValue && (
            <span
              className="weather-temperature-text"
            >
              {temperatureValue}
            </span>
          )}
        </span>
      )}

      <span color="inherit" className="place-subtitle">
        {secondaryText}
      </span>
      <span className="place-controls">
        {withSaveButton && (
          <Star
            onClick={clickFavorite}
            className={`icon basic-icon ${
              isMobileLayout || isTabletLayout
                ? 'favorite-icon-mobile'
                : 'favorite-icon'
            }${isFavorite ? '_active' : ''}`}
          />
        )}
        {withCloseButton && (
          <Close
            onClick={clickClose}
            className={`icon basic-icon close${
              !isMobileLayout && !isTabletLayout ? '_desktop' : ''
            } scalable`}
          />
        )}
      </span>
    </div>
  );
};

const mapStateToProps = ({ placesReducer, markupReducer }) => {
  const {
    savedPlaces: { placesHashList },
    selectedPlace: { placeID: selectedPlaceID },
  } = placesReducer;
  const { layoutType } = markupReducer;
  return {
    placesHashList,
    selectedPlaceID,
    layoutType,
  };
};

export default connect(mapStateToProps, {
  actionSelectPlace,
  actionUnselectPlace,
  actionSavePlace,
  actionRemovePlace,
  actionSwitchListOpenState,
})(PlaceHeader);
