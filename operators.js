// operators

//unary , tekil
//let x = 1;

//x = -x;
//alert( x ); // -1, unary negation was applied

//let x = 1, y = 3;
//alert( y - x ); // 2, binary minus subtracts values

//let a = "5";
//let b = +a; // a string, ama + ile number oldu

//console.log(typeof a); // string
//console.log(typeof b); // number
//Burada +a ifadesi de unary operator’dur, a değişkenini sayıya çevirir.



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
//12	                                multiplication                       *
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
//let a = ++counter; // (*) //// önce artır, sonra ata

//alert(a); // 2
//In the line (*), the prefix form ++counter increments counter and returns the new value, 2. So, the alert shows 2.

//Now, let’s use the postfix form:

// let counter = 1;
//let a = counter++; // (*) changed ++counter to counter++ //// önce ata, sonra artır

///alert(a); // 1
//In the line (*), the postfix form counter++ also increments counter but returns the old value 
// (prior to increment). So, the alert shows 1.

//soldakine bakilir ++ ise once islem yapilir ve sonra deger dondurulur
//once degisken ismi varsa atama daha sonra arttirma islemi yapilir

//If the result of increment/decrement is not used, there is no difference in which form to use:
//sonuc kullanilmazsa islemler farketmez
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



//logical operators

//alert( true || true );   // true
//alert( false || true );  // true
//alert( true || false );  // true
//alert( false || false ); // false

//If an operand is not a boolean, it’s converted to a boolean for the evaluation.
//true false olarak islem yapiyor
//if (1 || 0) { // works just like if( true || false )
//  alert( 'truthy!' );
//}

//let hour = 9;

//if (hour < 10 || hour > 18) {
//  alert( 'The office is closed.' );
//}

//let hour = 12;
//let isWeekend = true;

//if (hour < 10 || hour > 18 || isWeekend) {
//  alert( 'The office is closed.' ); // it is the weekend
//}

//The OR || operator does the following:

//Evaluates operands from left to right.
//For each operand, converts it to boolean. If the result is true, stops and returns 
// the original value of that operand.
//If all operands have been evaluated (i.e. all were false), returns the last operand.
//OR // operatörü aşağıdakileri yapar:
//İşlenenleri soldan sağa doğru değerlendirir.
//Her işlenen için onu boolean değerine dönüştürür. Sonuç doğruysa, o işlenenin orijinal 
// değerini durdurur ve döndürür.
//Tüm işlenenler değerlendirilmişse (yani hepsi yanlışsa), son işleneni döndürür.

//alert( 1 || 0 ); // 1 (1 is truthy)
//alert( null || 1 ); // 1 (1 is the first truthy value)
//alert( null || 0 || 1 ); // 1 (the first truthy value)
//alert( undefined || null || 0 ); // 0 (all falsy, returns the last value)

//let’s use OR || to choose the one that has the data and show it (or "Anonymous" if nothing set):

// let firstName = "";
//let lastName = "";
//let nickName = "SuperCoder";

//alert( firstName || lastName || nickName || "Anonymous"); // SuperCoder
//If all variables were falsy, "Anonymous" would show up.

//The importance of this feature becomes obvious if an operand isn’t just a value,
//  but an expression with a side effect, such as a variable assignment or a function call.
//In the example below, only the second message is printed:
// true || alert("not printed");
//false || alert("printed");
//In the first line, the OR || operator stops the evaluation immediately upon seeing true, so the alert isn’t run.

//In classical programming, AND returns true if both operands are truthy and false otherwise:
// alert( true && true );   // true
//alert( false && true );  // false
//alert( true && false );  // false
//alert( false && false ); // false

//if (1 && 0) { // evaluated as true && false
//  alert( "won't work, because the result is falsy" );
//}

//The AND && operator does the following:

//Evaluates operands from left to right.
//For each operand, converts it to a boolean. If the result is false, stops and returns 
// the original value of that operand.
//If all operands have been evaluated (i.e. all were truthy), returns the last operand.
//In other words, AND returns the first falsy value or the last value if none were found.

// || or da ilk once true dogru olanlar basa koyulur hemen bulur islem biter
// && ve de ilk once false olanlari koyariz hemen bulur islem biter

// if the first operand is truthy,
// AND returns the second operand:
//alert( 1 && 0 ); // 0
//alert( 1 && 5 ); // 5

// if the first operand is falsy,
// AND returns it. The second operand is ignored
//alert( null && 5 ); // null
//alert( 0 && "no matter what" ); // 0

//When all values are truthy, the last value is returned:
// alert( 1 && 2 && 3 ); // 3, the last one

