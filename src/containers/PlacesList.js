import React from 'react';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Expand from '../assets/expand.svg';
import PlaceHeader from './PlaceHeader';
import { switchListOpenState } from '../actions/markupActions';

function PlacesList(props) {
  const {
    listOpenState,
    placesHashList,
    lastStoreUpdateTime,
    expandButtonClass,
    switchListOpenState,
  } = props;
  const isDesktop = useMediaQuery({
    query: '(min-width: 824px)',
  });
  const placesKeys = Object.keys(placesHashList);
  const isNotEmpty =
    lastStoreUpdateTime && placesHashList && placesKeys.length > 0;

  return (
    <div className="places-block">
      {!isDesktop && (
        <span>
          <div
            onClick={switchListOpenState}
            className={`${expandButtonClass} expandable-button`}
          >
            <Expand className={listOpenState ? 'rotate' : ''} />
            <Typography>
              {listOpenState ? 'Hide added places' : 'Show added places'}
            </Typography>
          </div>
          {listOpenState && isNotEmpty && (
            <span className="places-list-mobile">
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
        </span>
      )}
      {isDesktop && isNotEmpty && (
        <PerfectScrollbar className="places-list-desktop">
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
      )}
    </div>
  );
}

const mapStateToProps = ({ basic, markup }) => {
  const {
    savedPlaces: { placesHashList, lastStoreUpdateTime },
  } = basic;
  const { listOpenState, expandButtonClass, deviceHeights, browser } = markup;
  const { wInnerHeight, dClientHeight } = deviceHeights;
  return {
    placesHashList,
    lastStoreUpdateTime,
    listOpenState,
    expandButtonClass,
    wInnerHeight,
    dClientHeight,
    browser,
  };
};

export default connect(
  mapStateToProps,
  { switchListOpenState },
)(PlacesList);
