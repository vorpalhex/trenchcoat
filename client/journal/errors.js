class CorruptedJournalError extends Error {
  constructor(...args) {
    super(...args);
  }
};

class UnsupportedJournalError extends Error {
  constructor(...args) {
    super(...args);
  }
};

module.exports = {
  CorruptedJournalError,
  UnsupportedJournalError
};
