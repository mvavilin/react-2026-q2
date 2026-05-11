import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Search } from '@components';

describe('Search component', () => {
  describe('Rendering', () => {
    test('should render search input and search button', () => {
      const mockOnSearch = vi.fn();

      render(<Search defaultValue='' onSearch={mockOnSearch} />);

      const input = screen.getByRole('textbox');
      const button = screen.getByRole('button', { name: /search/i });

      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('placeholder', 'Search pokemon...');
      expect(button).toBeInTheDocument();
    });

    test('should display defaultValue when provided', () => {
      const savedTerm = 'pikachu';
      const mockOnSearch = vi.fn();

      render(<Search defaultValue={savedTerm} onSearch={mockOnSearch} />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('pikachu');
    });

    test('should show empty input when defaultValue is empty string', () => {
      const mockOnSearch = vi.fn();

      render(<Search defaultValue='' onSearch={mockOnSearch} />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('');
    });
  });

  describe('User Interactions', () => {
    test('should update input value when user types', async () => {
      const user = userEvent.setup();
      const mockOnSearch = vi.fn();

      render(<Search defaultValue='' onSearch={mockOnSearch} />);

      const input = screen.getByRole('textbox');
      await user.type(input, 'charizard');

      expect(input).toHaveValue('charizard');
    });

    test('should call onSearch with trimmed value on button click', async () => {
      const user = userEvent.setup();
      const mockOnSearch = vi.fn();

      render(<Search defaultValue='' onSearch={mockOnSearch} />);

      const input = screen.getByRole('textbox');
      const button = screen.getByRole('button', { name: /search/i });

      await user.type(input, '  mewtwo  ');
      await user.click(button);

      expect(mockOnSearch).toHaveBeenCalledTimes(1);
      expect(mockOnSearch).toHaveBeenCalledWith('mewtwo');

      expect(input).toHaveValue('mewtwo');
    });

    test('should trim whitespace on blur', async () => {
      const user = userEvent.setup();
      const mockOnSearch = vi.fn();

      render(<Search defaultValue='' onSearch={mockOnSearch} />);

      const input = screen.getByRole('textbox');
      await user.type(input, '  bulbasaur  ');

      await user.tab();

      expect(input).toHaveValue('bulbasaur');

      expect(mockOnSearch).not.toHaveBeenCalled();
    });

    test('should handle multiple spaces between words on search', async () => {
      const user = userEvent.setup();
      const mockOnSearch = vi.fn();

      render(<Search defaultValue='' onSearch={mockOnSearch} />);

      const input = screen.getByRole('textbox');
      const button = screen.getByRole('button', { name: /search/i });

      await user.type(input, '  mr   mime  ');
      await user.click(button);

      expect(mockOnSearch).toHaveBeenCalledWith('mr   mime');
    });
  });

  describe('Props integration', () => {
    test('should not call onSearch on initial render', () => {
      const mockOnSearch = vi.fn();

      render(<Search defaultValue='test' onSearch={mockOnSearch} />);

      expect(mockOnSearch).not.toHaveBeenCalled();
    });
  });
});
