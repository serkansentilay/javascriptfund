// functions

//Quite often we need to perform a similar action in many places of the script.
//For example, we need to show a nice-looking message when a visitor logs in, logs out and maybe somewhere else.
//Functions are the main “building blocks” of the program. They allow the code to be called many times without
//  repetition.

//function showMessage() {
//  alert( 'Hello everyone!' );
//}
//showMessage();
//showMessage();
//The call showMessage() executes the code of the function. Here we will see the message two times.
//This example clearly demonstrates one of the main purposes of functions: to avoid code duplication.
//If we ever need to change the message or the way it is shown, it’s enough to modify the code in one place: 
// the function which outputs it.
//showMessage() çağrısı, fonksiyonun kodunu yürütür. Burada mesajı iki kez göreceğiz.
//Bu örnek, fonksiyonların temel amaçlarından birini açıkça göstermektedir: kod tekrarından kaçınmak.
//Mesajı veya gösterilme şeklini değiştirmemiz gerekirse, kodu tek bir yerde değiştirmek yeterlidir: 
// onu çıktı olarak veren fonksiyonda.


//Local variables
//A variable declared inside a function is only visible inside that function.
//function showMessage() {
//  let message = "Hello, I'm JavaScript!"; // local variable

//  alert( message );
//}

//showMessage(); // Hello, I'm JavaScript!

//alert( message ); // <-- Error! The variable is local to the function
//fonk icinde tanimli oldugu icin disardan erisilmiyor

//Outer variables

//A function can access an outer variable as well, for example:

// let userName = 'John';

//function showMessage() {
//  let message = 'Hello, ' + userName;
//  alert(message);
//}

//showMessage(); // Hello, John
//The function has full access to the outer variable. It can modify it as well.


//let userName = 'John';
//function showMessage() {
//  userName = "Bob"; // (1) changed the outer variable
//  let message = 'Hello, ' + userName;
//  alert(message);
//}
//alert( userName ); // John before the function call
//showMessage();
//alert( userName ); // Bob, the value was modified by the function
//The outer variable is only used if there’s no local one.
//If a same-named variable is declared inside the function then it shadows the outer one.
//  For instance, in the code below the function uses the local userName. The outer one is ignored:
//Dış değişken yalnızca yerel bir değişken yoksa kullanılır.

//Fonksiyonun içinde aynı adlı bir değişken bildirilirse, dış değişkeni gölgeler. 
// Örneğin, aşağıdaki kodda fonksiyon yerel userName'i kullanır. Dış değişken göz ardı edilir:

//let userName = 'John';
//function showMessage() {
//  let userName = "Bob"; // declare a local variable
//  let message = 'Hello, ' + userName; // Bob
 // alert(message);
//}
// the function will create and use its own userName
//showMessage();
//alert( userName ); // John, unchanged, the function did not access the outer variable

//Global variables
//Variables declared outside of any function, such as the outer userName in the code above, are called global.
//Global variables are visible from any function (unless shadowed by locals).
//It’s a good practice to minimize the use of global variables. Modern code has few or no globals. 
// Most variables reside in their functions. Sometimes though, they can be useful to store project-level data.

//Yukarıdaki koddaki dış userName gibi herhangi bir fonksiyonun dışında bildirilen değişkenlere global denir
//Global değişkenler herhangi bir fonksiyondan görülebilir (yerel değişkenler tarafından gölgelenmediği sürece).
//Global değişkenlerin kullanımını en aza indirmek iyi bir uygulamadır. Modern kodda çok az veya hiç global yoktur.
//  Çoğu değişken fonksiyonlarında bulunur. Ancak bazen proje düzeyindeki verileri depolamak için yararlı olabilirler.

//function showMessage(from, text) { // parameters: from, text
//  alert(from + ': ' + text);
//}

//showMessage('Ann', 'Hello!'); // Ann: Hello! (*)
//showMessage('Ann', "What's up?"); // Ann: What's up? (**)
//When the function is called in lines (*) and (**), the given values are copied to local variables from
//  and text. Then the function uses them.
//Here’s one more example: we have a variable from and pass it to the function. Please note: the function 
// changes from, but the change is not seen outside, because a function always gets a copy of the value:

//function showMessage(from, text) {
//  from = '*' + from + '*'; // make "from" look nicer
//  alert( from + ': ' + text );
//}
//let from = "Ann";
//showMessage(from, "Hello"); // *Ann*: Hello
// the value of "from" is the same, the function modified a local copy
//alert( from ); // Ann

