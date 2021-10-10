import React, { useState } from 'react';
import { connect } from 'react-redux/es/alternate-renderers';
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

function ExpandMenu({ mainText }) {
  const [menuOpenState, setMenuOpenState] = useState(false);
  const [shareOpenState, setShareOpenState] = useState(false);

  const switchMenuOpenState = () => {
    setMenuOpenState(!menuOpenState);
    setShareOpenState(false);
  };

  const switchShareOpenState = () => {
    setMenuOpenState(false);
    setShareOpenState(!shareOpenState);
  };

  return (
    <div className="menu-buttons flex-justify-between">
      <ShareIcon
        title="Share"
        onClick={switchShareOpenState}
        className={`header-button ${shareOpenState && 'opened'}`}
      />
      <MenuIcon
        title="Links"
        onClick={switchMenuOpenState}
        className={`header-button ${menuOpenState && 'opened'}`}
      />

      {shareOpenState && (
        <div className="share-block">
          <span className="share-title flex-justify-center text-center">
            {mainText && (
              <span>
                Share weather in <b>{mainText}</b>
              </span>
            )}
            {!mainText && (
              <span>
                You will share <b>website URL</b>. For share the <b>weather</b>,
                please find & select some place or city
              </span>
            )}
          </span>
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
        <div className="links-list">
          <a href="https://github.com/kukharets/quickweather-source">
            <div className="links-item">
              <span className="cursor-pointer">
                View source code
              </span>
              <span className="svg-background github-icon social-icon cursor-pointer" />
            </div>
          </a>
          <a href="https://www.upwork.com/freelancers/~0169f6733a03d07859">
            <div className="links-item">
              <span className="cursor-pointer">
                Visit author UpWork
              </span>
              <span className="svg-background upwork-icon social-icon cursor-pointer" />
            </div>
          </a>
          <a href="https://www.linkedin.com/in/taras-kukharets/">
            <div className="links-item">
              <span className="cursor-pointer">
                Visit author LinkedIn
              </span>
              <span className="svg-background linkedin-icon social-icon cursor-pointer" />
            </div>
          </a>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = ({ placesReducer }) => {
  const {
    selectedPlace: {
      structured_formatting: { main_text: mainText } = {},
    },
  } = placesReducer;
  return {
    mainText,
  };
};

export default connect(mapStateToProps, {})(ExpandMenu);
