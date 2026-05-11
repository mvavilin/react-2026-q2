import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorBoundary } from '@components';

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

  const assertFallbackUI = () => {
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /go back/i })
    ).toBeInTheDocument();
  };

  const assertNoFallbackUI = () => {
    expect(screen.queryByText('Something went wrong.')).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /go back/i })
    ).not.toBeInTheDocument();
  };

  describe('Error catching', () => {
    test('should render children when no error occurs', () => {
      render(
        <ErrorBoundary>
          <NormalComponent />
        </ErrorBoundary>
      );

      expect(screen.getByTestId('normal')).toBeInTheDocument();
      assertNoFallbackUI();
    });

    test('should display fallback UI and log error when child throws', () => {
      render(
        <ErrorBoundary>
          <ThrowOnRender message='Custom error message' />
        </ErrorBoundary>
      );

      assertFallbackUI();

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

      assertFallbackUI();

      await user.click(screen.getByRole('button', { name: /go back/i }));

      expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
    });
  });

  describe('Integration with ErrorButton', () => {
    let ErrorButton: React.ComponentType;

    beforeAll(async () => {
      ({ ErrorButton } = await import('@components'));
    });

    test('should catch error and show fallback UI after ErrorButton click', async () => {
      const user = userEvent.setup();

      render(
        <ErrorBoundary>
          <ErrorButton />
        </ErrorBoundary>
      );

      expect(
        screen.getByRole('button', { name: /error button/i })
      ).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: /error button/i }));

      assertFallbackUI();

      expect(
        screen.queryByRole('button', { name: /error button/i })
      ).not.toBeInTheDocument();
    });
  });
});
