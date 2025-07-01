// switch statement

//It gives a more descriptive way to compare a value with multiple variants.


//The value of x is checked for a strict equality to the value from the first case (that is, value1) 
// then to the second (value2) and so on.
//If the equality is found, switch starts to execute the code starting from the corresponding case, 
// until the nearest break (or until the end of switch).
//If no case is matched then the default code is executed (if it exists).

//let a = 2 + 2;

//switch (a) {
//  case 3:
//    alert( 'Too small' );
//    break;
//  case 4:
//    alert( 'Exactly!' );
//    break;
 // case 5:
//    alert( 'Too big' );
//    break;
//  default:
//    alert( "I don't know such values" );
//}

//Here the switch starts to compare a from the first case variant that is 3. The match fails/.
//Then 4. That’s a match, so the execution starts from case 4 until the nearest break.
//If there is no break then the execution continues with the next case without any checks.

//let a = 2 + 2;

//switch (a) {
//  case 3:
//    alert( 'Too small' );
//  case 4:
//    alert( 'Exactly!' );
//  case 5:
//    alert( 'Too big' );
//  default:
//   alert( "I don't know such values" );
//}

//sirayla case4,5,default calisir break olmazsa

//Any expression can be a switch/case argument
//Both switch and case allow arbitrary expressions.

// let a = "1";
//let b = 0;

//switch (+a) {
//  case b + 1:
//    alert("this runs, because +a is 1, exactly equals b+1");
//    break;

//  default:
//    alert("this doesn't run");
//}
//Here +a gives 1, that’s compared with b + 1 in case, and the corresponding code is executed.

//Grouping of “case”
//Several variants of case which share the same code can be grouped.
//For example, if we want the same code to run for case 3 and case 5:

//let a = 3;

//switch (a) {
//  case 4:
//    alert('Right!');
//    break;

//  case 3: // (*) grouped two cases
//  case 5:
//    alert('Wrong!');
//    alert("Why don't you take a math class?");
//    break;

//  default:
//    alert('The result is strange. Really.');
//}
//Now both 3 and 5 show the same message.

//The ability to “group” cases is a side effect of how switch/case works without break. 
// Here the execution of case 3 starts from the line (*) and goes through case 5, because there’s no break.

//Type matters
//Let’s emphasize that the equality check is always strict. The values must be of the same type to match.

//let arg = prompt("Enter a value?");
//switch (arg) {
//  case '0':
//  case '1':
//    alert( 'One or zero' );
//    break;

//  case '2':
//    alert( 'Two' );
//    break;

//  case 3:
//    alert( 'Never executes!' );
//    break;
//  default:
//    alert( 'An unknown value' );
//}
//For 0, 1, the first alert runs.
//For 2 the second alert runs.
//But for 3, the result of the prompt is a string "3", which is not strictly equal === to the number 3. 
// So we’ve got a dead code in case 3! The default variant will execute.

//let a = +prompt('a?', '');

//switch (a) {
//  case 0:
//    alert( 0 );
//    break;

//  case 1:
//    alert( 1 );
//    break;

//  case 2:
//  case 3:
//    alert( '2,3' );
//    break;
//}
//Please note: the break at the bottom is not required. But we put it to make the code future-proof.
//In the future, there is a chance that we’d want to add one more case, for example case 4. And if 
// we forget to add a break before it, at the end of case 3, there will be an error. So that’s a kind 
// of self-insurance.

//let age = prompt('Your age?', 18);

//switch (age) {
//  case 18:
//    alert("Won't work"); // the result of prompt is a string, not a number
//    break;

//  case "18":
//    alert("This works!");
//    break;

//  default:
//    alert("Any value not equal to one above");
//}


