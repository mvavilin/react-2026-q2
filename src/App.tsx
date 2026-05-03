import { Component } from 'react';
import { ErrorBoundary, Header, Main } from '@components';

class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <Header />
        <Main />
      </ErrorBoundary>
    );
  }
}

export default App;
