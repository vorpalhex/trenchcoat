import React, { Component } from 'react';

class Writing extends Component {
  constructor(props) {
    super();
    this.state = {
      editMode: true,
      title: props.entry.title,
      body: props.entry.body,
    };
  }

  setTitle() {
    const title = this.title.value;
    // TODO send new title to backend
    this.setState({title});
    console.log('Send new title to backend', title);
  }

  setBody() {
    const body = this.body.value;
    // TODO send new body to backend
    this.setState({body});
    console.log('Send new body to backend', body);
  }

  toggleMode() {
    this.setState({
      editMode: !this.state.editMode,
    });
  }

  render() {
    const { editMode } = this.state;
    return (
      <main className="writing">
        <button onClick={(e) => this.toggleMode(e)} className="button-black button-small">
          {editMode ? "Edit" : "Pretty"}
        </button>

        {
          (editMode)
            ? <input type="text" value={this.state.title} ref={(input) => this.title = input} onChange={(e) => this.setTitle(e)} />
            : <h1><big>{this.state.title}</big></h1>
        }

        {
          (editMode)
            ? <textarea value={this.state.body} ref={(input) => this.body = input} onChange={(e) => this.setBody(e)} />
            : <p>{this.state.body}</p>
        }
      </main>
    );
  }
}

export default Writing;
