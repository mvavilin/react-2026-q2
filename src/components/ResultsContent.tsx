import { Component } from 'react';
import { CardList, Loader, ErrorMessage } from '@components';
import type { Item } from '@types';

interface Props {
  items: Item[];
  loading: boolean;
  error: string | null;
}

class ResultsContent extends Component<Props> {
  render() {
    const { items, loading, error } = this.props;

    if (loading) {
      return <Loader />;
    }

    if (error) {
      return <ErrorMessage message={error} />;
    }

    if (items.length === 0) {
      return <ErrorMessage message='No results found' />;
    }

    return <CardList items={items} />;
  }
}

export default ResultsContent;
