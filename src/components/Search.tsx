import { Component } from 'react';

interface Props {
  defaultValue: string;
}

interface State {
  value: string;
}

class Search extends Component<Props, State> {
  state: State = {
    value: this.props.defaultValue,
  };

  render() {
    return (
      <div className='flex gap-3'>
        <input
          className='flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          placeholder='Search pokemon...'
        />

        <button className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition'>
          Search
        </button>
      </div>
    );
  }
}

export default Search;
