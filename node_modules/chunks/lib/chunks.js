//
// # Chunks
//
// A super duper, teeny tiny functional library.
//
// **License:** MIT  
//  **Source:** [GitHub](https://github.com/gummesson/funcs)
//
(function(root, undefined) {

  // ## References
  //
  // The references to various things used throughout the library.
  //
  var ArrayProto = Array.prototype,
      ObjProto   = Object.prototype,
      toString   = ObjProto.toString,
      hasOwnProp = ObjProto.hasOwnProperty;

  // ### Native implementations
  //
  // The native implementations of the array functions, which will be used
  // if they're available.
  //
  var nativeEach    = ArrayProto.forEach,
      nativeMap     = ArrayProto.map,
      nativeFilter  = ArrayProto.filter,
      nativeReduce  = ArrayProto.reduce,
      nativeSome    = ArrayProto.some,
      nativeEvery   = ArrayProto.every,
      nativeIndexOf = ArrayProto.indexOf,
      nativeIsArray = Array.isArray,
      nativeKeys    = Object.keys;

  // ## Chunks
  //
  // The namespace.
  //
  var Chunks = {};

  // ### Collections

  // #### Chunks.forEach / Chunks.each
  //
  // Execute the `iterator` on every item in the `obj`.
  //
  // The base function used in nearly all of `Chunks`'s other functions.
  //
  // - `obj`      is either an array or an object.
  // - `iterator` is a function.
  // - `scope`    is the value of `this`.
  //
  Chunks.forEach = Chunks.each = function(obj, iterator, scope) {
    if (nativeEach && obj.nativeEach) {
      obj.forEach(iterator, scope);
    } else if (obj.length !== undefined) {
      for (var i = 0, length = obj.length; i < length; i++) {
        iterator.call(scope, obj[i], i, obj);
      }
    } else {
      var keys = Chunks.keys(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        iterator.call(scope, obj[keys[i]], keys[i], obj);
      }
    }
  };

  // #### Chunks.map
  //
  // Return a new and transformed array by executing the `iterator`
  // on every item in the `obj`.
  //
  // - `obj`      is either an array or an object.
  // - `iterator` is a function.
  // - `scope`    is the value of `this`.
  //
  Chunks.map = function(obj, iterator, scope) {
    if (nativeMap && obj.nativeMap) { return obj.map(iterator, scope); }
    var results = [];
    Chunks.forEach(obj, function(val, i, obj) {
      results.push(iterator.call(scope, val, i, obj));
    });
    return results;
  };

  // #### Chunks.filter
  //
  // Return a new array by executing the `iterator` on every item in
  // the `obj`. Only the items that evalute to `true` in the `iterator`
  // will be added to the array.
  //
  // - `obj`      is either an array or an object.
  // - `iterator` is a function.
  // - `scope`    is the value of `this`.
  //
  Chunks.filter = function(obj, iterator, scope) {
    if (nativeFilter && obj.nativeFilter) { return obj.filter(iterator, scope); }
    var results = [];
    Chunks.forEach(obj, function(val, i, obj) {
      if (iterator.call(scope, val, i, obj)) {
        results.push(val);
      }
    });
    return results;
  };

  // #### Chunks.reduce
  //
  // Return a single value by executing the `iterator` on every item
  // in the `obj` and passing the previous value, `memo`, to the `iterator`.
  //
  // - `iterator` is a function.
  // - `memo`     is the initial value.
  // - `scope`    is the value of `this`.
  //
  Chunks.reduce = function(obj, iterator, memo, scope) {
    if (nativeReduce && obj.nativeReduce) { return obj.reduce(iterator, memo); }
    Chunks.forEach(obj, function(val, i, obj) {
      memo = iterator.call(scope, memo, val, i, obj);
    });
    return memo;
  };

  // #### Chunks.some
  //
  // Return either `true` or `false` by executing the `iterator` on
  // every item in the `obj`. It'll return `true` if one of the items
  // in the `obj` matches the `iterator`.
  //
  // - `obj`      is either an array or an object.
  // - `iterator` is a function.
  // - `scope`    is the value of `this`.
  //
  Chunks.some = function(obj, iterator, scope) {
    if (nativeSome && obj.nativeSome) { return obj.some(iterator, scope); }
    var results = false;
    Chunks.forEach(obj, function(val, i, obj) {
      if (iterator.call(scope, val, i, obj)) {
        results = true;
      }
    });
    return results;
  };

  // #### Chunks.every
  //
  // Return either `true` or `false` by executing the `iterator` on
  // every item in the `obj`. It'll return `true` if all of the items
  // in the `obj` matches the `iterator`.
  //
  // - `obj`      is either an array or an object.
  // - `iterator` is a function.
  // - `scope`    is the value of `this`.
  //
  Chunks.every = function(obj, iterator, scope) {
    if (nativeEvery && obj.nativeEvery) { return obj.every(iterator, scope); }
    var results = true;
    Chunks.forEach(obj, function(val, i, obj) {
      if (!iterator.call(scope, val, i, obj)) {
        results = false;
      }
    });
    return results;
  };

  // #### Chunks.index
  //
  // Return the index of the `item` in the `obj`. It delegates to
  // the native `indexOf` implementation whenever it can.
  //
  // - `obj`  is either an array or an object.
  // - `item` is a value.
  //
  Chunks.index = function(obj, item) {
    if (nativeIndexOf && obj.nativeIndexOf) { return obj.indexOf(item); }
    var results = -1;
    Chunks.forEach(obj, function(val, i) {
      if (val === item) { results = i; }
    });
    return results;
  };

  // #### Chunks.contains
  //
  // Determine if the `obj` contains the `item`.
  //
  // - `obj`  is either an array or an object.
  // - `item` is a value.
  //
  Chunks.contains = function(obj, item) {
    var results = Chunks.some(obj, function(val) {
      return item === val;
    });
    return results;
  };

  // #### Chunks.size
  //
  // Return the size of the `obj`.
  //
  // - `obj` is either an array or an object.
  //
  Chunks.size = function(obj) {
    var results = null;
    if (Chunks.isArray(obj)) {
      results = obj.length;
    } else {
      results = Chunks.keys(obj).length;
    }
    return results;
  };

  // #### Chunks.clone
  //
  // Return a clone of the `obj`.
  //
  // - `obj` is either an array or an object.
  //
  Chunks.clone = function(obj) {
    var results = null;
    if (Chunks.isArray(obj)) {
      results = obj.slice();
    } else {
      results = Chunks.extend({}, obj);
    }
    return results;
  };

  // ### Chunks.sort
  //
  // Return a new array with the values from the `obj` sorted by the `comp`.
  //
  // - `obj`  is either an array or an object.
  // - `comp` is a function.
  //
  Chunks.sort = function(obj, comp) {
    var values  = [],
        results = null;
    Chunks.forEach(obj, function(val) {
      values.push(val);
    });
    if (comp) {
      results = values.sort(comp);
    } else {
      results = values.sort();
    }
    return results;
  };

  // ### Types

  // #### Chunks.isArray
  //
  // Determine if the `obj` is an array.
  //
  // - `obj` is any kind of object.
  //
  Chunks.isArray = (nativeIsArray || function(obj) {
    return (toString.call(obj) === '[object Array]');
  });

  // #### Chunks.isObject
  //
  // Determine if the `obj` is an object.
  //
  // - `obj` is any kind of object.
  //
  Chunks.isObject = function(obj) {
    return (toString.call(obj) === '[object Object]');
  };

  // ### Arrays

  // #### Chunks.first
  //
  // Return the first item in the `arr`.
  //
  // - `arr` is an array.
  //
  Chunks.first = function(arr) {
    return arr[0];
  };

  // #### Chunks.last
  //
  // Return the last item in the `arr`.
  //
  // - `arr` is an array.
  //
  Chunks.last = function(arr) {
    return arr[arr.length - 1];
  };

  // #### Chunks.flatten
  //
  // Return a new and transformed array by flattening the nested arrays
  // in the `arr`. The new array will use the `base` as a starting point
  // if it's provided.
  //
  // - `arr`  is an array.
  // - `base` is an array.
  //
  Chunks.flatten = function(arr, base) {
    base = (base || []);
    var results = Chunks.reduce(arr, function(memo, val) {
      return memo.concat(val);
    }, base);
    return results;
  };

  // ### Objects

  // #### Chunks.keys
  //
  // Return a new array with keys from the `obj`.
  //
  // - `obj` is an object.
  //
  Chunks.keys = (nativeKeys || function(obj) {
    var results = [];
    for (var key in obj) {
      if (Chunks.has(obj, key)) {
        results.push(key);
      }
    }
    return results;
  });

  // #### Chunks.values
  //
  // Return a new array with values from the `obj`.
  //
  // - `obj` is an object.
  //
  Chunks.values = function(obj) {
    var results = [];
    Chunks.forEach(obj, function(val) {
      results.push(val);
    });
    return results;
  };

  // #### Chunks.has
  //
  // Determine if the `obj` has the `key`.
  //
  // - `obj` is an object.
  // - `key` is a value.
  //
  Chunks.has = function(obj, key) {
    return (hasOwnProp.call(obj, key));
  };

  // #### Chunks.extend
  //
  // Merge the properties in the `obj` together with the properties
  // in the `src`.
  //
  // - `obj` is an object.
  // - `src` is an object.
  //
  Chunks.extend = function(obj, src) {
    for (var key in src) {
      if (Chunks.has(src, key)) {
        if (src[key] !== undefined) {
          obj[key] = src[key];
        }
      }
    }
    return obj;
  };

  // ## Exports
  //
  // Export `Chunks` as a CommonJS module or expose it to
  // the global scope (`window`) for browser usage.
  //
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Chunks;
  } else {
    root.Chunks = Chunks;
  }

})(this);
