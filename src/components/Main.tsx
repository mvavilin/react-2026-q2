import { Component } from 'react';
import { fetchItems } from '@services/api';
import { getStorageItem, setStorageItem } from '@utils/localStorage';
import type { Item } from '@types';
import { KEY } from '@constants';
import { SearchSection, ResultsSection } from '@components';

interface State {
  items: Item[];
  loading: boolean;
  error: string | null;
  search: string;
}

class Main extends Component<object, State> {
  state: State = {
    items: [],
    loading: false,
    error: null,
    search: getStorageItem(KEY),
  };

  componentDidMount() {
    this.loadData(this.state.search);
  }

  loadData = async (search: string) => {
    this.setState({ loading: true, error: null });

    try {
      const data = await fetchItems(search);

      const items: Item[] = data.map((item) => ({
        name: item.name,
        description: `Pokemon ${item.name}`,
      }));

      this.setState({ items });
    } catch (error) {
      if (error instanceof Error) {
        this.setState({ error: error.message });
      } else {
        this.setState({ error: 'Unknown error occurred' });
      }
    } finally {
      this.setState({ loading: false });
    }
  };

  handleSearch = (value: string) => {
    const trimmed = value.trim();

    if (trimmed === this.state.search) return;

    setStorageItem(KEY, trimmed);

    this.setState({ search: trimmed }, () => this.loadData(trimmed));
  };

  render() {
    const { items, loading, error, search } = this.state;

    return (
      <main className='min-h-screen bg-gray-100 p-6'>
        <SearchSection search={search} onSearch={this.handleSearch} />

        <ResultsSection items={items} loading={loading} error={error} />
      </main>
    );
  }
}

export default Main;
