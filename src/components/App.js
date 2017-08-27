import React, { Component } from 'react';
import Unlock from './Unlock';
import Entries from './Entries';

class App extends Component {
  constructor() {
    super();
    this.appName = "Trenchcoat";
    this.attemptUnlock = this.attemptUnlock.bind(this);
    this.state = {
      locked: true,
    };
  }

  attemptUnlock(password) {
    // TODO Send password to backend to confirm unlock
    this.setState({ locked: false });
  }

  render() {
    return (
      <div className="app">
        {
          this.state.locked
            ? <Unlock attemptUnlock={this.attemptUnlock} appName={this.appName} />
            : <Entries />
        }
      </div>
    );
  }
}

export default App;
