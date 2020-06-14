import React from 'react';
import TextField from '@material-ui/core/TextField';

class TextFieldWithDelay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTimeoutObject: null,
      lastActionSubmittedValue: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  recordLastSubmittedValue = value => {
    this.setState({ lastActionSubmittedValue: value });
  };

  handleChange = e => {
    const {
      props: { onChange, onChangeAfterDelay: { action, seconds } = {} },
      state: { currentTimeoutObject, lastActionSubmittedValue },
    } = this;
    const value = e && e.target && e.target.value;
    onChange(value);
    if (value || value === '') {
      if (currentTimeoutObject) {
        clearTimeout(currentTimeoutObject);
      }
      if (action && seconds && seconds >= 0) {
        this.setState({
          currentTimeoutObject: setTimeout(() => {
            if (value !== lastActionSubmittedValue) {
              this.recordLastSubmittedValue(value);
              action(value);
            }
          }, seconds * 1000),
        });
      } else {
        action(value);
      }
    }
  };

  render() {
    const {
      props: { value, placeholder, label, onBlur },
    } = this;
    return (
      <div className="text-search-field">
        <TextField
          value={value}
          onChange={this.handleChange}
          fullWidth
          placeholder={placeholder}
          label={label}
          onBlur={onBlur}
          type="search"
        />
      </div>
    );
  }
}

export default TextFieldWithDelay;
