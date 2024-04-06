/* Modules */

var must   = require('must'),
    Chunks = require('../lib/chunks');

/* Tests */

describe('Types:', function() {
  describe('Chunks', function() {
    describe('.isObject()', function() {
      it('must return true if the object is an object', function() {
        var results = Chunks.isObject({});
        results.must.be.true();
      });

      it('must return false if the object is not an object', function() {
        var results = Chunks.isObject([]);
        results.must.be.false();
      });
    });
  });
});
