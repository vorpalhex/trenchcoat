import React, { Component } from 'react';
import debounce from 'debounce';

class Editor extends Component {
  constructor(props) {
    super();
    this.setTitle = this.setTitle.bind(this);
    this.setBody = this.setBody.bind(this);
    this.bodyHTML = this.bodyHTML.bind(this);
    this.saveTitle = debounce(this.saveTitle, 200);
    this.saveBody = debounce(this.saveBody, 200);
    this.state = {
      editMode: true,
      title: props.entry.title || '',
      body: props.entry.body.markdown || '',
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      title: props.entry.title || '',
      body: props.entry.body.markdown || '',
    });
  }

  setTitle(event) {
    const title = event.target.value;
    this.setState({ title });
    this.saveTitle(title);
  }

  saveTitle(title) {
    this.props.entry.title = title;
    this.props.updateEntry(this.props.entry);
    this.props.journalUpdated();
  }

  setBody(event) {
    const body = event.target.value;
    this.setState({ body });
    this.saveBody(body);
  }

  saveBody(body) {
    this.props.entry.updateBody(body);
    this.props.updateEntry(this.props.entry);
    this.props.journalUpdated();
  }

  bodyHTML() {
    return { __html: this.props.entry.body.html };
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
        <header className="header-actions header-actions-right">
          <button onClick={(e) => this.toggleMode(e)} className="button-clear">
            {editMode ? "Pretty" : "Edit"}
          </button>
        </header>

        {
          (editMode)
            ? <input type="text" value={this.state.title} ref={(input) => this.title = input} onChange={this.setTitle} />
            : <h1 className="animated fadeIn"><big>{this.state.title}</big></h1>
        }

        {
          (editMode)
            ? <textarea value={this.state.body} ref={(input) => this.body = input} onChange={this.setBody} />
            : <p className="animated fadeIn" dangerouslySetInnerHTML={this.bodyHTML()}></p>
        }
      </main>
    );
  }
}

export default Editor;

