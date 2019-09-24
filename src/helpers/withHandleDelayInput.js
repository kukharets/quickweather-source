import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function withHandleDelayInput(
  WrappedComponent,
  { action, secondsBeforeAction },
) {
  class Temp extends React.Component {
    static propTypes = {
      action: PropTypes.func.isRequired,
    };

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
        props: { action },
        state: { currentTimeoutObject, lastActionSubmittedValue },
      } = this;
      const value = e && e.target && e.target.value;
      if (value || value === '') {
        if (currentTimeoutObject) {
          clearTimeout(currentTimeoutObject);
        }
        if (secondsBeforeAction && secondsBeforeAction >= 0) {
          this.setState({
            currentTimeoutObject: setTimeout(() => {
              if (value !== lastActionSubmittedValue) {
                this.recordLastSubmittedValue(value);
                action(value);
              }
            }, secondsBeforeAction * 1000),
          });
        } else {
          action(value);
        }
      }
    };

    render() {
      const {
        props: { action, ...rest },
      } = this;
      return <WrappedComponent onChange={this.handleChange} {...rest} />;
    }
  }

  return connect(
    null,
    { action },
  )(Temp);
}

export default withHandleDelayInput;
