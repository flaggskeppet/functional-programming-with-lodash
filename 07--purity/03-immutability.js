
// While strings and numbers are immutable. Objects are passed by reference.
// This is why we should not simply assign objects to each other, but instead 
// to be immutable, copy their values

const person = {
  name: 'John',
  age: 28
}


// BAD!
const newPerson = person
newPerson.age = 30
console.log(newPerson === person) // true
console.log(person) // { name: 'John', age: 30 } 

// GOOD!
const newPerson2 = {...person, age: 30}
console.log(newPerson2 === person) // false
