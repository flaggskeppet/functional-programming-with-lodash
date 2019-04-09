const partial1 = (fun, arg1) => 
  (...args) => 
  fun(...[arg1, ...args])

/*
To avoid blowing the stack on many recursive calls, a partially applied function can be returned
*/
const evenOline = (n) => {
  if (n === 0)
    return true;
  else
    return partial1(oddOline, Math.abs(n) - 1);
}

const oddOline = (n) =>  {
  if (n === 0)
    return false;
  else
  return partial1(evenOline, Math.abs(n) - 1);
}

console.log(evenOline(0)); // true
console.log(oddOline(0)); // false


// Itś a bit tricky to use the function since every iteration returns a new function...
console.log(oddOline(3)); // function () { return evenOline(Math.abs(n) - 1) }
console.log(oddOline(3)()); // function () { return oddOline(Math.abs(n) - 1) }
console.log(oddOline(3)()()); // function () { return evenOline(Math.abs(n) - 1) }
console.log(oddOline(3)()()()); // true // This is how the correc call needs to be made

/*
The basic principle of the trampoline is that instead of a deeply nested recursive call, a trampoline flattens out the calls
All that trampoline does is repeatedly call the return value of a function until it’s no
longer a function.
*/
function trampoline(fun /*, args */) {
  var result = fun.apply(fun, ...arguments);
  while (_.isFunction(result)) {
    result = result();
  }
  return result;
}

console.log(trampoline(oddOline, 3)); //=> true
console.log(trampoline(evenOline, 2000)); //=> true
