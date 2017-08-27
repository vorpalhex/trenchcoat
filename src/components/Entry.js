import React, { Component } from 'react';

class Entry extends Component {
  render() {
    const { title, date } = this.props.entry;
    return (
      <li className="animated fadeInDown">
        <strong>{title}</strong>
        &nbsp;
        <em>{date}</em>
      </li>
    );
  }
}

export default Entry;
