/*
When in need to traverse an array of nested arrays, very
often you’ll see the following pattern:
doSomethingWithResult(_.map(someArray, someFun));

The result of the call to _.map is then passed to another function for further processing.
This is common enough to warrant its own abstraction, I’ll call it visit.

The function visit takes two functions in addition to an array to process. The map
Fun argument is called on each element in the array, and the resulting array is passed to
resultFun for final processing. If the thing passed in array is not an array, then I just
run the resultFun on it
*/

const visit = (mapFun, resultFun, array) => (_.isArray(array)) ? resultFun(_.map(array, mapFun)) : resultFun(array);

/*
visit can be used for a number of reason, whenever you want to transform and array and run a function on the result
Whenever we want a function that  just returns the input, we can use identity. It is just a placehoder for "(val) => val";
*/
console.log(visit(_.identity, _.isNumber, 42)); //=> true
console.log(visit(_.isNumber, _.identity, [1, 2, null, 3])); //=> [true, true, false, true] 

var rangeResult = visit(function(n) { return n * 2 }, _.reverse, _.range(10)); //=> [18, 16, 14, 12, 10, 8, 6, 4, 2, 0]
console.log(rangeResult);
