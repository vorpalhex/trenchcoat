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
      invalidPasswordMatch: false,
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

  changedPassword() {
    this.rankPassword();
    this.checkPasswordMatch();
  }

  rankPassword() {
    const ranking = getPasswordRanking(this.password.value.length);
    this.setState({
      passwordQuality: ranking.quality,
      passwordHelp: ranking.text,
    });
  }

  checkPasswordMatch() {
    this.setState({ invalidPasswordMatch: this.state.creatingNew && this.passwordConfirm.value !== this.password.value });
  }

  render() {
    const { status, appName } = this.props;
    const { creatingNew, passwordQuality, invalidPasswordMatch } = this.state;
    const loading = status === "loading";
    const loaded = status === "loaded";
    const disableInput = loading || loaded;
    const disableSubmit = loading || loaded || passwordQuality <= 0 || invalidPasswordMatch;
    const showConfirmWarning = invalidPasswordMatch && this.passwordConfirm.value.length;
    let formClass = "unlock";
    if (loaded) formClass += " animated slideOutRight";
    return (
      <form className={formClass} onSubmit={(e) => this.attemptUnlock(e)}>
        <div className="animated slideInLeft">
          <h1>{appName}</h1>

          <label className={"quality-" + passwordQuality}>
            Password <em>{this.state.passwordHelp}</em>
            <input type="password" ref={(input) => this.password = input} disabled={disableInput} onChange={(e) => this.changedPassword(e)} autoFocus />
          </label>

          {
            creatingNew
              ? <label className={showConfirmWarning ? "quality-0" : ""}>
                  Confirm Password <em>{showConfirmWarning ? "Should match" : ""}</em>
                  <input type="password" ref={(input) => this.passwordConfirm = input} disabled={disableInput} onChange={(e) => this.changedPassword(e)} />
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