//When a value is passed as a function parameter, it’s also called an argument.
//In other words, to put these terms straight:
//A parameter is the variable listed inside the parentheses in the function declaration (it’s a declaration time term).
//An argument is the value that is passed to the function when it is called (it’s a call time term).
//We declare functions listing their parameters, then call them passing arguments.
//In the example above, one might say: “the function showMessage is declared with two parameters, then called 
// with two arguments: from and "Hello"”.


//Bir değer fonksiyon parametresi olarak geçirildiğinde, buna argüman da denir.
//Başka bir deyişle, bu terimleri açıklığa kavuşturmak gerekirse:
//Parametre, fonksiyon bildiriminde parantez içinde listelenen değişkendir (bir bildirim zaman terimidir).
//Bir argüman, çağrıldığında fonksiyona geçirilen değerdir (bir çağrı zaman terimidir).
//Fonksiyonları parametrelerini listeleyerek bildiririz, sonra argümanları geçirerek çağırırız.
//Yukarıdaki örnekte, şöyle denebilir: "showMessage fonksiyonu iki parametreyle bildirilir, sonra iki 
// argümanla çağrılır: from ve "Hello"".

//Default values
//We can specify the so-called “default” (to use if omitted) value for a parameter in the function declaration, using =:

// function showMessage(from, text = "no text given") {
//  alert( from + ": " + text );
//}

//showMessage("Ann"); // Ann: no text given
//Now if the text parameter is not passed, it will get the value "no text given".

//The default value also jumps in if the parameter exists, but strictly equals undefined, like this:

//showMessage("Ann", undefined); // Ann: no text given
//Here "no text given" is a string, but it can be a more complex expression, which is only evaluated and assigned if the parameter is missing. So, this is also possible:

// function showMessage(from, text = anotherFunction()) {
  // anotherFunction() only executed if no text given
  // its result becomes the value of text
//}

//Evaluation of default parameters
//In JavaScript, a default parameter is evaluated every time the function is called without the respective parameter.
//In the example above, anotherFunction() isn’t called at all, if the text parameter is provided.
//On the other hand, it’s independently called every time when text is missing.

//Varsayılan parametrelerin değerlendirilmesi
//JavaScript'te, ilgili parametre olmadan fonksiyon her çağrıldığında varsayılan bir parametre değerlendirilir.
//Yukarıdaki örnekte, metin parametresi sağlanmışsa anotherFunction() hiç çağrılmaz.
//Öte yandan, metin eksik olduğunda her seferinde bağımsız olarak çağrılır.

//Alternative default parameters
//Sometimes it makes sense to assign default values for parameters at a later stage after the function declaration.
//We can check if the param

//function showMessage(text) {
  // ...

//  if (text === undefined) { // if the parameter is missing
//    text = 'empty message';
//  }

 // alert(text);
//}

//showMessage(); // empty message
//…Or we could use the || operator:

//function showMessage(text) {
  // if text is undefined or otherwise falsy, set it to 'empty'
 // text = text || 'empty';
 // ...
//}

//Modern JavaScript engines support the nullish coalescing operator ??, it’s better when most falsy values, such as 0, should be considered “normal”:

// function showCount(count) {
  // if count is undefined or null, show "unknown"
//  alert(count ?? "unknown");
//}

//showCount(0); // 0
//showCount(null); // unknown
//showCount(); // unknown


//Returning a value
//A function can return a value back into the calling code as the result.
//function sum(a, b) {
//  return a + b;
//}

//let result = sum(1, 2);
//alert( result ); // 3

//The directive return can be in any place of the function. When the execution reaches it, 
// the function stops, and the value is returned to the calling code (assigned to result above).
//There may be many occurrences of return in a single function. For instance:
//Yönerge return, fonksiyonun herhangi bir yerinde olabilir. Yürütme ona ulaştığında, 
// fonksiyon durur ve değer çağıran koda döndürülür (yukarıdaki sonuca atanmıştır).
//Tek bir fonksiyonda return'ün birçok örneği olabilir. Örneğin:

//function checkAge(age) {
//  if (age >= 18) {
//    return true;
//  } else {
//    return confirm('Do you have permission from your parents?');
//  }
//}

//let age = prompt('How old are you?', 18);