//The precedence of AND && operator is higher than OR ||.
//So the code a && b || c && d is essentially the same as if the && expressions were in parentheses:
//  (a && b) || (c && d).

//Don’t replace if with || or &&
//Sometimes, people use the AND && operator as a “shorter way to write if”.

//let x = 1;
//(x > 0) && alert( 'Greater than zero!' );

//the action in the right part of && would execute only if the evaluation reaches it. 
// That is, only if (x > 0) is true.
//So we basically have an analogue for:
// let x = 1;
//if (x > 0) alert( 'Greater than zero!' );
//Although, the variant with && appears shorter, if is more obvious and tends to be 
// a little bit more readable. So we recommend using every construct for its purpose: 
// use if if we want if and use && if we want AND.

//!NOT 
//Converts the operand to boolean type: true/false.
//Returns the inverse value.

//alert( !true ); // false
//alert( !0 ); // true

//A double NOT !! is sometimes used for converting a value to boolean type:

//alert( !!"non-empty string" ); // true
//alert( !!null ); // false

//That is, the first NOT converts the value to boolean and returns the inverse, 
// and the second NOT inverses it again. In the end, we have a plain value-to-boolean conversion.

//alert( Boolean("non-empty string") ); // true
//alert( Boolean(null) ); // false
//The precedence of NOT ! is the highest of all logical operators, so it always executes first, before && or ||.

//first 1, then 2.

//alert( alert(1) || 2 || alert(3) );
//The call to alert does not return a value. Or, in other words, it returns undefined.
//The first OR || evaluates its left operand alert(1). That shows the first message with 1.
//The alert returns undefined, so OR goes on to the second operand searching for a truthy value.
//The second operand 2 is truthy, so the execution is halted, 2 is returned and then shown by the outer alert.
//There will be no 3, because the evaluation does not reach alert(3).

// alert(1) çalışır

//Bu, ekrana "1" yazdırır (bir mesaj kutusu açılır).
//Ama alert() fonksiyonu her zaman undefined döndürür.
//✅ Ekrana çıkan ilk şey: 1
//2. undefined || 2 || alert(3) kısmı değerlendirilir

//|| operatörü, ilk truthy değeri bulur ve durur.
//undefined → falsy, geçer
//2 → truthy → bulundu, artık durur
//alert(3) çalıştırılmaz çünkü kısa devre oldu.
//✅ Ekrana çıkan ikinci şey: 2


// 1, and then undefined.
// alert( alert(1) && alert(2) );
//The call to alert returns undefined (it just shows a message, so there’s no meaningful return).
//Because of that, && evaluates the left operand (outputs 1), and immediately stops, because 
// undefined is a falsy value. And && looks for a falsy value and returns it, so it’s done

//alert(1) çalışır

//Ekrana 1 yazar.
//Ama yine alert() → undefined döner.
//✅ Ekrana çıkan: 1
//2. undefined && alert(2) kısmı değerlendirilir

//&& operatörü, ilk falsy değeri bulur ve durur.
//undefined → falsy → bulundu → artık işlem biter
//alert(2) çalıştırılmaz.
//❌ 2 görünmez.



//alert( null || 2 && 3 || 4 );
//The precedence of AND && is higher than ||, so it executes first.
//The result of 2 && 3 = 3, so the expression becomes:
//null || 3 || 4
//Now the result is the first truthy value: 3.

// Runs.
// The result of -1 || 0 = -1, truthy
//if (-1 || 0) alert( 'first' );

//-1 || 0 ifadesi hesaplanır
//-1 truthy bir değerdir (sıfırdan farklı herhangi bir sayı truthy sayılır)
//OR (||) ilk truthy değeri bulur → -1
//Yani: if (-1 || 0) ➝ if (true) gibi çalışır
//✅ Sonuç: alert('first') çalışır → ekranda "first" görünür


// Doesn't run
// -1 && 0 = 0, falsy
//if (-1 && 0) alert( 'second' );

//Mantık:
//-1 && 0 ifadesi hesaplanır
//&& operatörü ilk falsy değeri döner
//-1 truthy → devam eder
//0 falsy → sonuç: 0
//if (0) ➝ if (false) gibi olur
//❌ Sonuç: alert('second') çalışmaz → hiçbir şey görünmez



// Executes
// Operator && has a higher precedence than ||
// so -1 && 1 executes first, giving us the chain:
// null || -1 && 1  ->  null || 1  ->  1
//if (null || -1 && 1) alert( 'third' );

//let userName = prompt("Who's there?", '');

