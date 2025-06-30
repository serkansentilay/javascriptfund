// string conversion

//let value = true;
//alert(typeof value); // boolean

//value = String(value); // now value is a string "true"
//alert(typeof value); // string
//String conversion is mostly obvious. A false becomes "false", null becomes "null", etc.


//numeric conversion
//when division / is applied to non-numbers:

// alert( "6" / "2" ); // 3, strings are converted to numbers


//let str = "123";
//alert(typeof str); // string

//let num = Number(str); // becomes a number 123

//alert(typeof num); // number


//If the string is not a valid number, the result of such a conversion is NaN. For instance:

 //let age = Number("an arbitrary string instead of a number");

//alert(age); // NaN, conversion failed

//null and undefined behave differently here: null becomes zero while undefined becomes NaN.

//Please note: the string with zero "0" is true
//Some languages (namely PHP) treat "0" as false. But in JavaScript, a non-empty string is always true.

// alert( Boolean("0") ); // true
//alert( Boolean(" ") ); // spaces, also true (any non-empty string is true)

//undefined is NaN as a number, not 0.
//"0" and space-only strings like " " are true as a boolean.

//let user = {
//  name: "John",
//  money: 1000,

//  [Symbol.toPrimitive](hint) {
//    alert(`hint: ${hint}`);
//    return hint == "string" ? `{name: "${this.name}"}` : this.money;
//  }
//};

// conversions demo:
//alert(user); // hint: string -> {name: "John"}
//alert(+user); // hint: number -> 1000
//alert(user + 500); // hint: default -> 1500

//here user does the same as above using a combination of toString and valueOf instead of Symbol.toPrimitive:

// let user = {
//  name: "John",
//  money: 1000,

  // for hint="string"
//  toString() {
//    return `{name: "${this.name}"}`;
//  },

  // for hint="number" or "default"
//  valueOf() {
//    return this.money;
//  }

//};

//alert(user); // toString -> {name: "John"}
//alert(+user); // valueOf -> 1000
//alert(user + 500); // valueOf -> 1500

//let user = {
//  name: "John",

//  toString() {
//    return this.name;
//  }
//};

//alert(user); // toString -> John
//alert(user + 500); // toString -> John500

//Further conversions
//As we know already, many operators and functions perform type conversions, e.g. multiplication * converts operands to numbers.
//If we pass an object as an argument, then there are two stages of calculations:
//The object is converted to a primitive (using the rules described above).
//If necessary for further calculations, the resulting primitive is also converted.

//let obj = {
  // toString handles all conversions in the absence of other methods
//  toString() {
//    return "2";
//  }
//};

//alert(obj * 2); // 4, object converted to primitive "2", then multiplication made it a number

//The multiplication obj * 2 first converts the object to primitive (that’s a string "2").
//Then "2" * 2 becomes 2 * 2 (the string is converted to number).
//Binary plus will concatenate strings in the same situation, as it gladly accepts a string:

// let obj = {
//  toString() {
//    return "2";
//  }
//};

//alert(obj + 2); // "22" ("2" + 2), conversion to primitive returned a string 

