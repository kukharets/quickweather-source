import React, {useLayoutEffect, useState} from 'react';
import { connect } from 'react-redux/es/alternate-renderers';
import { Typography } from '@material-ui/core';
import {
  Whatsapp,
  Telegram,
  Google,
  Facebook,
  Mail,
  Twitter,
} from 'react-social-sharing';
import MenuIcon from '../../assets/menu.svg';
import ShareIcon from '../../assets/share.svg';
import history from "../../utils/history";

function ExpandMenu({ isDesktop, mainText, selectedPlaceID }) {
  const [menuOpenState, setMenuOpenState] = useState(false);
  const [shareOpenState, setShareOpenState] = useState(false);

  const switchMenuOpenState = () => {
    setMenuOpenState(!menuOpenState);
    setShareOpenState(
        false
    );
  };

  const switchShareOpenState = () => {
    setMenuOpenState(false);
    setShareOpenState(!shareOpenState);
  };
  useLayoutEffect(() => {
    const {location: {search: placeIDFromURL}} = window;
    if (selectedPlaceID && placeIDFromURL !== selectedPlaceID) {
      history.push(`?${selectedPlaceID}`)
    }
  }, [selectedPlaceID]);

  return (
      <div className="menu-buttons">
        <ShareIcon onClick={switchShareOpenState} className="header-button" />
        <MenuIcon
            onClick={switchMenuOpenState}
            className={`header-button${isDesktop ? '_desktop' : ''}`}
        />

        {shareOpenState && (
            <div className="share-block">
              <Typography className="share-icon" inline>
                Share weather in <b>{mainText}</b>
              </Typography>
              <div className="share-icons">
                <Whatsapp link={`${window.location.href}`} />
                <Telegram link={`${window.location.href}`} />
                <Twitter link={`${window.location.href}`} />
                <Google link={`${window.location.href}`} />
                <Facebook link={`${window.location.href}`} />
                <Mail link={`${window.location.href}`} />
              </div>
            </div>
        )}
        {menuOpenState && (
            <div className="menu-list">
              <a href="https://github.com/kukharets/quickweather-source">
                <div className="menu-item">
                  <Typography className="clickable-item" inline color="dark">
                    View source code
                  </Typography>
                  <span className="svg-background github-icon social-icon clickable-item" />
                </div>
              </a>
              <a href="https://www.upwork.com/freelancers/~0169f6733a03d07859">
                <div className="menu-item">
                  <Typography className="clickable-item" inline color="dark">
                    Visit author UpWork
                  </Typography>
                  <span className="svg-background upwork-icon social-icon clickable-item" />
                </div>
              </a>
              <a href="https://www.linkedin.com/in/taras-kukharets/">
                <div className="menu-item last-menu-item">
                  <Typography className="clickable-item" inline color="dark">
                    Visit author LinkedIn
                  </Typography>
                  <span className="svg-background linkedin-icon social-icon clickable-item" />
                </div>
              </a>
            </div>
        )}
      </div>
  );
}

const mapStateToProps = ({ markupReducer, placesReducer }) => {
  const {
    deviceType: { isDesktop },
  } = markupReducer;
  const {
    selectedPlace: { structured_formatting: { main_text: mainText } = {}, place_id: selectedPlaceID },
  } = placesReducer;
  return {
    isDesktop,
    mainText,
    selectedPlaceID,
  };
};

export default connect(mapStateToProps, {})(ExpandMenu);
