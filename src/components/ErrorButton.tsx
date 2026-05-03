import { Component } from 'react';

interface State {
  crash: boolean;
}

class ErrorButton extends Component<object, State> {
  state: State = {
    crash: false,
  };

  handleClick = () => {
    this.setState({ crash: true });
  };

  render() {
    if (this.state.crash) {
      throw new Error('Test Error Boundary');
    }

    return (
      <button
        onClick={this.handleClick}
        className='bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 hover:cursor-pointer'
      >
        Error Button
      </button>
    );
  }
}

export default ErrorButton;
