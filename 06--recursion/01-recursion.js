/*
Recursive functions.
Also called self-consuming functions
• Recursive solutions involve the use of a single abstraction applied to subsets of a common problem.
• Recursion can hide mutable state.
• Recursion is one way to implement laziness and infinitely large structures.
*/

console.log("######## Ex 1: Count the length of an array using recursion")
const myLength = ary => {
  // console.log(ary)
  if (_.isEmpty(ary))
    return 0;
  else
    return 1 + myLength(_.drop(ary)); // Will evaluate to: 1+1+1...
}
console.log(myLength(_.range(10))); // 10

console.log("######## Ex 2: Cycle an array")
/*
cycle that takes a number and an array and builds a new array filled with the elements of the input array, 
repeated the specified number of times
The [...ary, ...cycle(times - 1, ary)] spreads the provided array och the result for the next call to cycle
*/
const cycle = (times, ary) => 
  times <= 0 ? [] : [...ary, ...cycle(times - 1, ary)]; 

console.log(cycle(4, [1,2,3]));

console.log("######## Ex 3: Using a local function for short curcuiting")
const isEven = n => (n % 2) === 0; 

/*
Take note of the recursive call in the function returned by andify , as it’s particularly interesting. 
Because the logical and operator, && , is “lazy,” the recursive call will never
happen should the _.every test fail. This type of laziness is called “short-circuiting,” and
it is useful for avoiding unnecessary computations. Note that I use a local function,
everything, to consume the predicates given in the original call to andify . Using a
nested function is a common way to hide accumulators in recursive calls.
*/
const andify = (...preds) => {
  return (...args) => {
    var everything = function(ps, truth) {
      if (_.isEmpty(ps))
        return truth;
      else
        return _.every(args, _.first(ps)) && everything(...ps, truth);
    };
    return everything(preds, true);
  };
}

// var evenNums = andify(_.isNumber, isEven);
// console.log(evenNums(1,2)); // false
// console.log(evenNums(2,4,6,8)); // true

console.log("######## Ex 4: Codependent functions")

/*
The mutually recursive calls bounce back and forth between each other, decrementing
some absolute value until one or the other reaches zero. If evenSteven recieves a zero, it returns true
while oddJohn will return false.
*/
const evenSteven = n => {
  // console.log('evenSteven: ' + n)
  if (n === 0)
    return true;
  else
    return oddJohn(Math.abs(n) - 1);
}

const oddJohn = n => {
  // console.log('oddJohn: ' + n)
  if (n === 0)
    return false;
  else
    return evenSteven(Math.abs(n) - 1);
}

console.log(evenSteven(3)); //=> true
// console.log(oddJohn(11)); //=> true

console.log("######## Ex 5: Codependent functions")

/*
The operation of flat is a bit subtle, but the point is that in order to flatten a nested
array, it builds an array of each of its nested elements and recursively concatenates each
on the way back
*/
function existy(x) { return x != null };

function cat() {
  var head = _.first(arguments);
  if (existy(head))
    return head.concat.apply(head, ...arguments);
  else
    return [];
}

function flat(array) {
  if (_.isArray(array))
    return cat.apply(cat, _.map(array, flat));
  else
    return [array];
}

console.log(flat([[1,2],[3,4]])); //=> [1, 2, 3, 4]
