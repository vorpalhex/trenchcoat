import React, { Component } from 'react';
import Entries from './Entries';
import Writing from './Writing';

class Journal extends Component {
  constructor() {
    super();
    this.state = {
      currentEntryId: 2,
    };
  }

  render() {
    return (
      <div className="journal container">
        <div className="row">
          <div className="column column-20">
            <Entries entries={this.props.entries} />
          </div>
          <div className="column column-80">
            <Writing entry={this.props.entries[this.state.currentEntryId]} />
          </div>
        </div>
      </div>
    );
  }
}

export default Journal;
