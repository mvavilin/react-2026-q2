import { render, screen } from '@testing-library/react';
import App from '@/App';

vi.mock('@components/Header', () => ({
  default: () => <header data-testid='header'>Search App</header>,
}));

vi.mock('@components/Main', () => ({
  default: () => <main data-testid='main'>Main Content</main>,
}));

vi.mock('@components/ErrorBoundary', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='error-boundary'>{children}</div>
  ),
}));

describe('App component', () => {
  test('should render Header and Main inside ErrorBoundary', () => {
    render(<App />);

    const errorBoundary = screen.getByTestId('error-boundary');
    expect(errorBoundary).toBeInTheDocument();

    const header = screen.getByTestId('header');
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent('Search App');
    expect(errorBoundary).toContainElement(header);

    const main = screen.getByTestId('main');
    expect(main).toBeInTheDocument();
    expect(main).toHaveTextContent('Main Content');
    expect(errorBoundary).toContainElement(main);
  });
});
