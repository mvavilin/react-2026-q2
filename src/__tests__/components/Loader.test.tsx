import { render } from '@testing-library/react';
import { Loader } from '@components';

describe('Loader component', () => {
  test('should render loading spinner', () => {
    const { container } = render(<Loader />);

    const spinner = container.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();

    expect(spinner).toHaveClass('animate-spin');
    expect(spinner).toHaveClass('rounded-full');
    expect(spinner).toHaveClass('border-b-2');
    expect(spinner).toHaveClass('border-blue-600');

    expect(spinner).toHaveClass('h-10');
    expect(spinner).toHaveClass('w-10');
  });

  test('should render with correct container styles', () => {
    const { container } = render(<Loader />);

    const containerDiv = container.firstChild;
    expect(containerDiv).toHaveClass('flex');
    expect(containerDiv).toHaveClass('justify-center');
    expect(containerDiv).toHaveClass('py-10');
  });
});
