import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchSection from '@components/SearchSection';

vi.mock('@components/Search', () => ({
  default: ({
    defaultValue,
    onSearch,
  }: {
    defaultValue: string;
    onSearch: (value: string) => void;
  }) => (
    <div data-testid='search-mock'>
      <span data-testid='search-default-value'>{defaultValue}</span>
      <button data-testid='search-trigger' onClick={() => onSearch('test')}>
        Trigger Search
      </button>
    </div>
  ),
}));

describe('SearchSection component', () => {
  test('should render Search with correct defaultValue prop', () => {
    const mockOnSearch = vi.fn();
    const searchTerm = 'pikachu';

    render(<SearchSection search={searchTerm} onSearch={mockOnSearch} />);

    const defaultValueSpan = screen.getByTestId('search-default-value');
    expect(defaultValueSpan).toHaveTextContent('pikachu');
  });

  test('should wrap Search in a section element', () => {
    const mockOnSearch = vi.fn();

    const { container } = render(
      <SearchSection search='' onSearch={mockOnSearch} />
    );

    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
    expect(section).toContainElement(screen.getByTestId('search-mock'));
  });

  test('should call onSearch when Search triggers the callback', async () => {
    const user = userEvent.setup();
    const mockOnSearch = vi.fn();

    render(<SearchSection search='initial' onSearch={mockOnSearch} />);

    await user.click(screen.getByTestId('search-trigger'));

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith('test');
  });
});
