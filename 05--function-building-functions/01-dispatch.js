///// Helpers
const always = (STATE) => () => STATE;
const existy = (x) => x != null;
const truthy = (x) => (x !== false) && existy(x);
const doWhen = (cond, action) => truthy(cond) ? action() : undefined

/*
Invoker takes a method and returns a function that will 
invoke a method on any given object.

Taking advantage of the fact that js will return undefined if that method does not exist on an object.
*/
const invoker = (NAME, METHOD) => {
  return (target, ...args) => {
    if (!existy(target)) fail("Must provide a target");
    
    var targetMethod = target[NAME]; 
    
    // Check if target has the targetMethod, if so invoke it
    return doWhen((existy(targetMethod) && METHOD === targetMethod), () => targetMethod.apply(target, args)
    );
  };
};
///// End Helpers

/*
Returns a function that loops through an array of functions, calls each with an object, 
and returns the first actual value it finds (i.e., “existy”)
*/
const dispatch = (...funs) => {
  return (target, ...args) => {
    let result = undefined;
   
    for (let fun of funs) {
      result = fun(target, ...args);
      if (existy(result)) return result;
    }
  return result;
  };
}

/* Add polymorphic dispatches. str is a function that can convert both arrays & strings to strings */
var str = dispatch(invoker('toString', Array.prototype.toString), invoker('toString', String.prototype.toString));
console.log(str("a")); // "a"
console.log(str(_.range(10))); // "0,1,2,3,4,5,6,7,8,9"


/// STEP 2: A generic reverser
const stringReverse = (s) => (!_.isString(s)) ? undefined : s.split('').reverse().join('');

console.log(stringReverse("abc")); // "cba"
console.log(stringReverse(1)); // undefined

const pollymorphicReverser = dispatch(invoker('reverse', Array.prototype.reverse), stringReverse);
console.log(pollymorphicReverser([1,2,3])); // [3,2,1]

// You can compose a reverse with a default fallbackbehavior
const sillyReverse = dispatch(pollymorphicReverser, always(42));
console.log(sillyReverse("jonas")); // "sanoj"
console.log(sillyReverse(100)); // "42"



