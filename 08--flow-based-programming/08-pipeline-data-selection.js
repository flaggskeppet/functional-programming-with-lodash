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
const existy = (x) => x != null;
const truthy = (x) => (x !== false) && existy(x);

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
  _.reduce(args, (l, r) => r(l), seed);

// Endpoint
function firstEditions(table) {
    return pipeline(table,
        t => as(t, { ed: 'edition' }),
        t => project(t, ['title', 'edition', 'isbn']),
        t => restrict(t, book => book.edition === 1)
    )
};

console.log(firstEditions(library));
