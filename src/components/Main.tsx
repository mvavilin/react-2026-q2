import { Component } from 'react';
import {
  Search,
  CardList,
  Loader,
  ErrorMessage,
  ErrorButton,
} from '@components';
import type { Item } from '@types';

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

  render() {
    const { items, loading, error, search } = this.state;

    return (
      <main className='min-h-screen bg-gray-100 p-6'>
        <section className='max-w-4xl mx-auto mb-8 rounded-2xl bg-white shadow p-6'>
          <Search defaultValue={search} />
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
