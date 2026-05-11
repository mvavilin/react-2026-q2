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

    test('should render name with capitalize class', () => {
      const item: Item = { name: 'bulbasaur', description: 'Grass type' };

      render(<Card item={item} />);

      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toHaveTextContent('bulbasaur');
      expect(heading).toHaveClass('capitalize');
    });
  });

  describe('Edge cases', () => {
    test('should handle empty name', () => {
      const item: Item = { name: '', description: 'No name pokemon' };

      render(<Card item={item} />);

      expect(screen.getByText('No name pokemon')).toBeInTheDocument();
    });

    test('should handle empty description', () => {
      const item: Item = { name: 'mew', description: '' };

      render(<Card item={item} />);

      expect(screen.getByText('mew')).toBeInTheDocument();
    });
  });
});
