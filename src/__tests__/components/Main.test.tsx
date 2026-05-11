import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Main } from '@components';
import { KEY } from '@constants';
import type { ApiItem } from '@types';

vi.mock('@services/api', () => ({
  fetchItems: vi.fn(),
}));

vi.mock('@utils/localStorage', () => ({
  getStorageItem: vi.fn(),
  setStorageItem: vi.fn(),
}));

vi.mock('@components/SearchSection', () => ({
  default: ({
    search,
    onSearch,
  }: {
    search: string;
    onSearch: (v: string) => void;
  }) => (
    <div data-testid='search-section'>
      <span data-testid='search-value'>{search}</span>
      <button data-testid='trigger-search' onClick={() => onSearch('pikachu')}>
        Search
      </button>
      <button
        data-testid='trigger-search-same'
        onClick={() => onSearch(search)}
      >
        Search Same
      </button>
      <button
        data-testid='trigger-search-spaces'
        onClick={() => onSearch('  charizard  ')}
      >
        Search With Spaces
      </button>
    </div>
  ),
}));

vi.mock('@components/ResultsSection', () => ({
  default: ({
    items,
    loading,
    error,
  }: {
    items: { name: string }[];
    loading: boolean;
    error: string | null;
  }) => (
    <div data-testid='results-section'>
      {loading && <div data-testid='loading-indicator' />}
      {error && <div data-testid='error-message'>{error}</div>}
      {!loading && !error && items.length > 0 && (
        <ul data-testid='items-list'>
          {items.map((item, i) => (
            <li key={i} data-testid={`item-${i}`}>
              {item.name}
            </li>
          ))}
        </ul>
      )}
      {!loading && !error && items.length === 0 && (
        <div data-testid='no-results' />
      )}
    </div>
  ),
}));

import { fetchItems } from '@services/api';
import { getStorageItem, setStorageItem } from '@utils/localStorage';

describe('Main component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const setupMain = (search = '', items: ApiItem[] = []) => {
    vi.mocked(getStorageItem).mockReturnValue(search);
    vi.mocked(fetchItems).mockResolvedValue(items);
  };

  const renderAndWait = async () => {
    render(<Main />);
    await waitFor(() => {
      expect(screen.getByTestId('results-section')).toBeInTheDocument();
    });
  };

  describe('localStorage integration', () => {
    test('should read search term from localStorage on mount', async () => {
      setupMain('pikachu');
      await renderAndWait();

      expect(getStorageItem).toHaveBeenCalledWith(KEY);
      expect(screen.getByTestId('search-value')).toHaveTextContent('pikachu');
    });

    test('should show empty search when localStorage is empty', async () => {
      setupMain('');
      await renderAndWait();

      expect(screen.getByTestId('search-value')).toHaveTextContent('');
      expect(screen.getByTestId('no-results')).toBeInTheDocument();
    });

    test('should write to localStorage on new search', async () => {
      const user = userEvent.setup();
      setupMain('');
      await renderAndWait();

      await user.click(screen.getByTestId('trigger-search'));

      expect(setStorageItem).toHaveBeenCalledWith(KEY, 'pikachu');
    });

    test('should overwrite localStorage on new search', async () => {
      const user = userEvent.setup();
      setupMain('old-search');
      await renderAndWait();

      await user.click(screen.getByTestId('trigger-search'));

      expect(setStorageItem).toHaveBeenCalledWith(KEY, 'pikachu');
    });
  });

  describe('API integration', () => {
    test('should call fetchItems on mount', async () => {
      setupMain('eevee');
      await renderAndWait();

      expect(fetchItems).toHaveBeenCalledWith('eevee');
    });

    test('should call fetchItems on new search', async () => {
      const user = userEvent.setup();
      setupMain('');
      await renderAndWait();

      await user.click(screen.getByTestId('trigger-search'));

      expect(fetchItems).toHaveBeenCalledTimes(2);
      expect(fetchItems).toHaveBeenLastCalledWith('pikachu');
    });

    test('should not call fetchItems if search unchanged', async () => {
      const user = userEvent.setup();
      setupMain('pikachu');
      await renderAndWait();

      vi.mocked(fetchItems).mockClear();
      await user.click(screen.getByTestId('trigger-search-same'));

      expect(fetchItems).not.toHaveBeenCalled();
    });

    test('should display items on success', async () => {
      setupMain('test', [
        { name: 'bulbasaur', url: 'url1' },
        { name: 'charmander', url: 'url2' },
      ]);

      render(<Main />);
      await waitFor(() => {
        expect(screen.getByTestId('items-list')).toBeInTheDocument();
      });

      expect(screen.getAllByTestId(/^item-/)).toHaveLength(2);
    });

    test('should display error on API failure', async () => {
      vi.mocked(getStorageItem).mockReturnValue('test');
      vi.mocked(fetchItems).mockRejectedValue(new Error('Network error'));

      render(<Main />);
      await waitFor(() => {
        expect(screen.getByTestId('error-message')).toHaveTextContent(
          'Network error'
        );
      });
    });

    test('should handle unknown error', async () => {
      vi.mocked(getStorageItem).mockReturnValue('test');
      vi.mocked(fetchItems).mockRejectedValue('Unknown');

      render(<Main />);
      await waitFor(() => {
        expect(screen.getByTestId('error-message')).toHaveTextContent(
          'Unknown error occurred'
        );
      });
    });
  });

  describe('Loading state', () => {
    test('should show loading while fetching', () => {
      vi.mocked(getStorageItem).mockReturnValue('test');
      vi.mocked(fetchItems).mockImplementation(() => new Promise(() => {}));

      render(<Main />);

      expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
    });

    test('should hide loading after fetch', async () => {
      setupMain('test');
      render(<Main />);

      await waitFor(() => {
        expect(
          screen.queryByTestId('loading-indicator')
        ).not.toBeInTheDocument();
      });
    });
  });

  describe('Empty state', () => {
    test('should show no results when items empty', async () => {
      setupMain('test');
      await renderAndWait();

      expect(screen.getByTestId('no-results')).toBeInTheDocument();
    });
  });

  describe('Search trimming', () => {
    test('should trim spaces before saving', async () => {
      const user = userEvent.setup();
      setupMain('');
      await renderAndWait();

      await user.click(screen.getByTestId('trigger-search-spaces'));

      expect(setStorageItem).toHaveBeenCalledWith(KEY, 'charizard');
      expect(fetchItems).toHaveBeenLastCalledWith('charizard');
    });
  });
});
