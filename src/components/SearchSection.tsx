import { Component } from 'react';
import { Search } from '@components';

interface Props {
  search: string;
  onSearch: (value: string) => void;
}

class SearchSection extends Component<Props> {
  render() {
    const { search, onSearch } = this.props;

    return (
      <section className='max-w-4xl mx-auto mb-8 rounded-2xl bg-white shadow p-6'>
        <Search defaultValue={search} onSearch={onSearch} />
      </section>
    );
  }
}

export default SearchSection;
