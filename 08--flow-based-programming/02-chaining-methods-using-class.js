/*
Chaining methods.
The “magic” that allows method chains is that each method in the chain returns the same host object reference.
Compared with the old style, we use a class setting properties on this in constructor.
Then instead of using functions, we use methods that reference to its properties using "this."
*/
class Person {
    constructor() {
        this.firstName = "";
        this.lastName = "";
        this.age = 0;
    }

    setFirstName(fn) {
        this.firstName = fn;
        return this;
    }
    setLastName(ln) {
        this.lastName = ln;
        return this;
    }
    setAge(a) {
        this.age = a;
        return this;
    }
    toString() {
        return [this.firstName, this.lastName, this.age].join(' ');
    }
}
let person = new Person()
    .setFirstName("Mike")
    .setLastName("Fogus")
    .setAge(108)
    .toString();

console.log(person)
