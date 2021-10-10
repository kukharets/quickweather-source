import React from 'react';
import ExpandMenu from '../containers/ExpandMenu';

function Header() {
  return (
    <div className="header flex-align-center flex-justify-between">
      <span className="header-legend">
        <span>Quick Weather</span>
        <span>by Taras Kukharets</span>
      </span>
      <ExpandMenu />
    </div>
  );
}

export default Header;
