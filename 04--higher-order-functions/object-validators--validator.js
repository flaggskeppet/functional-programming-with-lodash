function validator(message, fun) {
  //var f = function(/* args */) {
  //  return fun.apply(fun, arguments);
  //};
  var f = function(...args) { // Rest: Get all params into an array
    return fun(...args); // Spread: Spread em out to invidudal parameters. So we don't need apply here
  };
  f['message'] = message;
  return f;
}

var v1 = validator("NOO", (input1, input2) => {return input1 === 'jonas' && input2 === 'mattsson'});
console.log(v1("jonas", 'mattsson'));
console.log(v1("jöns"));
