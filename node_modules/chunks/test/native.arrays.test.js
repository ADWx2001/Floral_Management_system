/* Modules */

var must   = require('must'),
    Chunks = require('../lib/chunks');

/* Tests */

describe('Arrays:', function() {
  describe('Chunks', function() {
    describe('.forEach()', function() {
      it('must iterate over the array', function() {
        var results = [];
        Chunks.forEach([1, 2, 3], function(v) {
          results.unshift(v);
        });
        results.must.eql([3, 2, 1]);
      });
    });

    describe('.map()', function() {
      it('must return a new and transformed array', function() {
        var results = Chunks.map([1, 2, 3], function(v) {
          return v + 1;
        });
        results.must.eql([2, 3, 4]);
      });
    });

    describe('.filter()', function() {
      it('must return a new array with the values that evalute to true', function() {
        var results = Chunks.filter([1, 2, 3], function(v) {
          return v % 2;
        });
        results.must.eql([1, 3]);
      });
    });

    describe('.reduce()', function() {
      it('must return and transform the array to a single value', function() {
        var results = Chunks.reduce([1, 2, 3], function(m, v) {
          return m + v;
        }, 0);
        results.must.be(6);
      });
    });

    describe('.some()', function() {
      it('must return true if any of the items matches the iterator', function() {
        var results = Chunks.some([1, 2, 3], function(v) {
          return v === 2;
        });
        results.must.be.true();
      });

      it('must return false if any of the items doesn\'t match the iterator', function() {
        var results = Chunks.some([1, 2, 3], function(v) {
          return v > 5;
        });
        results.must.be.false();
      });
    });

    describe('.every()', function() {
      it('must return true if all of the items matches the iterator', function() {
        var results = Chunks.every([1, 2, 3], function(v) {
          return v < 5;
        });
        results.must.be.true();
      });

      it('must return false if all of the items doesn\'t match the iterator', function() {
        var results = Chunks.every([1, 2, 3], function(v) {
          return v > 2;
        });
        results.must.be.false();
      });
    });

    describe('.index()', function() {
      it('must return the index of the item in the array', function() {
        var results = Chunks.index([1, 2, 3], 2);
        results.must.be(1);
      });

      it('must return -1 if the item can\'t be found in the array', function() {
        var results = Chunks.index([1, 2, 3], 4);
        results.must.be(-1);
      });
    });

    describe('.contains()', function() {
      it('must return true if the array contains the item', function() {
        var results = Chunks.contains([1, 2, 3], 2);
        results.must.be.true();
      });

      it('must return false if the array doesn\'t contain the item', function() {
        var results = Chunks.contains([1, 2, 3], 4);
        results.must.be.false();
      });
    });

    describe('.flatten()', function() {
      it('must return a new array by flattening the nested arrays', function() {
        var results = Chunks.flatten([[1, 2, 3], [4, 5, 6]]);
        results.must.eql([1, 2, 3, 4, 5, 6]);
      });

      it('must return a new array by merging the base array with the flattened, nested arrays', function() {
        var results = Chunks.flatten([[2, 3, 4], [5, 6, 7]], [1]);
        results.must.eql([1, 2, 3, 4, 5, 6, 7]);
      });
    });
  });
});
