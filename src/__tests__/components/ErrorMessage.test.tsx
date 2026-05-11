import { render, screen } from '@testing-library/react';
import { ErrorMessage } from '@components';

describe('ErrorMessage component', () => {
  describe('Rendering', () => {
    test('should render error message text', () => {
      const message = 'Something went wrong.';

      render(<ErrorMessage message={message} />);

      expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
    });

    test('should render with correct error styling', () => {
      const message = 'Error occurred';

      render(<ErrorMessage message={message} />);

      const errorElement = screen.getByText('Error occurred');
      expect(errorElement).toHaveClass('text-red-500');
      expect(errorElement).toHaveClass('text-center');
    });
  });
});
