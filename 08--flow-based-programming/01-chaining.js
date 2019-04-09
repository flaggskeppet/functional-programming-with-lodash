/*
Chaining methods.
The “magic” that allows method chains is that each method in the chain returns the same host object reference
*/
function createPerson() {
    var firstName = "";
    var lastName = "";
    var age = 0;
    return {
        setFirstName: function(fn) {
            firstName = fn;
            return this;
        },
        setLastName: function(ln) {
            lastName = ln;
            return this;
        },
        setAge: function(a) {
            age = a;
            return this;
        },
        toString: function() {
            return [firstName, lastName, age].join(' ');
        }
    };
}
    let person = createPerson()
        .setFirstName("Mike")
        .setLastName("Fogus")
        .setAge(108)
        .toString();
  console.log(person)
