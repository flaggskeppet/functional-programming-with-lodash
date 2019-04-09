const existy = (x) => x != null;
const truthy = (x) => (x !== false) && existy(x);
const doWhen = (cond, action) => truthy(cond) ? action() : undefined

/*
Invoker takes a method and returns a function that will 
invoke a method on any given object.

Taking advantage of the fact that js will return undefined if that method does not exist on an object.
*/
const invoker = (NAME, METHOD) => {
  return (target /* args ... */) => {
    if (!existy(target)) fail("Must provide a target");
    
    var targetMethod = target[NAME]; 
    
    // Check if target has the targetMethod
    return doWhen((existy(targetMethod) && METHOD === targetMethod), () => targetMethod.apply(target, arguments)
    );
  };
};

let rev = invoker('reverse', Array.prototype.reverse);

console.log(rev([11,12,13])); // [13, 12, 11]
console.log(_.map([[1,2,3]], rev)); // [[3, 2, 1]]


