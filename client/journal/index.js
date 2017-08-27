const fs = require('fs');
const os = require('os');
const path = require('path');
const crypt = require('crypto'); //yes we're using a weird name for this because global scope conflicts

const journalPath = path.join(os.homedir(), './primary.jrnl');
const errors = require('./errors');
const JournalModel = require('./model');

let currentWrapper = null;
let currentJournal = null;
let currentPassword = null;

class JournalWrapper {
  constructor(wrapperObject={}) {
    if(!wrapperObject.version || wrapperObject.version !== '1.0') {
      throw new errors.UnsupportedJournalError();
    }

    if(!wrapperObject.payload) {
      throw new errors.CorruptedJournalError('Missing payload');
    }

    this.version = wrapperObject.version;
    this.payload = wrapperObject.payload;
    this.algorithm = 'aes-256-cbc'; //this is always hardcoded.
  }

  getKeyAndIV(password, cb) {
    const saltKey = 'notsecure'; //generate these on install somehow?
    const saltIV = 'notsecure';
    crypt.pbkdf2(password, saltIV, 10000, 512, 'sha512', (err, IV) => {
      if(err) return cb(err);
      crypt.pbkdf2(password, saltKey, 10000, 512, 'sha512', (err, key) => {
        if(err) return cb(err);
        return cb(null, {key, IV});
      });
    });
  }

  decrypt(password, cb) {
    this.getKeyAndIV(password, (err, res) => {
      if(err) return cb(err);
      const cipher = crypt.createDecipheriv(this.algorithm, res.key, res.iv);
      const result = cipher.update(this.payload, 'utf8', 'binary');
      result += cipher.final('binary');

      return cb(null, result);
    });
  }

  encrypt(raw, password, cb) {
    this.getKeyAndIV(password, (err, res) => {
      if(err) return cb(err);
      const cipher = crypt.createCipheriv(this.algorithm, res.key, res.iv);
      const result = cipher.update(raw, 'utf8', 'binary');
      result += cipher.final('binary');

      this.payload = result;
      return cb();
    });
  }
}

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
    currentJournal = journal;

    return cb(null, currentJournal);
  });
}

function saveJournal(cb) {
  //first, encrypt
  if(!currentWrapper) {
    currentWrapper = new JournalWrapper({
      version: '1.0',
      payload: ''
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
      return cb(null, err);
    });
  });
}

function newJournal(password) {
  currentPassword = password;
  currentJournal = new JournalModel();

  return true;
}


module.exports = {
  newJournal,
  loadJournal,
  saveJournal
};
