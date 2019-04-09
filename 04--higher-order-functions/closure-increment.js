/*
 Creates a function with a initial value captured in a closure
 The returned function is invoked with a prefix-string
*/
const makeUniqueStringFunction = (start) => {
	let COUNTER = start;
	return (prefix) => [prefix, COUNTER++].join('');
};

const uniqueString = makeUniqueStringFunction(0);
console.log(uniqueString("foo")); // "foo0"
console.log(uniqueString("foo")); // "foo1"
