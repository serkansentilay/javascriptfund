//conditional branching , if

//The if (…) statement evaluates the expression in its parentheses and converts the result to a boolean.
//A number 0, an empty string "", null, undefined, and NaN all become false. Because of that
// they are called “falsy” values.
//Other values become true, so they are called “truthy”.

//if (0) { // 0 is falsy
//  ...the code under this condition would never execute:
//}

//if (1) { // 1 is truthy
//  ...inside this condition – it always will:
//}

//We can also pass a pre-evaluated boolean value to if, like this:
//let cond = (year == 2015); // equality evaluates to true or false
//if (cond) {
//  ...
//}

//The if statement may contain an optional else block. It executes when the condition is falsy.
//let year = prompt('In which year was the ECMAScript-2015 specification published?', '');

//if (year == 2015) {
//  alert( 'You guessed it right!' );
//} else {
//  alert( 'How can you be so wrong?' ); // any value except 2015
//}

//we’d like to test several variants of a condition. The else if clause lets us do that.


//let year = prompt('In which year was the ECMAScript-2015 specification published?', '');

//if (year < 2015) {
//  alert( 'Too early...' );
//} else if (year > 2015) {
//  alert( 'Too late' );
//} else {
//  alert( 'Exactly!' );
//}
//In the code above, JavaScript first checks year < 2015. If that is falsy, it goes to the next
//  condition year > 2015. If that is also falsy, it shows the last alert.
//There can be more else if blocks. The final else is optional.

//The condition is evaluated: if it’s truthy then value1 is returned, otherwise – value2.
//let accessAllowed = (age > 18) ? true : false;

//A sequence of question mark operators ? can return a value that depends on more than one condition.
// let age = prompt('age?', 18);

//let message = (age < 3) ? 'Hi, baby!' :
//  (age < 18) ? 'Hello!' :
//  (age < 100) ? 'Greetings!' :
//  'What an unusual age!';

//alert( message );

//if (age < 3) {
//  message = 'Hi, baby!';
//} else if (age < 18) {
//  message = 'Hello!';
//} else if (age < 100) {
//  message = 'Greetings!';
//} else {
//  message = 'What an unusual age!';
//}

//Non-traditional use of ‘?’
//Sometimes the question mark ? is used as a replacement for if:
// let company = prompt('Which company created JavaScript?', '');
//(company == 'Netscape') ? alert('Right!') : alert('Wrong.');
//Depending on the condition company == 'Netscape', either the first or the second 
// expression after the ? gets executed and shows an alert.
//We don’t assign a result to a variable here. Instead, we execute different code depending on the condition.
//It’s not recommended to use the question mark operator in this way.
//The notation is shorter than the equivalent if statement, which appeals to some programmers. But it is less readable.
//Here is the same code using if for comparison:
// let company = prompt('Which company created JavaScript?', '');
//if (company == 'Netscape') {
//  alert('Right!');
//} else {
//  alert('Wrong.');
//}
//Our eyes scan the code vertically. Code blocks which span several lines are easier to 
// understand than a long, horizontal instruction set.
//The purpose of the question mark operator ? is to return one value or another depending 
// on its condition. Please use it for exactly that. Use if when you need to execute different branches of code.


//if ("0") {
//  alert( 'Hello' );
//}
//Any string except an empty one (and "0" is not empty) becomes true in the logical context.

