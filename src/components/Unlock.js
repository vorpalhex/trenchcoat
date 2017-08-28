import React, { Component } from 'react';

const passwordRankings = [
  { length: 0, quality: 0, text: "Too short."},
  { length: 12, quality: 1, text: "Could be better."},
  { length: 22, quality: 2, text: "Getting there..."},
  { length: 32, quality: 3, text: "Great! You're secure."},
];
const getPasswordRanking = (password) => passwordRankings.reduce((previous, current) => password >= current.length ? current : previous);

class Unlock extends Component {
  constructor() {
    super();
    this.state = {
      passwordQuality: -1,
      passwordHelp: "",
      creatingNew: false,
    }
  }

  toggleForm(event) {
    event.preventDefault();
    this.setState({ creatingNew: !this.state.creatingNew });
  }

  attemptUnlock(event) {
    event.preventDefault();
    this.props.attemptUnlock(this.password.value);
  }

  rankPassword() {
    const ranking = getPasswordRanking(this.password.value.length);
    this.setState({
      passwordQuality: ranking.quality,
      passwordHelp: ranking.text,
    });
  }

  render() {
    const { status, appName } = this.props;
    const { creatingNew } = this.state;
    const loading = status === "loading";
    const loaded = status === "loaded";
    const disableInput = loading || loaded;
    const disableSubmit = loading || loaded || this.state.passwordQuality <= 0;
    let formClass = "unlock";
    if (loaded) formClass += " animated slideOutRight";
    return (
      <form className={formClass} onSubmit={(e) => this.attemptUnlock(e)}>
        <div className="animated slideInLeft">
          <h1>{appName}</h1>

          <label className={"quality-" + this.state.passwordQuality}>
            Password <em>{this.state.passwordHelp}</em>
            <input type="password" ref={(input) => this.password = input} disabled={disableInput} onChange={(e) => this.rankPassword(e)} autoFocus />
          </label>

          {
            creatingNew
              ? <label>
                  Confirm Password
                  <input type="password" ref={(input) => this.passwordConfirm = input} disabled={disableInput} onChange={(e) => this.rankPassword(e)} />
                </label>
              : null
          }

          <button type="submit" disabled={disableSubmit}>
            { loading ? "Loading..." : "Unlock" }
          </button>

          <footer>
            <br />
            <a onClick={(e) => this.toggleForm(e)}>
              { creatingNew ? "Load Existing Journal" : "Create New Journal" }
            </a>
          </footer>
        </div>
      </form>
    );
  }
}

export default Unlock;
