// data types

//Programming languages that allow such things, such as JavaScript, are called “dynamically typed”, 
// meaning that there exist data types, but variables are not bound to any of them.
//JavaScript gibi bu tür şeylere izin veren programlama dillerine “dinamik tipli” denir; 
// yani veri tipleri mevcuttur ancak değişkenler bunlardan hiçbirine bağlı değildir.

// no error
//let message = "hello";
//message = 123456;


//let n = 123;
//n = 12.345;

//alert( 1 / 0 ); // Infinity
//alert( Infinity ); // Infinity

//alert( "not a number" / 2 ); // NaN, such division is erroneous

//NaN is sticky. Any further mathematical operation on NaN returns NaN:

//alert( NaN + 1 ); // NaN
//alert( 3 * NaN ); // NaN
//alert( "not a number" / 2 - 1 ); // NaN

//So, if there’s a NaN somewhere in a mathematical expression, 
// it propagates to the whole result (there’s only one exception to that: NaN ** 0 is 1).
//alert( NaN ** 0 ); // 1, the only exception


//bigint
//In JavaScript, the “number” type cannot safely represent integer values larger than (253-1) 
// (that’s 9007199254740991), or less than -(253-1) for negatives.
// bu sayi degerinden fazlasi ve azini tam net hesaplayamiyor
//To be really precise, the “number” type can store larger integers (up to 1.7976931348623157 * 10308), 
// but outside of the safe integer range ±(253-1) there’ll be a precision error, 
// because not all digits fit into the fixed 64-bit storage. So an “approximate” value may be stored.
//For example, these two numbers (right above the safe range) are the same:
//console.log(9007199254740991 + 1); // 9007199254740992
//console.log(9007199254740991 + 2); // 9007199254740992
//console.log(9007199254740991 + 3); // 9007199254740994
//console.log(9007199254740991 + 4); // 9007199254740996
//console.log(9007199254740991 + 5); // 9007199254740996

//A BigInt value is created by appending n to the end of an integer:
// the "n" at the end means it's a BigInt
//const bigInt = 1234567890123456789012345678901234567890n;


//BigInt is a special numeric type that provides support for integers of arbitrary length.
//A bigint is created by appending n to the end of an integer literal or by calling the function 
// BigInt that creates bigints from strings, numbers etc.
//const bigint = 1234567890123456789012345678901234567890n;
//const sameBigint = BigInt("1234567890123456789012345678901234567890");
//const bigintFromNumber = BigInt(10); // same as 10n

//alert(5n / 2n); // 2

//alert(1n + 2); // Error: Cannot mix BigInt and other types

//let bigint = 1n;
//let number = 2;
// number to bigint
//alert(bigint + BigInt(number)); // 3
// bigint to number
//alert(Number(bigint) + number); // 3

//The conversion operations are always silent, never give errors,
//  but if the bigint is too huge and won’t fit the number type, then extra bits will be cut off, 
// so we should be careful doing such conversion.
//Dönüştürme işlemleri her zaman sessizdir, asla hata vermez, ancak bigint çok büyükse ve 
// sayı türüne uymuyorsa, o zaman ekstra bitler kesilecektir, bu yüzden böyle bir 
// dönüştürme yaparken dikkatli olmalıyız.


//The unary plus is not supported on bigints
//The unary plus operator +value is a well-known way to convert value to a number.
//In order to avoid confusion, it’s not supported on bigints:
 //let bigint = 1n;
//alert( +bigint ); // error

//So we should use Number() to convert a bigint to a number.

//Comparisons
//Comparisons, such as <, > work with bigints and numbers just fine:
// alert( 2n > 1n ); // true
//alert( 2n > 1 ); // true
//Please note though, as numbers and bigints belong to different types, they can be equal ==, but not strictly equal ===:
// alert( 1 == 1n ); // true
//alert( 1 === 1n ); // false

//Boolean operations
//When inside if or other boolean operations, bigints behave like numbers.
//For instance, in if, bigint 0n is falsy, other values are truthy:
// if (0n) {
  // never executes
//}
//Boolean operators, such as ||, && and others also work with bigints similar to numbers:
// alert( 1n || 2 ); // 1 (1n is considered truthy)
//alert( 0n || 2 ); // 2 (0n is considered falsy)

//SITRINGS
//Double and single quotes are “simple” quotes. There’s practically 
// no difference between them in JavaScript.
//Backticks are “extended functionality” quotes. They allow us to embed variables 
//and expressions into a string by wrapping them in ${…}, for example:

//let name = "John";

// embed a variable
//alert( `Hello, ${name}!` ); // Hello, John!

// embed an expression
//alert( `the result is ${1 + 2}` ); // the result is 3
//alert( "the result is ${1 + 2}" ); // the result is ${1 + 2} (double quotes do nothing)


