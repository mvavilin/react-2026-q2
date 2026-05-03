import { Component } from 'react';
import { ErrorBoundary, ErrorButton } from '@components';

class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );
  }
}

export default App;
