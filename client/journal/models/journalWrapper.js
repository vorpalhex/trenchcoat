const errors = require('../errors');
const crypt = require('crypto');

module.exports = class JournalWrapper {
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

  getKeyAndIV(password) {
    const saltKey = 'notsecurebutverylong'; //generate these on install somehow?

    const IV = 'a2xhcgAAAAAAAAAA'
    const key = crypt.createHash('sha256').update(password + saltKey).digest()
    return {key: key, IV: IV};
  }

  decrypt(password, cb) {
    const {key, IV} = this.getKeyAndIV(password);

    const cipher = crypt.createDecipheriv(this.algorithm, key, IV);
    let result = cipher.update(this.payload, 'binary', 'utf8');
    result += cipher.final('utf8');

    return cb(null, result);
  }

  encrypt(raw, password, cb) {
    const {key, IV} = this.getKeyAndIV(password);
    const cipher = crypt.createCipheriv(this.algorithm, key, IV);
    let result = cipher.update(JSON.stringify(raw), 'utf8', 'binary');
    result += cipher.final('binary');

    this.payload = result;

    return cb(null, this);
  }
}
