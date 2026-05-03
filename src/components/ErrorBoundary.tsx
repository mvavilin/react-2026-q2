import { Component, type ErrorInfo, type ReactNode } from 'react';
import { ErrorMessage } from '@components';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error);
    console.error('Component stack:', info.componentStack);
  }

  resetError = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className='min-h-screen flex flex-col gap-4 items-center justify-center'>
          <ErrorMessage message='Something went wrong.' />

          <button
            onClick={this.resetError}
            className='bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition hover:cursor-pointer'
          >
            Go back
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
