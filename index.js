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
