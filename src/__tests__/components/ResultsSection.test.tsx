import { render, screen } from '@testing-library/react';
import { ResultsSection } from '@components';
import type { Item } from '@types';

vi.mock('@components/ResultsContent', () => ({
  default: ({
    items,
    loading,
    error,
  }: {
    items: Item[];
    loading: boolean;
    error: string | null;
  }) => (
    <div data-testid='results-content'>
      <span data-testid='items-count'>{items.length}</span>
      <span data-testid='loading-state'>{String(loading)}</span>
      <span data-testid='error-state'>{error || 'null'}</span>
    </div>
  ),
}));

vi.mock('@components/ErrorButton', () => ({
  default: () => <button data-testid='error-button'>Throw Error</button>,
}));

describe('ResultsSection component', () => {
  describe('Rendering', () => {
    test('should render ResultsContent and ErrorButton', () => {
      const items: Item[] = [];
      const loading = false;
      const error = null;

      render(<ResultsSection items={items} loading={loading} error={error} />);

      expect(screen.getByTestId('results-content')).toBeInTheDocument();
      expect(screen.getByTestId('error-button')).toBeInTheDocument();
    });

    test('should pass correct props to ResultsContent', () => {
      const items: Item[] = [
        { name: 'pikachu', description: 'Electric' },
        { name: 'mew', description: 'Mythical' },
      ];
      const loading = true;
      const error = 'Test error';

      render(<ResultsSection items={items} loading={loading} error={error} />);

      expect(screen.getByTestId('items-count')).toHaveTextContent('2');
      expect(screen.getByTestId('loading-state')).toHaveTextContent('true');
      expect(screen.getByTestId('error-state')).toHaveTextContent('Test error');
    });
  });
});
