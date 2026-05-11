import { render, screen } from '@testing-library/react';
import { Header } from '@components';

describe('Header component', () => {
  test('should render header with title', () => {
    render(<Header />);

    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();

    const heading = screen.getByRole('heading', { name: /search app/i });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Search App');

    expect(headerElement).toContainElement(heading);
  });
});
