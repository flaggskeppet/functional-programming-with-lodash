// Helpers
const repeatedly = (times, fun) => _.map(_.range(times), fun);

const partial1 = (fun, arg1) => 
  (...args) => 
  fun(...[arg1, ...args]);
// end Helpers

// Partially applied version of random, with "lower" set to 1
const rand = partial1(_.random, 1);

// Random usages of this partially applied rand function
console.log(rand(10)); //=> 7
console.log(repeatedly(10, () => rand(10))); //=> [2, 6, 6, 7, 7, 4, 4, 10, 8, 5]
console.log(_.take(repeatedly(100, () => rand(10)), 5)); //=> [9, 6, 6, 4, 6]

// Returns a random string with specified length.
const randString = len => {
  var ascii = repeatedly(len, () => rand(26));
  return _.map(ascii, (n) => n.toString(36)).join(''); // radix 36 = Binary to Hex encoding
}

console.log(randString(0)); //=> ""
console.log(randString(1)); //=> "f"
console.log(randString(10)); //=> "k52k7bae8p"

/*
The problem is that randString breaks the first two of the following rules of "purity":
• Its result should be calculated only from the values of its arguments.
• It cannot rely on data that changes external to its control.
• It cannot change the state of something external to its body.
*/
