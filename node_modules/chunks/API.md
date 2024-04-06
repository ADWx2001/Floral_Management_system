# Chunks

## API

### Collections

Every `iterator` returns the value first, then the key and lastly the object itself. The only exception to this rule is `Chunks.reduce` which returns the previous value first and then follows the same convention as the others.

#### Chunks.forEach / Chunks.each

~~~ javascript
Chunks.forEach(obj, iterator[, scope]);
~~~

Executes the `iterator` on every item in the `obj`. The `scope` is the value of `this`.

##### Examples

~~~ javascript
var results = [];

Chunks.forEach([1, 2, 3], function(v) {
  results.unshift(v);
});
// [3, 2, 1]
~~~

~~~ javascript
var results = [];

Chunks.forEach({one: 1, two: 2, three: 3}, function(v, k) {
  results.unshift(k);
});
// ['three', 'two', 'one']
~~~

#### Chunks.map

~~~ javascript
Chunks.map(obj, iterator[, scope]);
~~~
Returns a new and transformed array by executing the `iterator` on every item in the `obj`. The `scope` is the value of `this`.

##### Examples

~~~ javascript
Chunks.map([1, 2, 3], function(v) {
  return v + 1;
});
// [2, 3, 4]
~~~

~~~ javascript
Chunks.map({one: 1, two: 2, three: 3}, function(v, k) {
  return k + '!';
});
// ['one!', 'two!', 'three!']
~~~

#### Chunks.filter

~~~ javascript
Chunks.filter(obj, iterator[, scope]);
~~~

Returns a new and transformed array by executing the `iterator` on every item in the `obj`. Only the items that evalute to `true` in the `iterator` will be added to the array. The scope is the value of `this`.

##### Examples

~~~ javascript
Chunks.filter([1, 2, 3], function(v) {
  return v % 2;
});
// [1, 3]
~~~

~~~ javascript
Chunks.filter({one: 1, two: 2, three: 3}, function(v, k) {
  return (k.charAt(0) === 't');
});
// [2, 3]
~~~

#### Chunks.reduce

~~~ javascript
Chunks.reduce(obj, iterator, memo[, scope]);
~~~

Returns a single value by executing the `iterator` on every item in the `obj` and passing the previous value, `memo`, to the `iterator`. The scope is the value of `this`.

##### Examples

~~~ javascript
Chunks.reduce([1, 2, 3], function(m, v) {
  return m + v;
}, 0);
// 6
~~~

~~~ javascript
Chunks.reduce({one: 1, two: 2, three: 3}, function(m, v) {
  return m + v;
}, '');
// '123'
~~~

#### Chunks.some

~~~ javascript
Chunks.some(obj, iterator[, scope]);
~~~

Returns either `true` or `false` by executing the `iterator` on every item in the `obj`. It'll return `true` if one of the items in the `obj` matches the `iterator`. The scope is the value of `this`.

##### Examples

~~~ javascript
Chunks.some([1, 2, 3], function(v) {
  return v === 3;
});
// true
~~~

~~~ javascript
Chunks.some({one: 1, two: 2, three: 3}, function(v, k) {
  return k === 'two';
});
// true
~~~

#### Chunks.every

~~~ javascript
Chunks.every(obj, iterator[, scope]);
~~~

Returns either `true` or `false` by executing the `iterator` on every item in the `obj`. It'll return `true` if all of the items in the `obj` matches the `iterator`. The scope is the value of `this`.

##### Examples

~~~ javascript
Chunks.every([1, 2, 3], function(v) {
  return v > 2;
});
// false
~~~

~~~ javascript
Chunks.every({one: 1, two: 2, three: 3}, function(v, k) {
  return (k.charAt(0) === 't');
});
// false
~~~

#### Chunks.index

~~~ javascript
Chunks.index(obj, item);
~~~

Returns the index of the `item` in the `obj`. It returns the index of the item, or `-1` if nothing is found.

It delegates to `indexOf` whenever it can, albeit without the option of choosing the start index (hence the different name).

##### Examples

~~~ javascript
Chunks.index([1, 2, 3], 2);
// 1
~~~

~~~ javascript
Chunks.index({one: 1, two: 2, three: 3}, 2);
// 'two'
~~~

#### Chunks.contains

~~~ javascript
Chunks.contains(obj, item);
~~~

Determines if the `obj` contains the `item`. It returns either `true` or `false`.

##### Examples

~~~ javascript
Chunks.contains([1, 2, 3], 2);
// true
~~~

~~~ javascript
Chunks.contains({one: 1, two: 2, three: 3}, 2);
// true
~~~

