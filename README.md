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

## Reference

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