//let guestList = `Guests:
// * John
// * Pete
// * Mary
//`;

//alert(guestList);

//italik tek tirnak ile bu yapilirken tek ve cift bildigimiz tirnaklarda ise yaramaz
//let guestList = "Guests: // Error: Unexpected token ILLEGAL
//  * John";

//`\`` === "`"; // true
//`\${1}` === "${1}"; // true

//console.log("string text line 1\nstring text line 2");
// "string text line 1
// string text line 2"

//console.log(`string text line 1
//string text line 2`);
// "string text line 1
// string text line 2"

//console.log(`string text line 1 \
//string text line 2`);
// "string text line 1 string text line 2"

//const a = 5;
//const b = 10;
//console.log("Fifteen is " + (a + b) + " and\nnot " + (2 * a + b) + ".");
// "Fifteen is 15 and
// not 20."

//const a = 5;
//const b = 10;
//console.log(`Fifteen is ${a + b} and
//not ${2 * a + b}.`);
// "Fifteen is 15 and
// not 20."

//With nesting of template literals, you can do this:
//const classes = `header ${
//  isLargeScreen() ? "" : `icon-${item.isCollapsed ? "expander" : "collapser"}`
//}`;

//let guestList = "Guests:\n * John\n * Pete\n * Mary";
//alert(guestList);

//alert( 'I\'m the Walrus!' ); // I'm the Walrus! , tek tirnak icin ters slash kullanilir
//alert( "I'm the Walrus!" ); // I'm the Walrus! , cift tirnak icin gerek yok

//alert( `My\n`.length ); // 3 , \ tek karakter olarak sayilir

//length is a property
//People with a background in some other languages sometimes mistype by calling str.length() 
// instead of just str.length. That doesn’t work.
//Please note that str.length is a numeric property, not a function. There is no need to add
//  parenthesis after it. Not .length(), but .length.

//let str = `Hello`;
// the first character
//alert( str[0] ); // H
//alert( str.at(0) ); // H
// the last character
//alert( str[str.length - 1] ); // o
//alert( str.at(-1) ); // o
//alert( str[-1] ); // undefined


//for (let char of "Hello") {
//  alert(char); // H,e,l,l,o (char becomes "H", then "e", then "l" etc)
//}

//Strings can’t be changed in JavaScript. It is impossible to change a character.
//Let’s try it to show that it doesn’t work:
// let str = 'Hi';
//str[0] = 'h'; // error
//alert( str[0] ); // doesn't work

//let str = 'Hi';
//str = 'h' + str[1]; // replace the string
//alert( str ); // hi

//alert( 'Interface'.toUpperCase() ); // INTERFACE
//alert( 'Interface'.toLowerCase() ); // interface
//alert( 'Interface'[0].toLowerCase() ); // 'i'

//let str = 'Widget with id';
//alert( str.indexOf('Widget') ); // 0, because 'Widget' is found at the beginning
//alert( str.indexOf('widget') ); // -1, not found, the search is case-sensitive
//alert( str.indexOf("id") ); // 1, "id" is found at the position 1 (..idget with id)


//For instance, the first occurrence of "id" is at position 1. To look for the next occurrence, 
// let’s start the search from position 2:
// let str = 'Widget with id';
//alert( str.indexOf('id', 2) ) // 12 , 2.id degerini aratiyor

//If we’re interested in all occurrences, we can run indexOf in a loop. 
// Every new call is made with the position after the previous match:

//let str = 'As sly as a fox, as strong as an ox';

//let target = 'as'; // let's look for it

//let pos = 0;
//while (true) {
//  let foundPos = str.indexOf(target, pos);
//  if (foundPos == -1) break;

//  alert( `Found at ${foundPos}` );
//  pos = foundPos + 1; // continue the search from the next position
//}

//The same algorithm can be layed out shorter:

//let str = "As sly as a fox, as strong as an ox";
//let target = "as";

//let pos = -1;
//while ((pos = str.indexOf(target, pos + 1)) != -1) {
//  alert( pos );
//}
// 7
//17
//27

//str.lastIndexOf(substr, position)
//There is also a similar method str.lastIndexOf(substr, position)
//  that searches from the end of a string to its beginning.
//sondan basa islem yapar
//It would list the occurrences in the reverse order.

//The alert in the example above doesn’t show because str.indexOf("Widget") 
// returns 0 (meaning that it found the match at the starting position). Right, 
// but if considers 0 to be false.
//So, we should actually check for -1, like this:

//let str = "Widget with id";

//if (str.indexOf("Widget") != -1) {
//    alert("We found it"); // works now!
//}

//The more modern method str.includes(substr, pos) returns true/false depending 
// on whether str contains substr within.
//It’s the right choice if we need to test for the match, but don’t need its position:

//alert( "Widget with id".includes("Widget") ); // true
//alert( "Hello".includes("Bye") ); // false

