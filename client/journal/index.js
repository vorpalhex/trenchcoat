const fs = require('fs');
const os = require('os');
const path = require('path');
const crypt = require('crypto'); //yes we're using a weird name for this because global scope conflicts

const journalPath = path.join(os.homedir(), './primary.jrnl');
const errors = require('./errors');
const JournalModel = require('./model');

let currentJournal = null;

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

function load(password) {
  const jrnlWrapperString = fs.readFileSync(journalPath);
  let jrnlWrapper = null;
  try {
    jrnlWrapper = JSON.parse(jrnlWrapperString);
  } catch (e) {
    throw new errors.CorruptedJournalError(e.msg);
  }

  const myJournal = new JournalWrapper(jrnlWrapper);
  currentJournal = myJournal;

}

function save() {

}