#### Chunks.size

~~~ javascript
Chunks.size(obj);
~~~

Returns the size of the `obj`.

##### Examples

~~~ javascript
Chunks.size(['a', 'b', 'c']);
// 3
~~~

~~~ javascript
Chunks.size({one: 1, two: 2, three: 3});
// 3
~~~

#### Chunks.clone

~~~ javascript
Chunks.clone(obj);
~~~

Returns a clone of the `obj`.

##### Examples

~~~ javascript
Chunks.clone([1, 2, 3]);
// [1, 2, 3]
~~~

~~~ javascript
Chunks.clone({one: 1, two: 2, three: 3});
// {one: 1, two: 2, three: 3}
~~~

#### Chunks.sort

~~~ javascript
Chunks.sort(obj[, comp]);
~~~

Returns a new array with the values from the `obj` sorted, either by lexicographical order or the `comp` function.

##### Examples

~~~ javascript
Chunks.sort(['a', 'd', 'b', 'e', 'c', 'f']);
// ['a', 'b', 'c', 'd', 'e', 'f']
~~~

~~~ javascript
Chunks.sort([1, 10, 2, 20, 3, 30], function(a, b) {
  return a - b;
});
// [1, 2, 3, 10, 20, 30]
~~~

~~~ javascript
Chunks.sort({one: 'a', four: 'd', two: 'b', five: 'e', three: 'c', six: 'f'});
// ['a', 'b', 'c', 'd', 'e', 'f']
~~~

~~~ javascript
Chunks.sort({one: 1, ten: 10, two: 2, twenty: 20, three: 3, thirty: 30}, function(a, b) {
  return a - b;
});
~~~

### Types

#### Chunks.isArray

~~~ javascript
Chunks.isArray(obj);
~~~

Determines if the `obj` is an array. It returns either `true` or `false`.

##### Examples

~~~ javascript
Chunks.isArray([1, 2, 3]);
// true
~~~

~~~ javascript
Chunks.isArray({one: 1, two: 2, three: 3});
// false
~~~

#### Chunks.isObject

~~~ javascript
Chunks.isArray(obj);
~~~

Determines if the `obj` is an object. It returns either `true` or `false`.

##### Examples

~~~ javascript
Chunks.isObject({one: 1, two: 2, three: 3});
// true
~~~

~~~ javascript
Chunks.isObject([1, 2, 3]);
// false
~~~

### Arrays

#### Chunks.first

~~~ javascript
Chunks.first(arr);
~~~

Returns the first item in the `arr`.

##### Example

~~~ javascript
Chunks.first([1, 2, 3]);
// 1
~~~

#### Chunks.last

~~~ javascript
Chunks.last(arr);
~~~

Returns the last item in the `arr`.

##### Example

~~~ javascript
Chunks.last([1, 2, 3]);
// 3
~~~

#### Chunks.flatten

~~~ javascript
Chunks.flatten(arr[, base]);
~~~

Returns a new and transformed array by flattening the nested arrays in the `arr`. If the `base` is provided it'll get used starting point for the new array.

##### Examples

~~~ javascript
Chunks.flatten([[1, 2, 3], [4, 5, 6]]);
// [1, 2, 3, 4, 5, 6]
~~~

~~~ javascript
Chunks.flatten([[2, 3, 4], [5, 6, 7]], [1]);
// [1, 2, 3, 4, 5, 6, 7]
~~~

### Objects

#### Chunks.keys

~~~ javascript
Chunks.keys(obj);
~~~

Returns a new array with keys from the `obj`.

##### Example

~~~ javascript
Chunks.keys({one: 1, two: 2, three: 3});
// ['one', 'two', 'three']
~~~

#### Chunks.values

~~~ javascript
Chunks.values(obj);
~~~

Returns a new array with values from the `obj`.

##### Example

~~~ javascript
Chunks.values({one: 1, two: 2, three: 3});
// [1, 2, 3]
~~~

#### Chunks.has

~~~ javascript
Chunks.has(obj, key);
~~~

Determine if the `obj` has the `key`. It returns either `true` or `false`.

##### Example

~~~ javascript
Chunks.has({one: 1, two: 2, three: 3}, 'two');
// true
~~~

#### Chunks.extend

~~~ javascript
Chunks.extend(obj, src);
~~~

Merge the properties in the `obj` together with the properties in the `src`.

##### Example

~~~ javascript
Chunks.extend({one: 1, two: 3}, {two: 2, three: 3});
// {one: 1, two: 2, three: 3}
~~~
