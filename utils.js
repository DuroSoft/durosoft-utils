const secureRandom = require('secure-random');

const utils = new Object();
module.exports = utils;

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
