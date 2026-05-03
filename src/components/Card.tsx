import { Component } from 'react';
import type { Item } from '@types';

interface Props {
  item: Item;
}

class Card extends Component<Props> {
  render() {
    const { name, description } = this.props.item;

    return (
      <div className='border rounded-xl p-4 hover:shadow transition'>
        <h3 className='text-lg font-semibold capitalize'>{name}</h3>

        <p className='text-gray-600'>{description}</p>
      </div>
    );
  }
}

export default Card;
