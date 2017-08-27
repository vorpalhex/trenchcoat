import React, { Component } from 'react';

class Entry extends Component {
  render() {
    return (
      <li>
        <strong>{this.props.entry.title}</strong>
        &nbsp;
        <em>{this.props.entry.date}</em>
      </li>
    );
  }
}

export default Entry;
