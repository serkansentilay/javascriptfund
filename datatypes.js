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

//STRINGS
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

//
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

//Objects are “heavier” than primitives. They require additional resources to support the
// internal machinery.


/*
Primitives are still primitive. A single value, as desired.
The language allows access to methods and properties of strings, numbers, booleans and symbols.
In order for that to work, a special “object wrapper” that provides the extra functionality is 
created, and then is destroyed.
The “object wrappers” are different for each primitive type and are called: String, Number, 
Boolean, Symbol and BigInt. Thus, they provide different sets of methods.
For instance, there exists a string method str.toUpperCase() that returns a capitalized str.

İlkel öğeler hala ilkeldir. İstenildiği gibi tek bir değer.
Dil, dizelerin, sayıların, Boole değerlerinin ve sembollerin yöntemlerine ve özelliklerine erişime
 izin verir.
Bunun işe yaraması için, ekstra işlevsellik sağlayan özel bir "nesne sarmalayıcısı" oluşturulur ve
 sonra yok edilir.
"Nesne sarmalayıcıları" her ilkel tür için farklıdır ve şu şekilde adlandırılır: Dize, Sayı, Boole 
değeri, Sembol ve BigInt. Bu nedenle, farklı yöntem kümeleri sağlarlar.
Örneğin, büyük harfli bir str döndüren bir dize yöntemi str.toUpperCase() vardır.
*/

/*
let str = "Hello";

alert( str.toUpperCase() ); // HELLO
Simple, right? Here’s what actually happens in str.toUpperCase():

The string str is a primitive. So in the moment of accessing its property, a special object is 
created that knows the value of the string, and has useful methods, like toUpperCase().
That method runs and returns a new string (shown by alert).
The special object is destroyed, leaving the primitive str alone.
So primitives can provide methods, but they still remain lightweight.

The JavaScript engine highly optimizes this process. It may even skip the creation of the extra 
object at all. But it must still adhere to the specification and behave as if it creates one.

Str dizesi ilkeldir. Bu nedenle, özelliğine erişildiği anda, dizenin değerini bilen ve 
toUpperCase() gibi yararlı yöntemlere sahip özel bir nesne oluşturulur.
Bu yöntem çalışır ve yeni bir dize döndürür (uyarı ile gösterilir).
Özel nesne yok edilir ve ilkel str yalnız bırakılır.
Bu nedenle ilkel öğeler yöntemler sağlayabilir, ancak yine de hafif kalırlar.

JavaScript motoru bu süreci büyük ölçüde optimize eder. Hatta ekstra nesnenin oluşturulmasını
 bile atlayabilir. Ancak yine de belirtime uymalı ve bir tane oluşturuyormuş gibi davranmalıdır.
*/


//A number has methods of its own, for instance, toFixed(n) rounds the number to the given precision:
//let n = 1.23456;
//alert( n.toFixed(2) ); // 1.23

/*
Constructors String/Number/Boolean are for internal use only
Some languages like Java allow us to explicitly create “wrapper objects” for primitives using a syntax like new Number(1) or new Boolean(false).

In JavaScript, that’s also possible for historical reasons, but highly unrecommended. Things will go crazy in several places.

For instance:

 alert( typeof 0 ); // "number"

alert( typeof new Number(0) ); // "object"!
Objects are always truthy in if, so here the alert will show up:

 let zero = new Number(0);

if (zero) { // zero is true, because it's an object
  alert( "zero is truthy!?!" );
}
On the other hand, using the same functions String/Number/Boolean without new is totally fine 
and useful thing. They convert a value to the corresponding type: to a string, a number, or
 a boolean (primitive).

For example, this is entirely valid:

let num = Number("123"); // convert a string to number
*/

/*
null/undefined have no methods
The special primitives null and undefined are exceptions. They have no corresponding 
“wrapper objects” and provide no methods. In a sense, they are “the most primitive”.

An attempt to access a property of such value would give the error:

 alert(null.test); // error
*/

//Primitives except null and undefined provide many helpful methods.
//Formally, these methods work via temporary objects, but JavaScript engines are well tuned to
//  optimize that internally, so they are not expensive to call.
//Biçimsel olarak bu yöntemler geçici nesneler aracılığıyla çalışır, ancak JavaScript motorları 
// bunu dahili olarak optimize edecek şekilde iyi ayarlanmıştır, bu nedenle çağrılması pahalı 
// değildir.

/*
let str = "Hello";

str.test = 5; // (*)

alert(str.test);
Depending on whether you have use strict or not, the result may be:

undefined (no strict mode)
An error (strict mode).
Why? Let’s replay what’s happening at line (*):

When a property of str is accessed, a “wrapper object” is created.
In strict mode, writing into it is an error.
Otherwise, the operation with the property is carried on, the object gets the test property,
 but after that the “wrapper object” disappears, so in the last line str has no trace of the 
 property.
This example clearly shows that primitives are not objects.
They can’t store additional data.
Str'nin bir özelliğine erişildiğinde, bir "sarmalayıcı nesne" oluşturulur.
Strict modda, içine yazmak bir hatadır.
Aksi takdirde, özellik ile işlem devam eder, nesne test özelliğini alır, ancak bundan sonra
 "sarmalayıcı nesne" kaybolur, bu nedenle son satırda str'nin özelliğin hiçbir izi yoktur.
Bu örnek, ilkel öğelerin nesne olmadığını açıkça gösterir.
*/

//numbers
/*
Imagine we need to write 1 billion. The obvious way is:

let billion = 1000000000;
We also can use underscore _ as the separator:

let billion = 1_000_000_000;
Here the underscore _ plays the role of the “syntactic sugar”, it makes the number more readable.
 The JavaScript engine simply ignores _ between digits, so it’s exactly the same one billion 
 as above.
*/

//we can shorten a number by appending the letter "e" to it and specifying the zeroes count:

//let billion = 1e9;  // 1 billion, literally: 1 and 9 zeroes
//alert( 7.3e9 );  // 7.3 billions (same as 7300000000 or 7_300_000_000)


//e multiplies the number by 1 with the given zeroes count.

//1e3 === 1 * 1000; // e3 means *1000
//1.23e6 === 1.23 * 1000000; // e6 means *1000000


/*
1 microsecond (one-millionth of a second):

let mсs = 0.000001;
Just like before, using "e" can help. If we’d like to avoid writing the zeroes explicitly, we 
could write the same as:

let mcs = 1e-6; // five zeroes to the left from 1
If we count the zeroes in 0.000001, there are 6 of them. So naturally it’s 1e-6.

In other words, a negative number after "e" means a division by 1 with the given number of zeroes:

// -3 divides by 1 with 3 zeroes
1e-3 === 1 / 1000; // 0.001

// -6 divides by 1 with 6 zeroes
1.23e-6 === 1.23 / 1000000; // 0.00000123

// an example with a bigger number
1234e-2 === 1234 / 100; // 12.34, decimal point moves 2 times
*/

//Hex, binary and octal numbers
//alert( 0xff ); // 255
//alert( 0xFF ); // 255 (the same, case doesn't matter)

//let a = 0b11111111; // binary form of 255
//let b = 0o377; // octal form of 255
//alert( a == b ); // true, the same number 255 at both sides

/*
The method num.toString(base) returns a string representation of num in the numeral system
 with the given base.

For example:

 let num = 255;

alert( num.toString(16) );  // ff
alert( num.toString(2) );   // 11111111
The base can vary from 2 to 36. By default, it’s 10.

Common use cases for this are:

base=16 is used for hex colors, character encodings etc, digits can be 0..9 or A..F.

base=2 is mostly for debugging bitwise operations, digits can be 0 or 1.

base=36 is the maximum, digits can be 0..9 or A..Z. The whole Latin alphabet is used to 
represent a number. A funny, but useful case for 36 is when we need to turn a long numeric
 identifier into something shorter, for example, to make a short url. Can simply represent
  it in the numeral system with base 36:

 alert( 123456..toString(36) ); // 2n9c

*/

/*
Two dots to call a method
Please note that two dots in 123456..toString(36) is not a typo. If we want to call a method
 directly on a number, like toString in the example above, then we need to place two dots .. after
  it.

If we placed a single dot: 123456.toString(36), then there would be an error, because JavaScript 
syntax implies the decimal part after the first dot. And if we place one more dot, then JavaScript
 knows that the decimal part is empty and now uses the method.

Also could write (123456).toString(36).
*/


/*
	                  Math.floor        	Math.ceil	        Math.round        Math.trunc
3.1	                    3	                  4	                3	                3
3.5	                    3	                  4	                4	                3
3.6	                    3	                  4	                4	                3
-1.1	                  -2	                -1	              -1	             -1
-1.5	                  -2	                -1	              -1	             -1
-1.6	                  -2	                -1	              -2	              -1

*/

/*
Multiply-and-divide.

For example, to round the number to the 2nd digit after the decimal, we can multiply the number 
by 100, call the rounding function and then divide it back.

 let num = 1.23456;

alert( Math.round(num * 100) / 100 ); // 1.23456 -> 123.456 -> 123 -> 1.23
The method toFixed(n) rounds the number to n digits after the point and returns a string
 representation of the result.

 let num = 12.34;
alert( num.toFixed(1) ); // "12.3"
This rounds up or down to the nearest value, similar to Math.round:

 let num = 12.36;
alert( num.toFixed(1) ); // "12.4"
Please note that the result of toFixed is a string. If the decimal part is shorter than required, 
zeroes are appended to the end:

 let num = 12.34;
alert( num.toFixed(5) ); // "12.34000", added zeroes to make exactly 5 digits
We can convert it to a number using the unary plus or a Number() call, e.g. write +num.toFixed(5).


*/


//Imprecise calculations
//If a number is really huge, it may overflow the 64-bit storage and become a special 
// numeric value Infinity:
//alert( 1e500 ); // Infinity


//alert( 0.1 + 0.2 == 0.3 ); // false
//alert( 0.1 + 0.2 ); // 0.30000000000000004
//A number is stored in memory in its binary form, a sequence of bits – ones and zeroes. But 
// fractions like 0.1, 0.2 that look simple in the decimal numeric system are actually unending 
// fractions in their binary form.

/*
What is 0.1? It is one divided by ten 1/10, one-tenth. In the decimal numeral system, such 
numbers are easily representable. Compare it to one-third: 1/3. It becomes an endless fraction
 0.33333(3).

So, division by powers 10 is guaranteed to work well in the decimal system, but division by 
3 is not. For the same reason, in the binary numeral system, the division by powers of 2 is
 guaranteed to work, but 1/10 becomes an endless binary fraction.

There’s just no way to store exactly 0.1 or exactly 0.2 using the binary system, just like there 
is no way to store one-third as a decimal fraction.

The numeric format IEEE-754 solves this by rounding to the nearest possible number. These 
rounding rules normally don’t allow us to see that “tiny precision loss”, but it exists.

0,1 nedir? Bir bölü on 1/10, onda bir. Ondalık sayı sisteminde, bu tür sayılar kolayca temsil
 edilebilir. Bunu üçte bir ile karşılaştırın: 1/3. Sonsuz bir kesir olur 0.33333(3).

Yani, 10'un kuvvetlerine bölmenin ondalık sistemde iyi çalışması garantilidir, ancak 3'e bölmenin
 öyle değildir. Aynı sebepten, ikili sayı sisteminde, 2'nin kuvvetlerine bölmenin çalışması 
 garantilidir, ancak 1/10 sonsuz bir ikili kesir olur.

İkili sistemi kullanarak tam olarak 0,1 veya tam olarak 0,2'yi depolamanın bir yolu yoktur,
 tıpkı üçte birini ondalık kesir olarak depolamanın bir yolu olmadığı gibi.

Sayısal biçim IEEE-754 bunu mümkün olan en yakın sayıya yuvarlayarak çözer. Bu yuvarlama kuralları
 normalde bu "küçük hassasiyet kaybını" görmemize izin vermez, ancak vardır.
*/

//alert( 0.1.toFixed(20) ); // 0.10000000000000000555
//And when we sum two numbers, their “precision losses” add up.
// //That’s why 0.1 + 0.2 is not exactly 0.3.

/*
let sum = 0.1 + 0.2;
alert( sum.toFixed(2) ); // "0.30"
Please note that toFixed always returns a string. It ensures that it has 2 digits after the 
decimal point. That’s actually convenient if we have an e-shopping and need to show $0.30.
 For other cases, we can use the unary plus to coerce it into a number:

 let sum = 0.1 + 0.2;
alert( +sum.toFixed(2) ); // 0.3
*/

//We also can temporarily multiply the numbers by 100 (or a bigger number) to turn them into 
// integers, do the maths, and then divide back. Then, as we’re doing maths with integers, 
// the error somewhat decreases, but we still get it on division:
//alert( (0.1 * 10 + 0.2 * 10) / 10 ); // 0.3
//alert( (0.28 * 100 + 0.14 * 100) / 100); // 0.4200000000000001


/*
// Hello! I'm a self-increasing number!
alert( 9999999999999999 ); // shows 10000000000000000
This suffers from the same issue: a loss of precision. There are 64 bits for the number, 52 of 
them can be used to store digits, but that’s not enough. So the least significant digits disappear.

JavaScript doesn’t trigger an error in such events. It does its best to fit the number into the 
desired format, but unfortunately, this format is not big enough.
*/

/*
Two zeroes
Another funny consequence of the internal representation of numbers is the existence of two 
zeroes: 0 and -0.

That’s because a sign is represented by a single bit, so it can be set or not set for any number 
including a zero.

In most cases, the distinction is unnoticeable, because operators are suited to treat them as the
 same.
*/

/*
isNaN(value) converts its argument to a number and then tests it for being NaN:

 alert( isNaN(NaN) ); // true
alert( isNaN("str") ); // true
But do we need this function? Can’t we just use the comparison === NaN? Unfortunately not.
 The value NaN is unique in that it does not equal anything, including itself:

 alert( NaN === NaN ); // false
*/

/*
isFinite(value) converts its argument to a number and returns true if it’s a regular number, 
not NaN/Infinity/-Infinity:

 alert( isFinite("15") ); // true
alert( isFinite("str") ); // false, because a special value: NaN
alert( isFinite(Infinity) ); // false, because a special value: Infinity
Sometimes isFinite is used to validate whether a string value is a regular number:

 let num = +prompt("Enter a number", '');

// will be true unless you enter Infinity, -Infinity or not a number
alert( isFinite(num) );
Please note that an empty or a space-only string is treated as 0 in all numeric functions 
including isFinite.
*/

/*
Number.isNaN(value) returns true if the argument belongs to the number type and it is NaN. 
In any other case, it returns false.

 alert( Number.isNaN(NaN) ); // true
alert( Number.isNaN("str" / 2) ); // true

// Note the difference:
alert( Number.isNaN("str") ); // false, because "str" belongs to the string type, not the number
//  type
alert( isNaN("str") ); // true, because isNaN converts string "str" into a number and gets NaN 
// as a result of this conversion


*/

/*
Number.isFinite(value) returns true if the argument belongs to the number type and it is 
not NaN/Infinity/-Infinity. In any other case, it returns false.

 alert( Number.isFinite(123) ); // true
alert( Number.isFinite(Infinity) ); // false
alert( Number.isFinite(2 / 0) ); // false

// Note the difference:
alert( Number.isFinite("123") ); // false, because "123" belongs to the string type, not the
//  number type
alert( isFinite("123") ); // true, because isFinite converts string "123" into a number 123
In a way, Number.isNaN and Number.isFinite are simpler and more straightforward than isNaN and 
isFinite functions. In practice though, isNaN and isFinite are mostly used, as they’re shorter 
to write.
*/


/*
Comparison with Object.is
There is a special built-in method Object.is that compares values like ===, but is more reliable 
for two edge cases:

It works with NaN: Object.is(NaN, NaN) === true, that’s a good thing.
Values 0 and -0 are different: Object.is(0, -0) === false, technically that’s correct because 
internally the number has a sign bit that may be different even if all other bits are zeroes.
In all other cases, Object.is(a, b) is the same as a === b.

We mention Object.is here, because it’s often used in JavaScript specification. When an internal
 algorithm needs to compare two values for being exactly the same, it uses Object.is 
 (internally called SameValue).
*/


/*
Numeric conversion using a plus + or Number() is strict. If a value is not exactly a number,
 it fails:

 alert( +"100px" ); // NaN
The sole exception is spaces at the beginning or at the end of the string, as they are ignored.

But in real life, we often have values in units, like "100px" or "12pt" in CSS. Also in many 
countries, the currency symbol goes after the amount, so we have "19€" and would like to extract
 a numeric value out of that.

That’s what parseInt and parseFloat are for.

They “read” a number from a string until they can’t. In case of an error, the gathered number 
is returned. The function parseInt returns an integer, whilst parseFloat will return 
a floating-point number:

 alert( parseInt('100px') ); // 100
alert( parseFloat('12.5em') ); // 12.5

alert( parseInt('12.3') ); // 12, only the integer part is returned
alert( parseFloat('12.3.4') ); // 12.3, the second point stops the reading
There are situations when parseInt/parseFloat will return NaN. It happens when no digits could be
 read:

 alert( parseInt('a123') ); // NaN, the first symbol stops the process

*/

/*
The second argument of parseInt(str, radix)
The parseInt() function has an optional second parameter. It specifies the base of the numeral
 system, so parseInt can also parse strings of hex numbers, binary numbers and so on:

 alert( parseInt('0xff', 16) ); // 255
alert( parseInt('ff', 16) ); // 255, without 0x also works

alert( parseInt('2n9c', 36) ); // 123456
*/


/*
JavaScript has a built-in Math object which contains a small library of mathematical functions 
and constants.

A few examples:

Math.random()
Returns a random number from 0 to 1 (not including 1).

 alert( Math.random() ); // 0.1234567894322
alert( Math.random() ); // 0.5435252343232
alert( Math.random() ); // ... (any random numbers)
Math.max(a, b, c...) and Math.min(a, b, c...)
Returns the greatest and smallest from the arbitrary number of arguments.

 alert( Math.max(3, 5, -10, 0, 1) ); // 5
alert( Math.min(1, 2) ); // 1
Math.pow(n, power)
Returns n raised to the given power.

 alert( Math.pow(2, 10) ); // 2 in power 10 = 1024

*/

//According to the documentation Math.round and toFixed both round to the nearest number:
//  0..4 lead down while 5..9 lead up.


//alert( 6.35.toFixed(1) ); // 6.3
//alert( 6.35.toFixed(20) ); // 6.34999999999999964473
//alert( (6.35 * 10).toFixed(20) ); // 63.50000000000000000000
//alert( Math.round(6.35 * 10) / 10 ); // 6.35 -> 63.5 -> 64(rounded) -> 6.4

//This loop is infinite. It never ends. Why?
//let i = 0;
//while (i != 10) {
//  i += 0.2;
//}

