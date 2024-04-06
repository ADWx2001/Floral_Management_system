/* Modules */

var must   = require('must'),
    Chunks = require('../lib/chunks');

/* Tests */

// 1. Turn off the native function implementation.

describe('Arrays:', function() {
  describe('Chunks', function() {
    describe('.first()', function() {
      it('must return first item in the array', function() {
        var results = Chunks.first([1, 2, 3]);
        results.must.be(1);
      });
    });

    describe('.last()', function() {
      it('must return last item in the array', function() {
        var results = Chunks.last([1, 2, 3]);
        results.must.be(3);
      });
    });

    describe('.flatten()', function() {
      it('must return a new array by flattening the nested arrays', function() {
        var obj = [[1, 2, 3], [4, 5, 6]];
        obj.reduce = null;  // [1]
        obj.forEach = null; // [1]
        var results = Chunks.flatten(obj);
        results.must.eql([1, 2, 3, 4, 5, 6]);
      });

      it('must return a new array by merging the base array with the flattened, nested arrays', function() {
        var obj = [[2, 3, 4], [5, 6, 7]];
        obj.reduce = null;  // [1]
        obj.forEach = null; // [1]
        var results = Chunks.flatten(obj, [1]);
        results.must.eql([1, 2, 3, 4, 5, 6, 7]);
      });
    });
  });
});
