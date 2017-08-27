const uuid = require('uuid');
const showdown = require('showdown');
const markdownConverter = new showdown.Converter();

module.exports = class JournalEntry {
  constructor(entryObject={}) {
    this.id = entryObject.id || uuid.v4();
    this._title = entryObject.title || 'Unnamed';
    this.body = {};
    this.body.markdown = ( entryObject.body && entryObject.body.markdown ) || '';
    this.body.html = ( entryObject.body && entryObject.body.html ) || '';
    this.created_at = entryObject.created_at || Date.now();
    this.updated_at = entryObject.updated_at || Date.now();
    this.version = '1.0';
  }
  //getters and setters
  get title() {
    return this._title;
  }

  set title(text='Unnamed') {
    this._title = text;
    this.updated_at = Date.now();
  }

  //methods
  updateBody(markdown) {
    this.body.html = markdownConverter.makeHtml(markdown);
    this.body.markdown = markdown;
    this.updated_at = Date.now();
  }
}
