/*
Prototype based implementation of a lazy variant of _.chain that will not run any target methods until a variant of
_.value is called:
*/
class LazyChain {
  
  constructor(obj){
    this._calls = []; // Actually an array of thunks
    this._target = obj;  
  }
  
  invoke(methodName, ...args) {
    this._calls.push((target) => { // wrap the incoming method in a function to create a thunk
      var meth = target[methodName]; // will be for ex [2,1,3]['sort']
      return meth.apply(target, args); // We need to use apply here to 
    });
    return this; // Return a ref to itself to allow chaining
  };
  
  /* A lazy version of _.tap that works with LazyChain instances */
  tap(fun) {
    this._calls.push((target) => {
      fun(target);
        return target;
      });
    return this;
}
  /*
  The thunk: provides the loopback argument not only to the initial thunk, 
  but also every intermediate call on the _calls array*/
  force() {
    return _.reduce(this._calls, (target, thunk) => thunk(target), this._target);
  };
}

console.log(new LazyChain([2,1,3]).invoke('sort')._calls);
console.log(new LazyChain([2,1,3]).invoke('sort').force());

var result = new LazyChain([2,1,3])
  .invoke('concat', [8,5,7,6])
  .invoke('sort')
  .tap(alert)
  .invoke('join', ' ')
  .force();

console.log(result);
