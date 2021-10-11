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
    <div className="text-field-wrapper">
      <input
        id="search-place"
        aria-invalid="false"
        placeholder="...just start typing"
        type="search"
        className="text-search-field"
        onChange={handleChange}
        value={value}
      />
      <label
        htmlFor="search-place"
        data-shrink="true"
        className={value ? 'fixed' : ''}
      >
        Find place for get weather
      </label>
    </div>
  );
};

export default TextFieldWithDelay;
