import React, { useState } from 'react';

const TextFieldWithDelay = ({
  value,
  placeholder,
  label,
  onChange,
  actionAfterDelay,
  delaySecondsValueBeforeActionSubmit,
}) => {
  const [currentTimeoutObject, setCurrentTimeoutObject] = useState(undefined);
  const [lastActionSubmittedValue, setLastActionSubmittedValue] = useState('');

  const handleChange = e => {
    const { target: { value } = {} } = e;
    onChange(value);
    if (value || value === '') {
      if (currentTimeoutObject) {
        clearTimeout(currentTimeoutObject);
      }
      if (delaySecondsValueBeforeActionSubmit) {
        setCurrentTimeoutObject(
          setTimeout(() => {
            if (value !== lastActionSubmittedValue) {
              setLastActionSubmittedValue(value);
              actionAfterDelay(value);
            }
          }, delaySecondsValueBeforeActionSubmit * 1000),
        );
      } else {
        actionAfterDelay(value);
      }
    }
  };

  return (
      <input
        className="text-search-field"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        label={label}
        type="text"
      />
  );
};

export default TextFieldWithDelay;
