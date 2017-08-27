import React, { Component } from 'react';
import Unlock from './Unlock';
import Entries from './Entries';

const appName = "Trenchcoat";
const date = new Date();
const dummyEntries = Array.from({length: 5}, (e, i) => {
  return {
    title: i,
    date: `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`,
  };
});

class App extends Component {
  constructor() {
    super();
    this.attemptUnlock = this.attemptUnlock.bind(this);
    this.state = {
      entries: dummyEntries,
      locked: true,
      unlockerStatus: "visible",
    };
  }

  attemptUnlock(password) {
    // TODO Send password to backend to confirm unlock
    this.unlock();
  }

  lock() {
    this.setState({
      locked: true,
      unlockerStatus: "visible",
    });
  }

  unlock() {
    this.setState({ locked: false });
    this.fetchEntries();
  }

  fetchEntries() {
    // TODO fetch entries from backend
    this.setState({ unlockerStatus: "loading" });
    setTimeout(() => { // Arbitrary faking loading until backend is done
      this.setState({ unlockerStatus: "loaded" });
      setTimeout(() => {
        this.setState(() => { unlockerStatus: "hide" });
      }, 1000);
    }, 2000);
  }

  render() {
    const { unlockerStatus, locked, entries } = this.state;
    const hideUnlocker = unlockerStatus === "hide";
    return (
      <div className="app">
        {
          !hideUnlocker
            ? <Unlock appName={appName} status={unlockerStatus} attemptUnlock={this.attemptUnlock} />
            : null
        }
        {
          !locked
          ? <Entries entries={entries} />
          : null
        }
      </div>
    );
  }
}

export default App;
