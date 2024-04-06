/* Modules */

var must   = require('must'),
    Chunks = require('../lib/chunks');

/* Tests */

describe('Objects:', function() {
  describe('Chunks', function() {
    describe('.values()', function() {
      it('must return a new array with the values in the object', function() {
        var results = Chunks.values({ one: 1, two: 2, three: 3 });
        results.must.eql([1, 2, 3]);
      });
    });

    describe('.has()', function() {
      it('must return true if the object contains the key', function() {
        var results = Chunks.has({ one: 1, two: 2, three: 3 }, 'two');
        results.must.be.true();
      });

      it('must return false if the object doesn\'t contain the key', function() {
        var results = Chunks.has({ one: 1, two: 2, three: 3 }, 'four');
        results.must.be.false();
      });
    });

    describe('.extend()', function() {
      it('must return the object merged together with another object', function() {
        var results = Chunks.extend({ one: 1, two: 3 }, { two: 2, three: 3 });
        results.must.eql({ one: 1, two: 2, three: 3 });
      });
    });
  });
});
