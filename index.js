/**
 * assertit <https://github.com/tunnckoCore/assertit>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var assert = require('assert');
var testit = require('testit');
var is = require('assert-kindof');

var assertit = module.exports = function _assertit(name, fn, val) {
  if (is.kindof.string(name) && is.kindof.function(fn)) {
    testit(name, fn, is.kindof.object(val) ? val : {});
    return;
  }
  if (!is.kindof.object(val) && is.kindof.function(name) && is.kindof.function(fn) && /Error/g.test(fn.name)) {
    assert.throws(name, fn, val);
    return;
  }
  if (!is.kindof.object(val) && is.kindof.function(name) && is.kindof.regexp(fn)) {
    assert.throws(name, fn, val);
    return;
  }
  if (arguments.length === 1) {
    assert.ok(name);
    return;
  }
  // @todo
  assert.strictEqual(name, fn, val);
  // @todo
}

assertit.is         = is;
assertit.be         = is;
assertit.not        = is.not;
assertit.not.be     = is.not;
assertit.kindof     = is.kindof;

assertit.expect     = assertit;
assertit.assume     = assertit;
assertit.should     = assertit;
assertit.describe   = assertit;
assertit.it         = assertit;
assertit.test       = assertit;
assertit.suite      = assertit;
assertit.testit     = testit;
assertit.assert     = assert;
assertit.assert.should = assertit;

assertit.eql        = assert.equal;
assertit.equal      = assert.strictEqual;
assertit.deep       = assert.deepEqual;
assertit.deep.equal = assert.deepEqual;

// extend
Object.keys(assert).forEach(function(method) {
  if (!assertit.hasOwnProperty(method)) {
    assertit[method] = assert[method]
  }
});