//The optional second argument of str.includes is the position to start searching from:

// alert( "Widget".includes("id") ); // true
//alert( "Widget".includes("id", 3) ); // false, from position 3 there is no "id"

//alert( "Widget".startsWith("Wid") ); // true, "Widget" starts with "Wid"
//alert( "Widget".endsWith("get") ); // true, "Widget" ends with "get"

//str.slice(start [, end])
//Returns the part of the string from start to (but not including) end.
//let str = "stringify";
//alert( str.slice(0, 5) ); // 'strin', the substring from 0 to 5 (not including 5)
//alert( str.slice(0, 1) ); // 's', from 0 to 1, but not including 1, so only character at 0
//alert( str.substring(0, 5) ); //ayni
//alert( str.substring(0, 1) ); //ayni
//alert( str.substr(0, 5) ); //ayni
//alert( str.substr(0, 1) ); //ayni

//alert( str.slice(2) ); // 'ringify', from the 2nd position till the end
// start at the 4th position from the right, end at the 1st from the right
//alert( str.slice(-4, -1) ); // 'gif'

//substringteki fark baslangic bitisten buyuk olacak yoksa yer degistirir 2,6 6,2 ayni sonucu gosteriyor
//This is almost the same as slice, but it allows start to be greater than end 
// (in this case it simply swaps start and end values).
// these are same for substring
//alert( str.substring(2, 6) ); // "ring"
//alert( str.substring(6, 2) ); // "ring"

// ...but not for slice:
//alert( str.slice(2, 6) ); // "ring" (the same)
//alert( str.slice(6, 2) ); // "" (an empty string)
//Negative arguments are (unlike slice) not supported, they are treated as 0.

//alert( str.substring(-4, -1) ); // negatifler substringte 0 kabul edilir

//str.substr(start [, length])
//Returns the part of the string from start, with the given length.
//alert( str.substr(2, 4) ); // 'ring', from the 2nd position get 4 characters
//alert( str.substr(-4, 2) ); // 'gi', from the 4th position get 2 characters

//method	                             selects…                      	                negatives
//slice(start, end)	      from start to end (not including end)	                  allows negatives
//substring(start, end)	  between start and end (not including end)           	negative values mean 0
//substr(start, length)	    from start get length characters	                   negative start


//A lowercase letter is always greater than the uppercase:
//alert( 'a' > 'Z' ); // true
//Letters with diacritical marks are “out of order”:
//alert( 'Österreich' > 'Zealand' ); // true

//we should be aware that strings in Javascript are encoded using UTF-16. 
// That is: each character has a corresponding numeric code.

// different case letters have different codes
//alert( "Z".codePointAt(0) ); // 90
//alert( "z".codePointAt(0) ); // 122
//alert( "z".codePointAt(0).toString(16) ); // 7a (if we need a hexadecimal value)

//alert( String.fromCodePoint(90) ); // Z
//alert( String.fromCodePoint(0x5a) ); // Z (we can also use a hex value as an argument)

//Now let’s see the characters with codes 65..220 (the latin alphabet and 
// a little bit extra) by making a string of them:

//let str = '';

//for (let i = 65; i <= 220; i++) {
//  str += String.fromCodePoint(i);
//}
//alert( str );
// Output:
// ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~
// ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜ

//const a = "réservé"; // With accents, lowercase
//const b = "RESERVE"; // No accents, uppercase

//console.log(a.localeCompare(b));
// Expected output: 1
//console.log(a.localeCompare(b, "en", { sensitivity: "base" }));
// Expected output: 0

//alert( 'Österreich'.localeCompare('Zealand') ); // -1

//str.trim() //– removes (“trims”) spaces from the beginning and end of the string.
//str.repeat(n) // – repeats the string n times.

//Write a function ucFirst(str) that returns the string str with the uppercased first character,
//  for instance:
//ucFirst("john") == "John";
//kelimenin basi buyuk digerleri kucuk
//function ucFirst(str){
//  if(!str) return str;
//  return str[0].toUpperCase() + str.slice(1);
//}

//alert(ucFirst("john")); // John

//budamak truncate
//truncate("What I'd like to tell on this topic is:", 20) == "What I'd like to te…"


//function extractCurrencyValue(str) {
//  return +str.slice(1);
//}
//alert(extractCurrencyValue("$120")); // 120
//return +str // converts the string to a number
//return Number(str.slice(1)); // also works, but + is shorter


//let age = null;
//It’s just a special value which represents “nothing”, “empty” or “value unknown”.



//The meaning of undefined is “value is not assigned”.

//If a variable is declared, but not assigned, then its value is undefined:

// let age;
//atanmamis tanimsiz oluyor
//alert(age); // shows "undefined"

//typeof Math // "object"  (1)
//typeof undefined // "undefined"

//typeof null // "object"  (2)

//typeof alert // "function"  (3)