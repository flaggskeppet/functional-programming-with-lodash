///// Helpers
const always = (STATE) => () => STATE;
const existy = (x) => x != null;
const truthy = (x) => (x !== false) && existy(x);
const doWhen = (cond, action) => truthy(cond) ? action() : undefined
///// End Helpers

/*
Returns a function that loops through a set of provided functions, calls each with an object, 
and returns the first actual value it finds (i.e., “existy”)

let dispatcher = dispatch(() => undefined, () => 'bar')
console.log(dispatcher()) // 'bar'
*/
const dispatch = (...funs) => {
  return (target, ...args) => {
    let result = undefined;
   
    for (let fun of funs) {
      result = fun(target, ...args);
      if (existy(result)) return result;
    }
  return result;
  };
}

/*
We like to get of switch statements like this:
function performCommandHardcoded(command) {
  var result;
  switch (command.type)
  {
    case 'notify':
      result = notify(command.message);
      break;
    case 'join':
      result = changeView(command.target);
      break;
    default:
      alert(command.type);
  }
  return result
}
*/

/*
the isa function that takes a type string and an action
function and returns a new function. The returned function will call the action function
only if the type string and the obj.type field match; otherwise, it returns undefined
*/
const isa = (type, action)  => (obj) => { if (type === obj.type) return action(obj) };


const performCommand = dispatch(
  isa('notify', (obj) => alert(obj.message)), 
  isa('join', (obj) =>  console.log(obj.target)),
function(obj) { console.log('Also doing some default behavior') }
);

performCommand({type: 'notify', message: 'HELLO'})
performCommand({type: 'join', target: 'foo'})
