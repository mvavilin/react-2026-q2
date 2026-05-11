import { render, screen } from '@testing-library/react';
import { Card } from '@components';
import type { Item } from '@types';

describe('Card component', () => {
  describe('Rendering', () => {
    test('should render item name and description', () => {
      const item: Item = {
        name: 'pikachu',
        description: 'Pokemon pikachu',
      };

      render(<Card item={item} />);

      expect(screen.getByText('pikachu')).toBeInTheDocument();
      expect(screen.getByText('Pokemon pikachu')).toBeInTheDocument();
    });
  });
});
