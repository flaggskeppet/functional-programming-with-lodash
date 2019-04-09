/*
Helper functions:
*/
const always = (STATE) => () => STATE 
const existy = (x) => x != null;

/*
Object validators

checker that takes a number of predicates (functions
returning true or false ) and returns a validation function. The returned validation
function executes each predicate on a given object, and it adds a special error string to
an array for each predicate that returns false. If all of the predicates return true , then
the final return result is an empty array; otherwise, the result is a populated array of
error messages
*/
const checker = (...validators) => {
	return (obj) => {
		return _.reduce(validators, (errs, check) => {
			if (check(obj))
				return errs
			else
				return [...errs, check.message];
		}, []);
	};
}

/*
Predicate functions to be use by validator functions
*/
let alwaysPasses = checker(always(true), always(true)); // Just to verify a success...
console.log(alwaysPasses({})); // []

let fails = always(false); // Just to verify a failure
fails.message = "a failure in life";
let alwaysFails = checker(fails);
console.log(alwaysFails({})); // ["a failure in life"]

// STEP 2: Factory for functions:
/*
The validator factory wraps the predicate function with a "message" property 
*/
const validator = (message, fun) => {
   var f = function(...args) {
    return fun(...args);
  };
  f['message'] = message;
  return f;
}
var gonnaFail = checker(validator("ZOMG!", always(false)));
console.log(gonnaFail(100)); // ["ZOMG!"]

// Predicate function for verifying an object
const aMap = obj => _.isObject(obj);

var checkCommand = checker(validator("must be a map", aMap));
console.log(checkCommand({})); // true
console.log(checkCommand(42)); // ["must be a map"]

// Predicate function for verifying an existing key
const hasKeys = (...KEYS) => {
  const fun = obj => _.every(KEYS, (k) => _.has(obj, k));
  fun.message = ["Must have values for keys:", KEYS].join(" ");
  return fun;
}

var checkCommand = checker(validator("must be a map", aMap), hasKeys('msg', 'type'));
console.log(checkCommand({msg: "blah", type: "display"})); // []
console.log(checkCommand(32)); // ["must be a map", "Must have values for keys: msg type"]
console.log(checkCommand({})); // ["Must have values for keys: msg type"]

