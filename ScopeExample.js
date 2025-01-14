let globalMessage = "I am global";

function outerFunction() {
  let outerMessage = "I am in the outer function";

  function innerFunction() {
    let innerMessage = "I am in the inner function";

    // Can access all variables in inner, outer, and global scope
    console.log(globalMessage);  // Accessible
    console.log(outerMessage);   // Accessible
    console.log(innerMessage);   // Accessible
  }

  innerFunction();

  // Can access variables in outer and global scope, but not inner scope
  console.log(globalMessage);    // Accessible
  console.log(outerMessage);     // Accessible
  // console.log(innerMessage);  // Error: innerMessage is not defined
}

outerFunction();

// Can only access global variables
console.log(globalMessage);      // Accessible
// console.log(outerMessage);    // Error: outerMessage is not defined
// console.log(innerMessage);    // Error: innerMessage is not defined
