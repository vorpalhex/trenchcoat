'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');

const journalPath = path.join(os.homedir(), './primary.jrnl');
const errors = require('./errors');
const JournalModel = require('./models/journal');
const JournalWrapper = require('./models/journalWrapper');

let currentWrapper = null;
let currentJournal = null;
let currentPassword = null;

function loadJournal(password, cb) {
  const jrnlWrapperString = fs.readFileSync(journalPath, {encoding: 'utf8'});
  let jrnlWrapper = null;
  try {
    jrnlWrapper = JSON.parse(jrnlWrapperString);
  } catch (e) {
    throw new errors.CorruptedJournalError(e.msg);
  }

  currentWrapper = new JournalWrapper(jrnlWrapper);

  return currentWrapper.decrypt(password, (err, journal)=>{
    if(err) return cb(err);
    currentPassword = password;
    currentJournal = new JournalModel(journal);

    return cb(null, currentJournal);
  });
}

function saveJournal(cb) {
  //first, encrypt
  if(!currentWrapper) {
    currentWrapper = new JournalWrapper({
      version: '1.0',
      payload: '{}'
    });
  }

  return currentWrapper.encrypt(currentJournal, currentPassword, (err, jrnlWrapper) => {
    let jrnlWrapperString = null;
    try {
      jrnlWrapperString = JSON.stringify(jrnlWrapper);
    } catch (e) {
      throw new errors.CorruptedJournalError(e.msg);
    }

    return fs.writeFile(journalPath, jrnlWrapperString, {encoding: 'utf8'}, (err) => {
      if(err) return cb(err);
      return cb(null, currentJournal);
    });
  });
}

function newJournal(password) {
  currentPassword = password;
  currentJournal = new JournalModel();

  return currentJournal;
}


module.exports = {
  newJournal,
  loadJournal,
  saveJournal,
  currentJournal
};
