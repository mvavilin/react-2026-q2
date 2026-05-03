import { Component } from 'react';
import { ResultsContent, ErrorButton } from '@components';
import type { Item } from '@types';

interface Props {
  items: Item[];
  loading: boolean;
  error: string | null;
}

class ResultsSection extends Component<Props> {
  render() {
    const { items, loading, error } = this.props;

    return (
      <section className='max-w-4xl mx-auto rounded-2xl bg-white shadow p-6 min-h-75'>
        <ResultsContent items={items} loading={loading} error={error} />

        <div className='mt-6'>
          <ErrorButton />
        </div>
      </section>
    );
  }
}

export default ResultsSection;
