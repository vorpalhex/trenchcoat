import React, { Component } from 'react';

class Unlock extends Component {
  attemptUnlock(event) {
    event.preventDefault();
    this.props.attemptUnlock(this.password.value);
  }

  render() {
    return (
      <form className="unlock" onSubmit={(e) => this.attemptUnlock(e)}>
        <div>
          <h1>{this.props.appName}</h1>

          <label>
            Password
            <input type="password" ref={(input) => this.password = input} />
          </label>

          <button type="submit">
            Unlock
          </button>
        </div>
      </form>
    );
  }
}

export default Unlock;
