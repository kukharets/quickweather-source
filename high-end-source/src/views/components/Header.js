import React from 'react';
import ExpandMenu from '../containers/ExpandMenu';

function Header() {
  return (
    <div className="header d-flex align-center justify-between">
      <span className="header-legend">
        <span className="header-text">Quick Weather</span>
        <span className="header-subtext">
          &nbsp;&nbsp;&nbsp;by Taras Kukharets
        </span>
      </span>
      <ExpandMenu />
    </div>
  );
}

export default Header;
