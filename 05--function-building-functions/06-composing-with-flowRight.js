/*
Composing functions
Note that lodash uses flowRight() instead of compose().
Flowright starts at the right and executes towards the left
*/
console.log("********* Ex1.")
var isntString = _.flowRight(x => !x, _.isString);
console.log(isntString([])); // true

console.log("********* Ex2.")
let not = x => !x;
var isntString = _.flowRight(not, _.isString);
console.log(isntString([])); // true
