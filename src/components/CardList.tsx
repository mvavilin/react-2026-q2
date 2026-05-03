import { Component } from 'react';
import { Card } from '@components';
import type { Item } from '@types';

interface Props {
  items: Item[];
}

class CardList extends Component<Props> {
  render() {
    return (
      <div className='grid gap-4 sm:grid-cols-2'>
        {this.props.items.map((item) => (
          <Card key={item.name} item={item} />
        ))}
      </div>
    );
  }
}

export default CardList;
