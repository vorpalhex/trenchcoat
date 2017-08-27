import React, { Component } from 'react';
import Entries from './Entries';
import Writing from './Writing';

class Journal extends Component {
  constructor() {
    super();
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.state = {
      currentEntryId: 2,
      collapse: false,
    };
  }

  toggleCollapse() {
    console.log('collapse', this.state.collapse);
    this.setState({
      collapse: !this.state.collapse,
    });
  }

  render() {
    const { collapse } = this.state;
    return (
      <div className="journal container">
        <header className="header-actions header-actions-left">
          <button className="button-collapse button-clear" onClick={() => this.toggleCollapse()}>
            Collapse
          </button>
        </header>
        <div className="row">
          <div className={"column column-entries " + (collapse ? "hide" : "column-20")}>
            <Entries entries={this.props.entries} />
          </div>
          <div className={"column column-writing collumn-" + (collapse ? "100" : "80")}>
            <Writing entry={this.props.entries[this.state.currentEntryId]} />
          </div>
        </div>
      </div>
    );
  }
}

export default Journal;
