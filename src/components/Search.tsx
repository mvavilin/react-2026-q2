import { Component, type ChangeEvent } from 'react';

interface Props {
  onSearch: (value: string) => void;
  defaultValue: string;
}

interface State {
  value: string;
}

class Search extends Component<Props, State> {
  state: State = {
    value: this.props.defaultValue,
  };

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: event.target.value });
  };

  handleBlur = () => {
    this.setState((prev) => ({
      value: prev.value.trim(),
    }));
  };

  handleClick = () => {
    const trimmed = this.state.value.trim();

    this.setState({ value: trimmed });

    this.props.onSearch(trimmed);
  };

  render() {
    return (
      <div className='flex gap-3'>
        <input
          className='flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          value={this.state.value}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          placeholder='Search pokemon...'
        />

        <button
          onClick={this.handleClick}
          className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition hover:cursor-pointer'
        >
          Search
        </button>
      </div>
    );
  }
}

export default Search;
