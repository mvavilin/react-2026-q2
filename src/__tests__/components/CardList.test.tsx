import { render, screen } from '@testing-library/react';
import { CardList } from '@components';
import type { Item } from '@types';

vi.mock('@components/Card', () => ({
  default: ({ item }: { item: Item }) => (
    <div data-testid={`card-${item.name}`}>
      <h3>{item.name}</h3>
      <p>{item.description}</p>
    </div>
  ),
}));

describe('CardList component', () => {
  describe('Rendering', () => {
    test('should render correct number of items when data is provided', () => {
      const items: Item[] = [
        { name: 'pikachu', description: 'Pokemon pikachu' },
        { name: 'charizard', description: 'Pokemon charizard' },
        { name: 'bulbasaur', description: 'Pokemon bulbasaur' },
      ];

      render(<CardList items={items} />);

      const cards = screen.getAllByTestId(/^card-/);
      expect(cards).toHaveLength(3);

      expect(screen.getByTestId('card-pikachu')).toBeInTheDocument();
      expect(screen.getByTestId('card-charizard')).toBeInTheDocument();
      expect(screen.getByTestId('card-bulbasaur')).toBeInTheDocument();
    });
  });
});
