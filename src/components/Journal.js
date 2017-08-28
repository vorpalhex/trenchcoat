import React, { Component } from 'react';
import Entries from './Entries';
import Writing from './Writing';

class Journal extends Component {
  constructor() {
    super();
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.setCurrentEntry = this.setCurrentEntry.bind(this);
    this.state = {
      currentEntryId: 2,
      collapse: false,
    };
  }

  setCurrentEntry(currentEntryId) {
    console.log('set current entry', currentEntryId);
    this.setState({currentEntryId});
  }

  toggleCollapse() {
    console.log('collapse', this.state.collapse);
    this.setState({
      collapse: !this.state.collapse,
    });
  }

  render() {
    const { collapse, currentEntryId } = this.state;
    const { entries } = this.props;
    const entry = entries[currentEntryId];
    return (
      <div className="journal container">
        <header className="header-actions header-actions-left">
          <button className="button-collapse button-clear" onClick={() => this.toggleCollapse()}>
            Collapse
          </button>
        </header>
        <div className="row">
          <div className={"column column-entries " + (collapse ? "hide" : "column-20")}>
            <Entries entries={entries} setCurrentEntry={this.setCurrentEntry} />
          </div>
          <div className={"column column-writing collumn-" + (collapse ? "100" : "80")}>
            <Writing entry={entry} />
          </div>
        </div>
      </div>
    );
  }
}

export default Journal;