//if ( checkAge(age) ) {
//  alert( 'Access granted' );
//} else {
//  alert( 'Access denied' );
//}


//It is possible to use return without a value. That causes the function to exit immediately.
//function showMovie(age) {
  //if ( !checkAge(age) ) {
 //   return;
 // }

 // alert( "Showing you the movie" ); // (*)
  // ...
//}
//In the code above, if checkAge(age) returns false, then showMovie won’t proceed to the alert.

//A function with an empty return or without it returns undefined
//If a function does not return a value, it is the same as if it returns undefined:

// function doNothing() { /* empty */ }

//alert( doNothing() === undefined ); // true
//An empty return is also the same as return undefined:

// function doNothing() {
//  return;
//}

//alert( doNothing() === undefined ); // true

//Boş bir return'ü olan veya olmayan bir fonksiyon tanımsız döndürür
//Bir fonksiyon bir değer döndürmezse, tanımsız döndürdüğü zamankiyle aynıdır:
//Boş bir return de return undefined ile aynıdır:

//Never add a newline between return and the value
//For a long expression in return, it might be tempting to put it on a separate line, like this:
//return ve value arasına asla yeni satır eklemeyin
//Return'deki uzun bir ifade için, bunu şu şekilde ayrı bir satıra koymak cazip gelebilir:

//return
// (some + long + expression + or + whatever * f(a) + f(b))
//That doesn’t work, because JavaScript assumes a semicolon after return. That’ll work the same as:
//Bu işe yaramaz çünkü JavaScript return'den sonra noktalı virgül olduğunu varsayar. Bu da şu şekilde çalışacaktır:

//return;
// (some + long + expression + or + whatever * f(a) + f(b))
//So, it effectively becomes an empty return.
//Yani aslında boş bir getiri haline geliyor.


//If we want the returned expression to wrap across multiple lines, we should start it at the same line 
// as return. Or at least put the opening parentheses there as follows:
//Döndürülen ifadenin birden fazla satıra yayılmasını istiyorsak, onu return ile aynı satırda başlatmalıyız. 
// Ya da en azından açılış parantezini şu şekilde koymalıyız:
//return (
//  some + long + expression
//  + or +
//  whatever * f(a) + f(b)
//  )
//And it will work just as we expect it to.

//Functions should be short and do exactly one thing. If that thing is big, maybe it’s worth it to split 
// the function into a few smaller functions. Sometimes following this rule may not be that easy, but it’s 
// definitely a good thing.
//A separate function is not only easier to test and debug – its very existence is a great comment!
//For instance, compare the two functions showPrimes(n) below. Each one outputs prime numbers up to n.
//The first variant uses a label:

//function showPrimes(n) {
//  nextPrime: for (let i = 2; i < n; i++) {
//
//    for (let j = 2; j < i; j++) {
//      if (i % j == 0) continue nextPrime;
//    }
//
//    alert( i ); // a prime
//  }
//}
//The second variant uses an additional function isPrime(n) to test for primality:
//
//function showPrimes(n) {
//
 // for (let i = 2; i < n; i++) {
 //   if (!isPrime(i)) continue;
//
//    alert(i);  // a prime
 // }
//}

//function isPrime(n) {
//  for (let i = 2; i < n; i++) {
//    if ( n % i == 0) return false;
//  }
//  return true;
//}
//The second variant is easier to understand, isn’t it? Instead of the code piece we see a name of the action 
// (isPrime). Sometimes people refer to such code as self-describing.
//
//So, functions can be created even if we don’t intend to reuse them. They structure the code and make it readable.



//Values passed to a function as parameters are copied to its local variables.
//A function may access outer variables. But it works only from inside out. The code outside of the function
//  doesn’t see its local variables.
//A function can return a value. If it doesn’t, then its result is undefined.
//There exist many well-known function prefixes like create…, show…, get…, check… and so on. Use them 
// to hint what a function does.

//function checkAge(age) {
//  if (age > 18) {
//    return true;
//  } else {
//    return confirm('Did parents allow you?');
//  }
//}

//function checkAge(age) {
//  return (age > 18) ? true : confirm('Did parents allow you?');
//}

//function checkAge(age) {
// return (age > 18) || confirm('Did parents allow you?');
//}

//function pow(x, n) {
//  let result = x;

//  for (let i = 1; i < n; i++) {
//    result *= x;
//  }

//  return result;
//}

