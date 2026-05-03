import { Component } from 'react';

interface Props {
  message: string;
}

class ErrorMessage extends Component<Props> {
  render() {
    return <p className='text-red-500 text-center'>{this.props.message}</p>;
  }
}

export default ErrorMessage;
