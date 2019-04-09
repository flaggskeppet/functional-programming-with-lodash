/*
Prototype based implementation of a lazy variant of _.chain that will not run any target methods until a variant of
_.value is called:
*/
function LazyChain(obj) {
  this._calls = []; // Actually an array of thunks
  this._target = obj;
}

LazyChain.prototype.invoke = function(methodName, ...args) {
  this._calls.push(function(target) { // wrap the incoming method in a function to create a thunk
    var meth = target[methodName]; // will be for ex [2,1,3]['sort']
    return meth.apply(target, args); // We need to use apply here to provide the target
  });
  return this;
};

/*
The thunk
provides the loopback argument not only to the initial thunk, 
but also every intermediate call on the _calls array*/
LazyChain.prototype.force = function() {
  return _.reduce(this._calls, function(target, thunk) {
    return thunk(target);
  }, this._target);
};

// console.log(new LazyChain([2,1,3]).invoke('sort')._calls);
console.log(new LazyChain([2,1,3]).invoke('sort', undefined).force());
