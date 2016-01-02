# deep-filter

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency status][david-dm-image]][david-dm-url] [![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url]

[npm-url]:https://npmjs.org/package/deep-filter
[downloads-image]:http://img.shields.io/npm/dm/deep-filter.svg
[npm-image]:http://img.shields.io/npm/v/deep-filter.svg
[travis-url]:https://travis-ci.org/IndigoUnited/js-deep-filter
[travis-image]:http://img.shields.io/travis/IndigoUnited/js-deep-filter.svg
[david-dm-url]:https://david-dm.org/IndigoUnited/js-deep-filter
[david-dm-image]:https://img.shields.io/david/IndigoUnited/js-deep-filter.svg
[david-dm-dev-url]:https://david-dm.org/IndigoUnited/js-deep-filter#info=devDependencies
[david-dm-dev-image]:https://img.shields.io/david/dev/IndigoUnited/js-deep-filter.svg

Recursively filters collections (arrays and objects).


## Installation

`$ npm install deep-filter` - `NPM`   
`$ bower install deep-filter` - `bower`

The browser file is named `index.umd.js` which supports CommonJS, AMD and globals (`deepFilter`).
If you want to run this module on old browsers, you must include [es5-shim](https://github.com/es-shims/es5-shim).


## Usage

Examples bellow are based on `nodejs`.

```js
// Example 1 - Remove all strings equal to 'foo'
var deepfilter = require('deep-filter');

deepfilter({
    prop1: 'foo',
    prop2: ['foo', 'bar'],
    prop3: ['foo', 'foo'],
    prop4: {
        prop5: 'foo',
        prop6: 'bar'
    }
}, function (value, prop, subject) {
    // prop is an array index or an object key
    // subject is either an array or an object
    return value !== 'foo';
});

/*
{
    prop2: [ 'bar' ],
    prop3: [],
    prop4: {
        prop6: 'bar'
    }
}
 */

// Example 2 - Filter empty values
var deepfilter = require('deep-filter');

function notEmpty(value, prop, subject) {
    var key;

    if (Array.isArray(value)) {
        return value.length > 0;
    } else if (!!value && typeof value === 'object' && value.constructor === Object) {
        for (key in value) {
            return true;
        }

        return false;
    } else if (typeof value === 'string') {
        return value.length > 0;
    } else {
        return value != null;
    }
}

deepfilter({
    something: [
        {
            colors: ['red', 'green', ''],
            cars: { audi: 'nice', vw: 'good', aston: '' }
        },
        undefined,
        ''
    ],
    foo: 'bar'
}, notEmpty);

/*
{
    something: [
        {
            colors: ['red', 'green'],
            cars: { audi: 'nice', vw: 'good' }
        }
    ],
    foo: 'bar'
});
*/

// Example 3 - Filter empty values + trim strings
// Just to demonstrate that subject properties can be manipulated while filtering
var deepfilter = require('deep-filter');

function notEmpty(value, prop, subject) {
    var key;

    if (Array.isArray(value)) {
        return value.length > 0;
    } else if (!!value && typeof value === 'object' && value.constructor === Object) {
        for (key in value) {
            return true;
        }

        return false;
    } else if (typeof value === 'string') {
        subject[prop] = value = value.trim();

        return value.length > 0;
    } else {
        return value != null;
    }
}

deepfilter({
    something: [
        {
            colors: ['red', ' green ', ''],
            cars: { audi: 'nice', vw: 'good', aston: '  ' }
        },
        undefined,
        ''
    ],
    foo: 'bar'
}, notEmpty);

/*
{
    something: [
        {
            colors: ['red', 'green'],
            cars: { audi: 'nice', vw: 'good' }
        }
    ],
    foo: 'bar'
});
*/
```

## Tests

`$ npm test`


## License

Released under the [MIT License](http://www.opensource.org/licenses/mit-license.php).