/*
let i = 0;
while (i < 11) {
  i += 0.2;
  if (i > 9.8 && i < 10.2) alert( i );
}
None of them is exactly 10.

Such things happen because of the precision losses when adding fractions like 0.2.

Conclusion: evade equality checks when working with decimal fractions.
*/

/*
We need to “map” all values from the interval 0…1 into values from min to max.

That can be done in two stages:

If we multiply a random number from 0…1 by max-min, then the interval of possible values 
increases 0..1 to 0..max-min.
Now if we add min, the possible interval becomes from min to max.
The function:

 function random(min, max) {
  return min + Math.random() * (max - min);
}

alert( random(1, 5) );
alert( random(1, 5) );
alert( random(1, 5) );
*/

/*
function randomInteger(min, max) {
  // now rand is from  (min-0.5) to (max+0.5)
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

alert( randomInteger(1, 3) );
An alternative way could be to use Math.floor for a random number from min to max+1:

 function randomInteger(min, max) {
  // here rand is from min to (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

alert( randomInteger(1, 3) );
Now all intervals are mapped this way:

values from 1  ... to 1.9999999999  become 1
values from 2  ... to 2.9999999999  become 2
values from 3  ... to 3.9999999999  become 3
All intervals have the same length, making the final distribution uniform.
*/

//ARRAYS

//It is not convenient to use an object here, because it provides no methods to manage the order
//  of elements. We can’t insert a new property “between” the existing ones. Objects are just 
// not meant for such use.
//There exists a special data structure named Array, to store ordered collections.

/*
let arr = new Array();
let arr = [];
Almost all the time, the second syntax is used. We can supply initial elements in the brackets:

let fruits = ["Apple", "Orange", "Plum"];
Array elements are numbered, starting with zero.

We can get an element by its number in square brackets:

 let fruits = ["Apple", "Orange", "Plum"];

alert( fruits[0] ); // Apple
alert( fruits[1] ); // Orange
alert( fruits[2] ); // Plum
*/

/*
We can replace an element:

fruits[2] = 'Pear'; // now ["Apple", "Orange", "Pear"]
…Or add a new one to the array:

fruits[3] = 'Lemon'; // now ["Apple", "Orange", "Pear", "Lemon"]
The total count of the elements in the array is its length:

 let fruits = ["Apple", "Orange", "Plum"];

alert( fruits.length ); // 3
We can also use alert to show the whole array.

 let fruits = ["Apple", "Orange", "Plum"];

alert( fruits ); // Apple,Orange,Plum
An array can store elements of any type.

For instance:

 // mix of values
let arr = [ 'Apple', { name: 'John' }, true, function() { alert('hello'); } ];

// get the object at index 1 and then show its name
alert( arr[1].name ); // John

// get the function at index 3 and run it
arr[3](); // hello
*/

/*
Let’s say we want the last element of the array.

Some programming languages allow the use of negative indexes for the same purpose, 
like fruits[-1].

Although, in JavaScript it won’t work. The result will be undefined, because the index in 
square brackets is treated literally.

We can explicitly calculate the last element index and then access it: fruits[fruits.length - 1].

 let fruits = ["Apple", "Orange", "Plum"];

alert( fruits[fruits.length-1] ); // Plum
A bit cumbersome, isn’t it? We need to write the variable name twice.

Luckily, there’s a shorter syntax: fruits.at(-1):

 let fruits = ["Apple", "Orange", "Plum"];

// same as fruits[fruits.length-1]
alert( fruits.at(-1) ); // Plum
*/

//In other words, arr.at(i):
//is exactly the same as arr[i], if i >= 0.
//for negative values of i, it steps back from the end of the array.

/*
A queue is one of the most common uses of an array. In computer science, this means an ordered 
collection of elements which supports two operations:
push appends an element to the end.
shift get an element from the beginning, advancing the queue, so that the 2nd element becomes 
the 1st.
Sıra, bir dizinin en yaygın kullanımlarından biridir. Bilgisayar biliminde bu, iki işlemi 
destekleyen sıralı bir öğe koleksiyonu anlamına gelir:
push, bir öğeyi sona ekler.
shift, başlangıçtan bir öğe alır, kuyruğu ilerletir, böylece 2. öğe 1. olur.

Arrays support both operations.
In practice we need it very often. For example, a queue of messages that need to be shown
 on-screen.
There’s another use case for arrays – the data structure named stack.
It supports two operations:
push adds an element to the end.
pop takes an element from the end.
So new elements are added or taken always from the “end”.
A stack is usually illustrated as a pack of cards: new cards are added to the top or taken 
from the top:
Diziler her iki işlemi de destekler.
Uygulamada buna çok sık ihtiyacımız olur. Örneğin, ekranda gösterilmesi gereken bir mesaj kuyruğu.
Diziler için başka bir kullanım durumu daha vardır - yığın adlı veri yapısı.
İki işlemi destekler:
push, sona bir öğe ekler.
pop, sondan bir öğe alır.
Bu nedenle yeni öğeler her zaman "sondan" eklenir veya alınır.
Bir yığın genellikle bir kart destesi olarak gösterilir: yeni kartlar en üste eklenir veya 
en üstten alınır:


For stacks, the latest pushed item is received first, that’s also called LIFO (Last-In-First-Out) 
principle. For queues, we have FIFO (First-In-First-Out).
Arrays in JavaScript can work both as a queue and as a stack. They allow you to add/remove 
elements, both to/from the beginning or the end.
In computer science, the data structure that allows this, is called deque.
Methods that work with the end of the array:
Yığınlar için, en son itilen öğe ilk alınır, buna LIFO (Son Giren İlk Çıkar) ilkesi de denir.
 Kuyruklar için FIFO (İlk Giren İlk Çıkar) ilkesi vardır.
JavaScript'teki diziler hem kuyruk hem de yığın olarak çalışabilir. Başlangıca veya sona öğeler 
eklemenize/kaldırmanıza olanak tanırlar.
Bilgisayar biliminde, buna izin veren veri yapısına deque denir.
Dizinin sonuyla çalışan yöntemler:



*/



/*
Methods that work with the end of the array:

pop
Extracts the last element of the array and returns it:

 let fruits = ["Apple", "Orange", "Pear"];

alert( fruits.pop() ); // remove "Pear" and alert it

alert( fruits ); // Apple, Orange
Both fruits.pop() and fruits.at(-1) return the last element of the array, but fruits.pop() 
also modifies the array by removing it.
*/

/*
push
Append the element to the end of the array:

 let fruits = ["Apple", "Orange"];

fruits.push("Pear");

alert( fruits ); // Apple, Orange, Pear
The call fruits.push(...) is equal to fruits[fruits.length] = ....
*/


/*
Methods that work with the beginning of the array:

shift
Extracts the first element of the array and returns it:

 let fruits = ["Apple", "Orange", "Pear"];

alert( fruits.shift() ); // remove Apple and alert it

alert( fruits ); // Orange, Pear
*/

/*
unshift
Add the element to the beginning of the array:

 let fruits = ["Orange", "Pear"];

fruits.unshift('Apple');

alert( fruits ); // Apple, Orange, Pear
*/

/*
Methods push and unshift can add multiple elements at once:

 let fruits = ["Apple"];

fruits.push("Orange", "Peach");
fruits.unshift("Pineapple", "Lemon");

// ["Pineapple", "Lemon", "Apple", "Orange", "Peach"]
alert( fruits );
*/

/*
let fruits = ["Banana"]

let arr = fruits; // copy by reference (two variables reference the same array)

alert( arr === fruits ); // true

arr.push("Pear"); // modify the array by reference

alert( fruits ); // Banana, Pear - 2 items now
*/

/*
But they all break if we quit working with an array as with an “ordered collection” and 
 start working with it as if it were a regular object.
let fruits = []; // make an array

fruits[99999] = 5; // assign a property with the index far greater than its length

fruits.age = 25; // create a property with an arbitrary name
That’s possible, because arrays are objects at their base. We can add any properties to them.

But the engine will see that we’re working with the array as with a regular object. 
Array-specific optimizations are not suited for such cases and will be turned off, their 
benefits disappear.

The ways to misuse an array:

Add a non-numeric property like arr.test = 5.
Make holes, like: add arr[0] and then arr[1000] (and nothing between them).
Fill the array in the reverse order, like arr[1000], arr[999] and so on.
Please think of arrays as special structures to work with the ordered data. They provide 
special methods for that. Arrays are carefully tuned inside JavaScript engines to work with 
contiguous ordered data, please use them this way. And if you need arbitrary keys, chances 
are high that you actually require a regular object {}.


*/


//Methods push/pop run fast, while shift/unshift are slow.

/*
Why is it faster to work with the end of an array than with its beginning? Let’s see what 
happens during the execution:

fruits.shift(); // take 1 element from the start
It’s not enough to take and remove the element with the index 0. Other elements need to be 
renumbered as well.

The shift operation must do 3 things:

Remove the element with the index 0.
Move all elements to the left, renumber them from the index 1 to 0, from 2 to 1 and so on.
Update the length property.
*/

/*
The more elements in the array, the more time to move them, more in-memory operations.

The similar thing happens with unshift: to add an element to the beginning of the array, we need 
first to move existing elements to the right, increasing their indexes.

And what’s with push/pop? They do not need to move anything. To extract an element from the end,
 the pop method cleans the index and shortens length.
*/

// fruits.pop(); // take 1 element from the end
//The pop method does not need to move anything, because other elements keep their indexes.
//  That’s why it’s blazingly fast.
//The similar thing with the push method.

/*
for..of:

 let fruits = ["Apple", "Orange", "Plum"];

// iterates over array elements
for (let fruit of fruits) {
  alert( fruit );
}
The for..of doesn’t give access to the number of the current element, just its value, but in
 most cases that’s enough. And it’s shorter.

Technically, because arrays are objects, it is also possible to use for..in:

 let arr = ["Apple", "Orange", "Pear"];

for (let key in arr) {
  alert( arr[key] ); // Apple, Orange, Pear
}
*/

/*
But that’s actually a bad idea. There are potential problems with it:

The loop for..in iterates over all properties, not only the numeric ones.

There are so-called “array-like” objects in the browser and in other environments, that look 
like arrays. That is, they have length and indexes properties, but they may also have other 
non-numeric properties and methods, which we usually don’t need. The for..in loop will list 
them though. So if we need to work with array-like objects, then these “extra” properties can 
become a problem.

The for..in loop is optimized for generic objects, not arrays, and thus is 10-100 times slower. 
Of course, it’s still very fast. The speedup may only matter in bottlenecks. But still we should
 be aware of the difference.

Generally, we shouldn’t use for..in for arrays.
*/


/*
The length property automatically updates when we modify the array. To be precise, it is 
actually not the count of values in the array, but the greatest numeric index plus one.

For instance, a single element with a large index gives a big length:

 let fruits = [];
fruits[123] = "Apple";

alert( fruits.length ); // 124
*/

/*
Note that we usually don’t use arrays like that.

Another interesting thing about the length property is that it’s writable.

If we increase it manually, nothing interesting happens. But if we decrease it, the array is 
truncated. The process is irreversible, here’s the example:

 let arr = [1, 2, 3, 4, 5];

arr.length = 2; // truncate to 2 elements
alert( arr ); // [1, 2]

arr.length = 5; // return length back
alert( arr[3] ); // undefined: the values do not return
//alert(arr) // 1,2,,,
So, the simplest way to clear the array is: arr.length = 0;.
*/

/*
let arr = new Array("Apple", "Pear", "etc");
It’s rarely used, because square brackets [] are shorter. Also, there’s a tricky feature with it.

If new Array is called with a single argument which is a number, then it creates an array without
 items, but with the given length.
*/

/*
let arr = new Array(2); // will it create an array of [2] ?

alert( arr[0] ); // undefined! no elements.

alert( arr.length ); // length 2
To avoid such surprises, we usually use square brackets, unless we really know what we’re doing.


*/

/*
Arrays can have items that are also arrays. We can use it for multidimensional arrays, for example to store matrices:

 let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

alert( matrix[0][1] ); // 2, the second value of the first inner array
*/

/*
Arrays have their own implementation of toString method that returns a comma-separated 
 list of elements.
let arr = [1, 2, 3];

alert( arr ); // 1,2,3
alert( String(arr) === '1,2,3' ); // true
*/


/*
alert( [] + 1 ); // "1"
alert( [1] + 1 ); // "11"
alert( [1,2] + 1 ); // "1,21"
Arrays do not have Symbol.toPrimitive, neither a viable valueOf, they implement only toString
 conversion, so here [] becomes an empty string, [1] becomes "1" and [1,2] becomes "1,2".

When the binary plus "+" operator adds something to a string, it converts it to a string as well,
 so the next step looks like this:

 alert( "" + 1 ); // "1"
alert( "1" + 1 ); // "11"
alert( "1,2" + 1 ); // "1,21"
*/

/*
Don’t compare arrays with ==

Arrays in JavaScript, unlike some other programming languages, shouldn’t be compared with 
operator ==.

This operator has no special treatment for arrays, it works with them as with any objects.

Let’s recall the rules:

Two objects are equal == only if they’re references to the same object.
If one of the arguments of == is an object, and the other one is a primitive, then the object 
gets converted to primitive, as explained in the chapter Object to primitive conversion.
…With an exception of null and undefined that equal == each other and nothing else.
The strict comparison === is even simpler, as it doesn’t convert types.

So, if we compare arrays with ==, they are never the same, unless we compare two variables that
 reference exactly the same array.

== ile iki nesne (veya dizi), ancak şu durumda eşittir:
İki nesne tam olarak aynı referansa (yani bellekteki aynı yere) işaret ediyorsa
*/

/*
alert( [] == [] ); // false
alert( [0] == [0] ); // false
These arrays are technically different objects. So they aren’t equal. The == operator doesn’t
 do item-by-item comparison.

Comparison with primitives may give seemingly strange results as well:

 alert( 0 == [] ); // true

alert('0' == [] ); // false
Here, in both cases, we compare a primitive with an array object. So the array [] gets converted
 to primitive for the purpose of comparison and becomes an empty string ''.

[] (boş dizi), karşılaştırma için primitive’e çevrilir → '' (boş string)
Karşılaştırma:
0 == ''
→ '' sayıya çevrilir → 0
→ 0 == 0 → ✅ true


[] → '' (boş string)
Karşılaştırma:
'0' == ''
→ İkisi de string olduğu için tür dönüşümü yapılmaz
→ '0' ile '' farklıdır → ❌ false


Then the comparison process goes on with the primitives, as described in the chapter Type 
Conversions:

 // after [] was converted to ''
alert( 0 == '' ); // true, as '' becomes converted to number 0

alert('0' == '' ); // false, no type conversion, different strings
So, how to compare arrays?

That’s simple: don’t use the == operator. Instead, compare them item-by-item in a loop or using 
iteration methods explained in the next chapter.
*/


//Array is a special kind of object, suited to storing and managing ordered data items.

/*
The call to new Array(number) creates an array with the given length, but without elements.

The length property is the array length or, to be precise, its last numeric index plus one. It
 is auto-adjusted by array methods.
If we shorten length manually, the array is truncated.
Getting the elements:

we can get element by its index, like arr[0]
also we can use at(i) method that allows negative indexes. For negative values of i, it steps 
back from the end of the array. If i >= 0, it works same as arr[i].
We can use an array as a deque with the following operations:

push(...items) adds items to the end.
pop() removes the element from the end and returns it.
shift() removes the element from the beginning and returns it.
unshift(...items) adds items to the beginning.
To loop over the elements of the array:

for (let i=0; i<arr.length; i++) – works fastest, old-browser-compatible.
for (let item of arr) – the modern syntax for items only,
for (let i in arr) – never use.
To compare arrays, don’t use the == operator (as well as >, < and others), as they have no 
special treatment for arrays. They handle them as any objects, and it’s not what we usually want.

Instead you can use for..of loop to compare arrays item-by-item.


*/

/*
let fruits = ["Apples", "Pear", "Orange"];

let shoppingCart = fruits;

shoppingCart.push("Banana");

alert( fruits.length ); // 4
That’s because arrays are objects. So both shoppingCart and fruits are the references to the 
same array.
*/

/*
Let’s try 5 array operations.

Create an array styles with items “Jazz” and “Blues”.
Append “Rock-n-Roll” to the end.
Replace the value in the middle with “Classics”. Your code for finding the middle value should work for any arrays with odd length.
Strip off the first value of the array and show it.
Prepend Rap and Reggae to the array.
The array in the process:

Jazz, Blues
Jazz, Blues, Rock-n-Roll
Jazz, Classics, Rock-n-Roll
Classics, Rock-n-Roll
Rap, Reggae, Classics, Rock-n-Roll

let styles = ["Jazz", "Blues"];
styles.push("Rock-n-Roll");
styles[Math.floor((styles.length - 1) / 2)] = "Classics";
alert( styles.shift() );
styles.unshift("Rap", "Reggae");
*/

/*
The call arr[2]() is syntactically the good old obj[method](), in the role of obj we have arr, 
and in the role of method we have 2.

So we have a call of the function arr[2] as an object method. Naturally, it receives this 
referencing the object arr and outputs the array:

 let arr = ["a", "b"];

arr.push(function() {
  alert( this );
})

arr[2](); // a,b,function(){...}
The array has 3 values: initially it had two, plus the function.
*/

/*
We don’t convert value to number instantly after prompt, because after value = +value we 
would not be able to tell an empty string (stop sign) from the zero (valid number). We do it 
later instead.

 function sumInput() {

  let numbers = [];

  while (true) {

    let value = prompt("A number please?", 0);

    // should we cancel?
    if (value === "" || value === null || !isFinite(value)) break;

    numbers.push(+value);
  }

  let sum = 0;
  for (let number of numbers) {
    sum += number;
  }
  return sum;
}

alert( sumInput() );
*/

/*
The input is an array of numbers, e.g. arr = [1, -2, 3, 4, -9, 6].

The task is: find the contiguous subarray of arr with the maximal sum of items.

Write the function getMaxSubSum(arr) that will return that sum.
*/

