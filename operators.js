// operators

//unary , tekil
//let x = 1;

//x = -x;
//alert( x ); // -1, unary negation was applied

//let x = 1, y = 3;
//alert( y - x ); // 2, binary minus subtracts values

//Addition +,
//Subtraction -,
//Multiplication *,
//Division /,
//Remainder %,
//Exponentiation **.

//alert( 5 % 2 ); // 1, the remainder of 5 divided by 2
//alert( 8 % 3 ); // 2, the remainder of 8 divided by 3
//alert( 8 % 4 ); // 0, the remainder of 8 divided by 4

//alert( 2 ** 2 ); // 2² = 4
//alert( 2 ** 3 ); // 2³ = 8
//alert( 2 ** 4 ); // 2⁴ = 16


//alert( 4 ** (1/2) ); // 2 (power of 1/2 is the same as a square root)
//alert( 8 ** (1/3) ); // 2 (power of 1/3 is the same as a cubic root)

//let s = "my" + "string";
//alert(s); // mystring

//Note that if any of the operands is a string, then the other one is converted to a string too.
//alert( '1' + 2 ); // "12"
//alert( 2 + '1' ); // "21"

//alert( "1" + 2 ); // "12"
//alert( 2 + "1" ); // "21"
//tek tirnak ile cift tirnak ayni js de 

//See, it doesn’t matter whether the first operand is a string or the second one.
//Here, operators work one after another. The first + sums two numbers, so it returns 4,
//  then the next + adds the string 1 to it, so it’s like 4 + '1' = '41'.
//alert(2 + 2 + '1' ); // "41" and not "221"

//Here, the first operand is a string, the compiler treats the other two operands as strings too. 
// The 2 gets concatenated to '1', so it’s like '1' + 2 = "12" and "12" + 2 = "122".
//alert('1' + 2 + 2); // "122" and not "14"

//alert('1'+2 +'1'+2+2) //12122

//alert(2+2+2+2+'2'+2+2)//8222

//alert( 6 - '2' ); // 4, converts '2' to a number
//alert( '6' / '2' ); // 3, converts both operands to numbers

//the unary plus converts it into a number. +x + isareti numaraya donusturur
// No effect on numbers
//let x = 1;
//alert( +x ); // 1

//let y = -2;
//alert( +y ); // -2

// Converts non-numbers
//alert( +true ); // 1
//alert( +"" );   // 0


//let apples = "2";
//let oranges = "3";
//alert( apples + oranges ); // "23", the binary plus concatenates strings

//let apples = "2";
//let oranges = "3";
// both values converted to numbers before the binary plus
//alert( +apples + +oranges ); // 5
// the longer variant
// alert( Number(apples) + Number(oranges) ); // 5


//Precedence	                        Name	                           Sign
//…	                                 …                              	…
//14	                                unary plus	                        +
//14	                                unary negation	                    -
//13	                                exponentiation	                    **
//12	                                multiplicatio                       *
//12	                                division	                        /
//11	                                addition	                        +
//11	                                subtraction	                        -
//…	                                …	                                …
//2	                                assignment	                        =
//…	                                …	                                …


//precedence oncelige gore matematiksel islemler yappilir 14 once +x once yapilir gibi

//let a = 1;
//let b = 2;
//let c = 3 - (a = b + 1);
//alert( a ); // 3
//alert( c ); // 0

//chain assignments: , zincir atamalar
//let a, b, c;
//a = b = c = 2 + 2;
//alert( a ); // 4
//alert( b ); // 4
//alert( c ); // 4
//Chained assignments evaluate from right to left.

//shortened using the operators += and *=:

//let n = 2;
//n += 5; // now n = 7 (same as n = n + 5)
//n *= 2; // now n = 14 (same as n = n * 2)
//alert( n ); // 14

//let n = 2;
//n *= 3 + 5; // right part evaluated first, same as n *= 8
//alert( n ); // 16

//Increment ++ increases a variable by 1:
// let counter = 2;
//counter++;        // works the same as counter = counter + 1, but is shorter
//alert( counter ); // 3

//Decrement -- decreases a variable by 1:
// let counter = 2;
//counter--;        // works the same as counter = counter - 1, but is shorter
//alert( counter ); // 1

//alert(2++); // 4
//alert(5++)
//Increment/decrement can only be applied to variables. Trying to use it on a value like 5++ will give an error.
//sayisal olarak 2++ gibi islemlerde calismiyor bir degisken uzerinde calismasi gerekiyor

