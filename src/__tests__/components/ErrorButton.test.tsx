import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorButton } from '@components';

describe('ErrorButton component', () => {
  describe('Rendering', () => {
    test('should render error button with correct text', () => {
      render(<ErrorButton />);

      const button = screen.getByRole('button', { name: /error button/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Error Button');
    });

    test('should render without crashing in normal state', () => {
      const { container } = render(<ErrorButton />);

      expect(container).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('User interaction', () => {
    test('should throw error when button is clicked', async () => {
      const user = userEvent.setup();

      render(<ErrorButton />);

      const button = screen.getByRole('button', { name: /error button/i });

      await expect(user.click(button)).rejects.toThrow('Test Error Boundary');
    });
  });
});
