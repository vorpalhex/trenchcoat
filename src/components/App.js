import React, { Component } from 'react';
import Unlock from './Unlock';
import Journal from './Journal';
import debounce from 'debounce';

const appName = "Trenchcoat";

class App extends Component {
  constructor() {
    super();
    this.newJournal = this.newJournal.bind(this);
    this.attemptUnlock = this.attemptUnlock.bind(this);
    this.journalUpdated = debounce(this.journalUpdated.bind(this), 3000);
    this.state = {
      journal: false,
      locked: true,
      unlockerStatus: "visible",
    };
  }

  newJournal(password) {
    const journal = journalManager.newJournal(password);
    this.setState({ journal });
    this.unlock();
  }

  journalUpdated() {
    let badSave = error => {
      console.error(error);
    }
    try {
      journalManager.saveJournal((error) => {
        if (error) {
          badSave(error);
        } else {
          console.log('Journal saved!');
        }
      });
    } catch (error) {
      badSave(error);
    }
  }

  attemptUnlock(password) {
    this.setState({ unlockerStatus: "loading" });
    let badDecrypt = error => {
      this.setState({ unlockerStatus: "failed" });
      console.warn('Thrown error during attemptUnlock, likely wrong password.', error);
    };
    try {
      journalManager.loadJournal(password, (error, journal) => {
        if (error) {
          badDecrypt(error);
        } else {
          this.setState({ journal });
          this.unlock();
        }
      });
    } catch (error) {
      badDecrypt(error);
    }
  }

  lock() {
    this.setState({
      locked: true,
      unlockerStatus: "visible",
    });
  }

  unlock() {
    this.setState({
      locked: false,
      unlockerStatus: "loaded"
    });
    setTimeout(() => { // Animated Slide Out
      this.setState(() => { unlockerStatus: "hide" });
    }, 1000);
  }

  render() {
    const { unlockerStatus, locked, journal } = this.state;
    const hideUnlocker = unlockerStatus === "hide";
    return (
      <div className="app">
        {
          !locked
          ? <Journal journal={journal} journalUpdated={this.journalUpdated} />
          : null
        }
        {
          !hideUnlocker
            ? <Unlock appName={appName} status={unlockerStatus} newJournal={this.newJournal} attemptUnlock={this.attemptUnlock} />
            : null
        }
      </div>
    );
  }
}

export default App;