//if (userName === 'Admin') {

//  let pass = prompt('Password?', '');

//  if (pass === 'TheMaster') {
//    alert( 'Welcome!' );
//  } else if (pass === '' || pass === null) {
//    alert( 'Canceled' );
 // } else {
//    alert( 'Wrong password' );
//  }

//} else if (userName === '' || userName === null) {
//  alert( 'Canceled' );
//} else {
//  alert( "I don't know you" );
//}

//-1 bir sayıdır ve JavaScript'te tüm sayılar (0 hariç) truthy kabul edilir.
//0 ise falsy bir değerdir.


//The nullish coalescing operator is written as two question marks ??.

//As it treats null and undefined similarly, we’ll use a special term here, in this article.
//  For brevity, we’ll say that a value is “defined” when it’s neither null nor undefined.

//The result of a ?? b is:

//if a is defined, then a,
//if a isn’t defined, then b.

//In other words, ?? returns the first argument if it’s not null/undefined. Otherwise, the second one.

//result = (a !== null && a !== undefined) ? a : b;
//Now it should be absolutely clear what ?? does. Let’s see where it helps.
//The common use case for ?? is to provide a default value.
//For example, here we show user if its value isn’t null/undefined, otherwise Anonymous:
// let user;
//alert(user ?? "Anonymous"); // Anonymous (user is undefined)

//let user = "John";
//alert(user ?? "Anonymous"); // John (user is not null/undefined)

//let firstName = null;
//let lastName = null;
//let nickName = "Supercoder";

// shows the first defined value:
//alert(firstName ?? lastName ?? nickName ?? "Anonymous"); // Supercoder

//in the code above we could replace ?? with || and still get the same result:

// let firstName = null;
//let lastName = null;
//let nickName = "Supercoder";

// shows the first truthy value:
//alert(firstName || lastName || nickName || "Anonymous"); // Supercoder


//The important difference between them is that:

//|| returns the first truthy value.
//?? returns the first defined value.
//In other words, || doesn’t distinguish between false, 0, an empty string "" and null/undefined.
//  They are all the same – falsy values. If any of these is the first argument of ||, then we’ll 
// get the second argument as the result.

//In practice though, we may want to use default value only when the variable is null/undefined. 
// That is, when the value is really unknown/not set.

//Aralarındaki önemli fark şudur:

// ilk doğru değeri döndürür.
//?? tanımlanan ilk değeri döndürür.
//Başka bir deyişle, // false, 0, boş bir dize "" ile null / undefined arasında ayrım yapmaz. 
// Hepsi aynı - sahte değerler. Bunlardan herhangi biri //'nin ilk argümanı ise, sonuç olarak 
// ikinci argümanı elde ederiz.

//Ancak pratikte, varsayılan değeri yalnızca değişken null / tanımsız olduğunda kullanmak 
// isteyebiliriz. Yani, değer gerçekten bilinmediğinde / ayarlanmadığında.

//let height = 0;

//alert(height || 100); // 100
//alert(height ?? 100); // 0
//The height || 100 checks height for being a falsy value, and it’s 0, falsy indeed.
//so the result of || is the second argument, 100.
//The height ?? 100 checks height for being null/undefined, and it’s not,
//so the result is height “as is”, that is 0.

//The precedence of the ?? operator is the same as ||. They both equal 3 in the MDN table.
//That means that, just like ||, the nullish coalescing operator ?? is evaluated before = and ?, 
// but after most other operations, such as +, *.
//So we may need to add parentheses in expressions like this:

//let height = null;
//let width = null;

// important: use parentheses
//let area = (height ?? 100) * (width ?? 50);

//alert(area); // 5000

//Otherwise, if we omit parentheses, then as * has the higher precedence than ??,
//  it would execute first, leading to incorrect results.

// without parentheses
//let area = height ?? 100 * width ?? 50;

// ...works this way (not what we want):
//let area = height ?? (100 * width) ?? 50;

//Due to safety reasons, JavaScript forbids using ?? together with && and || operators,
//  unless the precedence is explicitly specified with parentheses.

//The code below triggers a syntax error:

// let x = 1 && 2 ?? 3; // Syntax error
//The limitation is surely debatable, it was added to the language specification with 
// the purpose to avoid programming mistakes, when people start to switch from || to ??.

//Use explicit parentheses to work around it:

// let x = (1 && 2) ?? 3; // Works

//alert(x); // 2

//The operator ?? has a very low precedence, only a bit higher than ? and =, 
// so consider adding parentheses when using it in an expression.

//It’s forbidden to use it with || or && without explicit parentheses.