//https://codepen.io/flaggskeppet/pen/qvLEmo

// Helpers
const repeatedly = (times, fun) => _.map(_.range(times), fun);

const partial1 = (fun, arg1) => 
  (...args) => 
  fun(...[arg1, ...args]);
// end Helpers

/*
The problem we want to solve compared to the previous example is that we want to be
able to repeatedly test the character creation. 
This is why we refactor the character creation to a function, that we can provide to generateString
*/
// Partially applied version of random, with "lower" set to 1
const rand = partial1(_.random, 1);

const generateRandomCharacter = () => rand(26).toString(36);

const generateString = (charGen, len) => repeatedly(len, charGen).join('');

console.log(generateString(generateRandomCharacter, 20)); //=> "2lfhjo45n2nfnpbf7m7e"

describe("generateString", function() {
    var result = generateString(always("a"), 10);
    it("should return a string of a specific length", function() {
        expect(result.constructor).toBe(String);
        console.log(expect(result.length).toBe(10));
    });
    it("should return a string congruent with its char generator", function() {
        expect(result).toEqual("aaaaaaaaaa");
    });
});

console.log("hej")


