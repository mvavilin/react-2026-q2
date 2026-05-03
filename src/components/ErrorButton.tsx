import { Component } from 'react';

class ErrorButton extends Component {
  handleClick = () => {
    throw new Error('Test error from ErrorButton');
  };

  render() {
    return null;
  }
}

export default ErrorButton;
