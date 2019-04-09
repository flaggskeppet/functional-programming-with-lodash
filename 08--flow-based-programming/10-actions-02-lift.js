/*
Actions:
What if we want to compose functions that were not necessarily meant to compose?
This examples demonstrates usage of functions with different return types. We 
are using a new kind of lazy pipeline called actions.
*/
const existy = x => x != null;

const validator = (message, fun) => {
   var f = function(...args) {
    return fun(...args);
  };
  f['message'] = message;
  return f;
}

var zero = validator("cannot be zero", n => 0 === n );
var number = validator("arg must be a number", _.isNumber);

const sqr = n => {
  if (!number(n)) throw new Error(number.message);
  if (zero(n)) throw new Error(zero.message);
   return n * n;
}

const note = data => { console.log('NOTE - The value is: ' + data) }

/*
actions: array of functions
done: callback function, called when all actions are processed
*/
const actions = (actions, done) => 
  seed => {
    let init = { values: [], state: seed };

    /*
    The actions function expects an array of functions, each taking a value and returning
    a function that augments the intermediate state object. The actions function then re‐
    duces over all of the functions in the array and builds up an intermediate state object.
    During this process, actions expects the result from each function to be an object of
    two keys: answer and state. The answer value corresponds to the result of calling the
    function and the state value represents what the new state looks like after the “action”
    is performed. For a function like note , the state does not change
    */
    let intermediate = _.reduce(actions, (stateObj, action) => {
      var result = action(stateObj.state);
      var values = [...stateObj.values, result.answer];

      return { values: values, state: result.state };
    }, init);

    var keep = _.filter(intermediate.values, existy);
    return done(keep, intermediate.state);
  };

/*
Lift provides adapter functions for the action interface
It's curried! There is no reason to curry lift except to provide a nicer interface. 
In fact, using lift, I can more nicely redefine mSqr and mNote
*/
const lift = (answerFun, stateFun) => // one or two parameters are provided at creation
    (...args) => 
        (state) => { // state is provided inside the pipeline
            var ans = answerFun.apply(null, [state, ...args]);
            var s = stateFun ? stateFun(state) : ans;
            return {
                answer: ans,
                state: s
            };
        };


var mSqr = lift(sqr); // Only need to supply the first argument here since answer and state is here
var mNote = lift(note, _.identity);

let doubleSquareAction = actions(
  [mSqr(),
   mNote(),
   mSqr()], // actions param
  values => values // done param
);

var result = doubleSquareAction(10);

console.log(result) //=> [100, 10000]