//let x = prompt("x?", '');
//let n = prompt("n?", '');

//if (n < 1) {
// alert(`Power ${n} is not supported, use a positive integer`);
//} else {
//  alert( pow(x, n) );
//}

//Function expressions, fonk ifadeleri

//It allows us to create a new function in the middle of any expression.

//let sayHi = function() {
//  alert( "Hello" );
//};

//Here we can see a variable sayHi getting a value, the new function, created as function() { alert("Hello"); }.
//As the function creation happens in the context of the assignment expression (to the right side of =), 
// this is a Function Expression.
//Please note, there’s no name after the function keyword. Omitting a name is allowed for Function Expressions.
//Here we immediately assign it to the variable, so the meaning of these code samples is the same: “create 
// a function and put it into the variable sayHi”.
//In more advanced situations, that we’ll come across later, a function may be created and immediately called 
// or scheduled or a later execution, not stored anywhere, thus remaining anonymous.

//Burada sayHi değişkeninin bir değer aldığını, function() { alert("Hello"); } olarak oluşturulan yeni fonksiyonu 
// görüyoruz.
//Fonksiyon oluşturma, atama ifadesinin bağlamında (= işaretinin sağ tarafında) gerçekleştiğinden, bu bir Fonksiyon
//  İfadesidir.
//Lütfen, fonksiyon anahtar sözcüğünden sonra bir ad olmadığını unutmayın. Fonksiyon İfadeleri için bir adın 
// atlanmasına izin verilir.
//Burada bunu hemen değişkene atarız, bu nedenle bu kod örneklerinin anlamı aynıdır: "bir fonksiyon oluştur ve 
// sayHi değişkenine koy".
//Daha sonra karşılaşacağımız daha gelişmiş durumlarda, bir fonksiyon oluşturulabilir ve hemen çağrılabilir veya 
// daha sonraki bir yürütme için planlanabilir, hiçbir yerde saklanmaz, böylece anonim kalır.


//function sayHi() {
//  alert( "Hello" );
//}
//alert( sayHi ); // shows the function code
//Please note that the last line does not run the function, because there are no parentheses after sayHi. 
//There are programming languages where any mention of a function name causes its execution, but JavaScript is 
//not like that.
//In JavaScript, a function is a value, so we can deal with it as a value. The code above shows its string representation, which is the source code.
//Surely, a function is a special value, in the sense that we can call it like sayHi().
//But it’s still a value. So we can work with it like with other kinds of values.
//We can copy a function to another variable:

//function sayHi() {   // (1) create
//  alert( "Hello" );
//}
//let func = sayHi;    // (2) copy
//func(); // Hello     // (3) run the copy (it works)!
//sayHi(); // Hello    //     this still works too (why wouldn't it)
//Here’s what happens above in detail:
//The Function Declaration (1) creates the function and puts it into the variable named sayHi.
//Line (2) copies it into the variable func. Please note again: there are no parentheses after sayHi. 
// If there were, then func = sayHi() would write the result of the call sayHi() into func, not the 
// function sayHi itself.
//Now the function can be called as both sayHi() and func().

//let sayHi = function() { // (1) create
//  alert( "Hello" );
//};

//let func = sayHi;  //(2)
// ...
//Everything would work the same.

// fonk () parantez ile tanimli oldugu icin cagirirken parantez icinde cagirmaliyiz
// aksi halde parantesiz cagirirsak sadece kodu gosterir ve oun istersek bir degiskene atayip
//degiskeni parantez ile cagirabiliriz kodlar yukarida

//Why is there a semicolon at the end?
//You might wonder, why do Function Expressions have a semicolon ; at the end, but Function Declarations do not:

//function sayHi() {
  // ...
//}

//let sayHi = function() {
  // ...
//};
//The answer is simple: a Function Expression is created here as function(…) {…} inside the assignment statement: 
// let sayHi = …;. The semicolon ; is recommended at the end of the statement, it’s not a part of the function syntax.
//The semicolon would be there for a simpler assignment, such as let sayHi = 5;, and it’s also there for a function 
// assignment.

//function ask(question, yes, no) {
//  if (confirm(question)) yes()
//  else no();
//}

//function showOk() {
//  alert( "You agreed." );
//}

//function showCancel() {
//  alert( "You canceled the execution." );
//}

// usage: functions showOk, showCancel are passed as arguments to ask
//ask("Do you agree?", showOk, showCancel);

