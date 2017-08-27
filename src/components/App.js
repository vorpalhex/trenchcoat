import React, { Component } from 'react';
import Unlock from './Unlock';
import Journal from './Journal';

const appName = "Trenchcoat";
const date = new Date();
const dummyEntries = Array.from({length: 5}, (e, i) => {
  return {
    title: i,
    date: `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`,
    body: "Foo Bar" + i,
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
          !locked
          ? <Journal entries={entries} />
          : null
        }
        {
          !hideUnlocker
            ? <Unlock appName={appName} status={unlockerStatus} attemptUnlock={this.attemptUnlock} />
            : null
        }
      </div>
    );
  }
}

export default App;
