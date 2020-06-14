import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const InfoContainer = ({ text, title, description }) => {
  return (
    <Paper className="info-container" elevation={1}>
      {title && (
        <Typography className="error-text" variant="h6" component="h3">
          {title}
        </Typography>
      )}
      {description && <Typography component="p">Details: {text}</Typography>}
    </Paper>
  );
};

export default InfoContainer;