//The arguments showOk and showCancel of ask are called callback functions or just callbacks.

//The idea is that we pass a function and expect it to be “called back” later if necessary. In our case, 
// showOk becomes the callback for “yes” answer, and showCancel for “no” answer.

//function ask(question, yes, no) {
//  if (confirm(question)) yes()
//  else no();
//}

//ask(
//  "Do you agree?",
//  function() { alert("You agreed."); },
//  function() { alert("You canceled the execution."); }
//);
//Here, functions are declared right inside the ask(...) call. They have no name, and so are called anonymous.
//  Such functions are not accessible outside of ask (because they are not assigned to variables), but that’s 
// just what we want here.

//Burada, fonksiyonlar ask(...) çağrısının tam içinde bildirilir. İsimleri yoktur ve bu yüzden anonim olarak
//  adlandırılırlar. Bu tür fonksiyonlara ask dışından erişilemez (çünkü değişkenlere atanmamışlardır), 
// ancak burada istediğimiz tam olarak budur.

//A function is a value representing an “action”
//Regular values like strings or numbers represent the data.
//A function can be perceived as an action.
//We can pass it between variables and run when we want.

//Bir fonksiyon, bir "eylemi" temsil eden bir değerdir
//Dizeler veya sayılar gibi normal değerler verileri temsil eder.
//Bir fonksiyon bir eylem olarak algılanabilir.
//Değişkenler arasında geçirebilir ve istediğimiz zaman çalıştırabiliriz.

//Function Declaration: a function, declared as a separate statement, in the main code flow:
//function sum(a, b) {
//  return a + b;
//}

//Function Expression: a function, created inside an expression or inside another syntax construct. 
// Here, the function is created on the right side of the “assignment expression” =:
//let sum = function(a, b) {
//  return a + b;
//};


//The more subtle difference is when a function is created by the JavaScript engine.
//A Function Expression is created when the execution reaches it and is usable only from that moment.
//Once the execution flow passes to the right side of the assignment let sum = function… – here we go, 
// the function is created and can be used (assigned, called, etc. ) from now on.
//Function Declarations are different.

//A Function Declaration can be called earlier than it is defined.
//For example, a global Function Declaration is visible in the whole script, no matter where it is.
//That’s due to internal algorithms. When JavaScript prepares to run the script, it first looks for global 
// Function Declarations in it and creates the functions. We can think of it as an “initialization stage”.
//And after all Function Declarations are processed, the code is executed. So it has access to these functions.
//For example, this works:

//sayHi("John"); // Hello, John

//function sayHi(name) {
//  alert( `Hello, ${name}` );
//}


//The Function Declaration sayHi is created when JavaScript is preparing to start the script and is visible 
// everywhere in it.
//…If it were a Function Expression, then it wouldn’t work:

//The Function Declaration sayHi is created when JavaScript is preparing to start the script and is 
// visible everywhere in it.
//…If it were a Function Expression, then it wouldn’t work:

//sayHi("John"); // error!

//let sayHi = function(name) {  // (*) no magic any more
//  alert( `Hello, ${name}` );
//};

//Function Expressions are created when the execution reaches them. That would happen only in the line (*). Too late.
//Another special feature of Function Declarations is their block scope.
//In strict mode, when a Function Declaration is within a code block, it’s visible everywhere inside that block.
//  But not outside of it.
//For instance, let’s imagine that we need to declare a function welcome() depending on the age variable that 
// we get during runtime. And then we plan to use it some time later.
//If we use Function Declaration, it won’t work as intended:

//let age = prompt("What is your age?", 18);
// conditionally declare a function
//if (age < 18) {
//  function welcome() {
//    alert("Hello!");
//  }
//} else {
//  function welcome() {
//    alert("Greetings!");
//  }
//}
// ...use it later
//welcome(); // Error: welcome is not defined

//That’s because a Function Declaration is only visible inside the code block in which it resides.


//let age = 16; // take 16 as an example
//if (age < 18) {
//  welcome();               // \   (runs)
                           //  |
//  function welcome() {     //  |
//    alert("Hello!");       //  |  Function Declaration is available
//  }                        //  |  everywhere in the block where it's declared
                           //  |
//  welcome();               // /   (runs)
//} else {
//  function welcome() {
//    alert("Greetings!");
//  }
//}
// Here we're out of curly braces,
// so we can not see Function Declarations made inside of them.
//welcome(); // Error: welcome is not defined


