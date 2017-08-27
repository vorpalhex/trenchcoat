import React, { Component } from 'react';
import Entry from './Entry';

class Entries extends Component {
  render() {
    return (
      <ul className="entries">
        {
          Object
            .keys(this.props.entries)
            .map(key => <Entry key={key} entry={this.props.entries[key]} />)
        }
      </ul>
    );
  }
}

export default Entries;
