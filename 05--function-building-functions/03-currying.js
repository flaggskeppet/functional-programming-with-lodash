/*
Recall the idea that it’s useful to return functions (closures) that are “configured” with
certain behaviors based on the context in which they were created. This same idea can
be extended to curried functions as well. That is, for every logical parameter, a curried
function will keep returning a gradually more configured function until all parameters
have been filled. Often called partial application
*/


console.log('/////// Ex 1.')
const leftCurryDiv = (n) => (d) => n/d;
const rightCurryDiv = (d) => (n) => n/d;
  
let divideBy10 = leftCurryDiv(10);
console.log(divideBy10(2))

var divide10By = rightCurryDiv(10);
console.log(divide10By(2))

console.log('/////// Ex 2.')
const curry = fun => arg => fun(arg);

console.log(['11','11','11','11'].map(parseInt)); // [11, NaN, 3, 4], the second arg of parseInt, radix will be used
console.log(['11','11','11','11'].map(curry(parseInt))); // [11, 11, 11, 11]. We can curry it to get a parseInt with one arg

console.log('/////// Ex 3.')
// The curry2 function takes a function and curries it up to two parameters deep.
const curry2 = fun => secondArg => firstArg => fun(firstArg, secondArg);

const div = (n,d) => n/d;
const div10 = curry2(div)(10)
console.log(div10(50)) // 4
/*
curry2 can also be used to fix (configure!) the behavior of parseInt so that it handles only binary numbers when parsing
We curry parseInt and use the returned function to set the second argument (radix) of parseInt.
*/
const parseBinaryString = curry2(parseInt)(2);
console.log(parseBinaryString('111')) // 7
console.log(parseBinaryString('10')) // 2

console.log('/////// Ex 4.')
var plays = [
{artist: "Burial", track: "Archangel"},
{artist: "Ben Frost", track: "Stomp"},
{artist: "Ben Frost", track: "Stomp"},
{artist: "Emeralds", track: "Snores"},
{artist: "Burial", track: "Archangel"}];

// Using the countBy function as regular
let result = _.countBy(plays, (song) => [song.artist, song.track].join(" - "));
console.log(result);

// Using currying to create a custom function for song counting
const songToString = (song) => [song.artist, song.track].join(" - ");
let songCount = curry2(_.countBy)(songToString);
console.log(songCount(plays));
