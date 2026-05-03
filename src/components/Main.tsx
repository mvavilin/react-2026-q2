import { Component } from 'react';
import {
  Search,
  CardList,
  Loader,
  ErrorMessage,
  ErrorButton,
} from '@components';
import { fetchItems } from '@services/api';
import { getStorageItem, setStorageItem } from '@utils/localStorage';
import type { Item } from '@types';
import { KEY } from '@constants';

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
    search: '',
  };

  componentDidMount() {
    const savedSearch = getStorageItem(KEY);

    this.setState({ search: savedSearch }, () => this.loadData(savedSearch));
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
    } catch {
      this.setState({ error: 'Failed to load data' });
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
        <section className='max-w-4xl mx-auto mb-8 rounded-2xl bg-white shadow p-6'>
          <Search defaultValue={search} onSearch={this.handleSearch} />
        </section>

        <section className='max-w-4xl mx-auto rounded-2xl bg-white shadow p-6 min-h-75'>
          {loading && <Loader />}

          {error && <ErrorMessage message={error} />}

          {!loading && !error && <CardList items={items} />}

          <div className='mt-6'>
            <ErrorButton />
          </div>
        </section>
      </main>
    );
  }
}

export default Main;
