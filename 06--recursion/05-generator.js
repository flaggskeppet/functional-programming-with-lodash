/*
A generator is a function that returns each subsequent value
on demand
*/
const generator = (seed, current, step) => {
  return {
    head: current(seed),
    tail: () => {
      console.log("forced");
      return generator(step(seed), current, step);
    }
  };
}

const genHead = gen => gen.head;
const genTail = gen => gen.tail();

var ints = generator(0, _.identity, function(n) { return n + 1 });

console.log(genHead(ints)); //=> 0
console.log(genTail(ints)); //=> {head: 1, tail: function}
