# node-utils
This Node.js package contains a number of JavaScript utility functions used
throughout various DuroSoft open and closed source projects. These functions
are licensed under the MIT License and can be freely used however you see
fit so long as attribution is retained.

## Usage

`$ npm install --save durosoft/node-utils`

```javascript
const utils = require('utils');
console.log(utils.randomAlphaNumeric(26));
```


## Random Number Generation

### utils.randomAlphaNumeric(size)
Returns a secure (thanks to `secure-random`) random alpha-numeric string of the
specified length.

```javascript
> utils.randomAlphaNumeric(32);
'BfRbHDi2kBSGnUat3OWk6i6BhF7oCnDl'
```

### utils.randomInt(a, b)
Returns a secure random integer between *a* (inclusive) and *b* (exclusive). *a* and
*b* default to 0 and the highest possible JavaScript integer, respectively, so calling
`randomInt()` with no arguments results in a secure random positive integer over the
range of all possible positive JavaScript integers (excluding the highest
possible integer, since *b* is exclusive).

```javascript
> utils.randomInt();
190759654058180
> utils.randomInt(-5, 5);
-2
> utils.randomInt(0, 100);
39
```


## Cryptography

### utils.setCryptoAlgorithm(algorithm)
Sets the current encryption/decryption algorithm used by the system. Defaults to
`'aes-256-gcm'`, which corresponds with 256-bit AES encryption in GCM mode.

```javascript
> utils.setCryptoAlgorithm('aes-128-gcm');
```

### utils.setCryptoKey(buffer)
Sets the current encryption key used by the system, specified by a Buffer of the proper
length (by default, you would want a length of 32). If you do not call this method,
the default encryption key is initialized to a securely-random buffer of length 32.

```javascript
> utils.setCryptoKey(secureRandom(32, {type: 'Buffer'}));
```

### utils.saveCryptoKey(path)
Saves the current encryption key to the specified path. The key is encoded as
a raw binary file.

```javascript
> utils.saveCryptoKey('key.aes');
```

### utils.loadCryptoKey(path)
Loads an encryption key that was saved using `utils.saveCryptoKey(path)` and sets it
as the current encryption key.

```javascript
> utils.loadCryptoKey('key.aes');
```

### utils.getCryptoKey()
Retrieves the current encryption key as a raw Buffer.

```
> utils.getCryptoKey();
<Buffer 7b 1c c5 b5 4c e7 c5 6d 61 28 52 4b b9 1e 42 b5 0b 50 7c f3 4c a2...>
```

### utils.generateCryptoKey()
Securely generates a securely random encryption key and sets it as current.

```javascript
> utils.generateCryptoKey();
```

### utils.encryptText(text)
Encrypts and returns the specified text using the current crypto algorithm and key. By
default, a proper salt, IV, and auth tag are generated and encoded.

```javascript
> utils.encryptText('hey');
'SQujuqBHpKGX87LMKvKtbw309xIe0OtRMSx9/eqpMn7BYY691PTqJcsooSt0IoqKNoUZM7...'
```

### utils.decryptText(text)
Decrypts and returns the specified cipher text using the current crypto algorithm and
key. Assumes that the text was encrypted using `utils.encryptText()` and the current
crypto key and algorithm.

```javascript
> utils.decryptText('SQujuqBHpKGX87LMKvKtbw309xIe0OtRMSx9/eqpMn7BYY691P...');
'hey'
```
