const existy = (x) => x != null;
/*
The magic of fnull is that if any
of the arguments to the function that it returns are null or undefined , then the original
“default” argument is used instead.

So every time the function is invoked (for ex i a reduce) it will check the arguments and use the
default values in the outer scope if the current params is null.
*/
function fnull (fun /*, defaults */) {
	var defaultArgs = arguments;

  return function(/* args */) {
	 var args = _.map(arguments, function(e, i) {
	    return existy(e) ? e : defaultArgs[i];
	});
	return fun.apply(null, args);
	};
};

/*
Es6 arrow functions does not have the arguments object.
Instead we use the explicit rest parameters to retrieve the function args
*/
const fnullEs6 = (...args) => {
	let fun = args[0];
  var defaultArgs = args;
  
  return (...args)  => {
  	var safeArgs = _.map(args, (e, i) => existy(e) ? e : defaultArgs[i]);
		return fun.apply(null, safeArgs); // try fun(...safeArgs)
	};
};
let nums = [1,2,3,null,5];


/* These examples illustrates the problem with arguments being null:*/

// let result = _.reduce(nums, (total, n) => total * n );
// console.log(result) // 0

//doSomething({whoCares: 42, critical: null}); // probably explodes

var safeMult = fnull(function(total, n) { return total * n }, 1, 1); // note that 1,1 are default args for total & n
console.log(_.reduce(nums, safeMult));

var safeMult = fnullEs6(function(total, n) { return total * n }, 1, 1);
console.log(_.reduce(nums, safeMult));


