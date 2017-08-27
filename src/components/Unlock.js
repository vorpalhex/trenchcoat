import React, { Component } from 'react';

class Unlock extends Component {
  attemptUnlock(event) {
    event.preventDefault();
    this.props.attemptUnlock(this.password.value);
  }

  render() {
    const { status } = this.props;
    const loading = status === "loading";
    const loaded = status === "loaded";
    const disable = loading || loaded;
    let formClass = "unlock";
    if (loaded) formClass += " animated slideOutRight";
    return (
      <form className={formClass} onSubmit={(e) => this.attemptUnlock(e)}>
        <div className="animated slideInLeft">
          <h1>{this.props.appName}</h1>

          <label>
            Password
            <input type="password" ref={(input) => this.password = input} disabled={disable} autoFocus />
          </label>

          <button type="submit" disabled={disable}>
            { loading ? "Loading..." : "Unlock" }
          </button>
        </div>
      </form>
    );
  }
}

export default Unlock;
