/* Modules */

var must   = require('must'),
    Chunks = require('../lib/chunks');

/* Tests */

describe('Objects:', function() {
  describe('Chunks', function() {
    describe('.keys()', function() {
      it('must return a new array with the keys from the object', function() {
        var results = Chunks.keys({ one: 1, two: 2, three: 3 });
        results.must.eql(['one', 'two', 'three']);
      });
    });
  });
});
