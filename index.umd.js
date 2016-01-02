(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.deepFilter = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var isPlainObject = require('is-plain-object');

function filter(value, fn) {
    if (Array.isArray(value)) {
        return filterArray(value, fn);
    } else if (isPlainObject(value)) {
        return filterObject(value, fn);
    }

    return value;
}

function filterObject(obj, fn) {
    var newObj = {};
    var key;
    var value;

    for (key in obj) {
        value = filter(obj[key], fn);

        if (fn.call(obj, value, key, obj)) {
            if (value !== obj[key] && !isCollection(value)) {
                value = obj[key];
            }

            newObj[key] = value;
        }
    }

    return newObj;
}

function filterArray(array, fn) {
    var filtered = [];

    array.forEach(function (value, index, array) {
        value = filter(value, fn);

        if (fn.call(array, value, index, array)) {
            if (value !== array[index] && !isCollection(value)) {
                value = array[index];
            }

            filtered.push(value);
        }
    });

    return filtered;
}

function isCollection(value) {
    return Array.isArray(value) || isPlainObject(value);
}

module.exports = filter;

},{"is-plain-object":2}],2:[function(require,module,exports){
/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var isObject = require('isobject');

function isObjectObject(o) {
  return isObject(o) === true
    && Object.prototype.toString.call(o) === '[object Object]';
}

module.exports = function isPlainObject(o) {
  var ctor,prot;
  
  if (isObjectObject(o) === false) return false;
  
  // If has modified constructor
  ctor = o.constructor;
  if (typeof ctor !== 'function') return false;
  
  // If has modified prototype
  prot = ctor.prototype;
  if (isObjectObject(prot) === false) return false;
  
  // If constructor does not have an Object-specific method
  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  }
  
  // Most likely a plain Object
  return true;
};

},{"isobject":3}],3:[function(require,module,exports){
/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

module.exports = function isObject(val) {
  return val != null && typeof val === 'object'
    && !Array.isArray(val);
};

},{}]},{},[1])(1)
});