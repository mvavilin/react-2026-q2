import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorBoundary, ErrorButton } from '@components';

const ThrowOnRender = ({ message = 'Test error' }: { message?: string }) => {
  throw new Error(message);
};

const NormalComponent = () => <div data-testid='normal'>Normal content</div>;

describe('ErrorBoundary component', () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  const getFallbackText = () => screen.queryByText('Something went wrong.');
  const getGoBackButton = () =>
    screen.queryByRole('button', { name: /go back/i });

  describe('Error catching', () => {
    test('should render children when no error occurs', () => {
      render(
        <ErrorBoundary>
          <NormalComponent />
        </ErrorBoundary>
      );

      expect(screen.getByTestId('normal')).toBeInTheDocument();
      expect(getFallbackText()).not.toBeInTheDocument();
      expect(getGoBackButton()).not.toBeInTheDocument();
    });

    test('should display fallback UI and log error when child throws', () => {
      render(
        <ErrorBoundary>
          <ThrowOnRender message='Custom error message' />
        </ErrorBoundary>
      );

      expect(getFallbackText()).toBeInTheDocument();
      expect(getGoBackButton()).toBeInTheDocument();

      const loggedError = consoleErrorSpy.mock.calls
        .flat()
        .find((arg: unknown) => arg instanceof Error);

      expect(loggedError).toBeDefined();
      expect((loggedError as Error).message).toBe('Custom error message');
    });

    test('should not render children after error', () => {
      render(
        <ErrorBoundary>
          <ThrowOnRender />
        </ErrorBoundary>
      );

      expect(screen.queryByTestId('normal')).not.toBeInTheDocument();
      expect(screen.queryByText('Normal content')).not.toBeInTheDocument();
    });
  });

  describe('Recovery', () => {
    test('should stay in error state after clicking "Go back" (no parent reset)', async () => {
      const user = userEvent.setup();

      render(
        <ErrorBoundary>
          <ThrowOnRender />
        </ErrorBoundary>
      );

      expect(getFallbackText()).toBeInTheDocument();

      await user.click(getGoBackButton()!);

      expect(getFallbackText()).toBeInTheDocument();
    });
  });

  describe('Integration with ErrorButton', () => {
    test('should catch error and show fallback UI after ErrorButton click', async () => {
      const user = userEvent.setup();

      render(
        <ErrorBoundary>
          <ErrorButton />
        </ErrorBoundary>
      );

      const errorButton = screen.getByRole('button', {
        name: /error button/i,
      });
      expect(errorButton).toBeInTheDocument();

      await user.click(errorButton);

      expect(getFallbackText()).toBeInTheDocument();
      expect(getGoBackButton()).toBeInTheDocument();

      expect(
        screen.queryByRole('button', { name: /error button/i })
      ).not.toBeInTheDocument();
    });
  });
});
