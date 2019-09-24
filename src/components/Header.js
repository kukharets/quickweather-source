import React from 'react';
import Typography from '@material-ui/core/Typography';
import ExpandMenu from '../containers/ExpandMenu';

function Header() {
  return (
    <div className="header">
      <span className="header-legend">
        <Typography className="header-text" color="primary">
          Weather Record
        </Typography>
        <Typography className="header-subtext" inline color="secondary">
          &nbsp;&nbsp;&nbsp;by Taras Kukharets
        </Typography>
      </span>
      <ExpandMenu />
    </div>
  );
}

export default Header;
