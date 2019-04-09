/*
The lazy chain deals with lazy execution of methods on a target object.

*/
function lazyChain(obj) {
    var calls = [];
    return {
	/*
	Wrap the provided method name ("concat") and the args in a 
	thunk for delayed execution.
	*/
        invoke: function(methodName, ...args) { // invoke('concat', [2,1,3])
            calls.push(function(target) { // Wrap the method in a function accepting a target
              var meth = target[methodName];
              return meth.apply(target, args); // Use apply to get apply function on target, ie Array.concat
            });
           return this; // we must use an old school function to return proper "this". Or we could use a class
    },
    force: function() {
        return _.reduce(calls, function(params, thunk) {
            return thunk(params);
        }, obj);
    }
  }
}

var lazyOp = lazyChain([2, 1, 3])
    .invoke('concat', [7, 7, 8, 9, 0])
    .invoke('sort');
let result = lazyOp.force();
console.log(result) //=> [0, 1, 2, 3, 7, 7, 8, 9]
