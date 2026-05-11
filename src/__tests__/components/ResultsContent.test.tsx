import { render, screen } from '@testing-library/react';
import { ResultsContent } from '@components';
import type { Item } from '@types';

vi.mock('@components/Loader', () => ({
  default: () => <div data-testid='loader'>Loading...</div>,
}));

vi.mock('@components/ErrorMessage', () => ({
  default: ({ message }: { message: string }) => (
    <div data-testid='error-message'>{message}</div>
  ),
}));

vi.mock('@components/CardList', () => ({
  default: ({ items }: { items: Item[] }) => (
    <div data-testid='card-list'>
      {items.map((item) => (
        <div key={item.name} data-testid={`item-${item.name}`}>
          {item.name}
        </div>
      ))}
    </div>
  ),
}));

describe('ResultsContent component', () => {
  describe('Loading state', () => {
    test('should show Loader when loading is true', () => {
      render(<ResultsContent items={[]} loading={true} error={null} />);

      expect(screen.getByTestId('loader')).toBeInTheDocument();
      expect(screen.queryByTestId('card-list')).not.toBeInTheDocument();
      expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
    });

    test('should prioritize loading over error', () => {
      render(
        <ResultsContent items={[]} loading={true} error='Some error happened' />
      );

      expect(screen.getByTestId('loader')).toBeInTheDocument();
      expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
    });
  });

  describe('Error state', () => {
    test.each([
      ['Failed to fetch data'],
      ['Internal Server Error'],
      ['Not Found'],
    ])('should display error message: %s', (errorMessage) => {
      render(
        <ResultsContent items={[]} loading={false} error={errorMessage} />
      );
      expect(screen.getByTestId('error-message')).toHaveTextContent(
        errorMessage
      );
    });

    test('should not show CardList when error is present', () => {
      const items: Item[] = [{ name: 'pikachu', description: 'Electric type' }];

      render(<ResultsContent items={items} loading={false} error='Error' />);

      expect(screen.queryByTestId('card-list')).not.toBeInTheDocument();
    });
  });

  describe('Empty state', () => {
    test('should show "No results found" when items array is empty', () => {
      render(<ResultsContent items={[]} loading={false} error={null} />);

      expect(screen.getByTestId('error-message')).toBeInTheDocument();
      expect(screen.getByTestId('error-message')).toHaveTextContent(
        'No results found'
      );
    });
  });

  describe('Data state', () => {
    test('should render CardList with correct number of items', () => {
      const items: Item[] = [
        { name: 'pikachu', description: 'Electric type' },
        { name: 'bulbasaur', description: 'Grass type' },
      ];

      render(<ResultsContent items={items} loading={false} error={null} />);

      expect(screen.getByTestId('card-list')).toBeInTheDocument();
      expect(screen.getByTestId('item-pikachu')).toBeInTheDocument();
      expect(screen.getByTestId('item-bulbasaur')).toBeInTheDocument();
    });

    test('should correctly display item names and descriptions', () => {
      const items: Item[] = [{ name: 'charizard', description: 'Fire type' }];

      render(<ResultsContent items={items} loading={false} error={null} />);

      expect(screen.getByText('charizard')).toBeInTheDocument();
    });
  });
});
