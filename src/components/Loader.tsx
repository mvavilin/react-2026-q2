import { Component } from 'react';

class Loader extends Component {
  render() {
    return (
      <div className='flex justify-center py-10'>
        <div className='animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600' />
      </div>
    );
  }
}

export default Loader;
