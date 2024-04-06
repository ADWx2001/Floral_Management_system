/* Modules */

var must   = require('must'),
    Chunks = require('../lib/chunks');

/* Tests */

describe('Types:', function() {
  describe('Chunks', function() {
    describe('.isArray()', function() {
      it('must return true if the object is an array', function() {
        var results = Chunks.isArray([]);
        results.must.be.true();
      });

      it('must return false if the object is not an array', function() {
        var results = Chunks.isArray({});
        results.must.be.false();
      });
    });
  });
});
