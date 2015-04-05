/**
 * assertit <https://github.com/tunnckoCore/assertit>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var test = require('./index');

test('assertit:', function() {
  test('should have `describe` and `it` behaving', function(done) {
    //strict comparison, out of the box
    test(typeof test.it, 'function', 'expect to have `.it` method');
    test(typeof test.should, 'function', 'expect to have `.should` method');
    test(typeof test.describe, 'function', 'expect to have `.describe` method');
    done();
  });
  test('should have `assert.ok` behaving', function(done) {
    test(typeof 'foo' === 'string');
    done();
  });
  test('should have `assert.strictEqual` behaving', function(done) {
    test(typeof test.expect, 'function', 'should have `.expect` method');
    test(typeof test.assume, 'function', 'should have `.assume` method');
    done();
  });
  test('should have `assert.throws` behaving', function(done) {
    test(function block() {
      throw new TypeError('works as assert.throws');
    }, TypeError);
    test(function block() {
      test('123', 123, 'should throw error message');
    }, /should throw error message/);
    done();
  });
  test('should have `is-kindof` methods', function(done) {
    test.kindof([1, 2, 3], 'array');
    test.kindof.array([1, 2, 3]);
    test.kindof.error(new Error('foo bar baz'));
    test.be.an.object({'foo': 'bar'});
    test.is.a.string('foobar');
    test.assert.should.not.be.an.object([1, 2, 3]);
    test.be.regexp(/regex/);
    done();
  });
  test('should have `assert` methods', function(done) {
    test.deepEqual([1,2,3], [1,2,3]);
    test.strictEqual(typeof test.throws, 'function');
    test.throws(function() {
      // should throws
      test.strictEqual(['1', 2, {a: {b: {c: 4}}}, 5], ['1', 2, {a: {b: {c: 4}}}, 5]);
    }, Error);
    done();
  });
  test('should have some sugar methods', function(done) {
    test.eql('123', 123, 'loose comparison');
    test.equal(123, 123, 'strict comparison');
    test.deep([1,2,3], [1,2,3]);
    test.deep.equal([1,2,3], [1,2,3]);
    done();
  });
});