/*
Slow solution

We can calculate all possible subsums.

The simplest way is to take every element and calculate sums of all subarrays starting from it.

For instance, for [-1, 2, 3, -9, 11]:

// Starting from -1:
-1
-1 + 2
-1 + 2 + 3
-1 + 2 + 3 + (-9)
-1 + 2 + 3 + (-9) + 11

// Starting from 2:
2
2 + 3
2 + 3 + (-9)
2 + 3 + (-9) + 11

// Starting from 3:
3
3 + (-9)
3 + (-9) + 11

// Starting from -9
-9
-9 + 11

// Starting from 11
11
The code is actually a nested loop: the external loop over array elements, and the internal counts subsums starting with the current element.

 function getMaxSubSum(arr) {
  let maxSum = 0; // if we take no elements, zero will be returned

  for (let i = 0; i < arr.length; i++) {
    let sumFixedStart = 0;
    for (let j = i; j < arr.length; j++) {
      sumFixedStart += arr[j];
      maxSum = Math.max(maxSum, sumFixedStart);
    }
  }

  return maxSum;
}

alert( getMaxSubSum([-1, 2, 3, -9]) ); // 5
alert( getMaxSubSum([-1, 2, 3, -9, 11]) ); // 11
alert( getMaxSubSum([-2, -1, 1, 2]) ); // 3
alert( getMaxSubSum([1, 2, 3]) ); // 6
alert( getMaxSubSum([100, -9, 2, -3, 5]) ); // 100
The solution has a time complexity of O(n2). In other words, if we increase the array size
 2 times, the algorithm will work 4 times longer.

For big arrays (1000, 10000 or more items) such algorithms can lead to serious sluggishness.


*/

/*
Fast solution

Let’s walk the array and keep the current partial sum of elements in the variable s. If s becomes negative 
at some point, then assign s=0. The maximum of all such s will be the answer.

If the description is too vague, please see the code, it’s short enough:

 function getMaxSubSum(arr) {
  let maxSum = 0;
  let partialSum = 0;

  for (let item of arr) { // for each item of arr
    partialSum += item; // add it to partialSum
    maxSum = Math.max(maxSum, partialSum); // remember the maximum
    if (partialSum < 0) partialSum = 0; // zero if negative
  }

  return maxSum;
}

alert( getMaxSubSum([-1, 2, 3, -9]) ); // 5
alert( getMaxSubSum([-1, 2, 3, -9, 11]) ); // 11
alert( getMaxSubSum([-2, -1, 1, 2]) ); // 3
alert( getMaxSubSum([100, -9, 2, -3, 5]) ); // 100
alert( getMaxSubSum([1, 2, 3]) ); // 6
alert( getMaxSubSum([-1, -2, -3]) ); // 0
The algorithm requires exactly 1 array pass, so the time complexity is O(n).
*/

//splice
/*
let arr = ["I", "go", "home"];

delete arr[1]; // remove "go"

alert( arr[1] ); // undefined

// now arr = ["I",  , "home"];
alert( arr.length ); // 3
The element was removed, but the array still has 3 elements, we can see that arr.length == 3.

That’s natural, because delete obj.key removes a value by the key. It’s all it does. Fine for 
objects. But for arrays we usually want the rest of the elements to shift and occupy the freed 
place. We expect to have a shorter array now.

So, special methods should be used.

The arr.splice method is a Swiss army knife for arrays. It can do everything: insert, remove and
 replace elements.

The syntax is:

arr.splice(start[, deleteCount, elem1, ..., elemN])

*/

//It modifies arr starting from the index start: removes deleteCount elements and then 
// inserts elem1, ..., elemN at their place. Returns the array of removed elements.
//This method is easy to grasp by examples.

/*
let arr = ["I", "study", "JavaScript"];

arr.splice(1, 1); // from index 1 remove 1 element

alert( arr ); // ["I", "JavaScript"]
*/

/*
we remove 3 elements and replace them with the other two:

 let arr = ["I", "study", "JavaScript", "right", "now"];

// remove 3 first elements and replace them with another
arr.splice(0, 3, "Let's", "dance");

alert( arr ) // now ["Let's", "dance", "right", "now"]
Here we can see that splice returns the array of removed elements:

 let arr = ["I", "study", "JavaScript", "right", "now"];

// remove 2 first elements
let removed = arr.splice(0, 2);

alert( removed ); // "I", "study" <-- array of removed elements
*/

/*
The splice method is also able to insert the elements without any removals. For that, we need
 to set deleteCount to 0:

 let arr = ["I", "study", "JavaScript"];

// from index 2
// delete 0
// then insert "complex" and "language"
arr.splice(2, 0, "complex", "language");

alert( arr ); // "I", "study", "complex", "language", "JavaScript"

*/

/*
Negative indexes allowed
Here and in other array methods, negative indexes are allowed. They specify the position from 
the end of the array, like here:

 let arr = [1, 2, 5];

// from index -1 (one step from the end)
// delete 0 elements,
// then insert 3 and 4
arr.splice(-1, 0, 3, 4);

alert( arr ); // 1,2,3,4,5
*/

//slice

/*
The method arr.slice is much simpler than the similar-looking arr.splice.

The syntax is:

arr.slice([start], [end])
*/

/*
It returns a new array copying to it all items from index start to end (not including end). 
Both start and end can be negative, in that case position from array end is assumed.

It’s similar to a string method str.slice, but instead of substrings, it makes subarrays.

For instance:

 let arr = ["t", "e", "s", "t"];

alert( arr.slice(1, 3) ); // e,s (copy from 1 to 3)

alert( arr.slice(-2) ); // s,t (copy from -2 till the end)
We can also call it without arguments: arr.slice() creates a copy of arr. That’s often used to 
obtain a copy for further transformations that should not affect the original array.


*/

/*
concat

The method arr.concat creates a new array that includes values from other arrays and additional items.

The syntax is:

arr.concat(arg1, arg2...)
It accepts any number of arguments – either arrays or values.

The result is a new array containing items from arr, then arg1, arg2 etc.

If an argument argN is an array, then all its elements are copied. Otherwise, the argument itself is copied.

For instance:

 let arr = [1, 2];

// create an array from: arr and [3,4]
alert( arr.concat([3, 4]) ); // 1,2,3,4

// create an array from: arr and [3,4] and [5,6]
alert( arr.concat([3, 4], [5, 6]) ); // 1,2,3,4,5,6

// create an array from: arr and [3,4], then add values 5 and 6
alert( arr.concat([3, 4], 5, 6) ); // 1,2,3,4,5,6
Normally, it only copies elements from arrays. Other objects, even if they look like arrays, are added as a whole:

 let arr = [1, 2];

let arrayLike = {
  0: "something",
  length: 1
};

alert( arr.concat(arrayLike) ); // 1,2,[object Object]
…But if an array-like object has a special Symbol.isConcatSpreadable property, then it’s 
treated as an array by concat: its elements are added instead:

 let arr = [1, 2];

let arrayLike = {
  0: "something",
  1: "else",
  [Symbol.isConcatSpreadable]: true,
  length: 2
};

alert( arr.concat(arrayLike) ); // 1,2,something,else
*/


/*
The arr.forEach method allows to run a function for every element of the array.

The syntax:

arr.forEach(function(item, index, array) {
  // ... do something with an item
});
For instance, this shows each element of the array:

 // for each element call alert
["Bilbo", "Gandalf", "Nazgul"].forEach(alert);
And this code is more elaborate about their positions in the target array:

 ["Bilbo", "Gandalf", "Nazgul"].forEach((item, index, array) => {
  alert(`${item} is at index ${index} in ${array}`);
});
The result of the function (if it returns any) is thrown away and ignored.


*/

/*
indexOf/lastIndexOf and includes

The methods arr.indexOf and arr.includes have the similar syntax and do essentially the same as their 
string counterparts, but operate on items instead of characters:

arr.indexOf(item, from) – looks for item starting from index from, and returns the index where it was found, otherwise -1.
arr.includes(item, from) – looks for item starting from index from, returns true if found.
Usually, these methods are used with only one argument: the item to search. By default, the search is from the beginning.

For instance:

 let arr = [1, 0, false];

alert( arr.indexOf(0) ); // 1
alert( arr.indexOf(false) ); // 2
alert( arr.indexOf(null) ); // -1

alert( arr.includes(1) ); // true
Please note that indexOf uses the strict equality === for comparison. So, if we look for false, 
it finds exactly false and not the zero.

If we want to check if item exists in the array and don’t need the index, then arr.includes is 
preferred.

The method arr.lastIndexOf is the same as indexOf, but looks for from right to left.

 let fruits = ['Apple', 'Orange', 'Apple']

alert( fruits.indexOf('Apple') ); // 0 (first Apple)
alert( fruits.lastIndexOf('Apple') ); // 2 (last Apple)

*/


/*
The includes method handles NaN correctly
A minor, but noteworthy feature of includes is that it correctly handles NaN, unlike indexOf:

 const arr = [NaN];
alert( arr.indexOf(NaN) ); // -1 (wrong, should be 0)
alert( arr.includes(NaN) );// true (correct)
That’s because includes was added to JavaScript much later and uses the more up-to-date 
comparison algorithm internally.
*/

/*
Imagine we have an array of objects. How do we find an object with a specific condition?

Here the arr.find(fn) method comes in handy.

The syntax is:

let result = arr.find(function(item, index, array) {
  // if true is returned, item is returned and iteration is stopped
  // for falsy scenario returns undefined
});
The function is called for elements of the array, one after another:

item is the element.
index is its index.
array is the array itself.
If it returns true, the search is stopped, the item is returned. If nothing is found, 
undefined is returned.

For example, we have an array of users, each with the fields id and name. Let’s find the 
one with id == 1:

 let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"}
];

let user = users.find(item => item.id == 1);

alert(user.name); // John
*/

/*
In real life, arrays of objects are a common thing, so the find method is very useful.

Note that in the example we provide to find the function item => item.id == 1 with one argument. 
That’s typical, other arguments of this function are rarely used.

The arr.findIndex method has the same syntax but returns the index where the element was found
 instead of the element itself. The value of -1 is returned if nothing is found.

The arr.findLastIndex method is like findIndex, but searches from right to left, similar to 
lastIndexOf.

Here’s an example:

 let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"},
  {id: 4, name: "John"}
];

// Find the index of the first John
alert(users.findIndex(user => user.name == 'John')); // 0

// Find the index of the last John
alert(users.findLastIndex(user => user.name == 'John')); // 3

*/

/*
The find method looks for a single (first) element that makes the function return true.

If there may be many, we can use arr.filter(fn).

The syntax is similar to find, but filter returns an array of all matching elements:

let results = arr.filter(function(item, index, array) {
  // if true item is pushed to results and the iteration continues
  // returns empty array if nothing found
});
For instance:

 let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"}
];

// returns array of the first two users
let someUsers = users.filter(item => item.id < 3);

alert(someUsers.length); // 2
*/


/*
The arr.map method is one of the most useful and often used.

It calls the function for each element of the array and returns the array of results.

The syntax is:

let result = arr.map(function(item, index, array) {
  // returns the new value instead of item
});
For instance, here we transform each element into its length:

 let lengths = ["Bilbo", "Gandalf", "Nazgul"].map(item => item.length);
alert(lengths); // 5,7,6
*/

/*
sort(fn)

The call to arr.sort() sorts the array in place, changing its element order.

It also returns the sorted array, but the returned value is usually ignored, as arr itself is modified.

For instance:

 let arr = [ 1, 2, 15 ];

// the method reorders the content of arr
arr.sort();

alert( arr );  // 1, 15, 2
Did you notice anything strange in the outcome?

The order became 1, 15, 2. Incorrect. But why?

The items are sorted as strings by default.

Literally, all elements are converted to strings for comparisons. For strings, lexicographic ordering is applied and indeed "2" > "15".

To use our own sorting order, we need to supply a function as the argument of arr.sort().

The function should compare two arbitrary values and return:

function compare(a, b) {
  if (a > b) return 1; // if the first value is greater than the second
  if (a == b) return 0; // if values are equal
  if (a < b) return -1; // if the first value is less than the second
}
For instance, to sort as numbers:

 function compareNumeric(a, b) {
  if (a > b) return 1;
  if (a == b) return 0;
  if (a < b) return -1;
}

let arr = [ 1, 2, 15 ];

arr.sort(compareNumeric);

alert(arr);  // 1, 2, 15
Now it works as intended.

Let’s step aside and think about what’s happening. The arr can be an array of anything, right?
 It may contain numbers or strings or objects or whatever. We have a set of some items. To sort
  it, we need an ordering function that knows how to compare its elements. The default is a string
   order.

The arr.sort(fn) method implements a generic sorting algorithm. We don’t need to care how it 
internally works (an optimized quicksort or Timsort most of the time). It will walk the array, 
compare its elements using the provided function and reorder them, all we need is to provide the 
fn which does the comparison.

By the way, if we ever want to know which elements are compared – nothing prevents us from
 alerting them:

 [1, -2, 15, 2, 0, 8].sort(function(a, b) {
  alert( a + " <> " + b );
  return a - b;
});
The algorithm may compare an element with multiple others in the process, but it tries to make as
 few comparisons as possible.
*/


/*
A comparison function may return any number
Actually, a comparison function is only required to return a positive number to say “greater”
 and a negative number to say “less”.

That allows to write shorter functions:

 let arr = [ 1, 2, 15 ];

arr.sort(function(a, b) { return a - b; });

alert(arr);  // 1, 2, 15
Arrow functions for the best
Remember arrow functions? We can use them here for neater sorting:

arr.sort( (a, b) => a - b );
This works exactly the same as the longer version above.
*/

/*
For many alphabets, it’s better to use str.localeCompare method to correctly sort letters, 
such as .

For example, let’s sort a few countries in German:

 let countries = ['Österreich', 'Andorra', 'Vietnam'];

alert( countries.sort( (a, b) => a > b ? 1 : -1) ); // Andorra, Vietnam, Österreich (wrong)

alert( countries.sort( (a, b) => a.localeCompare(b) ) ); // Andorra,Österreich,Vietnam (correct!)
*/

/*
The method arr.reverse reverses the order of elements in arr.

For instance:

 let arr = [1, 2, 3, 4, 5];
arr.reverse();

alert( arr ); // 5,4,3,2,1
It also returns the array arr after the reversal.


*/

/*
Here’s the situation from real life. We are writing a messaging app, and the person enters the
 comma-delimited list of receivers: John, Pete, Mary. But for us an array of names would be much
  more comfortable than a single string. How to get it?

The str.split(delim) method does exactly that. It splits the string into an array by the given 
delimiter delim.

In the example below, we split by a comma followed by a space:

 let names = 'Bilbo, Gandalf, Nazgul';

let arr = names.split(', ');

for (let name of arr) {
  alert( `A message to ${name}.` ); // A message to Bilbo  (and other names)
}
The split method has an optional second numeric argument – a limit on the array length. If it 
is provided, then the extra elements are ignored. In practice it is rarely used though:

 let arr = 'Bilbo, Gandalf, Nazgul, Saruman'.split(', ', 2);

alert(arr); // Bilbo, Gandalf
*/

/*
Split into letters
The call to split(s) with an empty s would split the string into an array of letters:

 let str = "test";

alert( str.split('') ); // t,e,s,t
The call arr.join(glue) does the reverse to split. It creates a string of arr items joined 
by glue between them.

For instance:

 let arr = ['Bilbo', 'Gandalf', 'Nazgul'];

let str = arr.join(';'); // glue the array into a string using ;

alert( str ); // Bilbo;Gandalf;Nazgul
*/


/*
reduce/reduceRight

When we need to iterate over an array – we can use forEach, for or for..of.

When we need to iterate and return the data for each element – we can use map.

The methods arr.reduce and arr.reduceRight also belong to that breed, but are a little bit more 
intricate. They are used to calculate a single value based on the array.

The syntax is:

let value = arr.reduce(function(accumulator, item, index, array) {
  // ...
}, [initial]);
The function is applied to all array elements one after another and “carries on” its result 
to the next call.

Arguments:

accumulator – is the result of the previous function call, equals initial the first time (if 
initial is provided).
item – is the current array item.
index – is its position.
array – is the array.
As the function is applied, the result of the previous function call is passed to the next one 
as the first argument.

So, the first argument is essentially the accumulator that stores the combined result of all 
previous executions. And at the end, it becomes the result of reduce.


*/

/*
let arr = [1, 2, 3, 4, 5];

let result = arr.reduce((sum, current) => sum + current, 0);

alert(result); // 15
The function passed to reduce uses only 2 arguments, that’s typically enough.

Let’s see the details of what’s going on.

On the first run, sum is the initial value (the last argument of reduce), equals 0, and current 
is the first array element, equals 1. So the function result is 1.
On the second run, sum = 1, we add the second array element (2) to it and return.
On the 3rd run, sum = 3 and we add one more element to it, and so on…

Or in the form of a table, where each row represents a function call on the next array element:

                      sum	      current	      result
the first call	        0	        1	        1
the second call	        1	        2	        3
the third call	        3	        3	        6
the fourth call	        6	        4	        10
the fifth call	        10	        5	        15
Here we can clearly see how the result of the previous call becomes the first argument of the next one.


*/

/*
let arr = [1, 2, 3, 4, 5];

// removed initial value from reduce (no 0)
let result = arr.reduce((sum, current) => sum + current);

alert( result ); // 15
The result is the same. That’s because if there’s no initial, then reduce takes the first 
element of the array 
as the initial value and starts the iteration from the 2nd element.

The calculation table is the same as above, minus the first row.

But such use requires an extreme care. If the array is empty, then reduce call without initial
 value gives an error.
*/

/*
let arr = [];

// Error: Reduce of empty array with no initial value
// if the initial value existed, reduce would return it for the empty arr.
arr.reduce((sum, current) => sum + current);
So it’s advised to always specify the initial value.

The method arr.reduceRight does the same but goes from right to left.


*/

/*
reduceRight() aynen reduce() gibi çalışır ama sağdan sola işler.

let arr = [1, 2, 3];

arr.reduceRight((a, b) => {
  console.log(`a: ${a}, b: ${b}`);
  return a + b;
});
Çalışma sırası:
3 + 2 + 1 → yani önce 3 + 2, sonra sonucu + 1
*/



/*
Arrays do not form a separate language type. They are based on objects.

So typeof does not help to distinguish a plain object from an array:

 alert(typeof {}); // object
alert(typeof []); // object (same)
…But arrays are used so often that there’s a special method for that: Array.isArray(value). 
It returns true if the value is an array, and false otherwise.

 alert(Array.isArray({})); // false

alert(Array.isArray([])); // true
*/

/*
Most methods support “thisArg”

Almost all array methods that call functions – like find, filter, map, with a notable exception 
of sort, accept an optional additional parameter thisArg.

That parameter is not explained in the sections above, because it’s rarely used. But for 
completeness, we have to cover it.

Here’s the full syntax of these methods:

arr.find(func, thisArg);
arr.filter(func, thisArg);
arr.map(func, thisArg);
// ...
// thisArg is the optional last argument
The value of thisArg parameter becomes this for func.

For example, here we use a method of army object as a filter, and thisArg passes the context:

 let army = {
  minAge: 18,
  maxAge: 27,
  canJoin(user) {
    return user.age >= this.minAge && user.age < this.maxAge;
  }
};

let users = [
  {age: 16},
  {age: 20},
  {age: 23},
  {age: 30}
];

// find users, for who army.canJoin returns true
let soldiers = users.filter(army.canJoin, army);

alert(soldiers.length); // 2
alert(soldiers[0].age); // 20
alert(soldiers[1].age); // 23
If in the example above we used users.filter(army.canJoin), then army.canJoin would be called as
 a standalone function, with this=undefined, thus leading to an instant error.

A call to users.filter(army.canJoin, army) can be replaced with 
users.filter(user => army.canJoin(user)), that does the same. The latter is used more often, 
as it’s a bit easier to understand for most people.
*/

