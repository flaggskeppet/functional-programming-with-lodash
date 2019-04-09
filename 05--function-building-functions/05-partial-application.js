/*
Partial application:
A curried function is one that returns a progressively more specific function for each of its given arguments until it runs out of parameters. A partially applied function, on the other hand, is a function that is “partially”
executed and is ready for immediate execution given the remainder of its expected arguments
*/

const div = (n, d) => n / d;

console.log("****** Ex 1: Partially apply one argument");
/*
A function that partially applies its first argument.
It does so by capturing the first argument and put it first in the argument list of the returned function
*/
const partial1 = (fun, arg1) => 
  (...args) => 
  fun(...[arg1, ...args])


var over10Part1 = partial1(div, 10);
console.log(over10Part1(5)); // 2

console.log("****** Ex 2: Partially apply two arguments");

// A function to partially apply up to two arguments is implemented similarly:
const partial2 = (fun, arg1, arg2) => 
  (...args) => 
  fun(...[arg1, arg2, ...args])

var div10By2 = partial2(div, 10, 2)
console.log(div10By2()); // 5

// As a side note: We can apply partial application using the built in function.bind()
var div10By2UsingBind = div.bind(undefined, 10, 2)
console.log(div10By2UsingBind()); // 5

console.log("****** Ex 3: Partially apply any number of arguments");

/*
Function for partial application of any number of arguments:
It captures any number of arguments and returns a function where this args
are prefixing the final number of args
*/
const partial = (fun, ...pargs) =>  
  (...args) => 
  fun(...[...pargs, ...args]);
  
const over10Partial = partial(div, 10);
console.log(over10Partial(2)); // 5
