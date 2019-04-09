/*
_.clone in lodash / underscore only clones on the first level.
Everthing else is copied by reference.
*/
var x = [{a: [1, 2, 3], b: 42}, {c: {d: []}}];
var y = _.clone(x);
console.log(y); //=> [{a: [1, 2, 3], b: 42}, {c: {d: []}}];
x[1]['c']['d'] = 1000000;
console.log(y); //=> [{a: [1, 2, 3], b: 42}, {c: {d: 1000000}}]; // We did not expect y to change here but it has.

const existy = x => x != null;

/*
Cloning using recursion:
When deepClone encounters a primitive like a number, it simply returns it. However,
when it encounters an object, it treats it like an associative structure and recursively copies all of its key/value mappings
Note how we use .constructor() to create the instance and hasOwnProperty to avoid copying from the prototype
*/
const deepClone = obj => {
  if (!existy(obj) || !_.isObject(obj)) return obj;
  var temp = new obj.constructor();
  for (var key in obj)
    if (obj.hasOwnProperty(key))
      temp[key] = deepClone(obj[key]);
  return temp;
}

var x = [{a: [1, 2, 3], b: 42}, {c: {d: []}}];
var y = deepClone(x);
console.log(_.isEqual(x, y)); //=> true
y[1]['c']['d'] = 42;
console.log(_.isEqual(x, y)); //=> false