/*
A cheat sheet of array methods:

To add/remove elements:

push(...items) – adds items to the end,
pop() – extracts an item from the end,
shift() – extracts an item from the beginning,
unshift(...items) – adds items to the beginning.
splice(pos, deleteCount, ...items) – at index pos deletes deleteCount elements and inserts items.
slice(start, end) – creates a new array, copies elements from index start till end (not inclusive)
 into it.
concat(...items) – returns a new array: copies all members of the current one and adds items to
 it. If any of items is an array, then its elements are taken.
To search among elements:

indexOf/lastIndexOf(item, pos) – look for item starting from position pos, and return the index 
or -1 if not found.
includes(value) – returns true if the array has value, otherwise false.
find/filter(func) – filter elements through the function, return first/all values that make it 
return true.
findIndex is like find, but returns the index instead of a value.
To iterate over elements:

forEach(func) – calls func for every element, does not return anything.
To transform the array:

map(func) – creates a new array from results of calling func for every element.
sort(func) – sorts the array in-place, then returns it.
reverse() – reverses the array in-place, then returns it.
split/join – convert a string to array and back.
reduce/reduceRight(func, initial) – calculate a single value over the array by calling func for 
each element and passing an intermediate result between the calls.
Additionally:

Array.isArray(value) checks value for being an array, if so returns true, otherwise false.
Please note that methods sort, reverse and splice modify the array itself.


*/

/*
there are few others:

arr.some(fn)/arr.every(fn) check the array.

The function fn is called on each element of the array similar to map. If any/all results 
are true, returns true, otherwise false.

These methods behave sort of like || and && operators: if fn returns a truthy value, arr.some()
 immediately returns true and stops iterating over the rest of items; if fn returns a falsy
  value, arr.every() immediately returns false and stops iterating over the rest of items as well.

We can use every to compare arrays:

 function arraysEqual(arr1, arr2) {
  return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
}

alert( arraysEqual([1, 2], [1, 2])); // true
arr.fill(value, start, end) – fills the array with repeating value from index start to end.

//const arr = [1, 2, 3, 4, 5];
// 1 ile 3 arasındaki elemanları 0 ile doldurur (3 hariç)
//arr.fill(0, 1, 3);
//console.log(arr); // [1, 0, 0, 4, 5]

arr.copyWithin(target, start, end) – copies its elements from position start till position end
into itself, at position target (overwrites existing).
//const arr = [1, 2, 3, 4, 5];
// 0. indekse, 3. ve 4. indeks aralığını (3 dahil, 5 hariç) kopyalar
//arr.copyWithin(0, 3, 5);
//console.log(arr); // [4, 5, 3, 4, 5]

arr.flat(depth)/arr.flatMap(fn) create a new flat array from a multidimensional array.
//Çok boyutlu dizileri, belirli bir derinliğe kadar düzleştirir.
//Kullanım:
//const nested = [1, 2, [3, 4, [5, 6]]];
//console.log(nested.flat(1)); // [1, 2, 3, 4, [5, 6]]
//console.log(nested.flat(2)); // [1, 2, 3, 4, 5, 6]

*/

/*
Write the function camelize(str) that changes dash-separated words like “my-short-string” 
into camel-cased “myShortString”.

That is: removes all dashes, each word after dash becomes uppercased.

Examples:

camelize("background-color") == 'backgroundColor';
camelize("list-style-image") == 'listStyleImage';
camelize("-webkit-transition") == 'WebkitTransition';
P.S. Hint: use split to split the string into an array, transform it and join back.


function camelize(str) {
  return str
    .split('-') // splits 'my-long-word' into array ['my', 'long', 'word']
    .map(
      // capitalizes first letters of all array items except the first one
      // converts ['my', 'long', 'word'] into ['my', 'Long', 'Word']
      (word, index) => index == 0 ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join(''); // joins ['my', 'Long', 'Word'] into 'myLongWord'
}

*/


/*
function filterRange(arr, a, b) {
  // added brackets around the expression for better readability
  return arr.filter(item => (a <= item && item <= b));
}

let arr = [5, 3, 8, 1];

let filtered = filterRange(arr, 1, 4);

alert( filtered ); // 3,1 (matching values)

alert( arr ); // 5,3,8,1 (not modified)
*/

/*
 Write a function filterRangeInPlace(arr, a, b) that gets an array arr and removes from it all values 
 except those that are between a and b. The test is: a ≤ arr[i] ≤ b.

The function should only modify the array. It should not return anything.


 */


/*
Write a function filterRangeInPlace(arr, a, b) that gets an array arr and removes from it all values except 
those that are between a and b. The test is: a ≤ arr[i] ≤ b.

The function should only modify the array. It should not return anything.

function filterRangeInPlace(arr, a, b) {

  for (let i = 0; i < arr.length; i++) {
    let val = arr[i];

    // remove if outside of the interval
    if (val < a || val > b) {
      arr.splice(i, 1);
      i--;
    }
  }

}

let arr = [5, 3, 8, 1];

filterRangeInPlace(arr, 1, 4); // removed the numbers except from 1 to 4

alert( arr ); // [3, 1]
 */

//i--
//Eleman silindiğinde, dizideki elemanlar sola kayar.
//Eğer i değerini azaltmazsak, bir sonraki eleman atlanmış olur.
//Dizi: [5, 3, 8, 1]
//i = 0 → 5 silinir → dizi: [3, 8, 1]
//Eğer i++ ile devam edersek, 3’ü atlamış oluruz.
//Bu yüzden i-- yapılarak, bir adım geri gidilir, sonra i++ ile tekrar doğru elemana geçilir.



/*
let arr = [5, 2, 1, -10, 8];

arr.sort((a, b) => b - a);

alert( arr );

//arr.sort((a, b) => a - b);
//Negatif dönerse: a önce gelir.
//Pozitif dönerse: b önce gelir.
//0 dönerse: eşit kabul edilir.

*/

/*
function copySorted(arr) {
  return arr.slice().sort();
}

let arr = ["HTML", "JavaScript", "CSS"];

let sorted = copySorted(arr);
alert( sorted ); // CSS, HTML, JavaScript
alert( arr ); // HTML, JavaScript, CSS (no changes)
*/

/*
function Calculator() {

  this.methods = {
    "-": (a, b) => a - b,
    "+": (a, b) => a + b
  };

  this.calculate = function(str) {

    let split = str.split(' '),
      a = +split[0],
      op = split[1],
      b = +split[2];

    if (!this.methods[op] || isNaN(a) || isNaN(b)) {
      return NaN;
    }

    return this.methods[op](a, b);
  };

  this.addMethod = function(name, func) {
    this.methods[name] = func;
  };
}
*/

/*
let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 28 };

let users = [ john, pete, mary ];

let names = users.map(item => item.name);

alert( names ); // John, Pete, Mary

*/

/*
let john = { name: "John", surname: "Smith", id: 1 };
let pete = { name: "Pete", surname: "Hunt", id: 2 };
let mary = { name: "Mary", surname: "Key", id: 3 };

let users = [ john, pete, mary ];

let usersMapped = users.map(user => ({
  fullName: `${user.name} ${user.surname}`,
  id: user.id
}));

/*
usersMapped = [
  { fullName: "John Smith", id: 1 },
  { fullName: "Pete Hunt", id: 2 },
  { fullName: "Mary Key", id: 3 }
]


alert( usersMapped[0].id ); // 1
alert( usersMapped[0].fullName ); // John Smith

// Dizi (Array) vs. Nesne (Object) – Detaylı Farklar

//Özellik/Farklılık	              Dizi (Array)	                                           Nesne (Object)
//Kullanım amacı	                  Sıralı veri listesi	                                  Anahtar–değer (key-value) ilişkileri
//Anahtar tipi (key)                  	Otomatik sayısal indeksler (0, 1, 2, ...)	            Kendi belirlediğin string (veya Symbol)
//Sıralı mı?	                  ✅ Evet, sıralıdır                                          	❌ Hayır, sıralı değildir
//Özellik sayacı                	.length özelliği vardır                             	Object.keys(obj).length ile bulunur
//İterasyon (döngü)	                    for, for...of, forEach, map...	                for...in, Object.keys(), Object.entries()
//Metotlar (fonksiyonlar)	                push(), pop(), map(), filter(), sort()	          Genellikle kullanıcı tanımlıdır
//Performans (büyük veride)               	Optimize edilmiştir	                        Daha esnektir ama diziler kadar hızlı değildir
//Tür kontrolü	                      Array.isArray(arr)	                              typeof obj === "object"
//Özelleştirme	                    Elemanlar sıralıdır, indisle erişilir	                  Key'ler istediğin gibi adlandırılır



Please note that in the arrow functions we need to use additional brackets.

We can’t write like this:

let usersMapped = users.map(user => {
  fullName: `${user.name} ${user.surname}`,
  id: user.id
});
As we remember, there are two arrow functions: without body value => expr and with body 
value => {...}.

Here JavaScript would treat { as the start of function body, not the start of the object. 
The workaround is to wrap them in the “normal” brackets:

let usersMapped = users.map(user => ({
  fullName: `${user.name} ${user.surname}`,
  id: user.id
}));
*/

/*
function sortByAge(arr) {
  arr.sort((a, b) => a.age - b.age);
}

let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 28 };

let arr = [ pete, john, mary ];

sortByAge(arr);

// now sorted is: [john, mary, pete]
alert(arr[0].name); // John
alert(arr[1].name); // Mary
alert(arr[2].name); // Pete
*/

/*
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

let arr = [1, 2, 3];
shuffle(arr);
alert(arr);
That somewhat works, because Math.random() - 0.5 is a random number that may be positive or 
negative, so the sorting function reorders elements randomly.

But because the sorting function is not meant to be used this way, not all permutations have 
the same probability.

For instance, consider the code below. It runs shuffle 1000000 times and counts appearances of 
all possible results:

 function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

// counts of appearances for all possible permutations
let count = {
  '123': 0,
  '132': 0,
  '213': 0,
  '231': 0,
  '321': 0,
  '312': 0
};

for (let i = 0; i < 1000000; i++) {
  let array = [1, 2, 3];
  shuffle(array);
  count[array.join('')]++;
}

// show counts of all possible permutations
for (let key in count) {
  alert(`${key}: ${count[key]}`);
}
An example result (depends on JS engine):

123: 250706
132: 124425
213: 249618
231: 124880
312: 125148
321: 125223
We can see the bias clearly: 123 and 213 appear much more often than others.

The result of the code may vary between JavaScript engines, but we can already see that the
 approach is unreliable.

Why it doesn’t work? Generally speaking, sort is a “black box”: we throw an array and a 
comparison function into it and expect the array to be sorted. But due to the utter randomness 
of the comparison the black box goes mad, and how exactly it goes mad depends on the concrete
 implementation that differs between engines.

There are other good ways to do the task. For instance, there’s a great algorithm called 
Fisher-Yates shuffle. The idea is to walk the array in the reverse order and swap each element 
with a random one before it:

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

    // swap elements array[i] and array[j]
    // we use "destructuring assignment" syntax to achieve that
    // you'll find more details about that syntax in later chapters
    // same can be written as:
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [array[i], array[j]] = [array[j], array[i]];
  }
}
Let’s test it the same way:

 function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// counts of appearances for all possible permutations
let count = {
  '123': 0,
  '132': 0,
  '213': 0,
  '231': 0,
  '321': 0,
  '312': 0
};

for (let i = 0; i < 1000000; i++) {
  let array = [1, 2, 3];
  shuffle(array);
  count[array.join('')]++;
}

// show counts of all possible permutations
for (let key in count) {
  alert(`${key}: ${count[key]}`);
}
The example output:

123: 166693
132: 166647
213: 166628
231: 167517
312: 166199
321: 166316
Looks good now: all permutations appear with the same probability.

Also, performance-wise the Fisher-Yates algorithm is much better, there’s no “sorting” overhead.
*/


/*
function getAverageAge(users) {
  return users.reduce((prev, user) => prev + user.age, 0) / users.length;
}

let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 29 };

let arr = [ john, pete, mary ];

alert( getAverageAge(arr) ); // 28
*/

/*
function unique(arr) {
  let result = [];

  for (let str of arr) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }

  return result;
}

let strings = ["Hare", "Krishna", "Hare", "Krishna",
  "Krishna", "Krishna", "Hare", "Hare", ":-O"
];

alert( unique(strings) ); // Hare, Krishna, :-O
The code works, but there’s a potential performance problem in it.

The method result.includes(str) internally walks the array result and compares each element
 against str to find the match.

So if there are 100 elements in result and no one matches str, then it will walk the whole result 
and do exactly 100 comparisons. And if result is large, like 10000, then there would be 10000 
comparisons.

That’s not a problem by itself, because JavaScript engines are very fast, so walk 10000 array
 is a matter of microseconds.

But we do such test for each element of arr, in the for loop.

So if arr.length is 10000 we’ll have something like 10000*10000 = 100 millions of comparisons.
 That’s a lot.

So the solution is only good for small arrays.
*/


/*
let users = [
  {id: 'john', name: "John Smith", age: 20},
  {id: 'ann', name: "Ann Smith", age: 24},
  {id: 'pete', name: "Pete Peterson", age: 31},
];

let usersById = groupById(users);


// after the call we should have:

//usersById = {
//  john: {id: 'john', name: "John Smith", age: 20},
//  ann: {id: 'ann', name: "Ann Smith", age: 24},
//  pete: {id: 'pete', name: "Pete Peterson", age: 31},
//}


function groupById(array) {
  return array.reduce((obj, value) => {
    obj[value.id] = value;
    return obj;
  }, {})
}



*/



//Iterables

/*
To make the range object iterable (and thus let for..of work) we need to add a method to the
 object named Symbol.iterator (a special built-in symbol just for that).

When for..of starts, it calls that method once (or errors if not found). The method must
 return an iterator – an object with the method next.
Onward, for..of works only with that returned object.
When for..of wants the next value, it calls next() on that object.
The result of next() must have the form {done: Boolean, value: any}, where done=true means that
 the loop is finished, otherwise value is the next value.
Here’s the full implementation for range with remarks:

 let range = {
  from: 1,
  to: 5
};

// 1. call to for..of initially calls this
range[Symbol.iterator] = function() {

  // ...it returns the iterator object:
  // 2. Onward, for..of works only with the iterator object below, asking it for next values
  return {
    current: this.from,
    last: this.to,

    // 3. next() is called on each iteration by the for..of loop
    next() {
      // 4. it should return the value as an object {done:.., value :...}
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    }
  };
};

// now it works!
for (let num of range) {
  alert(num); // 1, then 2, 3, 4, 5
}
Please note the core feature of iterables: separation of concerns.

The range itself does not have the next() method.
Instead, another object, a so-called “iterator” is created by the call to 
range[Symbol.iterator](), and its next() generates values for the iteration.
So, the iterator object is separate from the object it iterates over.

Technically, we may merge them and use range itself as the iterator to make the code simpler.


*/

/*

let range = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    this.current = this.from;
    return this;
  },

  next() {
    if (this.current <= this.to) {
      return { done: false, value: this.current++ };
    } else {
      return { done: true };
    }
  }
};

for (let num of range) {
  alert(num); // 1, then 2, 3, 4, 5
}
Now range[Symbol.iterator]() returns the range object itself: it has the necessary next() 
method and remembers the current iteration progress in this.current. Shorter? Yes. And sometimes 
that’s fine too.

The downside is that now it’s impossible to have two for..of loops running over the object 
simultaneously: they’ll share the iteration state, because there’s only one iterator – the 
object itself. But two parallel for-ofs is a rare thing, even in async scenarios.


 
 */


/*
[Symbol.iterator] Nedir?

Symbol.iterator, bir özel sembol (Symbol)'dür.
JavaScript bu sembolü for...of, spread (...), Array.from(), Promise.all() gibi yapılar için kullanır.
Eğer bir nesne obj[Symbol.iterator]() fonksiyonunu tanımlamışsa, o nesne iterable kabul edilir.
📦 Ne işe yarar?

1. for...of ile çalışmasını sağlar
let arr = [10, 20, 30];

for (let num of arr) {
  console.log(num);
}
Bu örnekte JavaScript aslında şunu yapar:

let iterator = arr[Symbol.iterator](); // dahili çağrı
iterator.next(); // { value: 10, done: false }
iterator.next(); // { value: 20, done: false }
iterator.next(); // ...
2. ... (spread) operatörüyle çalışmasını sağlar
let set = new Set(["a", "b", "c"]);
console.log([...set]); // ["a", "b", "c"]

// çünkü set[Symbol.iterator]() vardır
3. Kendi özel iterable yapını yazabilirsin
let custom = {
  from: 1,
  to: 3,
  [Symbol.iterator]() {
    let current = this.from;
    let last = this.to;
    return {
      next() {
        return current <= last
          ? { value: current++, done: false }
          : { done: true };
      }
    };
  }
};

for (let num of custom) {
  console.log(num); // 1, 2, 3
}
🔥 Şu an custom nesnesi aslında bir dizi değil ama for...of ile gezilebilir, çünkü [Symbol.iterator]() metodu tanımlı.

*/




/*
For a string, for..of loops over its characters:

 for (let char of "test") {
  // triggers 4 times: once for each character
  alert( char ); // t, then e, then s, then t
}
And it works correctly with surrogate pairs!

 let str = '𝒳😂';
for (let char of str) {
    alert( char ); // 𝒳, and then 😂
}
*/

/*
We’ll iterate over a string in exactly the same way as for..of, but with direct calls. 
This code creates a string iterator and gets values from it “manually”:

 let str = "Hello";

// does the same as
// for (let char of str) alert(char);

let iterator = str[Symbol.iterator]();

while (true) {
  let result = iterator.next();
  if (result.done) break;
  alert(result.value); // outputs characters one by one
}
That is rarely needed, but gives us more control over the process than for..of. For instance, 
we can split the iteration process: iterate a bit, then stop, do something else, and then resume 
later.


*/

