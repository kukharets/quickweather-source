import React from 'react';

const InfoBlock = ({ text, title }) => {
  return (
    <div className="info-container">
      <span className="error-text">{title}</span>
      <span>Details: {text}</span>
    </div>
  );
};

export default InfoBlock;
