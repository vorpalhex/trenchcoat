const JournalEntry = require('./journalEntry');

module.exports = class Journal {
  constructor(journalObject={}) {
    this.entries = [];
    this.version = '1.0';

    const entries = ( journalObject.entries && journalObject.entries.slice() ) || [];
    entries.forEach( this.addEntry );
  }
  addEntry(entry) {
    const journalEntry = new JournalEntry( entry )
    this.entries.push( journalEntry );
    return journalEntry;
  }
  getEntry(id) {
    results = this.entries.filter( (entry) => entry.id === id);
    return results[0];
  }
  sortEntries(field='created_at', fn) {
    if(!fn) {
      fn = (a, b) => b[field] - a[field];
    }

    this.entries.sort( fn );
  }
}