/*
Iterables and array-likes

Two official terms look similar, but are very different. Please make sure you understand them 
well to avoid the confusion.

Iterables are objects that implement the Symbol.iterator method, as described above.
Array-likes are objects that have indexes and length, so they look like arrays.
When we use JavaScript for practical tasks in a browser or any other environment, we may meet
 objects that are iterables or array-likes, or both.

For instance, strings are both iterable (for..of works on them) and array-like (they have numeric
 indexes and length).

But an iterable may not be array-like. And vice versa an array-like may not be iterable.

For example, the range in the example above is iterable, but not array-like, because it does not
 have indexed properties and length.

And here’s the object that is array-like, but not iterable:

 let arrayLike = { // has indexes and length => array-like
  0: "Hello",
  1: "World",
  length: 2
};

// Error (no Symbol.iterator)
for (let item of arrayLike) {}
Both iterables and array-likes are usually not arrays, they don’t have push, pop etc. That’s
 rather inconvenient if we have such an object and want to work with it as with an array. E.g. 
 we would like to work with range using array methods. How to achieve that?


*/
//array-like
//Bir nesne diziye benziyordur, ama array değildir.
//🔑 Şartlar:
//Sayısal (index) property'ler vardır: obj[0], obj[1]
//length property’si vardır.
//Ama:
//❌ Symbol.iterator yoktur → for...of ile gezilemez
//❌ push/pop/slice gibi array metodları çalışmaz


/*
  Array.from

There’s a universal method Array.from that takes an iterable or array-like value and makes 
a “real” Array from it. Then we can call array methods on it.

For instance:

 let arrayLike = {
  0: "Hello",
  1: "World",
  length: 2
};

let arr = Array.from(arrayLike); // (*)
alert(arr.pop()); // World (method works)
Array.from at the line (*) takes the object, examines it for being an iterable or array-like, 
then makes a new array and copies all items to it.

The same happens for an iterable:

 // assuming that range is taken from the example above
let arr = Array.from(range);
alert(arr); // 1,2,3,4,5 (array toString conversion works)
The full syntax for Array.from also allows us to provide an optional “mapping” function:

Array.from(obj[, mapFn, thisArg])
The optional second argument mapFn can be a function that will be applied to each element 
before adding it to the array, and thisArg allows us to set this for it.

For instance:

 // assuming that range is taken from the example above

// square each number
let arr = Array.from(range, num => num * num);

alert(arr); // 1,4,9,16,25
Here we use Array.from to turn a string into an array of characters:

 let str = '𝒳😂';

// splits str into array of characters
let chars = Array.from(str);

alert(chars[0]); // 𝒳
alert(chars[1]); // 😂
alert(chars.length); // 2
Unlike str.split, it relies on the iterable nature of the string and so, just like for..of, 
correctly works with surrogate pairs.

Technically here it does the same as:

 let str = '𝒳😂';

let chars = []; // Array.from internally does the same loop
for (let char of str) {
  chars.push(char);
}

alert(chars);
…But it is shorter.

We can even build surrogate-aware slice on it:

 function slice(str, start, end) {
  return Array.from(str).slice(start, end).join('');
}

let str = '𝒳😂𩷶';

alert( slice(str, 1, 3) ); // 😂𩷶

// the native method does not support surrogate pairs
alert( str.slice(1, 3) ); // garbage (two pieces from different surrogate pairs)

 
 */

/**
 * Objects that can be used in for..of are called iterable.

Technically, iterables must implement the method named Symbol.iterator.
The result of obj[Symbol.iterator]() is called an iterator. It handles further iteration process.
An iterator must have the method named next() that returns an object {done: Boolean, value: any},
 here done:true denotes the end of the iteration process, otherwise the value is the next value.
The Symbol.iterator method is called automatically by for..of, but we also can do it directly.
Built-in iterables like strings or arrays, also implement Symbol.iterator.
String iterator knows about surrogate pairs.
Objects that have indexed properties and length are called array-like. Such objects may also have 
other properties and methods, but lack the built-in methods of arrays.

If we look inside the specification – we’ll see that most built-in methods assume that they work
 with iterables or array-likes instead of “real” arrays, because that’s more abstract.

Array.from(obj[, mapFn, thisArg]) makes a real Array from an iterable or array-like obj, and we
 can then use array methods on it. The optional arguments mapFn and thisArg allow us to apply
  a function to each item.
 * 

  */

 //Objects are used for storing keyed collections.
//Arrays are used for storing ordered collections.


//Object: sadece string veya symbol türünde key kabul eder.
//Map: her türden key kabul eder: sayı, boolean, obje, fonksiyon, vs.


//MAPS

/**
 * Map is a collection of keyed data items, just like an Object. But the main difference is
 *  that Map allows keys of any type.

Methods and properties are:

new Map() – creates the map.
map.set(key, value) – stores the value by the key.
map.get(key) – returns the value by the key, undefined if key doesn’t exist in map.
map.has(key) – returns true if the key exists, false otherwise.
map.delete(key) – removes the element (the key/value pair) by the key.
map.clear() – removes everything from the map.
map.size – returns the current element count.
For instance:

 let map = new Map();

map.set('1', 'str1');   // a string key
map.set(1, 'num1');     // a numeric key
map.set(true, 'bool1'); // a boolean key

// remember the regular Object? it would convert keys to string
// Map keeps the type, so these two are different:
alert( map.get(1)   ); // 'num1'
alert( map.get('1') ); // 'str1'

alert( map.size ); // 3
As we can see, unlike objects, keys are not converted to strings. Any type of key is possible.

//Yani 1 (number) ile '1' (string) farklı anahtarlardır.
❗ Oysa Object kullanırsan 1 ve '1' aynı key gibi davranır çünkü key'ler string'e dönüştürülür.

 * 
 */


/*
map[key] isn’t the right way to use a Map
Although map[key] also works, e.g. we can set map[key] = 2, this is treating map as a plain 
JavaScript object, so it implies all corresponding limitations (only string/symbol keys and 
so on).

//Uyarı: map[key] Yanlış Kullanım
//map[key] = 2; // Bu da çalışır gibi görünür ama aslında Map'in özelliği değil
//Bu şekilde kullanırsan Map’in gerçek yeteneklerinden (örneğin non-string key kullanımı) yararlanamazsın.
//Bu durumda, Map'i sıradan bir object gibi kullanmış olursun. Ve bu, Map’in amacını bozar.


So we should use map methods: set, get and so on.

Map can also use objects as keys.

let john = { name: "John" };

// for every user, let's store their visits count
let visitsCountMap = new Map();

// john is the key for the map
visitsCountMap.set(john, 123);

alert( visitsCountMap.get(john) ); // 123
*/

//john bir nesne (object)
//Map nesneyi referans olarak saklar.
//Aynı nesneyle get() yaparsan, değeri geri alırsın. ✅

/**
 * let john = { name: "John" };
let ben = { name: "Ben" };

let visitsCountObj = {}; // try to use an object

visitsCountObj[ben] = 234; // try to use ben object as the key
visitsCountObj[john] = 123; // try to use john object as the key, ben object will get replaced

// That's what got written!
alert( visitsCountObj["[object Object]"] ); // 123
As visitsCountObj is an object, it converts all Object keys, such as john and ben above, to
 same string "[object Object]". Definitely not what we want.


 //visitsCountObj[ben] demek aslında visitsCountObj["[object Object]"] demek.
//Çünkü Object key olarak object alınca otomatik olarak stringe çevirir → "[object Object]".
//Yani john da ben de aynı string key’e dönüşür → veri çakışır, son yazılan kazanır.


 * 
 */

//Özellik	                Map	                                              Object
//Key türü	              Her tür (object, number, ...)	                    Sadece string veya symbol
//Sıralama	              Eklenme sırasına göre	                            Key sırası garanti edilmez
//İdeal kullanım	        Veri saklama / lookup	                            Genel yapı/değişken saklama
//JSON ile uyum	          ❌ JSON.stringify edilemez	                        ✅ JSON.stringify ile uyumlu
//Yineleme (for...of)   	✅ map.entries() ile	                              ❌ (sadece for...in)
//size özelliği	          ✅ map.size	                                      ❌ Object.keys(obj).length gerekir

//Eğer key'ler karmaşık türler (object, number, boolean) olacaksa → Map kullan.
//Eğer basit key-değer ilişkisi ve JSON uyumluluğu gerekiyorsa → Object yeterlidir.
//Map, modern ve daha güçlüdür; büyük veri saklamaları için daha uygundur.



 /**
  * How Map compares keys
To test keys for equivalence, Map uses the algorithm SameValueZero. It is roughly the same
 as strict equality ===, but the difference is that NaN is considered equal to NaN. So 
 NaN can be used as the key as well.

This algorithm can’t be changed or customized.
  * 
  */

/*
Every map.set call returns the map itself, so we can “chain” the calls:

map.set('1', 'str1')
  .set(1, 'num1')
  .set(true, 'bool1');
*/

/*
Iteration over Map

For looping over a map, there are 3 methods:

map.keys() – returns an iterable for keys,
map.values() – returns an iterable for values,
map.entries() – returns an iterable for entries [key, value], it’s used by default in for..of.

let recipeMap = new Map([
  ['cucumber', 500],
  ['tomatoes', 350],
  ['onion',    50]
]);

// iterate over keys (vegetables)
for (let vegetable of recipeMap.keys()) {
  alert(vegetable); // cucumber, tomatoes, onion
}

// iterate over values (amounts)
for (let amount of recipeMap.values()) {
  alert(amount); // 500, 350, 50
}

// iterate over [key, value] entries
for (let entry of recipeMap) { // the same as of recipeMap.entries()
  alert(entry); // cucumber,500 (and so on)
}
*/

/*
The insertion order is used
The iteration goes in the same order as the values were inserted. Map preserves this order,
 unlike a regular Object.

Besides that, Map has a built-in forEach method, similar to Array:

// runs the function for each (key, value) pair
recipeMap.forEach( (value, key, map) => {
  alert(`${key}: ${value}`); // cucumber: 500 etc
});
*/

/*
If we have a plain object, and we’d like to create a Map from it, then we can use built-in
 method Object.entries(obj) that returns an array of key/value pairs for an object exactly 
 in that format.

So we can create a map from an object like this:

 let obj = {
  name: "John",
  age: 30
};

let map = new Map(Object.entries(obj));

alert( map.get('name') ); // John
Here, Object.entries returns the array of key/value pairs: [ ["name","John"], ["age", 30] ].
 That’s what Map needs.
*/

/*
Object.fromEntries: Object from Map

We’ve just seen how to create Map from a plain object with Object.entries(obj).

There’s Object.fromEntries method that does the reverse: given an array of [key, value] pairs,
it creates an object from them:

 let prices = Object.fromEntries([
  ['banana', 1],
  ['orange', 2],
  ['meat', 4]
]);

// now prices = { banana: 1, orange: 2, meat: 4 }

alert(prices.orange); // 2
We can use Object.fromEntries to get a plain object from Map.

E.g. we store the data in a Map, but we need to pass it to a 3rd-party code that expects a plain
object.

Here we go:

 let map = new Map();
map.set('banana', 1);
map.set('orange', 2);
map.set('meat', 4);

let obj = Object.fromEntries(map.entries()); // make a plain object (*)

// done!
// obj = { banana: 1, orange: 2, meat: 4 }

alert(obj.orange); // 2
A call to map.entries() returns an iterable of key/value pairs, exactly in the right format for 
Object.fromEntries.

We could also make line (*) shorter:

let obj = Object.fromEntries(map); // omit .entries()
That’s the same, because Object.fromEntries expects an iterable object as the argument. Not 
necessarily an array. And the standard iteration for map returns same key/value pairs as 
map.entries(). So we get a plain object with same key/values as the map.
*/
// Map, aynı key ile tekrar eklenmesine izin verir, ancak bu bir güncelleme olur, yeni bir ekleme sayılmaz.

/*Set

A Set is a special type collection – “set of values” (without keys), where each value may occur
 only once.
Its main methods are:
new Set([iterable]) – creates the set, and if an iterable object is provided (usually an array),
 copies values from it into the set.
set.add(value) – adds a value, returns the set itself.
set.delete(value) – removes the value, returns true if value existed at the moment of the call,
 otherwise false.
set.has(value) – returns true if the value exists in the set, otherwise false.
set.clear() – removes everything from the set.
set.size – is the elements count.
The main feature is that repeated calls of set.add(value) with the same value don’t do anything. 
That’s the reason why each value appears in a Set only once.

For example, we have visitors coming, and we’d like to remember everyone. But repeated visits 
should not lead to duplicates. A visitor must be “counted” only once.

Set is just the right thing for that:

let set = new Set();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

// visits, some users come multiple times
set.add(john);
set.add(pete);
set.add(mary);
set.add(john);
set.add(mary);

// set keeps only unique values
alert( set.size ); // 3

for (let user of set) {
  alert(user.name); // John (then Pete and Mary)
}
The alternative to Set could be an array of users, and the code to check for duplicates on every
 insertion using arr.find. But the performance would be much worse, because this method walks 
 through the whole array checking every element. Set is much better optimized internally for
 uniqueness checks.

//set te tekrara izin vermiyor, benzersiz datalar iceriyor
*/

/*

Iteration over Set

We can loop over a set either with for..of or using forEach:

 let set = new Set(["oranges", "apples", "bananas"]);

for (let value of set) alert(value);

// the same with forEach:
set.forEach((value, valueAgain, set) => {
  alert(value);
});
Note the funny thing. The callback function passed in forEach has 3 arguments: a value, then 
the same value valueAgain, and then the target object. Indeed, the same value appears in the
 arguments twice.

That’s for compatibility with Map where the callback passed forEach has three arguments. Looks 
a bit strange, for sure. But this may help to replace Map with Set in certain cases with ease, 
and vice versa.

The same methods Map has for iterators are also supported:

set.keys() – returns an iterable object for values,
set.values() – same as set.keys(), for compatibility with Map,
set.entries() – returns an iterable object for entries [value, value], exists for compatibility
 with Map.
*/

/*
The differences from a regular Object:
Any keys, objects can be keys.
Additional convenient methods, the size property.

Iteration over Map and Set is always in the insertion order, so we can’t say that these
 collections are unordered, but we can’t reorder elements or directly get an element by 
 its number.


*/

//valueAgain neden var?

//Sadece Map ile uyum için. Map.forEach((value, key) => {...}) yapısı ile uyumluluk sağlamak için 
// Set’te de iki kez aynı değer gönderilir: (value, value, set).

//Map, gelişmiş bir Object alternatifi gibi çalışır. Karmaşık veri saklamada idealdir.
//Set, hızlıca benzersiz veri toplamak için kullanılır. Özellikle büyük veri kümelerinde 
// (ör. kullanıcılar, etiketler, kimlikler) çok etkilidir.

/*
function unique(arr) {
    return Array.from(new Set(arr));

}

let values = ["Hare", "Krishna", "Hare", "Krishna",
  "Krishna", "Krishna", "Hare", "Hare", ":-O"
];

alert( unique(values) ); // Hare, Krishna, :-O

*/

/*
Anagrams are words that have the same number of same letters, but in different order.


We’ll use the letter-sorted variants as map keys to store only one value per each key:

 function aclean(arr) {
  let map = new Map();

  for (let word of arr) {
    // split the word by letters, sort them and join back
    let sorted = word.toLowerCase().split('').sort().join(''); // (*)
    map.set(sorted, word);
  }

  return Array.from(map.values());
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) );
Letter-sorting is done by the chain of calls in the line (*).


//4. word = "PAN"
//"PAN" → "pan" → ["p", "a", "n"] → ["a", "n", "p"] → "anp"
//→ sorted = "anp"
//map.set("anp", "PAN")
//"anp" zaten vardı, yeni değerle güncellenir.

For convenience let’s split it into multiple lines:

let sorted = word // PAN
  .toLowerCase() // pan
  .split('') // ['p','a','n']
  .sort() // ['a','n','p']
  .join(''); // anp
Two different words 'PAN' and 'nap' receive the same letter-sorted form 'anp'.

The next line put the word into the map:

map.set(sorted, word);
If we ever meet a word the same letter-sorted form again, then it would overwrite the previous 
value with the same key in the map. So we’ll always have at maximum one word per letter-form.

At the end Array.from(map.values()) takes an iterable over map values (we don’t need keys in the 
result) and returns an array of them.

Here we could also use a plain object instead of the Map, because keys are strings.

That’s how the solution can look:

 function aclean(arr) {
  let obj = {};

  for (let i = 0; i < arr.length; i++) {
    let sorted = arr[i].toLowerCase().split("").sort().join("");
    obj[sorted] = arr[i];
  }

  return Object.values(obj);
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) );
*/

/*
We’d like to get an array of map.keys() in a variable and then apply array-specific methods 
to it, e.g. .push.

But that doesn’t work:
That’s because map.keys() returns an iterable, but not an array.
//arraylerde pushlama islemi oluyor maplerde olmuyor 
We can convert it into an array using Array.from:

 let map = new Map();

map.set("name", "John");

let keys = Array.from(map.keys());

keys.push("more");

alert(keys); // name, more


*/

/*
WeakMap and WeakSet
As we know from the chapter Garbage collection, JavaScript engine keeps a value in memory while 
it is “reachable” and can potentially be used.

For instance:

let john = { name: "John" };

// the object can be accessed, john is the reference to it

// overwrite the reference
john = null;

// the object will be removed from memory
Usually, properties of an object or elements of an array or another data structure are considered 
reachable and kept in memory while that data structure is in memory.

For instance, if we put an object into an array, then while the array is alive, the object will
 be alive as well, even if there are no other references to it.

Like this:

let john = { name: "John" };

let array = [ john ];

john = null; // overwrite the reference

// the object previously referenced by john is stored inside the array
// therefore it won't be garbage-collected
// we can get it as array[0]
Similar to that, if we use an object as the key in a regular Map, then while the Map exists,
 that object exists as well. It occupies memory and may not be garbage collected.

For instance:

let john = { name: "John" };

let map = new Map();
map.set(john, "...");

john = null; // overwrite the reference

// john is stored inside the map,
// we can get it by using map.keys()
WeakMap is fundamentally different in this aspect. It doesn’t prevent garbage-collection of key 
objects.


*/

/*
WeakMap

The first difference between Map and WeakMap is that keys must be objects, not primitive values:

 let weakMap = new WeakMap();

let obj = {};

weakMap.set(obj, "ok"); // works fine (object key)

// can't use a string as the key
weakMap.set("test", "Whoops"); // Error, because "test" is not an object
Now, if we use an object as the key in it, and there are no other references to that 
object – it will be removed from memory (and from the map) automatically.

let john = { name: "John" };

let weakMap = new WeakMap();
weakMap.set(john, "...");

john = null; // overwrite the reference

// john is removed from memory!
Compare it with the regular Map example above. Now if john only exists as the key of
 WeakMap – it will be automatically deleted from the map (and memory).

WeakMap does not support iteration and methods keys(), values(), entries(), so there’s no way 
to get all keys or values from it.

WeakMap has only the following methods:

weakMap.set(key, value)
weakMap.get(key)
weakMap.delete(key)
weakMap.has(key)
Why such a limitation? That’s for technical reasons. If an object has lost all other references 
(like john in the code above), then it is to be garbage-collected automatically. But technically
 it’s not exactly specified when the cleanup happens.

The JavaScript engine decides that. It may choose to perform the memory cleanup immediately or
 to wait and do the cleaning later when more deletions happen. So, technically, the current 
 element count of a WeakMap is not known. The engine may have cleaned it up or not, or did it
  partially. For that reason, methods that access all keys/values are not supported.


*/


