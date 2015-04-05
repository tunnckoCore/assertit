/**
 * testit <https://github.com/tunnckoCore/testit>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var test = require('./index');
var onlineExist = require('online-branch-exist');

var it       = test;
var should   = test;
var describe = test;

describe('testing `online-branch-exist`, it:', function() {
  describe('should throw', function() {
    it('TypeError if `callback` is not a function', function(done) {
      function fixture() {
        onlineExist();
      }
      should.throws(fixture, TypeError);
      should.throws(fixture, /expect `callback` to be function/);
      done();
    });
    it('TypeError if `pattern` is not a string', function(done) {
      function fixture() {
        onlineExist({some: true}, function() {});
      }
      should.throws(fixture, TypeError);
      should.throws(fixture, /expect `pattern` to be string/);
      done();
    });
    it('TypeError if `opts` is not an object', function(done) {
      function fixture() {
        onlineExist('foo/bar#baz', 'qux', function() {});
      }
      should.throws(fixture, TypeError);
      should.throws(fixture, /expect `opts` to be object/);
      done();
    });
    it('Error if not valid `pattern` given', function(done) {
      function fixture() {
        onlineExist('foobar', function() {});
      }
      should.throws(fixture, Error);
      should.throws(fixture, /expect `pattern` to be `user\/repo\#branch`/);
      done();
    });
    it('Error if valid `pattern`, but no branch/tag given', function(done) {
      function fixture() {
        onlineExist('foo/bar', function() {});
      }
      should.throws(fixture, Error);
      should.throws(fixture, /should give a branch or tag in `pattern`/);
      done();
    });
  });
  describe('should onlineExist(pattern, cb) check if `branch` exist then `tag`', function() {
    it('should return `true` if branch exist', function(done) {
      onlineExist('tunnckoCore/koa-better-body#master', function(err, res) {
        should.equal(err, null);
        should.equal(res, true);
        done();
      });
    });
    it('should return `true` if tag exist', function(done) {
      onlineExist('tunnckoCore/koa-better-body#v1.0.16', function(err, res) {
        should.equal(err, null);
        should.equal(res, true);
        done();
      });
    });
    it('should return `false` if branch or tag not exists', function(done) {
      onlineExist('tunnckoCore/koa-better-body#asfsdfdsf', function(err, res) {
        should.equal(err, null);
        should.equal(res, false);
        done();
      });
    });
  });
  describe('should have `.tag` and `.branch` methods', function() {
    it('should have `.tag` method', function(done) {
      onlineExist.tag('tunnckoCore/koa-better-body#v1.0.16', function(err, res) {
        should.equal(err, null);
        should.equal(res, true);
        done();
      });
    });
    it('should have `.branch` method', function(done) {
      onlineExist.branch('tunnckoCore/koa-better-body#master', function(err, res) {
        should.equal(err, null);
        should.equal(res, true);
        done();
      });
    });
  });
});
