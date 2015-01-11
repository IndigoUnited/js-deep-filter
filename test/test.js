'use strict';

var expect = require('expect.js');
var isPlainObject = require('is-plain-object');
var filter = require('../');

var calls;

function notEmpty(value, prop, subject) {
    var key;

    /*jshint validthis:true*/
    if (!Array.isArray(subject) && !isPlainObject(subject)) {
        throw new Error('Expect subject to be an array or an object');
    }
    if (typeof prop !== 'string' && typeof prop !== 'number') {
        throw new Error('Expect prop to be a string or a number');
    }
    expect(this).to.be(subject);

    calls += 1;
    if (Array.isArray(value)) {
        return value.length > 0;
    }

    if (isPlainObject(value)) {
        for (key in value) {
            return true;
        }

        return false;
    }

    if (typeof value === 'string') {
        subject[prop] = value = value.trim();

        return value.length > 0;
    }

    return value != null;
}

function assertCalls(expected) {
    expect(calls).to.equal(expected);
    calls = 0;
}

describe('deep-filter', function () {
    beforeEach(function () {
        calls = 0;
    });

    describe('primitive input', function () {
        it('should return the original input', function () {
            expect(filter(undefined, notEmpty)).to.equal(undefined);
            assertCalls(0);

            expect(filter(null, notEmpty)).to.equal(null);
            assertCalls(0);

            expect(filter('  ', notEmpty)).to.equal('  ');
            assertCalls(0);

            expect(filter('', notEmpty)).to.equal('');
            assertCalls(0);
        });
    });

    describe('object input', function () {
        it('should filter entries recursively', function () {
            expect(filter({ foo: null }, notEmpty)).to.eql({});
            assertCalls(1);

            expect(filter({ foo: undefined }, notEmpty)).to.eql({});
            assertCalls(1);

            expect(filter({ foo: { bar: null } }, notEmpty)).to.eql({});
            assertCalls(2);

            expect(filter({ foo: { bar: undefined } }, notEmpty)).to.eql({});
            assertCalls(2);

            expect(filter({ foo: { bar: null, baz: 1, bay: '  ' } }, notEmpty)).to.eql({ foo: { baz: 1 }});
            assertCalls(4);
        });
    });

    describe('array input', function () {
        it('should filter entries recursively', function () {
            expect(filter([null], notEmpty)).to.eql([]);
            assertCalls(1);

            expect(filter([undefined], notEmpty)).to.eql([]);
            assertCalls(1);

            expect(filter([1, ['foo', '', null, '  ']], notEmpty)).to.eql([1, ['foo']]);
            assertCalls(6);
        });
    });

    describe('mixed & complex array/object input', function () {
        it('should filter array/objects recursively', function () {
            var original;
            var filtered;

            original = {
                something: [
                    {
                        colors: ['red', ' green ', ''],
                        cars: { audi: 'nice', vw: 'good', aston: '' }
                    },
                    undefined,
                    ''
                ],
                foo: 'bar'
            };
            filtered = {
                something: [
                    {
                        colors: ['red', 'green'],
                        cars: { audi:'nice', vw: 'good' }
                    }
                ],
                foo: 'bar'
            };

            expect(filter(original, notEmpty)).to.eql(filtered);
            assertCalls(13);

            original = [
                {
                    something: [
                        {
                            colors: ['red', ' green ', ''],
                            cars: { audi: 'nice', vw: 'good', aston: '  ' }
                        },
                        undefined,
                        ''
                    ],
                    foo: 'bar'
                },
                null,
                undefined,
                ' ',
                '',
                'foo'
            ];
            filtered = [
                {
                    something: [
                        {
                            colors: ['red', 'green'],
                            cars: { audi: 'nice', vw: 'good' }
                        }
                    ],
                    foo: 'bar'
                },
                'foo'
            ];

            expect(filter(original, notEmpty)).to.eql(filtered);
            assertCalls(19);
        });
    });
});
