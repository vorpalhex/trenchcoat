import React, { Component } from 'react';
import Entries from './Entries';
import Editor from './Editor';

class Journal extends Component {
  constructor(props) {
    super();
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.setCurrentEntry = this.setCurrentEntry.bind(this);
    this.updateEntry = this.updateEntry.bind(this);
    if (props.journal.entries.length === 0) {
      props.journal.addEntry();
    }
    this.state = {
      currentEntryId: props.journal.entries[0].id,
      entries: props.journal.entries,
      collapse: false,
    };
  }

  updateEntry(updatedEntry) {
    let entries = this.state.entries;
    entries.map(entry => entry.id === updatedEntry.id ? updatedEntry : entry);
    this.setState({
      entries
    });
  }

  setCurrentEntry(currentEntryId) {
    this.setState({ currentEntryId });
  }

  toggleCollapse() {
    let collapse = !this.state.collapse;
    this.setState({ collapse });
  }

  addEntry() {
    this.props.journal.addEntry();
    const entriesByCreated = this.props.journal.entries.sort((a, b) => b.created_at - a.created_at);
    this.setCurrentEntry(entriesByCreated[0].id);
  }

  render() {
    const { entries, collapse, currentEntryId } = this.state;
    const { journal, journalUpdated } = this.props;
    const entry = journal.getEntry(currentEntryId);
    return (
      <div className="journal container">
        <header className="header-actions header-actions-left">
          <button className="button-collapse button-clear" onClick={() => this.toggleCollapse()}>
            Collapse
          </button>
        </header>
        <div className="row">
          <div className={"column column-entries " + (collapse ? "hide" : "column-20")}>
            <button onClick={() => this.addEntry()}>
              New Entry
            </button>
            <Entries entries={entries} setCurrentEntry={this.setCurrentEntry} />
          </div>
          <div className={"column column-writing collumn-" + (collapse ? "100" : "80")}>
            <Editor journal={journal} entry={entry} journalUpdated={journalUpdated} updateEntry={this.updateEntry} />
          </div>
        </div>
      </div>
    );
  }
}

export default Journal;
