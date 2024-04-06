/* Modules */

var must   = require('must'),
    Chunks = require('../lib/chunks');

/* Tests */

// 1. Turn off the native function implementation.

describe('Collections:', function() {
  describe('Chunks', function() {
    describe('.forEach()', function() {
      it('must iterate over the array', function() {
        var obj     = [1, 2, 3],
            results = [];
        obj.forEach = null; // [1]
        Chunks.forEach(obj, function(v) {
          results.unshift(v);
        });
        results.must.eql([3, 2, 1]);
      });

      it('must iterate over the object', function() {
        var obj     = { one: 1, two: 2, three: 3 },
            results = [];
        Chunks.forEach(obj, function(v) {
          results.unshift(v);
        });
        results.must.eql([3, 2, 1]);
      });
    });

    describe('.each()', function() {
      it('must iterate over the array', function() {
        var obj     = [1, 2, 3],
            results = [];
        obj.forEach = null; // [1]
        Chunks.each(obj, function(v) {
          results.unshift(v);
        });
        results.must.eql([3, 2, 1]);
      });

      it('must iterate over the object', function() {
        var obj     = { one: 1, two: 2, three: 3 },
            results = [];
        Chunks.each(obj, function(v) {
          results.unshift(v);
        });
        results.must.eql([3, 2, 1]);
      });
    });

    describe('.map()', function() {
      it('must return a new and transformed array from the array', function() {
        var obj = [1, 2, 3];
        obj.map = null;     // [1]
        obj.forEach = null; // [1]
        var results = Chunks.map(obj, function(v) {
          return v + 1;
        });
        results.must.eql([2, 3, 4]);
      });

      it('must return a new and transformed array from the object', function() {
        var obj     = { one: 1, two: 2, three: 3 };
        var results = Chunks.map(obj, function(v) {
          return v + 1;
        });
        results.must.eql([2, 3, 4]);
      });
    });

    describe('.filter()', function() {
      it('must return a new array with the values from the array that return true', function() {
        var obj = [1, 2, 3];
        obj.filter = null;  // [1]
        obj.forEach = null; // [1]
        var results = Chunks.filter(obj, function(v) {
          return v % 2;
        });
        results.must.eql([1, 3]);
      });

      it('must return a new array with the values from the object that return true', function() {
        var obj     = { one: 1, two: 2, three: 3 };
        var results = Chunks.filter(obj, function(v) {
          return v % 2;
        });
        results.must.eql([1, 3]);
      });
    });

    describe('.reduce()', function() {
      it('must return and transform the array into a single value', function() {
        var obj = [1, 2, 3];
        obj.reduce = null;  // [1]
        obj.forEach = null; // [1]
        var results = Chunks.reduce(obj, function(m, v) {
          return m + v;
        }, 0);
        results.must.be(6);
      });

      it('must return and transform the object into a single value', function() {
        var obj     = { one: 1, two: 2, three: 3 };
        var results = Chunks.reduce(obj, function(m, v) {
          return m + v;
        }, 0);
        results.must.be(6);
      });
    });

    describe('.some()', function() {
      it('must return true if any of the items in the array matches the iterator', function() {
        var obj = [1, 2, 3];
        obj.some = null;    // [1]
        obj.forEach = null; // [1]
        var results = Chunks.some(obj, function(v) {
          return v === 2;
        });
        results.must.be.true();
      });

      it('must return false if any of the items in the array doesn\'t match the iterator', function() {
        var obj = [1, 2, 3];
        obj.some = null;    // [1]
        obj.forEach = null; // [1]
        var results = Chunks.some(obj, function(v) {
          return v > 5;
        });
        results.must.be.false();
      });

      it('must return true if any of the items in the object matches the iterator', function() {
        var obj     = { one: 1, two: 2, three: 3 };
        var results = Chunks.some(obj, function(v) {
          return v === 2;
        });
        results.must.be.true();
      });

      it('must return false if any of the items in the object doesn\'t match the iterator', function() {
        var obj     = { one: 1, two: 2, three: 3 };
        var results = Chunks.some(obj, function(v) {
          return v > 5;
        });
        results.must.be.false();
      });
    });

    describe('.every()', function() {
      it('must return true if all of the items in the array matches the iterator', function() {
        var obj = [1, 2, 3];
        obj.every = null;   // [1]
        obj.forEach = null; // [1]
        var results = Chunks.every(obj, function(v) {
          return v < 5;
        });
        results.must.be.true();
      });

      it('must return false if all of the items in the array doesn\'t match the iterator', function() {
        var obj = [1, 2, 3];
        obj.every = null;   // [1]
        obj.forEach = null; // [1]
        var results = Chunks.every(obj, function(v) {
          return v > 2;
        });
        results.must.be.false();
      });

      it('must return true if all of the items in the object matches the iterator', function() {
        var obj     = { one: 1, two: 2, three: 3 };
        var results = Chunks.every(obj, function(v) {
          return v < 5;
        });
        results.must.be.true();
      });

      it('must return false if all of the items in the object doesn\'t match the iterator', function() {
        var obj     = { one: 1, two: 2, three: 3 };
        var results = Chunks.every(obj, function(v) {
          return v > 2;
        });
        results.must.be.false();
      });
    });

    describe('.index()', function() {
      it('must return the index of the item in the array', function() {
        var obj = [1, 2, 3];
        obj.indexOf = null; // [1]
        obj.forEach = null; // [1]
        var results = Chunks.index(obj, 2);
        results.must.be(1);
      });

      it('must return -1 if the item can\'t be found in the array', function() {
        var obj = [1, 2, 3];
        obj.indexOf = null; // [1]
        obj.forEach = null; // [1]
        var results = Chunks.index(obj, 4);
        results.must.be(-1);
      });

      it('must return the index of the item in the object', function() {
        var obj     = { one: 1, two: 2, three: 3 },
            results = Chunks.index(obj, 2);
        results.must.be('two');
      });

      it('must return -1 if the item can\'t be found in the object', function() {
        var obj     = { one: 1, two: 2, three: 3 },
            results = Chunks.index(obj, 4);
        results.must.be(-1);
      });
    });

    describe('.contains()', function() {
      it('must return true if the array contains the item', function() {
        var obj = [1, 2, 3];
        obj.some = null;    // [1]
        obj.forEach = null; // [1]
        var results = Chunks.contains(obj, 2);
        results.must.be.true();
      });

      it('must return false if the array doesn\'t contain the item', function() {
        var obj = [1, 2, 3];
        obj.some = null;    // [1]
        obj.forEach = null; // [1]
        var results = Chunks.contains(obj, 4);
        results.must.be.false();
      });

      it('must return true if the object contains the item', function() {
        var obj     = { one: 1, two: 2, three: 3 },
            results = Chunks.contains(obj, 2);
        results.must.be.true();
      });

      it('must return false if the object doesn\'t contain the item', function() {
        var obj     = { one: 1, two: 2, three: 3 },
            results = Chunks.contains(obj, 4);
        results.must.be.false();
      });
    });

    describe('.size()', function() {
      it('must return the size of the array', function() {
        var results = Chunks.size([1, 2, 3]);
        results.must.be(3);
      });

      it('must return the size of the object', function() {
        var results = Chunks.size({ one: 1, two: 2, three: 3 });
        results.must.be(3);
      });
    });

    describe('.clone()', function() {
      it('must return a clone of the array', function() {
        var obj     = [1, 2, 3],
            results = Chunks.clone(obj);
        results.must.eql([1, 2, 3]);
      });

      it('must return a clone of the object', function() {
        var obj     = { one: 1, two: 2, three: 3 },
            results = Chunks.clone(obj);
        results.must.eql({ one: 1, two: 2, three: 3 });
      });
    });

    describe('.sort()', function() {
      it('must return a new array with the values from the array sorted', function() {
        var obj     = ['a', 'd', 'b', 'e', 'c', 'f'];
        obj.forEach = null; // [1]
        var results = Chunks.sort(obj);
        results.must.eql(['a', 'b', 'c', 'd', 'e', 'f']);
      });

      it('must return a new array with the values from the array sorted by the compare function', function() {
        var obj     = [1, 10, 2, 20, 3, 30];
        obj.forEach = null; // [1]
        var results = Chunks.sort(obj, function(a, b) {
          return a - b;
        });
        results.must.eql([1, 2, 3, 10, 20, 30]);
      });

      it('must return a new array with the values from the object sorted', function() {
        var obj     = { one: 'a', four: 'd', two: 'b', five: 'e', three: 'c', six: 'f' },
            results = Chunks.sort(obj);
        results.must.eql(['a', 'b', 'c', 'd', 'e', 'f']);
      });

      it('must return a new array with the values from the object sorted by the compare function', function() {
        var obj     = { one: 1, ten: 10, two: 2, twenty: 20, three: 3, thirty: 30 },
            results = Chunks.sort(obj, function(a, b) {
          return a - b;
        });
        results.must.eql([1, 2, 3, 10, 20, 30]);
      });
    });
  });
});
