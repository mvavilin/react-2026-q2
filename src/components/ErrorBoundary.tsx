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

  render() {
    if (this.state.hasError) {
      return (
        <div className='min-h-screen flex items-center justify-center'>
          <ErrorMessage message='Something went wrong.' />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
