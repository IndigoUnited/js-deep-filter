!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.deepFilter=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

module.exports = function isPlainObject(o) {
  return !!o && typeof o === 'object' && o.constructor === Object;
};
},{}]},{},[1])(1)
});