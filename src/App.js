import React from 'react';
import { connect } from 'react-redux';
import { detect } from 'detect-browser';
import { isMobile, isTablet } from 'react-device-detect';
import Header from './components/Header';
import Content from './containers/Content';
import {
  actionRecordDeviceType,
  actionRecordBrowser,
  actionMobileBrowserBarsFixer,
} from './actions/markupActions';
import { actionSelectPlace } from './actions/basicActions';

class App extends React.Component {
  componentWillMount() {
    if (isMobile || isTablet) {
      this.mobileBrowserBarsFixer();
      window.addEventListener('resize', () => {
        this.mobileBrowserBarsFixer();
      });
    }
    const {
      props: { actionRecordBrowser, actionRecordDeviceType },
    } = this;
    actionRecordDeviceType({
      isTablet,
      isMobile,
      isDesktop: !isTablet && !isMobile,
    });
    const browser = detect();
    actionRecordBrowser(browser.name);
  }

  componentDidMount() {
    const {
      props: { googleApiLoaded },
    } = this;
    if (googleApiLoaded) {
      this.recordPlaceFromUrl();
    }
  }

  componentDidUpdate(prevProps) {
    const { googleApiLoaded } = prevProps;
    const {
      props: { googleApiLoaded: newGoogleApiLoadedStatus },
    } = this;
    if (!googleApiLoaded && newGoogleApiLoadedStatus) {
      this.recordPlaceFromUrl();
    }
  }

  recordPlaceFromUrl = () => {
    const {
      props: {
        selectedPlaceID,
        history: { location: { search } = {} } = {},
        actionSelectPlace,
      },
    } = this;
    const urlID = search && search.length > 1 && search.substr(1);
    if (urlID !== selectedPlaceID) {
      actionSelectPlace({
        place_id: search.substr(1),
        structured_formatting: {},
      });
    }
  };

  mobileBrowserBarsFixer = () => {
    const {
      props: { actionMobileBrowserBarsFixer },
    } = this;
    let counter = 0;
    const a = setInterval(() => {
      counter++;
      actionMobileBrowserBarsFixer({ windowInnerHeight: window.innerHeight });
      if (counter >= 10) {
        clearInterval(a);
      }
    }, 50);
  };

  render() {
    const {
      props: { windowInnerHeight },
    } = this;
    return (
      <div style={{ height: windowInnerHeight }} className="app">
        <Header />
        <Content />
      </div>
    );
  }
}

const mapStateToProps = ({ markup, basic }) => {
  const {
    deviceHeights: { windowInnerHeight },
  } = markup;
  const {
    googleApiLoaded,
    selectedPlace: { place_id: selectedPlaceID },
  } = basic;
  return { windowInnerHeight, selectedPlaceID, googleApiLoaded };
};

export default connect(
  mapStateToProps,
  {
    actionRecordBrowser,
    actionMobileBrowserBarsFixer,
    actionRecordDeviceType,
    actionSelectPlace,
  },
)(App);
