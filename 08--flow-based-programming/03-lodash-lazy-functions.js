/*
Lazy functions
*/
const library = [{title: "SICP", isbn: "0262010771", ed: 1},
    {title: "SICP", isbn: "0262510871", ed: 2},
    {title: "Joy of Clojure", isbn: "1935182641", ed: 1}];

console.log("********* Ex 1. Lazy functions")

let result;
result = _.chain(library)
    .map('title')
    .sort();

console.log(result); // _ Why?

/*
Because the Underscore object was returned!
You see, the _.chain function takes some object and wraps it in another object that
contains modified versions of all of Underscore’s functions.

Note that lodash's map takes just an itaratee shorthand like this: .map('title').
The vanilla ES6 version would look like this: .map(o => o.title)
*/

result = _.chain(library)
    .map('title')
    .sort()
    .value(); // To get the value from the function, not the wrapper...

console.log(result); // ["Joy of Clojure", "SICP", "SICP"]

console.log("********* Ex 2. Tapping into the chain")

_.chain(library)
    .map('title')
    .tap(o => console.log(o)) 
    .sort()
    .value(); // To get the value from the function, instead of a referencer to the lodash wrapper


