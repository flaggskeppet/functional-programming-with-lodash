function lazyChain(obj) {
    var calls = [];
    return {
        invoke: function(methodName, ...args) { // invoke('concat', [2,1,3])
            calls.push(function(target) { // Wrap the method in a function accepting a target
              var meth = target[methodName];
              return meth.apply(target, args); // Use apply to get apply function on target, ie Array.concat
            });
           return this;
    },
    force: function() {
        return _.reduce(calls, function(params, thunk) { 
            return thunk(params);
        }, obj);
    }
  }
}
/*
Compared to the previous examples, here the usages of lazyChain have been refactored to a function instead.
This makes it possible to use the deferredSort where a function is expected, for example in a call to _.map to for multiple array
*/

/*
By lifting the creation of deferredSort into specialized functions, lazy operations can:
1. Be generic across types of objects (the apply will not be an [1,2,3].apply).
2. Be used as a function argument to a _.map call (since it is a function taking  an input array)
*/
const deferredSort = ary => lazyChain(ary).invoke('sort');

// By lifting the creation of force into a function it can be used as a function argument to a _.map call
const force = thunk => thunk.force();

const deferredSorts = _.map([[2,1,3], [7,7,1], [0,9,5]], deferredSort); // same as , (ary) => deferredSort(ary)
let result = _.map(deferredSorts, force); // same as: _.map(deferredSorts, (ary) => force(ary))
console.log(result); // [[1, 2, 3], [1, 7, 7], [0, 5, 9]]
