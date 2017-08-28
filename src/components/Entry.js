import React, { Component } from 'react';

class Entry extends Component {
  setCurrentEntry() {
    this.props.setCurrentEntry(this.props.entry.id);
  }

  render() {
    const { title, date } = this.props.entry;
    return (
      <li>
        <a className="entry-link" onClick={() => this.setCurrentEntry()}>
          <strong>{title}</strong>
          <br />
          <em>{date}</em>
        </a>
      </li>
    );
  }
}

export default Entry;