//When the operator goes after the variable, it is in “postfix form”: counter++.
//The “prefix form” is when the operator goes before the variable: ++counter.

//let counter = 1;
//let a = ++counter; // (*)

//alert(a); // 2
//In the line (*), the prefix form ++counter increments counter and returns the new value, 2. So, the alert shows 2.

//Now, let’s use the postfix form:

// let counter = 1;
//let a = counter++; // (*) changed ++counter to counter++

///alert(a); // 1
//In the line (*), the postfix form counter++ also increments counter but returns the old value (prior to increment). So, the alert shows 1.

//soldakine bakilir ++ ise once islem yapilir ve sonra deger dondurulur
//once degisken ismi varsa atama daha sonra arttirma islemi yapilir

//If the result of increment/decrement is not used, there is no difference in which form to use:
//kullanilmazsa islemler farketmez
// let counter = 0;
//counter++;
//++counter;
//alert( counter ); // 2, the lines above did the same

//If we’d like to increase a value and immediately use the result of the operator, we need the prefix form:
//eger degerini arttirip hemen kullanmak istersek prefix form kullanilir
//let counter = 0;
//alert( ++counter ); // 1

//If we’d like to increment a value but use its previous value, we need the postfix form:
// eger degerini arttirip eski degerini kullanmak istersek postfix form kullanilir
// let counter = 0;
//alert( counter++ ); // 0

//let counter = 1;
//alert( 2 * ++counter ); // 4

//let counter = 1;
//alert( 2 * counter++ ); // 2, because counter++ returns the "old" value

//We advise a style of “one line – one action”:

//let counter = 1;
//alert( 2 * counter );
//counter++;

//AND ( & )
//OR ( | )
//XOR ( ^ )
//NOT ( ~ )
//LEFT SHIFT ( << )
//RIGHT SHIFT ( >> )
//ZERO-FILL RIGHT SHIFT ( >>> )

//The comma operator allows us to evaluate several expressions, dividing them with a comma ,.
//  Each of them is evaluated but only the result of the last one is returned.

//let a = (1 + 2, 3 + 4);
//alert( a ); // 7 (the result of 3 + 4)

//Please note that the comma operator has very low precedence, lower than =, 
// so parentheses are important in the example above.
//Virgül operatörünün önceliğinin = 'den düşük olduğunu lütfen unutmayın,
//  bu nedenle yukarıdaki örnekte parantezler önemlidir.

//Without them: a = 1 + 2, 3 + 4 evaluates + first, summing the numbers into a = 3, 7, 
// then the assignment operator = assigns a = 3, and the rest is ignored. It’s like (a = 1 + 2), 3 + 4.

//"" + 1 + 0 = "10" //The addition with a string "" + 1 converts 1 to a string: "" + 1 = "1", 
// and then we have "1" + 0, the same rule is applied.


//"" - 1 + 0 = -1 // The subtraction - (like most math operations) only works with numbers, 
// it converts an empty string "" to 0.


//"  -9  " + 5 = "  -9  5" //The addition with a string appends the number 5 to the string.
//"  -9  " - 5 = -14 //The subtraction always converts to numbers, so it makes " -9 " a number -9 
// (ignoring spaces around it)
//+ da normal davraniyor ama - de numaraya donusturuyor

//null + 1 = 1 //null becomes 0 after the numeric conversion.

//undefined + 1 = NaN //undefined becomes NaN after the numeric conversion.


//" \t \n" - 2 = -2 //Space characters are trimmed off string start and end when a string is 
// converted to a number. Here the whole string consists of space characters, such as \t, \n and a 
// “regular” space between them. So, similarly to an empty string, it becomes 0.
//Boşluk karakterleri, bir dize bir sayıya dönüştürüldüğünde dize başlangıcı ve bitişi ile kesilir. 
// Burada tüm dize, \t, \ n gibi boşluk karakterlerinden ve aralarında “normal” bir boşluktan oluşur.
//  Yani boş bir dizeye benzer şekilde 0 olur.

//true + false = 1
//6 / "3" = 2
//"2" * "3" = 6
//4 + 5 + "px" = "9px"
//"$" + 4 + 5 = "$45"
//"4" - 2 = 2
//"4px" - 2 = NaN


//let a = "1"; // prompt("First number?", 1);
//let b = "2"; // prompt("Second number?", 2);
//alert(a + b); // 12

//let a = +prompt("First number?", 1);
//let b = +prompt("Second number?", 2);
//alert(a + b); // 3

//let a = prompt("First number?", 1);
//let b = prompt("Second number?", 2);
//alert(+a + +b); // 3

