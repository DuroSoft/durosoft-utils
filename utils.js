const secureRandom = require('secure-random');
const crypto = require('crypto');
const fs = require('fs');

const utils = new Object();
module.exports = utils;

// random data generation

utils.randomAlphaNumeric = (size) => {
  return secureRandom(size * 2, {type: 'Buffer'})
    .toString('base64') // ^ use size * 2 since several non-alpha/num chars possible
    .replace(/[\/+=]/g, '') // strip non-alpha/num chars
    .substring(0, size); // trim down to intended size
}

utils.randomInt = (a, b) => {
  var buff = secureRandom(6, {type: 'Buffer'});
  var seed = Math.abs(buff.readUIntBE(0, 6));
  if(a === undefined) a = 0;
  if(b === undefined) b = Number.MAX_SAFE_INTEGER;
  return seed % (b - a) + a;
}


// cryptography

var cryptoAlgorithm = 'aes-256-gcm';
var cryptoKey = null;

utils.setCryptoAlgorithm = (algorithm) => { cryptoAlgorithm = algorithm; }
utils.setCryptoKey = (buff) => { cryptoKey = buff; }
utils.saveCryptoKey = (path) => { fs.writeFileSync(path, cryptoKey); }
utils.loadCryptoKey = (path) => { cryptoKey = fs.readFileSync(path); }
utils.getCryptoKey = () => { return cryptoKey; }
utils.generateCryptoKey = () => { cryptoKey = secureRandom(32, {type: 'Buffer'}); }

utils.generateCryptoKey();

utils.encryptText = function(text) {
  var iv = crypto.randomBytes(12);
  var salt = crypto.randomBytes(64);
  var cipher = crypto.createCipheriv(cryptoAlgorithm, cryptoKey, iv);
  var encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  var tag = cipher.getAuthTag();
  return Buffer.concat([salt, iv, tag, encrypted]).toString('base64');
}

utils.decryptText = function(text) {
  var data = new Buffer(text, 'base64');
  var salt = data.slice(0, 64);
  var iv = data.slice(64, 76);
  var tag = data.slice(76, 92);
  var text = data.slice(92);
  var decipher = crypto.createDecipheriv(cryptoAlgorithm, cryptoKey, iv);
  decipher.setAuthTag(tag);
  return decipher.update(text, 'binary', 'utf8') + decipher.final('utf8');
}