/*

//WeakMap Ne Yapar?

let john = { name: "John" };
let weakMap = new WeakMap();

weakMap.set(john, "some value");
john = null;
✅ Fark:
WeakMap, nesne referansını zayıf (weak) tutar.
Artık başka bir yerden erişilemiyorsa, nesne garbage collected olur.
WeakMap içindeki veri de otomatik silinir.
❗ Ama dikkat:
WeakMap:
yalnızca nesne türü key kabul eder (string değil!),
içinde kaç öğe olduğunu göremezsin (no .size, .keys()),
sadece .get, .set, .has, .delete metodları vardır.
🎯 Neden Kullanılır?

Örnek: Nesne ile ilgili "ek bilgi" tutmak istiyoruz ama nesne silinince bu bilgi de silinsin istiyoruz.
let john = { name: "John" };

let visitsCountMap = new WeakMap();
visitsCountMap.set(john, 123);

// sonradan:
john = null; // kullanıcı gitti

// john bellekte silinir → WeakMap içindeki bilgi de silinir
Avantaj: Belleği manuel temizlemene gerek yok. JS motoru otomatik siler.

*/


/*
Use case: additional data

The main area of application for WeakMap is an additional data storage.

If we’re working with an object that “belongs” to another code, maybe even a third-party library,
 and would like to store some data associated with it, that should only exist while the object is alive
  – then WeakMap is exactly what’s needed.

We put the data to a WeakMap, using the object as the key, and when the object is garbage collected, 
that data will automatically disappear as well.

weakMap.set(john, "secret documents");
// if john dies, secret documents will be destroyed automatically
Let’s look at an example.

For instance, we have code that keeps a visit count for users. The information is stored in a map: 
a user object is the key and the visit count is the value. When a user leaves (its object gets 
garbage collected), we don’t want to store their visit count anymore.

Here’s an example of a counting function with Map:

// 📁 visitsCount.js
let visitsCountMap = new Map(); // map: user => visits count

// increase the visits count
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
And here’s another part of the code, maybe another file using it:

// 📁 main.js
let john = { name: "John" };

countUser(john); // count his visits

// later john leaves us
john = null;
Now, john object should be garbage collected, but remains in memory, as it’s a key in 
visitsCountMap.

We need to clean visitsCountMap when we remove users, otherwise it will grow in memory 
indefinitely. Such cleaning can become a tedious task in complex architectures.

We can avoid it by switching to WeakMap instead:

// 📁 visitsCount.js
let visitsCountMap = new WeakMap(); // weakmap: user => visits count

// increase the visits count
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
Now we don’t have to clean visitsCountMap. After john object becomes unreachable, by all means 
except as a key of WeakMap, it gets removed from memory, along with the information by that key
 from WeakMap.

*/


/*
Use case: caching

Another common example is caching. We can store (“cache”) results from a function, 
so that future calls on the same object can reuse it.

To achieve that, we can use Map (not optimal scenario):

 // 📁 cache.js
let cache = new Map();

// calculate and remember the result
function process(obj) {
  if (!cache.has(obj)) {
    let result =   obj;  // calculations of the result for

    cache.set(obj, result);
    return result;
  }

  return cache.get(obj);
}

// Now we use process() in another file:

// 📁 main.js
let obj = { }; //let's say we have an object 

let result1 = process(obj); // calculated

// ...later, from another place of the code...
let result2 = process(obj); // remembered result taken from cache

// ...later, when the object is not needed any more:
obj = null;

alert(cache.size); // 1 (Ouch! The object is still in cache, taking memory!)
For multiple calls of process(obj) with the same object, it only calculates the result the first time,
 and then just takes it from cache. The downside is that we need to clean cache when the object is not needed any more.

If we replace Map with WeakMap, then this problem disappears. The cached result will be removed from 
memory automatically after the object gets garbage collected.

 // 📁 cache.js
let cache = new WeakMap();

// calculate and remember the result
function process(obj) {
  if (!cache.has(obj)) {
    let result =  obj; //calculate the result for 

    cache.set(obj, result);
    return result;
  }

  return cache.get(obj);
}

// 📁 main.js
let obj = {}; // some object 

let result1 = process(obj);
let result2 = process(obj);

// ...later, when the object is not needed any more:
obj = null;

// Can't get cache.size, as it's a WeakMap,
// but it's 0 or soon be 0
// When obj gets garbage collected, cached data will be removed as well

*/

/*
WeakSet

WeakSet behaves similarly:

It is analogous to Set, but we may only add objects to WeakSet (not primitives).
An object exists in the set while it is reachable from somewhere else.
Like Set, it supports add, has and delete, but not size, keys() and no iterations.
Being “weak”, it also serves as additional storage. But not for arbitrary data, rather for 
“yes/no” facts. A membership in WeakSet may mean something about the object.

For instance, we can add users to WeakSet to keep track of those who visited our site:

 let visitedSet = new WeakSet();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

visitedSet.add(john); // John visited us
visitedSet.add(pete); // Then Pete
visitedSet.add(john); // John again

// visitedSet has 2 users now

// check if John visited?
alert(visitedSet.has(john)); // true

// check if Mary visited?
alert(visitedSet.has(mary)); // false

john = null;

// visitedSet will be cleaned automatically
The most notable limitation of WeakMap and WeakSet is the absence of iterations, and the 
inability to get all current content. That may appear inconvenient, but does not prevent
 WeakMap/WeakSet from doing their main job – be an “additional” storage of data for objects
  which are stored/managed at another place.
*/

/*
WeakMap is Map-like collection that allows only objects as keys and removes them together with 
associated value once they become inaccessible by other means.
WeakSet is Set-like collection that stores only objects and removes them once they become 
inaccessible by other means.
Their main advantages are that they have weak reference to objects, so they can easily be 
removed by garbage collector.
That comes at the cost of not having support for clear, size, keys, values…
WeakMap and WeakSet are used as “secondary” data structures in addition to the “primary”
 object storage. Once the object is removed from the primary storage, if it is only found 
 as the key of WeakMap or in a WeakSet, it will be cleaned up automatically.
WeakMap, yalnızca nesnelere anahtar olarak izin veren ve diğer yollarla erişilemez hale 
geldiklerinde ilişkili değerle birlikte kaldıran Harita benzeri bir koleksiyondur.
WeakSet, yalnızca nesneleri depolayan ve diğer yollarla erişilemez hale geldiklerinde kaldıran 
Set benzeri bir koleksiyondur.
Başlıca avantajları, nesnelere zayıf referanslara sahip olmalarıdır, bu nedenle çöp toplayıcı 
tarafından kolayca kaldırılabilirler.
Bunun bedeli, clear, size, keys, values… desteğinin olmamasıdır.
WeakMap ve WeakSet, “birincil” nesne depolamasına ek olarak “ikincil” veri yapıları olarak 
kullanılır. Nesne birincil depolama alanından kaldırıldığında, yalnızca WeakMap anahtarı olarak
 veya bir WeakSet'te bulunursa, otomatik olarak temizlenir.
 */



 /*
 Your code can access it, but the messages are managed by someone else’s code. New messages are 
 added, old ones are removed regularly by that code, and you don’t know the exact moments when 
 it happens.
Now, which data structure could you use to store information about whether the message “has been
 read”? The structure must be well-suited to give the answer “was it read?” for the given message
  object.
P.S. When a message is removed from messages, it should disappear from your structure as well.
P.P.S. We shouldn’t modify message objects, add our properties to them. As they are managed by 
someone else’s code, that may lead to bad consequences.
*/

/*
Özellik / Farklar	                WeakMap	                                         WeakSet
Anahtar (key)	                  Sadece nesne (object)	                         Sadece nesne (object)
Değer (value)	                    Her anahtar için bir değer saklar	            Sadece var/yok bilgisi (true/false gibi)
Yineleme (iterasyon)	              ❌ Mümkün değil (for...of yok)              	❌ Mümkün değil
.size, .keys(), vs.	                  ❌ Yok                                        	❌ Yok
Bellek yönetimi (GC)	              Anahtar nesne silinirse, değeri de gider	    Nesne silinirse, WeakSet'ten de silinir
Kullanım amacı	                  Ek veri saklama (metadata, cache)	                Nesne var mı/yok mu kontrolü

*/


/*
Kullanım Durumu	                                                Tercih Edilecek Yapı
Nesneye ait ek bilgi saklamak (örneğin: user => visits)         	✅ WeakMap
Hesaplanmış verileri nesneyle eşlemek (cache)	                    ✅ WeakMap
Nesnelerin varlığını kontrol etmek (ziyaret etti mi?)           	✅ WeakSet
Bir nesnenin "etiketlenip etiketlenmediğini" kontrol etmek	      ✅ WeakSet
Bellek sızıntısı riski olan geçici veri tutmak	                  ✅ Her ikisi
*/



/*
Soru	                                                         Cevap	                      Açıklama
Nesneye özel bilgi saklamak mı istiyorsun?	                WeakMap	                obj => value eşleşmesi gerekir
Sadece "bu nesne burada var mı?" diye mi kontrol edeceksin?	WeakSet             	Ek veri gerekmiyorsa WeakSet yeterlidir
Otomatik temizlik önemli mi?	                              Her ikisi	Weak referanslar sayesinde GC tarafından silinirler
Döngüyle veri gezmek gerekiyor mu?	                        ❌ Bunlar uygun değil	Map/Set tercih etmen gerekebilir
*/

/*🧭 WeakMap Metotları

set(key, value)	Anahtar olarak bir nesne ver, ona karşılık bir değer sakla
get(key)	Anahtar için saklanan değeri döndürür (yoksa undefined)
has(key)	Anahtar WeakMap’te var mı? → true/false
delete(key)	Belirtilen anahtarı ve ilişkili değeri siler



🚦 WeakSet Metotları

add(value)	Sadece nesne türünden bir öğe ekler
has(value)	Belirtilen nesne WeakSet’te var mı? → true/false
delete(value)	Belirtilen nesneyi WeakSet’ten siler
*/

/*
Hem WeakMap hem de WeakSet şunlara sahip değildir:

Metot /                Özellik	Neden yok?
.size                 	Bellekte ne zaman silineceği belirsiz
.keys(), .values()	    Aynı sebepten iterasyon yapılamaz
forEach, for...of      Aynı şekilde içerik güvenilir değildir
.clear()	          Bilerek eklenmemiştir (elle tümünü silmek için)

*/


/*
let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
];

let readMessages = new WeakSet();

// two messages have been read
readMessages.add(messages[0]);
readMessages.add(messages[1]);
// readMessages has 2 elements

// ...let's read the first message again!
readMessages.add(messages[0]);
// readMessages still has 2 unique elements

// answer: was the message[0] read?
alert("Read message 0: " + readMessages.has(messages[0])); // true

messages.shift();
// now readMessages has 1 element (technically memory may be cleaned later)
The WeakSet allows to store a set of messages and easily check for the existence of a message 
in it.

It cleans up itself automatically. The tradeoff is that we can’t iterate over it, can’t get 
“all read messages” from it directly. But we can do it by iterating over all messages and 
filtering those that are in the set.

Another, different solution could be to add a property like message.isRead=true to a message 
after it’s read. As messages objects are managed by another code, that’s generally discouraged,
 but we can use a symbolic property to avoid conflicts.
WeakSet, bir mesaj kümesini depolamayı ve içinde bir mesajın varlığını kolayca kontrol etmeyi sağlar.

Kendini otomatik olarak temizler. Bunun dezavantajı, üzerinde yineleme yapamamamız, doğrudan 
ondan "tüm okunan mesajları" alamamamızdır. Ancak bunu tüm mesajlar üzerinde yineleme yaparak 
ve kümede olanları filtreleyerek yapabiliriz.

Başka bir farklı çözüm, bir mesaj okunduktan sonra ona message.isRead=true gibi bir özellik 
eklemek olabilir. Mesaj nesneleri başka bir kod tarafından yönetildiğinden, bu genellikle 
önerilmez, ancak çakışmaları önlemek için sembolik bir özellik kullanabiliriz.

Like this:

// the symbolic property is only known to our code
let isRead = Symbol("isRead");
messages[0][isRead] = true;
Now third-party code probably won’t see our extra property.

Although symbols allow to lower the probability of problems, using WeakSet is better from the
 architectural point of view.
 */

/*
The question now is: which data structure you’d suggest to store the information: “when the
 message was read?”.

In the previous task we only needed to store the “yes/no” fact. Now we need to store the date, 
and it should only remain in memory until the message is garbage collected.

P.S. Dates can be stored as objects of built-in Date class, that we’ll cover later.

let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
];

let readMap = new WeakMap();

readMap.set(messages[0], new Date(2017, 1, 1));
// Date object we'll study later

*/

/*
Object.keys(obj) – returns an array of keys.
Object.values(obj) – returns an array of values.
Object.entries(obj) – returns an array of [key, value] pairs.
Please note the distinctions (compared to map for example):

Map	Object
Call syntax	map.keys()	Object.keys(obj), but not obj.keys()
Returns	iterable	“real” Array
The first difference is that we have to call Object.keys(obj), and not obj.keys().

Why so? The main reason is flexibility. Remember, objects are a base of all complex structures
 in JavaScript. So we may have an object of our own like data that implements its own
  data.values() method. And we still can call Object.values(data) on it.

The second difference is that Object.* methods return “real” array objects, not just an iterable.
 That’s mainly for historical reasons.

For instance:


Object.keys(user) = ["name", "age"]
Object.values(user) = ["John", 30]
Object.entries(user) = [ ["name","John"], ["age",30] ]
Here’s an example of using Object.values to loop over property values:

 let user = {
  name: "John",
  age: 30
};

// loop over values
for (let value of Object.values(user)) {
  alert(value); // John, then 30
}
*/


/*
Object.keys/values/entries ignore symbolic properties
Just like a for..in loop, these methods ignore properties that use Symbol(...) as keys.

Usually that’s convenient. But if we want symbolic keys too, then there’s a separate method 
Object.getOwnPropertySymbols that returns an array of only symbolic keys. Also, there exist 
a method Reflect.ownKeys(obj) that returns all keys.
*/

/*
Transforming objects

Objects lack many methods that exist for arrays, e.g. map, filter and others.

If we’d like to apply them, then we can use Object.entries followed by Object.fromEntries:

Use Object.entries(obj) to get an array of key/value pairs from obj.
Use array methods on that array, e.g. map, to transform these key/value pairs.
Use Object.fromEntries(array) on the resulting array to turn it back into an object.
For example, we have an object with prices, and would like to double them:

 let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};

let doublePrices = Object.fromEntries(
  // convert prices to array, map each key/value pair into another pair
  // and then fromEntries gives back the object
  Object.entries(prices).map(entry => [entry[0], entry[1] * 2])
);

alert(doublePrices.meat); // 8
*/

/*
function sumSalaries(salaries) {

  let sum = 0;
  for (let salary of Object.values(salaries)) {
    sum += salary;
  }

  return sum; // 650
}

let salaries = {
  "John": 100,
  "Pete": 300,
  "Mary": 250
};

alert( sumSalaries(salaries) ); // 650
Or, optionally, we could also get the sum using Object.values and reduce:

// reduce loops over array of salaries,
// adding them up
// and returns the result
function sumSalaries(salaries) {
  return Object.values(salaries).reduce((a, b) => a + b, 0) // 650
}
*/

/*
function count(obj) {
  return Object.keys(obj).length;
}
let user = {
  name: 'John',
  age: 30
};

alert( count(user) ); // 2

*/


/*
The two most used data structures in JavaScript are Object and Array.
Objects allow us to create a single entity that stores data items by key.
Arrays allow us to gather data items into an ordered list.
However, when we pass these to a function, we may not need all of it. The function might only
 require certain elements or properties.
Destructuring assignment is a special syntax that allows us to “unpack” arrays or objects into 
a bunch of variables, as sometimes that’s more convenient.
JavaScript'te en çok kullanılan iki veri yapısı Nesne ve Dizi'dir.
Nesneler, veri öğelerini anahtara göre depolayan tek bir varlık oluşturmamızı sağlar.
Diziler, veri öğelerini sıralı bir listede toplamamızı sağlar.
Ancak, bunları bir fonksiyona geçirdiğimizde, hepsine ihtiyacımız olmayabilir. Fonksiyon 
yalnızca belirli öğeler veya özellikler gerektirebilir.
Yapısallaştırma ataması, dizileri veya nesneleri bir dizi değişkene "açmamızı" sağlayan özel 
bir sözdizimidir, çünkü bazen bu daha uygundur.
*/

/*
Here’s an example of how an array is destructured into variables:

// we have an array with a name and surname
let arr = ["John", "Smith"]

// destructuring assignment
// sets firstName = arr[0]
// and surname = arr[1]
let [firstName, surname] = arr;

alert(firstName); // John
alert(surname);  // Smith
Now we can work with variables instead of array members.

It looks great when combined with split or other array-returning methods:

 let [firstName, surname] = "John Smith".split(' ');
alert(firstName); // John
alert(surname);  // Smith
*/

/*
“Destructuring” does not mean “destructive”.
It’s called “destructuring assignment,” because it “destructurizes” by copying items 
into variables. However, the array itself is not modified.

It’s just a shorter way to write:

// let [firstName, surname] = arr;
let firstName = arr[0];
let surname = arr[1];
*/

/*
Ignore elements using commas
Unwanted elements of the array can also be thrown away via an extra comma:

 // second element is not needed
let [firstName, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

alert( title ); // Consul
In the code above, the second element of the array is skipped, the third one is assigned to 
title, and the rest of the array items are also skipped (as there are no variables for them).
*/

/*
Works with any iterable on the right-side
…Actually, we can use it with any iterable, not only arrays:

let [a, b, c] = "abc"; // ["a", "b", "c"]
let [one, two, three] = new Set([1, 2, 3]);
That works, because internally a destructuring assignment works by iterating over the right 
value. It’s a kind of syntax sugar for calling for..of over the value to the right of = and 
assigning the values.
*/


/*
Assign to anything at the left-side
We can use any “assignables” on the left side.

For instance, an object property:

 let user = {};
[user.name, user.surname] = "John Smith".split(' ');

alert(user.name); // John
alert(user.surname); // Smith
*/