//What can we do to make welcome visible outside of if?
//The correct approach would be to use a Function Expression and assign welcome to the variable that is declared 
// outside of if and has the proper visibility.
//This code works as intended:

//let age = prompt("What is your age?", 18);
//let welcome;
//if (age < 18) {
//  welcome = function() {
//    alert("Hello!");
//  };
//} else {
//  welcome = function() {
//    alert("Greetings!");
//  };
//}
//welcome(); // ok now

//let age = prompt("What is your age?", 18);

//let welcome = (age < 18) ?
//  function() { alert("Hello!"); } :
 // function() { alert("Greetings!"); };

//welcome(); // ok now

//When to choose Function Declaration versus Function Expression?
//As a rule of thumb, when we need to declare a function, the first thing to consider is Function Declaration 
// syntax. It gives more freedom in how to organize our code, because we can call such functions before they 
// are declared.
//That’s also better for readability, as it’s easier to look up function f(…) {…} in the code than 
// let f = function(…) {…};. Function Declarations are more “eye-catching”.
//…But if a Function Declaration does not suit us for some reason, or we need a conditional declaration 
// (we’ve just seen an example), then Function Expression should be used.

//Functions are values. They can be assigned, copied or declared in any place of the code.
//If the function is declared as a separate statement in the main code flow, that’s called a “Function Declaration”.
//If the function is created as a part of an expression, it’s called a “Function Expression”.
//Function Declarations are processed before the code block is executed. They are visible everywhere in the block.
//Function Expressions are created when the execution flow reaches them.
//In most cases when we need to declare a function, a Function Declaration is preferable, because it is visible 
// prior to the declaration itself. That gives us more flexibility in code organization, and is usually more readable.
//So we should use a Function Expression only when a Function Declaration is not fit for the task. We’ve seen
//  a couple of examples of that in this chapter, and will see more in the future.

//Fonksiyonlar değerlerdir. Kodun herhangi bir yerinde atanabilir, kopyalanabilir veya beyan edilebilirler.
//Fonksiyon ana kod akışında ayrı bir ifade olarak beyan edilirse, buna "Fonksiyon Beyanı" denir.
//Fonksiyon bir ifadenin parçası olarak oluşturulursa, buna "Fonksiyon İfadesi" denir.
//Fonksiyon Beyanları, kod bloğu yürütülmeden önce işlenir. Bloğun her yerinde görünürler.
//Fonksiyon İfadeleri, yürütme akışı onlara ulaştığında oluşturulur.
//Bir fonksiyonu beyan etmemiz gerektiğinde çoğu durumda, bir Fonksiyon Beyanı tercih edilir, çünkü beyanın 
// kendisinden önce görünür. Bu bize kod organizasyonunda daha fazla esneklik sağlar ve genellikle daha okunabilirdir.
//Bu nedenle, yalnızca bir Fonksiyon Beyanı göreve uygun olmadığında bir Fonksiyon İfadesi kullanmalıyız.
//  Bu bölümde bunun birkaç örneğini gördük ve gelecekte daha fazlasını göreceğiz.

//Arrow functions, the basics

//This creates a function func that accepts arguments arg1..argN, then evaluates the expression on the right side
//  with their use and returns its result.

//let sum = (a, b) => a + b;
/* This arrow function is a shorter form of:
let sum = function(a, b) {
  return a + b;
};
*/
//alert( sum(1, 2) ); // 3


//As you can see, (a, b) => a + b means a function that accepts two arguments named a and b. Upon the execution,
//  it evaluates the expression a + b and returns the result.
//If we have only one argument, then parentheses around parameters can be omitted, making that even shorter.
// let double = n => n * 2;
// roughly the same as: let double = function(n) { return n * 2 }

//alert( double(3) ); // 6

//If there are no arguments, parentheses are empty, but they must be present:

// let sayHi = () => alert("Hello!");

//sayHi();
//Arrow functions can be used in the same way as Function Expressions.

//For instance, to dynamically create a function:

// let age = prompt("What is your age?", 18);

//let welcome = (age < 18) ?
//  () => alert('Hello!') :
//  () => alert("Greetings!");

//welcome();

//Arrow functions may appear unfamiliar and not very readable at first, but that quickly changes as the eyes
//  get used to the structure.
//They are very convenient for simple one-line actions, when we’re just too lazy to write many words.

