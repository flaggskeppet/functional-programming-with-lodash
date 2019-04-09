/*
The pipeline loops through all functions provided as args and invokes the current function (curr)
with the result of the former (acc).
In the first iteration seed will be set to the array, so the reduce will be: ._compact([[2, 3, null, etc])

*/
function pipeline(seed, ...args) {
    return _.reduce(args, (acc, curr) => curr(acc), seed);
}

/* Create a pipeline with the array as seed and some functions as args */
let result = pipeline([2, 3, null, 1, 42, false], _.compact, _.reverse, _.initial);
console.log(result);
