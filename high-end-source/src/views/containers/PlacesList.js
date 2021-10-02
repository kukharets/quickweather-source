import React from 'react';
import { connect } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Expand from '../../assets/expand.svg';
import PlaceHeader from './placeWeather/PlaceHeader';
import { actionSwitchListOpenState } from '../../state/ducks/places/actions';

const PlacesList = ({
  listOpenState,
  placesHashList,
  lastStoreUpdateTime,
  actionSwitchListOpenState,
  layoutType,
}) => {
  const { isDesktopLayout } = layoutType;
  const placesKeys = Object.keys(placesHashList);
  const isNotEmpty =
    lastStoreUpdateTime && placesHashList && placesKeys.length > 0;
  return (
    <div className="places-block">
      {!isDesktopLayout && (
        <>
          <div
            onClick={() => actionSwitchListOpenState()}
            className="expandable-button"
          >
            <Expand className={listOpenState ? 'rotate' : ''} />
            <span>
              {listOpenState ? 'Hide added places' : 'Show added places'}
            </span>
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
        </>
      )}
      {isDesktopLayout && (
        <PerfectScrollbar className="places-list">
          {placesKeys.map(key => (
            <PlaceHeader
              key={`place-item-${key}`}
              place={placesHashList[key]}
              isFavorite
              withSaveButton
            />
          ))}
        </PerfectScrollbar>
      )}
    </div>
  );
};

const mapStateToProps = ({ placesReducer, markupReducer }) => {
  const { listOpenState, savedPlaces } = placesReducer;
  const { lastStoreUpdateTime, placesHashList } = savedPlaces;
  const { layoutType } = markupReducer;

  return {
    placesHashList,
    lastStoreUpdateTime,
    listOpenState,
    layoutType,
  };
};
export default connect(mapStateToProps, { actionSwitchListOpenState })(
  PlacesList,
);