/*
Looping with .entries()
In the previous chapter, we saw the Object.entries(obj) method.

We can use it with destructuring to loop over the keys-and-values of an object:

 let user = {
  name: "John",
  age: 30
};

// loop over the keys-and-values
for (let [key, value] of Object.entries(user)) {
  alert(`${key}:${value}`); // name:John, then age:30
}
The similar code for a Map is simpler, as it’s iterable:

 let user = new Map();
user.set("name", "John");
user.set("age", "30");

// Map iterates as [key, value] pairs, very convenient for destructuring
for (let [key, value] of user) {
  alert(`${key}:${value}`); // name:John, then age:30
}
*/

/*
Swap variables trick
There’s a well-known trick for swapping values of two variables using a destructuring assignment:

 let guest = "Jane";
let admin = "Pete";

// Let's swap the values: make guest=Pete, admin=Jane
[guest, admin] = [admin, guest];

alert(`${guest} ${admin}`); // Pete Jane (successfully swapped!)
Here we create a temporary array of two variables and immediately destructure it in swapped order.

We can swap more than two variables this way.
*/

/*
The rest ‘…’

Usually, if the array is longer than the list at the left, the “extra” items are omitted.

For example, here only two items are taken, and the rest is just ignored:

 let [name1, name2] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

alert(name1); // Julius
alert(name2); // Caesar
// Further items aren't assigned anywhere
If we’d like also to gather all that follows – we can add one more parameter that gets 
“the rest” using three dots "...":

 let [name1, name2, ...rest] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

// rest is an array of items, starting from the 3rd one
alert(rest[0]); // Consul
alert(rest[1]); // of the Roman Republic
alert(rest.length); // 2
The value of rest is the array of the remaining array elements.

We can use any other variable name in place of rest, just make sure it has three dots before 
it and goes last in the destructuring assignment.

 let [name1, name2, ...titles] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
// now titles = ["Consul", "of the Roman Republic"]
*/

/*
Default values

If the array is shorter than the list of variables on the left, there will be no errors.
 Absent values are considered undefined:

 let [firstName, surname] = [];

alert(firstName); // undefined
alert(surname); // undefined
If we want a “default” value to replace the missing one, we can provide it using =:

 // default values
let [name = "Guest", surname = "Anonymous"] = ["Julius"];

alert(name);    // Julius (from array)
alert(surname); // Anonymous (default used)
Default values can be more complex expressions or even function calls. They are evaluated only 
if the value is not provided.

For instance, here we use the prompt function for two defaults:

 // runs only prompt for surname
let [name = prompt('name?'), surname = prompt('surname?')] = ["Julius"];

alert(name);    // Julius (from array)
alert(surname); // whatever prompt gets
Please note: the prompt will run only for the missing value (surname).


*/


/*
The destructuring assignment also works with objects.

We should have an existing object on the right side, that we want to split into variables. 
The left side contains an object-like “pattern” for corresponding properties. In the simplest
 case, that’s a list of variable names in {...}.

For instance:

 let options = {
  title: "Menu",
  width: 100,
  height: 200
};

let {title, width, height} = options;

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
Properties options.title, options.width and options.height are assigned to the corresponding
 variables.

The order does not matter. This works too:

// changed the order in let {...}
let {height, width, title} = { title: "Menu", height: 200, width: 100 }
The pattern on the left side may be more complex and specify the mapping between properties and 
variables.

If we want to assign a property to a variable with another name, for instance, make options.width 
go into the variable named w, then we can set the variable name using a colon:

 let options = {
  title: "Menu",
  width: 100,
  height: 200
};

// { sourceProperty: targetVariable }
let {width: w, height: h, title} = options;

// width -> w
// height -> h
// title -> title

alert(title);  // Menu
alert(w);      // 100
alert(h);      // 200
The colon shows “what : goes where”. In the example above the property width goes to w,
 property height goes to h, and title is assigned to the same name.

For potentially missing properties we can set default values using "=", like this:

 let options = {
  title: "Menu"
};

let {width = 100, height = 200, title} = options;

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
Just like with arrays or function parameters, default values can be any expressions or even 
function calls. They will be evaluated if the value is not provided.

In the code below prompt asks for width, but not for title:

 let options = {
  title: "Menu"
};

let {width = prompt("width?"), title = prompt("title?")} = options;

alert(title);  // Menu
alert(width);  // (whatever the result of prompt is)
We also can combine both the colon and equality:

 let options = {
  title: "Menu"
};

let {width: w = 100, height: h = 200, title} = options;

alert(title);  // Menu
alert(w);      // 100
alert(h);      // 200
If we have a complex object with many properties, we can extract only what we need:

 let options = {
  title: "Menu",
  width: 100,
  height: 200
};

// only extract title as a variable
let { title } = options;

alert(title); // Menu

*/


/*
The rest pattern “…”

What if the object has more properties than we have variables? Can we take some and then 
assign the “rest” somewhere?

We can use the rest pattern, just like we did with arrays. It’s not supported by some older 
browsers (IE, use Babel to polyfill it), but works in modern ones.

It looks like this:

 let options = {
  title: "Menu",
  height: 200,
  width: 100
};

// title = property named title
// rest = object with the rest of properties
let {title, ...rest} = options;

// now title="Menu", rest={height: 200, width: 100}
alert(rest.height);  // 200
alert(rest.width);   // 100
*/


/*
Gotcha if there’s no let
In the examples above variables were declared right in the assignment: let {…} = {…}. Of course,
 we could use existing variables too, without let. But there’s a catch.

This won’t work:

 let title, width, height;

// error in this line
{title, width, height} = {title: "Menu", width: 200, height: 100};
The problem is that JavaScript treats {...} in the main code flow (not inside another expression)
 as a code block. Such code blocks can be used to group statements, like this:

 {
  // a code block
  let message = "Hello";
  // ...
  alert( message );
}
So here JavaScript assumes that we have a code block, that’s why there’s an error. We want
 destructuring instead.

To show JavaScript that it’s not a code block, we can wrap the expression in parentheses (...):

 let title, width, height;

// okay now
({title, width, height} = {title: "Menu", width: 200, height: 100});

alert( title ); // Menu
*/


/*
Nested destructuring

If an object or an array contains other nested objects and arrays, we can use more complex
 left-side patterns to extract deeper portions.

In the code below options has another object in the property size and an array in the property 
items. The pattern on the left side of the assignment has the same structure to extract values 
from them:

 let options = {
  size: {
    width: 100,
    height: 200
  },
  items: ["Cake", "Donut"],
  extra: true
};

// destructuring assignment split in multiple lines for clarity
let {
  size: { // put size here
    width,
    height
  },
  items: [item1, item2], // assign items here
  title = "Menu" // not present in the object (default value is used)
} = options;

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
alert(item1);  // Cake
alert(item2);  // Donut
All properties of options object except extra which is absent in the left part, are assigned 
to corresponding variables:


Finally, we have width, height, item1, item2 and title from the default value.

Note that there are no variables for size and items, as we take their content instead.


*/

/*
Smart function parameters

There are times when a function has many parameters, most of which are optional. That’s 
especially true for user interfaces. Imagine a function that creates a menu. It may have a 
width, a height, a title, an item list and so on.

Here’s a bad way to write such a function:

function showMenu(title = "Untitled", width = 200, height = 100, items = []) {
  // ...
}
In real-life, the problem is how to remember the order of arguments. Usually, IDEs try to help 
us, especially if the code is well-documented, but still… Another problem is how to call a 
function when most parameters are ok by default.

Like this?

// undefined where default values are fine
showMenu("My Menu", undefined, undefined, ["Item1", "Item2"])
That’s ugly. And becomes unreadable when we deal with more parameters.

Destructuring comes to the rescue!

We can pass parameters as an object, and the function immediately destructurizes them into 
variables:

 // we pass object to function
let options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};

  function showMenu({title = "Untitled", width = 200, height = 100, items = []}) {
  // title, items – taken from options,
  // width, height – defaults used
  alert( `${title} ${width} ${height}` ); // My Menu 200 100
  alert( items ); // Item1, Item2
}

showMenu(options);
*/

/*
We can also use more complex destructuring with nested objects and colon mappings:

 let options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};

function showMenu({
  title = "Untitled",
  width: w = 100,  // width goes to w
  height: h = 200, // height goes to h
  items: [item1, item2] // items first element goes to item1, second to item2
}) {
  alert( `${title} ${w} ${h}` ); // My Menu 100 200
  alert( item1 ); // Item1
  alert( item2 ); // Item2
}

showMenu(options);
The full syntax is the same as for a destructuring assignment:

function({
  incomingProperty: varName = defaultValue
  ...
})
*/

/*
Then, for an object of parameters, there will be a variable varName for the property 
incomingProperty, with defaultValue by default.

Please note that such destructuring assumes that showMenu() does have an argument. If we want 
all values by default, then we should specify an empty object:

showMenu({}); // ok, all values are default

showMenu(); // this would give an error
We can fix this by making {} the default value for the whole object of parameters:

 function showMenu({ title = "Menu", width = 100, height = 200 } = {}) {
  alert( `${title} ${width} ${height}` );
}

showMenu(); // Menu 100 200
In the code above, the whole arguments object is {} by default, so there’s always something to 
destructurize.


*/

/*
let user = {
  name: "John",
  years: 30
};

let {name, years: age, isAdmin = false} = user;

alert( name ); // John
alert( age ); // 30
alert( isAdmin ); // false
*/

/*
function topSalary(salaries) {

  let maxSalary = 0;
  let maxName = null;

  for(const [name, salary] of Object.entries(salaries)) {
    if (maxSalary < salary) {
      maxSalary = salary;
      maxName = name;
    }
  }

  return maxName;
}
*/

//date and time
//we can use it to store creation/modification times, to measure time, or just to print out 
// the current date.


/*
new Date()
Without arguments – create a Date object for the current date and time:

 let now = new Date();
alert( now ); // shows current date/time

*/

/*
new Date(milliseconds)
Create a Date object with the time equal to number of milliseconds (1/1000 of a second) passed 
after the Jan 1st of 1970 UTC+0.

 // 0 means 01.01.1970 UTC+0
let Jan01_1970 = new Date(0);
alert( Jan01_1970 );

// now add 24 hours, get 02.01.1970 UTC+0
let Jan02_1970 = new Date(24 * 3600 * 1000);
alert( Jan02_1970 );
An integer number representing the number of milliseconds that has passed since the beginning of
 1970 is called a timestamp.

It’s a lightweight numeric representation of a date. We can always create a date from a timestamp 
using new Date(timestamp) and convert the existing Date object to a timestamp using the 
date.getTime() method
*/

/*
Dates before 01.01.1970 have negative timestamps, e.g.:

 // 31 Dec 1969
let Dec31_1969 = new Date(-24 * 3600 * 1000);
alert( Dec31_1969 );
*/

/*
new Date(datestring)
If there is a single argument, and it’s a string, then it is parsed automatically. The 
algorithm is the same as Date.parse uses, we’ll cover it later.

 let date = new Date("2017-01-26");
alert(date);
// The time is not set, so it's assumed to be midnight GMT and
// is adjusted according to the timezone the code is run in
// So the result could be
// Thu Jan 26 2017 11:00:00 GMT+1100 (Australian Eastern Daylight Time)
// or
// Wed Jan 25 2017 16:00:00 GMT-0800 (Pacific Standard Time)
*/

/*
new Date(year, month, date, hours, minutes, seconds, ms)
Create the date with the given components in the local time zone. Only the first two arguments 
are obligatory.

The year should have 4 digits. For compatibility, 2 digits are also accepted and considered 19xx,
e.g. 98 is the same as 1998 here, but always using 4 digits is strongly encouraged.
The month count starts with 0 (Jan), up to 11 (Dec).
The date parameter is actually the day of month, if absent then 1 is assumed.
If hours/minutes/seconds/ms is absent, they are assumed to be equal 0.
For instance:

new Date(2011, 0, 1, 0, 0, 0, 0); // 1 Jan 2011, 00:00:00
new Date(2011, 0, 1); // the same, hours etc are 0 by default
The maximal precision is 1 ms (1/1000 sec):

 let date = new Date(2011, 0, 1, 2, 3, 4, 567);
alert( date ); // 1.01.2011, 02:03:04.567
*/

/*
Access date components

There are methods to access the year, month and so on from the Date object:

getFullYear()
Get the year (4 digits)
getMonth()
Get the month, from 0 to 11.
getDate()
Get the day of month, from 1 to 31, the name of the method does look a little bit strange.
getHours(), getMinutes(), getSeconds(), getMilliseconds()
Get the corresponding time components.
Not getYear(), but getFullYear()
Many JavaScript engines implement a non-standard method getYear(). This method is deprecated. 
It returns 2-digit year sometimes. Please never use it. There is getFullYear() for the year.
getDay()
Get the day of week, from 0 (Sunday) to 6 (Saturday). The first day is always Sunday, 
in some countries that’s not so, but can’t be changed.

*/


/*
All the methods above return the components relative to the local time zone.

There are also their UTC-counterparts, that return day, month, year and so on for the time
 zone UTC+0: getUTCFullYear(), getUTCMonth(), getUTCDay(). Just insert the "UTC" right after
  "get".

If your local time zone is shifted relative to UTC, then the code below shows different hours:

 // current date
let date = new Date();

// the hour in your current time zone
alert( date.getHours() );

// the hour in UTC+0 time zone (London time without daylight savings)
alert( date.getUTCHours() );
Besides the given methods, there are two special ones that do not have a UTC-variant:

getTime()
Returns the timestamp for the date – a number of milliseconds passed from the January 1st
of 1970 UTC+0.

getTimezoneOffset()
Returns the difference between UTC and the local time zone, in minutes:

 // if you are in timezone UTC-1, outputs 60
// if you are in timezone UTC+3, outputs -180
alert( new Date().getTimezoneOffset() );
*/

/*
Setting date components

The following methods allow to set date/time components:

setFullYear(year, [month], [date])
setMonth(month, [date])
setDate(date)
setHours(hour, [min], [sec], [ms])
setMinutes(min, [sec], [ms])
setSeconds(sec, [ms])
setMilliseconds(ms)
setTime(milliseconds) (sets the whole date by milliseconds since 01.01.1970 UTC)
Every one of them except setTime() has a UTC-variant, for instance: setUTCHours().

As we can see, some methods can set multiple components at once, for example setHours.
 The components that are not mentioned are not modified.

For instance:

 let today = new Date();

today.setHours(0);
alert(today); // still today, but the hour is changed to 0

today.setHours(0, 0, 0, 0);
alert(today); // still today, now 00:00:00 sharp.
*/

/*
Autocorrection

The autocorrection is a very handy feature of Date objects. We can set out-of-range values, 
and it will auto-adjust itself.

For instance:

 let date = new Date(2013, 0, 32); // 32 Jan 2013 ?!?
alert(date); // ...is 1st Feb 2013!
Out-of-range date components are distributed automatically.

Let’s say we need to increase the date “28 Feb 2016” by 2 days. It may be “2 Mar” or “1 Mar” 
in case of a leap-year. We don’t need to think about it. Just add 2 days. The Date object will
 do the rest:

 let date = new Date(2016, 1, 28);
date.setDate(date.getDate() + 2);

alert( date ); // 1 Mar 2016
That feature is often used to get the date after the given period of time. For instance, let’s 
get the date for “70 seconds after now”:

 let date = new Date();
date.setSeconds(date.getSeconds() + 70);

alert( date ); // shows the correct date
We can also set zero or even negative values. For example:

 let date = new Date(2016, 0, 2); // 2 Jan 2016

date.setDate(1); // set day 1 of month
alert( date );

date.setDate(0); // min day is 1, so the last day of the previous month is assumed
alert( date ); // 31 Dec 2015
*/

/*
Date to number, date diff

When a Date object is converted to number, it becomes the timestamp same as date.getTime():

 let date = new Date();
alert(+date); // the number of milliseconds, same as date.getTime()
The important side effect: dates can be subtracted, the result is their difference in ms.

That can be used for time measurements:

 let start = new Date(); // start measuring time

// do the job
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

let end = new Date(); // end measuring time

alert( `The loop took ${end - start} ms` );

*/

/*
Date.now()

If we only want to measure time, we don’t need the Date object.

There’s a special method Date.now() that returns the current timestamp.

It is semantically equivalent to new Date().getTime(), but it doesn’t create an intermediate
 Date object. So it’s faster and doesn’t put pressure on garbage collection.

It is used mostly for convenience or when performance matters, like in games in JavaScript or 
other specialized applications.

So this is probably better:

 let start = Date.now(); // milliseconds count from 1 Jan 1970

// do the job
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

let end = Date.now(); // done

alert( `The loop took ${end - start} ms` ); // subtract numbers, not dates
*/

/*
Benchmarking

If we want a reliable benchmark of CPU-hungry function, we should be careful.

For instance, let’s measure two functions that calculate the difference between two dates:
 which one is faster?

Such performance measurements are often called “benchmarks”.

// we have date1 and date2, which function faster returns their difference in ms?
function diffSubtract(date1, date2) {
  return date2 - date1;
}

// or
function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}
These two do exactly the same thing, but one of them uses an explicit date.getTime() to get 
the date in ms, and the other one relies on a date-to-number transform. Their result is always 
the same.

So, which one is faster?
*/

/*
function diffSubtract(date1, date2) {
  return date2 - date1;
}

function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}

function bench(f) {
  let date1 = new Date(0);
  let date2 = new Date();

  let start = Date.now();
  for (let i = 0; i < 100000; i++) f(date1, date2);
  return Date.now() - start;
}

alert( 'Time of diffSubtract: ' + bench(diffSubtract) + 'ms' );
alert( 'Time of diffGetTime: ' + bench(diffGetTime) + 'ms' );
Wow! Using getTime() is so much faster! That’s because there’s no type conversion, it is much 
easier for engines to optimize.

Okay, we have something. But that’s not a good benchmark yet.

Imagine that at the time of running bench(diffSubtract) CPU was doing something in parallel, 
and it was taking resources. And by the time of running bench(diffGetTime) that work has finished.

A pretty real scenario for a modern multi-process OS.

As a result, the first benchmark will have less CPU resources than the second. That may lead
 to wrong results.
*/

/*
For more reliable benchmarking, the whole pack of benchmarks should be rerun multiple times.

function diffSubtract(date1, date2) {
  return date2 - date1;
}

function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}

function bench(f) {
  let date1 = new Date(0);
  let date2 = new Date();

  let start = Date.now();
  for (let i = 0; i < 100000; i++) f(date1, date2);
  return Date.now() - start;
}

let time1 = 0;
let time2 = 0;
// added for "heating up" prior to the main loop
bench(diffSubtract);
bench(diffGetTime);
// run bench(diffSubtract) and bench(diffGetTime) each 10 times alternating
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}

alert( 'Total time for diffSubtract: ' + time1 );
alert( 'Total time for diffGetTime: ' + time2 );

Modern JavaScript engines start applying advanced optimizations only to “hot code” that executes 
many times (no need to optimize rarely executed things). So, in the example above, first 
executions are not well-optimized. We may want to add a heat-up run:


*/

