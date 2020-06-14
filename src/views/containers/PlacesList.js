import React from 'react';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import MediaQuery from 'react-responsive';
import Expand from '../../assets/expand.svg';
import PlaceHeader from './placeWeather/PlaceHeader';
import { switchListOpenState } from '../../state/ducks/places/actions';

const PlacesList = ({
  listOpenState,
  placesHashList,
  lastStoreUpdateTime,
  switchListOpenState,
}) => {
  const placesKeys = Object.keys(placesHashList);
  const isNotEmpty =
    lastStoreUpdateTime && placesHashList && placesKeys.length > 0;
  return (
    <div className="places-block">
      <MediaQuery maxDeviceWidth={823}>
        <div
          onClick={() => switchListOpenState()}
          className="expandable-button"
        >
          <Expand className={listOpenState ? 'rotate' : ''} />
          <Typography>
            {listOpenState ? 'Hide added places' : 'Show added places'}
          </Typography>
        </div>
        {listOpenState && isNotEmpty && (
          <span className="places-list">
            {placesKeys.map(key => (
              <PlaceHeader
                key={`place-item-${key}`}
                place={placesHashList[key]}
                isFavorite
                withSaveButton
              />
            ))}
          </span>
        )}
      </MediaQuery>
      <MediaQuery minDeviceWidth={824}>
        <PerfectScrollbar className="places-list">
          {placesKeys.map(key => (
            <PlaceHeader
              isDesktop
              key={`place-item-${key}`}
              place={placesHashList[key]}
              isFavorite
              withSaveButton
            />
          ))}
        </PerfectScrollbar>
      </MediaQuery>
    </div>
  );
};

const mapStateToProps = ({ placesReducer }) => {
  const { listOpenState, savedPlaces } = placesReducer;
  const { lastStoreUpdateTime, placesHashList } = savedPlaces;
  return {
    placesHashList,
    lastStoreUpdateTime,
    listOpenState,
  };
};
export default connect(
  mapStateToProps,
  { switchListOpenState },
)(PlacesList);
