// The data
const library = [{
        title: "SICP",
        isbn: "0262010771",
        ed: 1},
    {
        title: "SICP",
        isbn: "0262510871",
        ed: 2
    },
    {
        title: "Joy of Clojure",
        isbn: "1935182641",
        ed: 1
    }
];

// Helpers
const existy = x => x != null;
const truthy = x => (x !== false) && existy(x);

// The curry2 function takes a function and curries it up to two parameters deep.
const curry2 = fun => secondArg => firstArg => fun(firstArg, secondArg);

// Selections
const as = (table, newNames) => _.map(table, obj => rename(obj, newNames));

const rename = (obj, newNames) => 
    _.reduce(newNames, (o, nu, old) => {
            if (_.has(obj, old)) {
                o[nu] = obj[old];
                return o;
            } else
                return o;
        },
        _.omit.apply(null, [obj, _.keys(newNames)]));


const restrict = (table, pred) => 
  _.reduce(table, (newTable, obj) => {
        if (truthy(pred(obj)))
            return newTable;
        else
            return _.without(newTable, obj);
    }, table);

const project = (table, keys) =>
  _.map(table, obj => _.pick(obj, keys));


// The pipeline!
const pipeline = (seed, ...args) => 
  _.reduce(args, (l, r) => r(l), sed);

/*
The problem with the former example is that the pipeline expects that the functions embedded 
within take a single argument.
Since the relational operators expect two, an adapter function needs
to wrap them in order to work within the pipeline. However, the relational operators
were designed very specifically to conform to a consistent interface: the table is the first
argument and the “change” specification is the second. Taking advantage of this con‐
sistency, I can use curry2 to build curried versions of the relational operators to work
toward a more fluent experience.
*/
var RQL = {
  select: curry2(project),
  as: curry2(as),
  where: curry2(restrict)
};

// To explain the currying:
console.log(RQL.select) // returns a function expecting a function
console.log(RQL.select({ ed: 'edition' })) // returns a function expecting one more arg

/*
Compare to the previous example:
So instead of providing a function like
t => as(t, { ed: 'edition' })
The pipeline gets curried functions where the second argument is already provided.
It will invoke each one of them with the table as argument (which is what the curried functions expect).
Keep in mind that RQL.as({ ed: 'edition' }) returns a function that accepts one last argument.
*/
const firstEditions = table => 
  pipeline(table,
           RQL.as({ ed: 'edition' }),
           RQL.select(['title', 'edition', 'isbn']),
           RQL.where(book => book.edition === 1))

console.log(firstEditions(library));


