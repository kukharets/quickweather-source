import Typography from '@material-ui/core/es/Typography';
import React from 'react';
import { connect } from 'react-redux';
import { isMobile, isTablet } from 'react-device-detect';
import Star from '../assets/star.svg';
import Close from '../assets/close.svg';
import {
  actionClearSuggestions,
  actionSavePlace,
  actionSelectPlace,
  actionRemovePlace,
} from '../actions/basicActions';
import { switchListOpenState } from '../actions/markupActions';

class PlaceHeader extends React.Component {
  actionSelectPlace = () => {
    const {
      props: {
        isDesktop,
        actionSelectPlace,
        switchListOpenState,
        place,
        selectedPlaceID,
      },
    } = this;
    const { id } = place;

    if (id !== selectedPlaceID) {
      actionSelectPlace(place);
      !isDesktop && switchListOpenState();
    }
  };

  clickClose = e => {
    e.stopPropagation();
    const {
      props: { actionSelectPlace },
    } = this;
    actionSelectPlace(undefined);
  };

  clickFavorite = e => {
    e.stopPropagation();
    const {
      props: {
        actionSavePlace,
        actionRemovePlace,
        place: { id, isFavorite },
      },
    } = this;
    if (isFavorite) {
      actionRemovePlace(id);
    } else {
      actionSavePlace();
    }
  };

  render() {
    const {
      props: {
        additionalClass,
        withSaveButton,
        withCloseButton,
        place: {
          isFavorite,
          dailyWeather: weather,
          structured_formatting: {
            main_text: mainText,
            secondary_text: secondaryText,
          } = {},
        },
      },
    } = this;

    const {
      sky: { image } = {},
      temperature: { value: temperatureValue } = {},
    } = weather || {};
    return (
      <div
        onClick={this.actionSelectPlace}
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
              onClick={this.clickFavorite}
              className={`weather-icon basic-icon ${
                isMobile || isTablet ? 'favorite-icon-mobile' : 'favorite-icon'
              }${isFavorite ? '_active' : ''}`}
            />
          )}
          {withCloseButton && (
            <Close
              onClick={this.clickClose}
              className={`weather-icon basic-icon close${
                !isMobile && !isTablet ? '_desktop' : ''
              } scalable`}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ basic }) => {
  const {
    savedPlaces: { placesHashList },
    selectedPlace: { id: selectedPlaceID },
  } = basic;
  return {
    placesHashList,
    selectedPlaceID,
  };
};

export default connect(
  mapStateToProps,
  {
    actionClearSuggestions,
    actionSelectPlace,
    actionSavePlace,
    actionRemovePlace,
    switchListOpenState,
  },
)(PlaceHeader);
