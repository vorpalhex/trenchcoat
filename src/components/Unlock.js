import React, { Component } from 'react';

class Unlock extends Component {
  attemptUnlock(event) {
    event.preventDefault();
    this.props.attemptUnlock(this.password.value);
  }

  render() {
    return (
      <form className="Unlock" onSubmit={(e) => this.attemptUnlock(e)}>
        <h1>Unlock</h1>

        <label>
          Password
          <input type="text" ref={(input) => this.password = input} />
        </label>

        <button type="submit">
          Unlock
        </button>
      </form>
    );
  }
}

export default Unlock;