/*
Date.parse from a string

The method Date.parse(str) can read a date from a string.

The string format should be: YYYY-MM-DDTHH:mm:ss.sssZ, where:

YYYY-MM-DD – is the date: year-month-day.
The character "T" is used as the delimiter.
HH:mm:ss.sss – is the time: hours, minutes, seconds and milliseconds.
The optional 'Z' part denotes the time zone in the format +-hh:mm. A single letter Z would 
mean UTC+0.
Shorter variants are also possible, like YYYY-MM-DD or YYYY-MM or even YYYY.

The call to Date.parse(str) parses the string in the given format and returns the timestamp
 (number of milliseconds from 1 Jan 1970 UTC+0). If the format is invalid, returns NaN.

For instance:

 let ms = Date.parse('2012-01-26T13:51:50.417-07:00');

alert(ms); // 1327611110417  (timestamp)
We can instantly create a new Date object from the timestamp:

 let date = new Date( Date.parse('2012-01-26T13:51:50.417-07:00') );

alert(date);

let date = new Date( Date.parse('2026-01-26T01:01:00.9993') );
//Mon Jan 26 2026 01:01:00 GMT+0300 (GMT+03:00)
alert(date);
*/

/*
Date and time in JavaScript are represented with the Date object. We can’t create “only date” or 
“only time”: Date objects always carry both.
Months are counted from zero (yes, January is a zero month).
Days of week in getDay() are also counted from zero (that’s Sunday).
Date auto-corrects itself when out-of-range components are set. Good for adding/subtracting 
days/months/hours.
Dates can be subtracted, giving their difference in milliseconds. That’s because a Date becomes 
the timestamp when converted to a number.
Use Date.now() to get the current timestamp fast.
Note that unlike many other systems, timestamps in JavaScript are in milliseconds, not in seconds.

Sometimes we need more precise time measurements. JavaScript itself does not have a way to 
measure time in microseconds (1 millionth of a second), but most environments provide it. 
For instance, browser has performance.now() that gives the number of milliseconds from the 
start of page loading with microsecond precision (3 digits after the point):

 alert(`Loading started ${performance.now()}ms ago`);
// Something like: "Loading started 34731.26000000001ms ago"
// .26 is microseconds (260 microseconds)
// more than 3 digits after the decimal point are precision errors, only the first 3 are correct
Node.js has microtime module and other ways. Technically, almost any device and environment 
allows to get more precision, it’s just not in Date.


*/

/*
 The method date.getDay() returns the number of the weekday, starting from sunday.

Let’s make an array of weekdays, so that we can get the proper day name by its number:

 function getWeekDay(date) {
  let days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
  //date.getDay() ,5 
  return days[date.getDay()];
}

let date = new Date(2014, 0, 3); // 3 Jan 2014 
alert( getWeekDay(date) ); // FR
*/


/*
European countries have days of week starting with Monday (number 1), then Tuesday (number 2) 
and till Sunday (number 7). Write a function getLocalDay(date) that returns the “European” 
day of week for date.
function getLocalDay(date) {

  let day = date.getDay();

  if (day == 0) { // weekday 0 (sunday) is 7 in european
    day = 7;
  }

  return day;
}
let date = new Date(2012, 0, 3);  // 3 Jan 2012
alert( getLocalDay(date) );       // tuesday, should show 2

*/

/*
function getDateAgo(date, days) {
  let dateCopy = new Date(date);

  dateCopy.setDate(date.getDate() - days);
  return dateCopy.getDate();
}

let date = new Date(2015, 0, 2);

alert( getDateAgo(date, 1) ); // 1, (1 Jan 2015)
alert( getDateAgo(date, 2) ); // 31, (31 Dec 2014)
alert( getDateAgo(date, 365) ); // 2, (2 Jan 2014)
*/

/*
function getLastDayOfMonth(year, month) {
  let date = new Date(year, month + 1, 0);
  return date.getDate();
}

alert( getLastDayOfMonth(2012, 0) ); // 31
alert( getLastDayOfMonth(2012, 1) ); // 29
alert( getLastDayOfMonth(2013, 1) ); // 28
Normally, dates start from 1, but technically we can pass any number, the date will autoadjust
 itself. So when we pass 0, then it means “one day before 1st day of the month”, in other words: 
 “the last day of the previous month”.
*/

/*
To get the number of seconds, we can generate a date using the current day and time 00:00:00, 
then substract it from “now”.

The difference is the number of milliseconds from the beginning of the day, that we should 
divide by 1000 to get seconds:

 function getSecondsToday() {
  let now = new Date();

  // create an object using the current day/month/year
  let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let diff = now - today; // ms difference
  return Math.round(diff / 1000); // make seconds
}

alert( getSecondsToday() );
An alternative solution would be to get hours/minutes/seconds and convert them to seconds:

 function getSecondsToday() {
  let d = new Date();
  return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
}

alert( getSecondsToday() );
*/

/*
To get the number of milliseconds till tomorrow, we can from “tomorrow 00:00:00” substract 
the current date.

First, we generate that “tomorrow”, and then do it:

 function getSecondsToTomorrow() {
  let now = new Date();

  // tomorrow date
  let tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate()+1);

  let diff = tomorrow - now; // difference in ms
  return Math.round(diff / 1000); // convert to seconds
}
Alternative solution:

 function getSecondsToTomorrow() {
  let now = new Date();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let totalSecondsToday = (hour * 60 + minutes) * 60 + seconds;
  let totalSecondsInADay = 86400;

  return totalSecondsInADay - totalSecondsToday;
}
*/

/*
Write a function formatDate(date) that should format date as follows:

If since date passed less than 1 second, then "right now".
Otherwise, if since date passed less than 1 minute, then "n sec. ago".
Otherwise, if less than an hour, then "m min. ago".
Otherwise, the full date in the format "DD.MM.YY HH:mm". That is: "day.month.year 
hours:minutes", all in 2-digit format, e.g. 31.12.16 10:00.
For instance:

alert( formatDate(new Date(new Date - 1)) ); // "right now"

alert( formatDate(new Date(new Date - 30 * 1000)) ); // "30 sec. ago"

alert( formatDate(new Date(new Date - 5 * 60 * 1000)) ); // "5 min. ago"

// yesterday's date like 31.12.16 20:00
alert( formatDate(new Date(new Date - 86400 * 1000)) );


To get the time from date till now – let’s substract the dates.

 function formatDate(date) {
  let diff = new Date() - date; // the difference in milliseconds

  if (diff < 1000) { // less than 1 second
    return 'right now';
  }

  let sec = Math.floor(diff / 1000); // convert diff to seconds

  if (sec < 60) {
    return sec + ' sec. ago';
  }

  let min = Math.floor(diff / 60000); // convert diff to minutes
  if (min < 60) {
    return min + ' min. ago';
  }

  // format the date
  // add leading zeroes to single-digit day/month/hours/minutes
  let d = date;
  d = [
    '0' + d.getDate(),
    '0' + (d.getMonth() + 1),
    '' + d.getFullYear(),
    '0' + d.getHours(),
    '0' + d.getMinutes()
  ].map(component => component.slice(-2)); // take last 2 digits of every component

  // join the components into date
  return d.slice(0, 3).join('.') + ' ' + d.slice(3).join(':');
}

alert( formatDate(new Date(new Date - 1)) ); // "right now"

alert( formatDate(new Date(new Date - 30 * 1000)) ); // "30 sec. ago"

alert( formatDate(new Date(new Date - 5 * 60 * 1000)) ); // "5 min. ago"

// yesterday's date like 31.12.2016 20:00
alert( formatDate(new Date(new Date - 86400 * 1000)) );
Alternative solution:

 function formatDate(date) {
  let dayOfMonth = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let diffMs = new Date() - date;
  let diffSec = Math.round(diffMs / 1000);
  let diffMin = diffSec / 60;
  let diffHour = diffMin / 60;

  // formatting
  year = year.toString().slice(-2);
  month = month < 10 ? '0' + month : month;
  dayOfMonth = dayOfMonth < 10 ? '0' + dayOfMonth : dayOfMonth;
  hour = hour < 10 ? '0' + hour : hour;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  if (diffSec < 1) {
    return 'right now';
  } else if (diffMin < 1) {
    return `${diffSec} sec. ago`
  } else if (diffHour < 1) {
    return `${diffMin} min. ago`
  } else {
    return `${dayOfMonth}.${month}.${year} ${hour}:${minutes}`
  }
}
*/

//json
/*
JavaScript provides methods:

JSON.stringify to convert objects into JSON.
JSON.parse to convert JSON back into an object.
For instance, here we JSON.stringify a student:

 let student = {
  name: 'John',
  age: 30,
  isAdmin: false,
  courses: ['html', 'css', 'js'],
  spouse: null
};

let json = JSON.stringify(student);

alert(typeof json); // we've got a string!

alert(json);
// JSON-encoded object:
{
  "name": "John",
  "age": 30,
  "isAdmin": false,
  "courses": ["html", "css", "js"],
  "spouse": null
}

The method JSON.stringify(student) takes the object and converts it into a string.

The resulting json string is called a JSON-encoded or serialized or stringified or marshalled
 object. We are ready to send it over the wire or put into a plain data store.

Please note that a JSON-encoded object has several important differences from the object literal:

Strings use double quotes. No single quotes or backticks in JSON. So 'John' becomes "John".
Object property names are double-quoted also. That’s obligatory. So age:30 becomes "age":30.
JSON.stringify can be applied to primitives as well.

JSON supports following data types:

Objects { ... }
Arrays [ ... ]
Primitives:
strings,
numbers,
boolean values true/false,
null.
For instance:

 // a number in JSON is just a number
alert( JSON.stringify(1) ) // 1

// a string in JSON is still a string, but double-quoted
alert( JSON.stringify('test') ) // "test"

alert( JSON.stringify(true) ); // true

alert( JSON.stringify([1, 2, 3]) ); // [1,2,3]
JSON is data-only language-independent specification, so some JavaScript-specific object 
properties are skipped by JSON.stringify.

Namely:

Function properties (methods).
Symbolic keys and values.
Properties that store undefined.
 let user = {
  sayHi() { // ignored
    alert("Hello");
  },
  [Symbol("id")]: 123, // ignored
  something: undefined // ignored
};

alert( JSON.stringify(user) ); // {} (empty object)
Usually that’s fine. If that’s not what we want, then soon we’ll see how to customize the process.

The great thing is that nested objects are supported and converted automatically.

For instance:

 let meetup = {
  title: "Conference",
  room: {
    number: 23,
    participants: ["john", "ann"]
  }
};

alert( JSON.stringify(meetup) );
// The whole structure is stringified:
{
  "title":"Conference",
  "room":{"number":23,"participants":["john","ann"]},
}

The important limitation: there must be no circular references.

For instance:

 let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: ["john", "ann"]
};

meetup.place = room;       // meetup references room
room.occupiedBy = meetup; // room references meetup

JSON.stringify(meetup); // Error: Converting circular structure to JSON
Here, the conversion fails, because of circular reference: room.occupiedBy references meetup,
 and meetup.place references room:
*/

/*
Excluding and transforming: replacer

The full syntax of JSON.stringify is:

let json = JSON.stringify(value[, replacer, space])
value
A value to encode.
replacer
Array of properties to encode or a mapping function function(key, value).
space
Amount of space to use for formatting
Most of the time, JSON.stringify is used with the first argument only. But if we need to 
fine-tune the replacement process, like to filter out circular references, we can use the 
second argument of JSON.stringify.

If we pass an array of properties to it, only these properties will be encoded.

For instance:

 let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup references room
};

room.occupiedBy = meetup; // room references meetup

alert( JSON.stringify(meetup, ['title', 'participants']) );
// {"title":"Conference","participants":[{},{}]}
Here we are probably too strict. The property list is applied to the whole object structure. 
So the objects in participants are empty, because name is not in the list.

Let’s include in the list every property except room.occupiedBy that would cause the circular 
reference:

 let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup references room
};

room.occupiedBy = meetup; // room references meetup

alert( JSON.stringify(meetup, ['title', 'participants', 'place', 'name', 'number']) );

//{
//  "title":"Conference",
//  "participants":[{"name":"John"},{"name":"Alice"}],
//  "place":{"number":23}
//}

Now everything except occupiedBy is serialized. But the list of properties is quite long.


*/

/*
Fortunately, we can use a function instead of an array as the replacer.

The function will be called for every (key, value) pair and should return the “replaced” value, 
which will be used instead of the original one. Or undefined if the value is to be skipped.

In our case, we can return value “as is” for everything except occupiedBy. To ignore occupiedBy, 
the code below returns undefined:

 let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  participants: [{name: "John"}, {name: "Alice"}],
  place: room // meetup references room
};

room.occupiedBy = meetup; // room references meetup

alert( JSON.stringify(meetup, function replacer(key, value) {
  alert(`${key}: ${value}`);
  return (key == 'occupiedBy') ? undefined : value;
}));

/** key:value pairs that come to replacer:
:             [object Object]
title:        Conference
participants: [object Object],[object Object]
0:            [object Object]
name:         John
1:            [object Object]
name:         Alice
place:        [object Object]
number:       23
occupiedBy: [object Object]

**/
/* 
Please note that replacer function gets every key/value pair including nested objects and array
 items. It is applied recursively. The value of this inside replacer is the object that contains 
 the current property.

The first call is special. It is made using a special “wrapper object”: {"": meetup}. In other 
words, the first (key, value) pair has an empty key, and the value is the target object as
 a whole. That’s why the first line is ":[object Object]" in the example above.

The idea is to provide as much power for replacer as possible: it has a chance to analyze and
 replace/skip even the whole object if necessary.
*/

/*
Formatting: space

The third argument of JSON.stringify(value, replacer, space) is the number of spaces to use for 
pretty formatting.

Previously, all stringified objects had no indents and extra spaces. That’s fine if we want to 
send an object over a network. The space argument is used exclusively for a nice output.

Here space = 2 tells JavaScript to show nested objects on multiple lines, with indentation of 2
 spaces inside an object:

 let user = {
  name: "John",
  age: 25,
  roles: {
    isAdmin: false,
    isEditor: true
  }
};

alert(JSON.stringify(user, null, 2));
/**  two-space indents:
{
  "name": "John",
  "age": 25,
  "roles": {
    "isAdmin": false,
    "isEditor": true
  }
}
**/

/**  for JSON.stringify(user, null, 4) the result would be more indented:
{
    "name": "John",
    "age": 25,
    "roles": {
        "isAdmin": false,
        "isEditor": true
    }
}
**/

/*
The third argument can also be a string. In this case, the string is used for indentation 
instead of a number of spaces.

The space parameter is used solely for logging and nice-output purposes.


*/


/*
Custom “toJSON”

Like toString for string conversion, an object may provide method toJSON for to-JSON conversion.
 JSON.stringify automatically calls it if available.

For instance:

 let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  date: new Date(Date.UTC(2017, 0, 1)),
  room
};

alert( JSON.stringify(meetup) );
/** 
  {
    "title":"Conference",
    "date":"2017-01-01T00:00:00.000Z",  // (1)
    "room": {"number":23}               // (2)
  }
*/
/*
Here we can see that date (1) became a string. That’s because all dates have a built-in toJSON 
method which returns such kind of string.

Now let’s add a custom toJSON for our object room (2):

 let room = {
  number: 23,
  toJSON() {
    return this.number;
  }
};

let meetup = {
  title: "Conference",
  room
};

alert( JSON.stringify(room) ); // 23

alert( JSON.stringify(meetup) );
/** 
  {
    "title":"Conference",
    "room": 23
  }
*/
/*
As we can see, toJSON is used both for the direct call JSON.stringify(room) and when room is 
nested in another encoded object.

*/


/*
JSON.parse

To decode a JSON-string, we need another method named JSON.parse.

The syntax:

let value = JSON.parse(str[, reviver]);
str
JSON-string to parse.
reviver
Optional function(key,value) that will be called for each (key, value) pair and can transform 
the value.
For instance:

 // stringified array
let numbers = "[0, 1, 2, 3]";

numbers = JSON.parse(numbers);

alert( numbers[1] ); // 1
Or for nested objects:

 let userData = '{ "name": "John", "age": 35, "isAdmin": false, "friends": [0,1,2,3] }';

let user = JSON.parse(userData);

alert( user.friends[1] ); // 1
The JSON may be as complex as necessary, objects and arrays can include other objects and arrays. 
But they must obey the same JSON format.

Here are typical mistakes in hand-written JSON (sometimes we have to write it for debugging
 purposes):

let json = `{
  name: "John",                     // mistake: property name without quotes
  "surname": 'Smith',               // mistake: single quotes in value (must be double)
  'isAdmin': false                  // mistake: single quotes in key (must be double)
  "birthday": new Date(2000, 2, 3), // mistake: no "new" is allowed, only bare values
  "friends": [0,1,2,3]              // here all fine
}`;
Besides, JSON does not support comments. Adding a comment to JSON makes it invalid.

There’s another format named JSON5, which allows unquoted keys, comments etc. But this is a
 standalone library, not in the specification of the language.

The regular JSON is that strict not because its developers are lazy, but to allow easy,
 reliable and very fast implementations of the parsing algorithm.


*/


/*
Using reviver

Imagine, we got a stringified meetup object from the server.

It looks like this:

// title: (meetup title), date: (meetup date)
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';
…And now we need to deserialize it, to turn back into JavaScript object.

Let’s do it by calling JSON.parse:

 let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

let meetup = JSON.parse(str);

alert( meetup.date.getDate() ); // Error!
Whoops! An error!

The value of meetup.date is a string, not a Date object. How could JSON.parse know that it 
should transform that string into a Date?

Let’s pass to JSON.parse the reviving function as the second argument, that returns all values
 “as is”, but date will become a Date:

 let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

let meetup = JSON.parse(str, function(key, value) {
  if (key == 'date') return new Date(value);
  return value;
});

alert( meetup.date.getDate() ); // now works!
By the way, that works for nested objects as well:

 let schedule = `{
  "meetups": [
    {"title":"Conference","date":"2017-11-30T12:00:00.000Z"},
    {"title":"Birthday","date":"2017-04-18T12:00:00.000Z"}
  ]
}`;

schedule = JSON.parse(schedule, function(key, value) {
  if (key == 'date') return new Date(value);
  return value;
});

alert( schedule.meetups[1].date.getDate() ); // works!
Summary

JSON is a data format that has its own independent standard and libraries for most programming 
languages.
JSON supports plain objects, arrays, strings, numbers, booleans, and null.
JavaScript provides methods JSON.stringify to serialize into JSON and JSON.parse to read from JSON.
Both methods support transformer functions for smart reading/writing.
If an object has toJSON, then it is called by JSON.stringify.

*/