//Multiline arrow functions
//The arrow functions that we’ve seen so far were very simple. They took arguments from the left of =>,
//  evaluated and returned the right-side expression with them.
//Sometimes we need a more complex function, with multiple expressions and statements. In that case, 
// we can enclose them in curly braces. The major difference is that curly braces require a return within
//  them to return a value (just like a regular function does).

//Çok satırlı ok fonksiyonları

//Şimdiye kadar gördüğümüz ok fonksiyonları çok basitti. =>'nin solundan argümanlar aldılar, 
// değerlendirdiler ve sağ taraftaki ifadeyi onlarla döndürdüler.

//Bazen birden fazla ifade ve ifade içeren daha karmaşık bir fonksiyona ihtiyaç duyarız. Bu durumda, 
// bunları süslü parantezlerin içine alabiliriz. En büyük fark, süslü parantezlerin bir değer döndürmek 
// için içlerinde bir return gerektirmesidir (tıpkı normal bir fonksiyonda olduğu gibi).

//let sum = (a, b) => {  // the curly brace opens a multiline function
//  let result = a + b;
//  return result; // if we use curly braces, then we need an explicit "return"
//};

//alert( sum(1, 2) ); // 3

//function ask(question, yes, no) {
//  if (confirm(question)) yes();
//  else no();
//}

//ask(
//  "Do you agree?",
//  function() { alert("You agreed."); },
//  function() { alert("You canceled the execution."); }
//);

//with arrow functions

//function ask(question, yes, no) {
//  if (confirm(question)) yes();
//  else no();
//}

//ask(
//  "Do you agree?",
//  () => alert("You agreed."),
//  () => alert("You canceled the execution.")
//);


//It’s in the very spirit of JavaScript to create a function and pass it somewhere.
//And in such functions we usually don’t want to leave the current context. That’s where arrow functions come in handy.

//Arrow functions have no “this”
//As we remember from the chapter Object methods, "this", arrow functions do not have this. If this is accessed,
//  it is taken from the outside.
//For instance, we can use it to iterate inside an object method:

//let group = {
//  title: "Our Group",
//  students: ["John", "Pete", "Alice"],

//  showList() {
//    this.students.forEach(
//      student => alert(this.title + ': ' + student)
//    );
//  }
//};

//group.showList();

//Here in forEach, the arrow function is used, so this.title in it is exactly the same as in the outer 
// method showList. That is: group.title.

// there would be an error:
//let group = {
//  title: "Our Group",
//  students: ["John", "Pete", "Alice"],

//  showList() {
//    this.students.forEach(function(student) {
      // Error: Cannot read property 'title' of undefined
//      alert(this.title + ': ' + student);
//    });
//  }
//};

//group.showList();

//The error occurs because forEach runs functions with this=undefined by default, so the attempt to access
// undefined.title is made.
//That doesn’t affect arrow functions, because they just don’t have this.
//Arrow functions can’t run with new
//Not having this naturally means another limitation: arrow functions can’t be used as constructors.
//  They can’t be called with new.

//Arrow functions VS bind
//There’s a subtle difference between an arrow function => and a regular function called with .bind(this):
//.bind(this) creates a “bound version” of the function.
//The arrow => doesn’t create any binding. The function simply doesn’t have this. The lookup of this is made 
// exactly the same way as a regular variable search: in the outer lexical environment.

//Arrow functions also have no arguments variable.

//That’s great for decorators, when we need to forward a call with the current this and arguments.

//For instance, defer(f, ms) gets a function and returns a wrapper around it that delays the call by ms milliseconds:

// function defer(f, ms) {
//  return function() {
//    setTimeout(() => f.apply(this, arguments), ms);
//  };
//}

//function sayHi(who) {
//  alert('Hello, ' + who);
//}

//let sayHiDeferred = defer(sayHi, 2000);
//sayHiDeferred("John"); // Hello, John after 2 seconds
//The same without an arrow function would look like:

//function defer(f, ms) {
//  return function(...args) {
//    let ctx = this;
//    setTimeout(function() {
//      return f.apply(ctx, args);
//    }, ms);
//  };
//}
//Here we had to create additional variables args and ctx so that the function inside setTimeout could take them.

//Arrow functions:
//Do not have this
//Do not have arguments
//Can’t be called with new
//They also don’t have super

