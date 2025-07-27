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
//Here "no text given" is a string, but it can be a more complex expression, 
// which is only evaluated and assigned if the parameter is missing. So, this is also possible:

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

//Modern JavaScript engines support the nullish coalescing operator ??, 
// it’s better when most falsy values, such as 0, should be considered “normal”:

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
//In JavaScript, a function is a value, so we can deal with it as a value. The code above 
// shows its string representation, which is the source code.
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


/*
Hoisting (Belleğe Alma) Farkı

// Function Declaration
foo(); // ✅ çalışır
function foo() {
  console.log("I'm foo");
}

// Function Expression
bar(); // ❌ hata
let bar = function() {
  console.log("I'm bar");
};

Çözüm: Function Expression Kullan

let welcome;

if (age > 18) {
  welcome = function() {
    console.log("Welcome adult");
  };
} else {
  welcome = function() {
    console.log("Hi kid");
  };
}

welcome(); // ✅ Güvenli
Neden daha iyi?
welcome her durumda tanımlıdır.
Fonksiyonlar if/else içinde atanır ama dışarıdan çağrılabilir.


*/

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


//Advanced working with functions

/*
Two ways of thinking

For something simple to start with – let’s write a function pow(x, n) that raises x to a 
natural power of n. In other words, multiplies x by itself n times.

pow(2, 2) = 4
pow(2, 3) = 8
pow(2, 4) = 16
There are two ways to implement it.

Iterative thinking: the for loop:

 function pow(x, n) {
  let result = 1;

  // multiply result by x n times in the loop
  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}

alert( pow(2, 3) ); // 8
Recursive thinking: simplify the task and call self:

 function pow(x, n) {
  if (n == 1) {
    return x;
  } else {
    return x * pow(x, n - 1);
  }
}

alert( pow(2, 3) ); // 8


If n == 1, then everything is trivial. It is called the base of recursion, because it 
immediately produces the obvious result: pow(x, 1) equals x.
Otherwise, we can represent pow(x, n) as x * pow(x, n - 1). In maths, one would write 
xn = x * xn-1. This is called a recursive step: we transform the task into a simpler 
action (multiplication by x) and a simpler call of the same task (pow with lower n).
 Next steps simplify it further and further until n reaches 1.
*/



/*
For example, to calculate pow(2, 4) the recursive variant does these steps:

pow(2, 4) = 2 * pow(2, 3)
pow(2, 3) = 2 * pow(2, 2)
pow(2, 2) = 2 * pow(2, 1)
pow(2, 1) = 2
So, the recursion reduces a function call to a simpler one, and then – to even more simpler,
and so on, until the result becomes obvious.
*/

/*
Recursion is usually shorter
A recursive solution is usually shorter than an iterative one.

Here we can rewrite the same using the conditional operator ? instead of if to make pow(x, n) 
more terse and still very readable:

 function pow(x, n) {
  return (n == 1) ? x : (x * pow(x, n - 1));
}
The maximal number of nested calls (including the first one) is called recursion depth. In our 
case, it will be exactly n.

The maximal recursion depth is limited by JavaScript engine. We can rely on it being 10000, 
some engines allow more, but 100000 is probably out of limit for the majority of them. There are
 automatic optimizations that help alleviate this (“tail calls optimizations”), but they are not
  yet supported everywhere and work only in simple cases.

That limits the application of recursion, but it still remains very wide. There are many tasks 
where recursive way of thinking gives simpler code, easier to maintain.


*/


/*
when our function gets a department to sum, there are two possible cases:

Either it’s a “simple” department with an array of people – then we can sum the salaries in a 
simple loop.
Or it’s an object with N subdepartments – then we can make N recursive calls to get the sum for
 each of the subdeps and combine the results.
The 1st case is the base of recursion, the trivial case, when we get an array.

The 2nd case when we get an object is the recursive step. A complex task is split into subtasks 
for smaller departments. They may in turn split again, but sooner or later the split will finish 
at (1).

The algorithm is probably even easier to read from the code:

 let company = { // the same object, compressed for brevity
  sales: [{name: 'John', salary: 1000}, {name: 'Alice', salary: 1600 }],
  development: {
    sites: [{name: 'Peter', salary: 2000}, {name: 'Alex', salary: 1800 }],
    internals: [{name: 'Jack', salary: 1300}]
  }
};

// The function to do the job
function sumSalaries(department) {
  if (Array.isArray(department)) { // case (1)
    return department.reduce((prev, current) => prev + current.salary, 0); // sum the array
  } else { // case (2)
    let sum = 0;
    for (let subdep of Object.values(department)) {
      sum += sumSalaries(subdep); // recursively call for subdepartments, sum the results
    }
    return sum;
  }
}

alert(sumSalaries(company)); // 7700
The code is short and easy to understand (hopefully?). That’s the power of recursion. It also 
works for any level of subdepartment nesting.



We can easily see the principle: for an object {...} subcalls are made, while arrays [...] are
 the “leaves” of the recursion tree, they give immediate result.

Note that the code uses smart features that we’ve covered before:

Method arr.reduce explained in the chapter Array methods to get the sum of the array.
Loop for(val of Object.values(obj)) to iterate over object values: Object.values returns an array
 of them.
*/


/*
Linked list

Imagine, we want to store an ordered list of objects.

The natural choice would be an array:

let arr = [obj1, obj2, obj3];
…But there’s a problem with arrays. The “delete element” and “insert element” operations are 
expensive. For instance, arr.unshift(obj) operation has to renumber all elements to make room 
for a new obj, and if the array is big, it takes time. Same with arr.shift().

The only structural modifications that do not require mass-renumbering are those that operate
 with the end of array: arr.push/pop. So an array can be quite slow for big queues, when we have 
 to work with the beginning.

Alternatively, if we really need fast insertion/deletion, we can choose another data structure 
called a linked list.

The linked list element is recursively defined as an object with:

value.
next property referencing the next linked list element or null if that’s the end.
For instance:

let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

*/


/*
An alternative code for creation:

let list = { value: 1 };
list.next = { value: 2 };
list.next.next = { value: 3 };
list.next.next.next = { value: 4 };
list.next.next.next.next = null;
Here we can even more clearly see that there are multiple objects, each one has the value and
 next pointing to the neighbour. The list variable is the first object in the chain, so 
 following next pointers from it we can reach any element.

The list can be easily split into multiple parts and later joined back:

let secondList = list.next.next;
list.next.next = null;
*/

/*
list.next.next = secondList;
And surely we can insert or remove items in any place.

For instance, to prepend a new value, we need to update the head of the list:

let list = { value: 1 };
list.next = { value: 2 };
list.next.next = { value: 3 };
list.next.next.next = { value: 4 };

// prepend the new value to the list
list = { value: "new item", next: list };

*/

/*
To remove a value from the middle, change next of the previous one:

list.next = list.next.next;
*/

/*
We made list.next jump over 1 to value 2. The value 1 is now excluded from the chain. If it’s 
not stored anywhere else, it will be automatically removed from the memory.

Unlike arrays, there’s no mass-renumbering, we can easily rearrange elements.

Naturally, lists are not always better than arrays. Otherwise everyone would use only lists.

The main drawback is that we can’t easily access an element by its number. In an array that’s
 easy: arr[n] is a direct reference. But in the list we need to start from the first item and 
 go next N times to get the Nth element.

…But we don’t always need such operations. For instance, when we need a queue or even a deque 
– the ordered structure that must allow very fast adding/removing elements from both ends, but
 access to its middle is not needed.

Lists can be enhanced:

We can add property prev in addition to next to reference the previous element, to move back
 easily.
We can also add a variable named tail referencing the last element of the list (and update it
 when adding/removing elements from the end).
…The data structure may vary according to our needs.

*/

/*
The solution using a loop:

 function sumTo(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

alert( sumTo(100) );
The solution using recursion:

 function sumTo(n) {
  if (n == 1) return 1;
  return n + sumTo(n - 1);
}

alert( sumTo(100) );
The solution using the formula: sumTo(n) = n*(n+1)/2:

 function sumTo(n) {
  return n * (n + 1) / 2;
}

alert( sumTo(100) );
P.S. Naturally, the formula is the fastest solution. It uses only 3 operations for any number n.
 The math helps!

The loop variant is the second in terms of speed. In both the recursive and the loop variant we 
sum the same numbers. But the recursion involves nested calls and execution stack management. 
That also takes resources, so it’s slower.

P.P.S. Some engines support the “tail call” optimization: if a recursive call is the very last 
one in the function, with no other calculations performed, then the outer function will not 
need to resume the execution, so the engine doesn’t need to remember its execution context. 
That removes the burden on memory. But if the JavaScript engine does not support tail call 
optimization (most of them don’t), there will be an error: maximum stack size exceeded,
 because there’s usually a limitation on the total stack size.
*/


/*
By definition, a factorial n! can be written as n * (n-1)!.

In other words, the result of factorial(n) can be calculated as n multiplied by the result of 
factorial(n-1). And the call for n-1 can recursively descend lower, and lower, till 1.

 function factorial(n) {
  return (n != 1) ? n * factorial(n - 1) : 1;
}

alert( factorial(5) ); // 120
The basis of recursion is the value 1. We can also make 0 the basis here, doesn’t matter much,
 but gives one more recursive step:

 function factorial(n) {
  return n ? n * factorial(n - 1) : 1;
}

alert( factorial(5) ); // 120
*/

/*
function fib(n) {
  let a = 1;
  let b = 1;
  for (let i = 3; i <= n; i++) {
    let c = a + b;
    a = b;
    b = c;
  }
  return b;
}

alert( fib(3) ); // 2
alert( fib(7) ); // 13
alert( fib(77) ); // 5527939700884757
The loop starts with i=3, because the first and the second sequence values are hard-coded 
into variables a=1, b=1.
*/

/*
Loop-based solution

The loop-based variant of the solution:

 let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

function printList(list) {
  let tmp = list;

  while (tmp) {
    alert(tmp.value);
    tmp = tmp.next;
  }

}

printList(list);
Please note that we use a temporary variable tmp to walk over the list. Technically, we could 
use a function parameter list instead:

function printList(list) {

  while(list) {
    alert(list.value);
    list = list.next;
  }

}
…But that would be unwise. In the future we may need to extend a function, do something else 
with the list. If we change list, then we lose such ability.

Talking about good variable names, list here is the list itself. The first element of it. And 
it should remain like that. That’s clear and reliable.

From the other side, the role of tmp is exclusively a list traversal, like i in the for loop.

Recursive solution

The recursive variant of printList(list) follows a simple logic: to output a list we should 
output the current element list, then do the same for list.next:

 let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

function printList(list) {

  alert(list.value); // output the current item

  if (list.next) {
    printList(list.next); // do the same for the rest of the list
  }

}

printList(list);
Now what’s better?

Technically, the loop is more effective. These two variants do the same, but the loop does not
 spend resources for nested function calls.

From the other side, the recursive variant is shorter and sometimes easier to understand.
*/

/*
Using a recursion

The recursive logic is a little bit tricky here.

We need to first output the rest of the list and then output the current one:

 let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

function printReverseList(list) {

  if (list.next) {
    printReverseList(list.next);
  }

  alert(list.value);
}

printReverseList(list);
Using a loop

The loop variant is also a little bit more complicated than the direct output.

There is no way to get the last value in our list. We also can’t “go back”.

So what we can do is to first go through the items in the direct order and remember them in 
an array, and then output what we remembered in the reverse order:

 let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

function printReverseList(list) {
  let arr = [];
  let tmp = list;

  while (tmp) {
    arr.push(tmp.value);
    tmp = tmp.next;
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    alert( arr[i] );
  }
}

printReverseList(list);
Please note that the recursive solution actually does exactly the same: it follows the list,
 remembers the items in the chain of nested calls (in the execution context stack), and then 
 outputs them.
*/




//Kullanım Durumu	Kullanılacak Veri Yapısı
//Eleman ekleme/silme sık olacaksa	Linked List
//Sabit büyüklükte hızlı erişim lazımsa	Array
//Önce giren önce çıksın (queue)	Linked List (Queue)
//Sık geri alma / ileri alma varsa	Doubly Linked List

//Rest parameters and spread syntax

/*
Rest parameters ...

A function can be called with any number of arguments, no matter how it is defined.

Like here:

 function sum(a, b) {
  return a + b;
}

alert( sum(1, 2, 3, 4, 5) );
There will be no error because of “excessive” arguments. But of course in the result only the 
first two will be counted, so the result in the code above is 3.

The rest of the parameters can be included in the function definition by using three dots ... 
followed by the name of the array that will contain them. The dots literally mean “gather the
 remaining parameters into an array”.

For instance, to gather all arguments into array args:

 function sumAll(...args) { // args is the name for the array
  let sum = 0;

  for (let arg of args) sum += arg;

  return sum;
}

alert( sumAll(1) ); // 1
alert( sumAll(1, 2) ); // 3
alert( sumAll(1, 2, 3) ); // 6
We can choose to get the first parameters as variables, and gather only the rest.

Here the first two arguments go into variables and the rest go into titles array:

 function showName(firstName, lastName, ...titles) {
  alert( firstName + ' ' + lastName ); // Julius Caesar

  // the rest go into titles array
  // i.e. titles = ["Consul", "Imperator"]
  alert( titles[0] ); // Consul
  alert( titles[1] ); // Imperator
  alert( titles.length ); // 2
}

showName("Julius", "Caesar", "Consul", "Imperator");
The rest parameters must be at the end
The rest parameters gather all remaining arguments, so the following does not make sense and 
causes an error:

function f(arg1, ...rest, arg2) { // arg2 after ...rest ?!
  // error
}
The ...rest must always be last.
*/

/*
The “arguments” variable

There is also a special array-like object named arguments that contains all arguments by their index.

For instance:

 function showName() {
  alert( arguments.length );
  alert( arguments[0] );
  alert( arguments[1] );

  // it's iterable
  // for(let arg of arguments) alert(arg);
}

// shows: 2, Julius, Caesar
showName("Julius", "Caesar");

// shows: 1, Ilya, undefined (no second argument)
showName("Ilya");
In old times, rest parameters did not exist in the language, and using arguments was the only
 way to get all arguments of the function. And it still works, we can find it in the old code.

But the downside is that although arguments is both array-like and iterable, it’s not an array. 
It does not support array methods, so we can’t call arguments.map(...) for example.

Also, it always contains all arguments. We can’t capture them partially, like we did with rest
 parameters.

So when we need these features, then rest parameters are preferred.

Arrow functions do not have "arguments"
If we access the arguments object from an arrow function, it takes them from the outer “normal” 
function.

Here’s an example:

 function f() {
  let showArg = () => alert(arguments[0]);
  showArg();
}

f(1); // 1
As we remember, arrow functions don’t have their own this. Now we know they don’t have the
 special arguments object either.
*/

/*
Spread syntax

We’ve just seen how to get an array from the list of parameters.

But sometimes we need to do exactly the reverse.

For instance, there’s a built-in function Math.max that returns the greatest number from a list:

 alert( Math.max(3, 5, 1) ); // 5
Now let’s say we have an array [3, 5, 1]. How do we call Math.max with it?

Passing it “as is” won’t work, because Math.max expects a list of numeric arguments, not a single array:

 let arr = [3, 5, 1];

alert( Math.max(arr) ); // NaN
And surely we can’t manually list items in the code Math.max(arr[0], arr[1], arr[2]), because we may be unsure how many there are. As our script executes, there could be a lot, or there could be none. And that would get ugly.

Spread syntax to the rescue! It looks similar to rest parameters, also using ..., but does quite the opposite.

When ...arr is used in the function call, it “expands” an iterable object arr into the list of arguments.

For Math.max:

 let arr = [3, 5, 1];

alert( Math.max(...arr) ); // 5 (spread turns array into a list of arguments)
We also can pass multiple iterables this way:

 let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

alert( Math.max(...arr1, ...arr2) ); // 8
We can even combine the spread syntax with normal values:

 let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

alert( Math.max(1, ...arr1, 2, ...arr2, 25) ); // 25
Also, the spread syntax can be used to merge arrays:

 let arr = [3, 5, 1];
let arr2 = [8, 9, 15];

let merged = [0, ...arr, 2, ...arr2];

alert(merged); // 0,3,5,1,2,8,9,15 (0, then arr, then 2, then arr2)
In the examples above we used an array to demonstrate the spread syntax, but any iterable will do.

For instance, here we use the spread syntax to turn the string into array of characters:

 let str = "Hello";

alert( [...str] ); // H,e,l,l,o
The spread syntax internally uses iterators to gather elements, the same way as for..of does.

So, for a string, for..of returns characters and ...str becomes "H","e","l","l","o". The list of
 characters is passed to array initializer [...str].

For this particular task we could also use Array.from, because it converts an iterable (like 
a string) into an array:

 let str = "Hello";

// Array.from converts an iterable into an array
alert( Array.from(str) ); // H,e,l,l,o
The result is the same as [...str].

But there’s a subtle difference between Array.from(obj) and [...obj]:

Array.from operates on both array-likes and iterables.
The spread syntax works only with iterables.
So, for the task of turning something into an array, Array.from tends to be more universal.


*/

/*
Copy an array/object

Remember when we talked about Object.assign() in the past?

It is possible to do the same thing with the spread syntax.

 let arr = [1, 2, 3];

let arrCopy = [...arr]; // spread the array into a list of parameters
                        // then put the result into a new array

// do the arrays have the same contents?
alert(JSON.stringify(arr) === JSON.stringify(arrCopy)); // true

// are the arrays equal?
alert(arr === arrCopy); // false (not same reference)

// modifying our initial array does not modify the copy:
arr.push(4);
alert(arr); // 1, 2, 3, 4
alert(arrCopy); // 1, 2, 3
Note that it is possible to do the same thing to make a copy of an object:

 let obj = { a: 1, b: 2, c: 3 };

let objCopy = { ...obj }; // spread the object into a list of parameters
                          // then return the result in a new object

// do the objects have the same contents?
alert(JSON.stringify(obj) === JSON.stringify(objCopy)); // true

// are the objects equal?
alert(obj === objCopy); // false (not same reference)

// modifying our initial object does not modify the copy:
obj.d = 4;
alert(JSON.stringify(obj)); // {"a":1,"b":2,"c":3,"d":4}
alert(JSON.stringify(objCopy)); // {"a":1,"b":2,"c":3}
This way of copying an object is much shorter than let objCopy = Object.assign({}, obj) or 
for an array let arrCopy = Object.assign([], arr) so we prefer to use it whenever we can.


*/

/*
Summary

When we see "..." in the code, it is either rest parameters or the spread syntax.

There’s an easy way to distinguish between them:

When ... is at the end of function parameters, it’s “rest parameters” and gathers the rest of 
the list of arguments into an array.
When ... occurs in a function call or alike, it’s called a “spread syntax” and expands an array 
into a list.
Use patterns:

Rest parameters are used to create functions that accept any number of arguments.
The spread syntax is used to pass an array to functions that normally require a list of many
 arguments.
Together they help to travel between a list and an array of parameters with ease.

All arguments of a function call are also available in “old-style” arguments: array-like
 iterable object.



... fonksiyon parametrelerinin sonunda olduğunda, “dinlenme parametreleri” dir ve argüman
 listesinin geri kalanını bir dizide toplar.
... bir fonksiyon çağrısında veya benzeri bir yerde kullanıldığında “spread syntax” olarak
 adlandırılır ve bir diziyi bir listeye genişletir.
Kullanım kalıpları:

Rest parametreleri, herhangi bir sayıda argüman kabul eden fonksiyonlar oluşturmak için kullanılır.
Yayılma sözdizimi, normalde birçok argümandan oluşan bir liste gerektiren fonksiyonlara bir 
dizi iletmek için kullanılır.
Birlikte, bir liste ile bir dizi parametre arasında kolaylıkla geçiş yapmaya yardımcı olurlar.

*/

//Variable scope, closure
/*
Code blocks

If a variable is declared inside a code block {...}, it’s only visible inside that block.

For example:

 {
  // do some job with local variables that should not be seen outside

  let message = "Hello"; // only visible in this block

  alert(message); // Hello
}

alert(message); // Error: message is not defined
We can use this to isolate a piece of code that does its own task, with variables that only 
belong to it:

 {
  // show message
  let message = "Hello";
  alert(message);
}

{
  // show another message
  let message = "Goodbye";
  alert(message);
}
*/

/*
There’d be an error without blocks
Please note, without separate blocks there would be an error, if we use let with the existing
 variable name:

 // show message
let message = "Hello";
alert(message);

// show another message
let message = "Goodbye"; // Error: variable already declared
alert(message);
For if, for, while and so on, variables declared in {...} are also only visible inside:

 if (true) {
  let phrase = "Hello!";

  alert(phrase); // Hello!
}

alert(phrase); // Error, no such variable!
Here, after if finishes, the alert below won’t see the phrase, hence the error.

That’s great, as it allows us to create block-local variables, specific to an if branch.

The similar thing holds true for for and while loops:

 for (let i = 0; i < 3; i++) {
  // the variable i is only visible inside this for
  alert(i); // 0, then 1, then 2
}

alert(i); // Error, no such variable
Visually, let i is outside of {...}. But the for construct is special here: the variable, 
declared inside it, is considered a part of the block.
*/

/*
Nested functions

A function is called “nested” when it is created inside another function.

It is easily possible to do this with JavaScript.

We can use it to organize our code, like this:

function sayHiBye(firstName, lastName) {

  // helper nested function to use below
  function getFullName() {
    return firstName + " " + lastName;
  }

  alert( "Hello, " + getFullName() );
  alert( "Bye, " + getFullName() );

}
Here the nested function getFullName() is made for convenience. It can access the outer 
variables and so can return the full name. Nested functions are quite common in JavaScript.

What’s much more interesting, a nested function can be returned: either as a property of a
new object or as a result by itself. It can then be used somewhere else. No matter where, 
it still has access to the same outer variables.

Below, makeCounter creates the “counter” function that returns the next number on each 
invocation:

 function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();

alert( counter() ); // 0
alert( counter() ); // 1
alert( counter() ); // 2
*/

/*
Garbage collection

Usually, a Lexical Environment is removed from memory with all the variables after the 
function call finishes. That’s because there are no references to it. As any JavaScript object, 
it’s only kept in memory while it’s reachable.

However, if there’s a nested function that is still reachable after the end of a function, 
then it has [[Environment]] property that references the lexical environment.

In that case the Lexical Environment is still reachable even after the completion of the 
function, so it stays alive.


*/

/*
function f() {
  let value = 123;

  return function() {
    alert(value);
  }
}

let g = f(); // g.[[Environment]] stores a reference to the Lexical Environment
// of the corresponding f() call
Please note that if f() is called many times, and resulting functions are saved, then all 
corresponding Lexical Environment objects will also be retained in memory. In the code below, 
all 3 of them:

function f() {
  let value = Math.random();

  return function() { alert(value); };
}

// 3 functions in array, every one of them links to Lexical Environment
// from the corresponding f() run
let arr = [f(), f(), f()];
A Lexical Environment object dies when it becomes unreachable (just like any other object). 
In other words, it exists only while there’s at least one nested function referencing it.

In the code below, after the nested function is removed, its enclosing Lexical Environment 
(and hence the value) is cleaned from memory:

function f() {
  let value = 123;

  return function() {
    alert(value);
  }
}

let g = f(); // while g function exists, the value stays in memory

g = null; // ...and now the memory is cleaned up
*/

/*
An important side effect in V8 (Chrome, Edge, Opera) is that such variable will become unavailable in debugging.

Try running the example below in Chrome with the Developer Tools open.

When it pauses, in the console type alert(value).

 function f() {
  let value = Math.random();

  function g() {
    debugger; // in console: type alert(value); No such variable!
  }

  return g;
}

let g = f();
g();
As you could see – there is no such variable! In theory, it should be accessible, but the
 engine optimized it out.

That may lead to funny (if not such time-consuming) debugging issues. One of them – we can 
see a same-named outer variable instead of the expected one:

 let value = "Surprise!";

function f() {
  let value = "the closest value";

  function g() {
    debugger; // in console: type alert(value); Surprise!
  }

  return g;
}

let g = f();
g();
*/


/*
function sum(a) {

  return function(b) {
    return a + b; // takes "a" from the outer lexical environment
  };

}

alert( sum(1)(2) ); // 3
alert( sum(5)(-1) ); // 4
*/

/*
The result is: error.

Try running it:

 let x = 1;

function func() {
  console.log(x); // ReferenceError: Cannot access 'x' before initialization
  let x = 2;
}

func();
In this example we can observe the peculiar difference between a “non-existing” and
 “uninitialized” variable.

As you may have read in the article Variable scope, closure, a variable starts in the 
“uninitialized” state from the moment when the execution enters a code block (or a function).
 And it stays uninitalized until the corresponding let statement.

In other words, a variable technically exists, but can’t be used before let.

The code above demonstrates it.

function func() {
  // the local variable x is known to the engine from the beginning of the function,
  // but "uninitialized" (unusable) until let ("dead zone")
  // hence the error

  console.log(x); // ReferenceError: Cannot access 'x' before initialization

  let x = 2;
}
This zone of temporary unusability of a variable (from the beginning of the code block till let)
 is sometimes called the “dead zone”.
*/

/*
We have a built-in method arr.filter(f) for arrays. It filters all elements through the function 
f. If it returns true, then that element is returned in the resulting array.

Make a set of “ready to use” filters:

inBetween(a, b) – between a and b or equal to them (inclusively).
inArray([...]) – in the given array.
The usage must be like this:

arr.filter(inBetween(3,6)) – selects only values between 3 and 6.
arr.filter(inArray([1,2,3])) – selects only elements matching with one of the members of [1,2,3].
For instance:

// .. your code for inBetween and inArray 
let arr = [1, 2, 3, 4, 5, 6, 7];

alert( arr.filter(inBetween(3, 6)) ); // 3,4,5,6

alert( arr.filter(inArray([1, 2, 10])) ); // 1,2
Open a sandbox with tests.

solution
Filter inBetween

 function inBetween(a, b) {
  return function(x) {
    return x >= a && x <= b;
  };
}

let arr = [1, 2, 3, 4, 5, 6, 7];
alert( arr.filter(inBetween(3, 6)) ); // 3,4,5,6
Filter inArray

 function inArray(arr) {
  return function(x) {
    return arr.includes(x);
  };
}

let arr = [1, 2, 3, 4, 5, 6, 7];
alert( arr.filter(inArray([1, 2, 10])) ); // 1,2
*/

/*
let users = [
  { name: "John", age: 20, surname: "Johnson" },
  { name: "Pete", age: 18, surname: "Peterson" },
  { name: "Ann", age: 19, surname: "Hathaway" }
];
// by name (Ann, John, Pete)
users.sort((a, b) => a.name > b.name ? 1 : -1);

// by age (Pete, Ann, John)
users.sort((a, b) => a.age > b.age ? 1 : -1);

function byField(fieldName){
  return (a, b) => a[fieldName] > b[fieldName] ? 1 : -1;
}

users.sort(byField('name'));
users.sort(byField('age'));

*/

/*

function makeArmy() {
  let shooters = [];

  let i = 0;
  while (i < 10) {
      let j = i;
      let shooter = function() { // shooter function
        alert( j ); // should show its number
      };
    shooters.push(shooter);
    i++;
  }

  return shooters;
}

let army = makeArmy();

// Now the code works correctly
army[0](); // 0
army[5](); // 5
*/

/*
function makeArmy() {

  let shooters = [];

  for(let i = 0; i < 10; i++) {
    let shooter = function() { // shooter function
      alert( i ); // should show its number
    };
    shooters.push(shooter);
  }

  return shooters;
}

let army = makeArmy();

army[0](); // 0
army[5](); // 5
*/


//the old var


/*
❓ Neden hepsi 10 döndürüyor?

var, function-scope'tadır, yani for bloğu içinde yeni bir i yaratmaz.
Tüm shooter fonksiyonları aynı i değişkenini paylaşır.
Döngü bittikten sonra i = 10 olur.
Sonra her shooter çağrıldığında i zaten 10 olmuştur, onu gösterir.
Yani fonksiyonlar oluşturulurken i = 0, i = 1 vs. gibi değerleri kopyalamaz, sadece referansı tutar.
*/


/*
“var” has no block scope

Variables, declared with var, are either function-scoped or global-scoped. They are visible
 through blocks.

For instance:

 if (true) {
  var test = true; // use "var" instead of "let"
}

alert(test); // true, the variable lives after if
As var ignores code blocks, we’ve got a global variable test.

If we used let test instead of var test, then the variable would only be visible inside if:

 if (true) {
  let test = true; // use "let"
}

alert(test); // ReferenceError: test is not defined
The same thing for loops: var cannot be block- or loop-local:

 for (var i = 0; i < 10; i++) {
  var one = 1;
  // ...
}

alert(i);   // 10, "i" is visible after loop, it's a global variable
alert(one); // 1, "one" is visible after loop, it's a global variable
If a code block is inside a function, then var becomes a function-level variable:




 function sayHi() {
  if (true) {
    var phrase = "Hello";
  }

  alert(phrase); // works
}

sayHi();
alert(phrase); // ReferenceError: phrase is not defined
As we can see, var pierces through if, for or other code blocks. That’s because a long time 
ago in JavaScript, blocks had no Lexical Environments, and var is a remnant of that.

//var global gibi if in icinde tanimlarsan disardan erisiliyor ama let ile erisilmiyor
//var eger fonk icindeki if icinde ise o zaman disaridan erisilemez, fonk seviyesinde kaliyor

*/


/*
“var” tolerates redeclarations

If we declare the same variable with let twice in the same scope, that’s an error:

 let user;
let user; // SyntaxError: 'user' has already been declared
With var, we can redeclare a variable any number of times. If we use var with an already-declared
 variable, it’s just ignored:

 var user = "Pete";

var user = "John"; // this "var" does nothing (already declared)
// ...it doesn't trigger an error

alert(user); // John
*/

/*
“var” variables can be declared below their use

var declarations are processed when the function starts (or script starts for globals).

In other words, var variables are defined from the beginning of the function, 
no matter where the definition is (assuming that the definition is not in the nested function).

So this code:

 function sayHi() {
  phrase = "Hello";

  alert(phrase);

  var phrase;
}
sayHi();
…Is technically the same as this (moved var phrase above):

 function sayHi() {
  var phrase;

  phrase = "Hello";

  alert(phrase);
}
sayHi();
…Or even as this (remember, code blocks are ignored):

 function sayHi() {
  phrase = "Hello"; // (*)

  if (false) {
    var phrase;
  }

  alert(phrase);
}
sayHi();
People also call such behavior “hoisting” (raising), because all var are “hoisted” (raised) 
to the top of the function.

So in the example above, if (false) branch never executes, but that doesn’t matter. The var 
inside it is processed in the beginning of the function, so at the moment of (*) the variable
 exists.


*/

/*
Declarations are hoisted, but assignments are not.

That’s best demonstrated with an example:

 function sayHi() {
  alert(phrase);

  var phrase = "Hello";
}

sayHi();
The line var phrase = "Hello" has two actions in it:

Variable declaration var
Variable assignment =.
The declaration is processed at the start of function execution (“hoisted”), but the assignment
 always works at the place where it appears. So the code works essentially like this:

 function sayHi() {
  var phrase; // declaration works at the start...

  alert(phrase); // undefined

  phrase = "Hello"; // ...assignment - when the execution reaches it.
}

sayHi();
Because all var declarations are processed at the function start, we can reference them at any 
place. But variables are undefined until the assignments.

In both examples above, alert runs without an error, because the variable phrase exists. But 
its value is not yet assigned, so it shows undefined.


*/

//Global object
//In a browser it is named window, for Node.js it is global, for other environments it may have 
// another name.


/*
In a browser, global functions and variables declared with var (not let/const!) become the 
property of the global object:

 var gVar = 5;

alert(window.gVar); // 5 (became a property of the global object)
*/

/*
If we used let instead, such thing wouldn’t happen:

 let gLet = 5;

alert(window.gLet); // undefined (doesn't become a property of the global object)
*/

/*
If a value is so important that you’d like to make it available globally, write it directly as
 a property:

 // make current user information global, to let all scripts access it
window.currentUser = {
  name: "John"
};

// somewhere else in code
alert(currentUser.name);  // John

// or, if we have a local variable with the name "currentUser"
// get it from window explicitly (safe!)
alert(window.currentUser.name); // John
That said, using global variables is generally discouraged. There should be as few global
 variables as possible. The code design where a function gets “input” variables and produces 
 certain “outcome” is clearer, less prone to errors and easier to test than if it uses outer 
 or global variables.


*/


/*
test if a built-in Promise object exists (it doesn’t in really old browsers):

 if (!window.Promise) {
  alert("Your browser is really old!");
}
If there’s none (say, we’re in an old browser), we can create “polyfills”: add functions that
 are not supported by the environment, but exist in the modern standard.

 if (!window.Promise) {
  window.Promise = ... // custom implementation of the modern language feature
}
*/

//Function object, NFE
/*
a function’s name is accessible as the “name” property:

 function sayHi() {
  alert("Hi");
}

alert(sayHi.name); // sayHi
*/

/*
the name-assigning logic is smart. It also assigns the correct name to a function even if it’s 
created without one, and then immediately assigned:

 let sayHi = function() {
  alert("Hi");
};

alert(sayHi.name); // sayHi (there's a name!)
It also works if the assignment is done via a default value:

 function f(sayHi = function() {}) {
  alert(sayHi.name); // sayHi (works!)
}

f();
*/

/*
In the specification, this feature is called a “contextual name”. If the function does not 
provide one, then in an assignment it is figured out from the context.

Object methods have names too:

 let user = {

  sayHi() {
    // ...
  },

  sayBye: function() {
    // ...
  }

}

alert(user.sayHi.name); // sayHi
alert(user.sayBye.name); // sayBye
*/

/*
There’s no magic though. There are cases when there’s no way to figure out the right name. 
In that case, the name property is empty, like here:

 // function created inside array
let arr = [function() {}];

alert( arr[0].name ); // <empty string>
// the engine has no way to set up the right name, so there is none
*/

/*
The “length” property

There is another built-in property “length” that returns the number of function parameters, 
for instance:

 function f1(a) {}
function f2(a, b) {}
function many(a, b, ...more) {}

alert(f1.length); // 1
alert(f2.length); // 2
alert(many.length); // 2
Here we can see that rest parameters are not counted.

The length property is sometimes used for introspection in functions that operate on other 
functions.

For instance, in the code below the ask function accepts a question to ask and an arbitrary 
number of handler functions to call.

Once a user provides their answer, the function calls the handlers. We can pass two kinds
 of handlers:

A zero-argument function, which is only called when the user gives a positive answer.
A function with arguments, which is called in either case and returns an answer.

*/

/*
To call handler the right way, we examine the handler.length property.

The idea is that we have a simple, no-arguments handler syntax for positive cases 
(most frequent variant), but are able to support universal handlers as well:

 function ask(question, ...handlers) {
  let isYes = confirm(question);

  for(let handler of handlers) {
    if (handler.length == 0) {
      if (isYes) handler();
    } else {
      handler(isYes);
    }
  }

}

// for positive answer, both handlers are called
// for negative answer, only the second one
ask("Question?", () => alert('You said yes'), result => alert(result));
This is a particular case of so-called polymorphism – treating arguments differently depending 
on their type or, in our case depending on the length. The idea does have a use in JavaScript 
libraries.


*/


/*
We can also add properties of our own.

Here we add the counter property to track the total calls count:

 function sayHi() {
  alert("Hi");

  // let's count how many times we run
  sayHi.counter++;
}
sayHi.counter = 0; // initial value

sayHi(); // Hi
sayHi(); // Hi

alert( `Called ${sayHi.counter} times` ); // Called 2 times
*/

/*
A property is not a variable
A property assigned to a function like sayHi.counter = 0 does not define a local variable 
counter inside it. In other words, a property counter and a variable let counter are two 
unrelated things.

We can treat a function as an object, store properties in it, but that has no effect on 
its execution. Variables are not function properties and vice versa. These are just
 parallel worlds.
*/

/*
Function properties can replace closures sometimes. For instance, we can rewrite the counter
 function example from the chapter Variable scope, closure to use a function property:

 function makeCounter() {
  // instead of:
  // let count = 0

  function counter() {
    return counter.count++;
  };

  counter.count = 0;

  return counter;
}

let counter = makeCounter();
alert( counter() ); // 0
alert( counter() ); // 1
The count is now stored in the function directly, not in its outer Lexical Environment.

Is it better or worse than using a closure?

The main difference is that if the value of count lives in an outer variable, then external 
code is unable to access it. Only nested functions may modify it. And if it’s bound to 
a function, then such a thing is possible:

 function makeCounter() {

  function counter() {
    return counter.count++;
  };

  counter.count = 0;

  return counter;
}

let counter = makeCounter();

counter.count = 10;
alert( counter() ); // 10
So the choice of implementation depends on our aims.


*/


//Named Function Expression

/*
let sayHi = function func(who) {
  alert(`Hello, ${who}`);
};

sayHi("John"); // Hello, John
There are two special things about the name func, that are the reasons for it:

It allows the function to reference itself internally.
It is not visible outside of the function.
Fonksiyonun kendisine dahili olarak referans vermesini sağlar.
İşlevin dışında görünmez.
*/


/*
For instance, the function sayHi below calls itself again with "Guest" if no who is provided:

 let sayHi = function func(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
    func("Guest"); // use func to re-call itself
  }
};

sayHi(); // Hello, Guest

// But this won't work:
func(); // Error, func is not defined (not visible outside of the function)
*/

/*
func(who) → isimli bir function expression.
sayHi → bu fonksiyonun değişkene atanan ismi.
Fonksiyonun kendi içinde func(...) şeklinde kendine referans verebilmesi için özel olarak func ismi verilmiş.
Ama bu func fonksiyonun dışında görünmez, sadece içinde kullanılabilir.
Yani func() dışarıdan çağrılmaya çalışılırsa hata verir.

*/


/*
Why do we use func? Maybe just use sayHi for the nested call?

Actually, in most cases we can:

let sayHi = function(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
    sayHi("Guest");
  }
};
The problem with that code is that sayHi may change in the outer code. If the function gets 
assigned to another variable instead, the code will start to give errors:

 let sayHi = function(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
    sayHi("Guest"); // Error: sayHi is not a function
  }
};
//let welcome = sayHi(); boyle calisiyor

let welcome = sayHi;
sayHi = null;

welcome(); // Error, the nested sayHi call doesn't work any more!
That happens because the function takes sayHi from its outer lexical environment. There’s no 
local sayHi, so the outer variable is used. And at the moment of the call that outer sayHi is null.


*/

/*
❌ Hata: sayHi null olduğu için içerdeki sayHi("Guest") çalışmaz
🧠 Açıklama:
Burada function(who) ifadesi anonim fonksiyondur, ismi yok.
İçeride sayHi(...) çağırıyor ama bu aslında dışarıdaki sayHi değişkenine bakıyor.
Eğer daha sonra sayHi = null yaparsan → dışarıdaki referans gittiği için içeri de bozulur.
Bu, kırılgan bir yapıdır. İç referans dış ortama bağlıdır.

*/


/*
1. Function Declaration (Fonksiyon Bildirimi)

function sayHi(name) {
  console.log(`Hello, ${name}`);
}
✅ Ne zaman tercih edilir?
Kullanım Durumu	Neden Tercih Edilir
Kodun üst kısmında veya global düzeyde tanım yapacaksan	Hoisting vardır, her yerden çağırılabilir
Fonksiyon birden fazla yerde kullanılacaksa	Kodun okunabilirliği artar
Recursive (kendi kendini çağıran) işlemler için uygundur	Fonksiyon adı sabittir, kolay kontrol edilir
Test edilebilirliği artırmak istersen	Daha stabildir, globalde de tanımlanabilir
❗️Dikkat:
function tanımlamaları hoisted (yukarı çekilir), yani tanımlandığı yerden önce de çağrılabilir.
Bu yüzden büyük projelerde beklenmedik davranışlara neden olabilir, dikkatli kullanılmalı.

*/


/*
 2. Function Expression (Fonksiyon İfadesi)

let sayHi = function(name) {
  console.log(`Hello, ${name}`);
};
✅ Ne zaman tercih edilir?
Kullanım Durumu	Neden Tercih Edilir
Fonksiyonu bir değişkene atamak istersen (özellikle closure yapılarında)	Daha esnek kullanım sağlar
Fonksiyonları argüman olarak başka fonksiyona geçireceksen (callback)	Fonksiyon nesnesi gibi davranır
Kod sıralaması önemliyse ve tanım-sonra-kullan yapacaksan	Hoisting yoktur, kod akışı nettir
Daha sonra fonksiyonun değerini değiştireceksen	Değişken gibi kontrol edebilirsin
❗️Dikkat:
let sayHi = function() {} ifadesi hoisted değildir, önce tanım, sonra kullanım gerekir.
SayHi dışarıdan silinirse (örnek: sayHi = null), fonksiyon erişilemez hale gelir.

*/

/*
🔧 3. İsimli Function Expression

let sayHi = function greet(name) {
  console.log(`Hello, ${name}`);
  // greet("Ali") → kendi kendine çağrı
};
✅ Ne zaman tercih edilir?
Kullanım Durumu	Neden Tercih Edilir
Fonksiyon kendini tekrar çağıracaksa (recursion)	İç referans dıştan bağımsız olur
Fonksiyon bir değişkene atanıp daha sonra değiştirilecekse	Fonksiyon içeriden çalışmaya devam eder
Hata ayıklamada (debug) fonksiyon ismini görmek istersen	Stack trace'te isim görünür
❗️Dikkat:
greet sadece fonksiyonun içinde geçerlidir.
sayHi = null yapsan bile içindeki greet("...") çalışır.

*/

/*
sayHi yerine greet kullanmazsak ne olur?

let sayHi = function(name) {
  if (name) {
    console.log(`Hello, ${name}`);
  } else {
    sayHi("Guest"); // TEHLİKELİ
  }
};

let welcome = sayHi;
sayHi = null;

welcome(); // ❌ sayHi içeride artık null, hata verir
Çünkü burada fonksiyon içinde sayHi dışarıdan bağlanıyor, bu da tehlikeli!
*/

/*
4. İsimsiz Function Expression (Anonymous Function)

let sayHi = function(name) {
  console.log(`Hello, ${name}`);
};
✅ Ne zaman tercih edilir?
Kullanım Durumu	Neden Tercih Edilir
Fonksiyon sadece 1 yerde kullanılacaksa	Gereksiz isim tanımlamaktan kaçınırsın
Callbacks / event handlers için	Daha kısa ve sade
IIFE (Immediately Invoked Function Expression) gibi yapılar için	Fonksiyonun bir adı gerekmez
❗️Dikkat:
İçeriden kendini tekrar çağırmak zordur (sayHi dış referansa bağlı olur).


*/


/*
5. Arrow Function (ES6)

const sayHi = (name) => {
  console.log(`Hello, ${name}`);
};
✅ Ne zaman tercih edilir?
Kullanım Durumu	Neden Tercih Edilir
Kısa, tek satırlık işlemler	Daha okunabilir ve sade
Callback veya inline fonksiyonlarda	Yazımı kolaydır
this, arguments, super gibi keyword'lere ihtiyaç yoksa	Arrow function kendi this'ini bağlamaz
Promise, map, filter, reduce gibi yapılar	Arrow daha uygundur
❗️Dikkat:
this bağlamı yoktur → event handler, class method, constructor gibi yerlerde kullanma.
Recursive işlem yapacaksan tercih edilmez.

*/

/*
The optional name which we can put into the Function Expression is meant to solve exactly these
 kinds of problems.

Let’s use it to fix our code:

 let sayHi = function func(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
    func("Guest"); // Now all fine
  }
};

let welcome = sayHi;
sayHi = null;

welcome(); // Hello, Guest (nested call works)
Now it works, because the name "func" is function-local. It is not taken from outside 
(and not visible there). The specification guarantees that it will always reference the 
current function.

The outer code still has its variable sayHi or welcome. And func is an “internal function name”,
 the way for the function to call itself reliably.


*/

/*
There’s no such thing for Function Declaration
The “internal name” feature described here is only available for Function Expressions, not for 
Function Declarations. For Function Declarations, there is no syntax for adding an “internal” name.

Sometimes, when we need a reliable internal name, it’s the reason to rewrite a Function 
Declaration to Named Function Expression form.
*/

/*
Functions are objects.

Here we covered their properties:

name – the function name. Usually taken from the function definition, but if there’s none, 
JavaScript tries to guess it from the context (e.g. an assignment).
length – the number of arguments in the function definition. Rest parameters are not counted.
If the function is declared as a Function Expression (not in the main code flow), and it carries
 the name, then it is called a Named Function Expression. The name can be used inside to 
 reference itself, for recursive calls or such.

Also, functions may carry additional properties. Many well-known JavaScript libraries make great
 use of this feature.

They create a “main” function and attach many other “helper” functions to it. For instance, the 
jQuery library creates a function named $. The lodash library creates a function _, and then 
adds _.clone, _.keyBy and other properties to it (see the docs when you want to learn more 
about them). Actually, they do it to lessen their pollution of the global space, so that a 
single library gives only one global variable. That reduces the possibility of naming conflicts.

So, a function can do a useful job by itself and also carry a bunch of other functionality in
 properties.


*/

/*
The solution uses count in the local variable, but addition methods are written right into 
the counter. They share the same outer lexical environment and also can access the current count.

function makeCounter() {
  let count = 0;

  function counter() {
    return count++;
  }

  counter.set = value => count = value;

  counter.decrease = () => count--;

  return counter;
}
*/

/*
For the whole thing to work anyhow, the result of sum must be function.
That function must keep in memory the current value between calls.
According to the task, the function must become the number when used in ==. Functions are 
objects, so the conversion happens as described in the chapter Object to primitive conversion,
 and we can provide our own method that returns the number.
Now the code:

 function sum(a) {

  let currentSum = a;

  function f(b) {
    currentSum += b;
    return f;
  }

  f.toString = function() {
    return currentSum;
  };

  return f;
}

alert( sum(1)(2) ); // 3
alert( sum(5)(-1)(2) ); // 6
alert( sum(6)(-1)(-2)(-3) ); // 0
alert( sum(0)(1)(2)(3)(4)(5) ); // 15
Please note that the sum function actually works only once. It returns function f.

Then, on each subsequent call, f adds its parameter to the sum currentSum, and returns itself.

There is no recursion in the last line of f.

Here is what recursion looks like:

function f(b) {
  currentSum += b;
  return f(); // <-- recursive call
}
And in our case, we just return the function, without calling it:

function f(b) {
  currentSum += b;
  return f; // <-- does not call itself, returns itself
}
This f will be used in the next call, again return itself, as many times as needed. Then, 
when used as a number or a string – the toString returns the currentSum. We could also use
 Symbol.toPrimitive or valueOf here for the conversion.


*/


//The "new Function" syntax
//let func = new Function ([arg1, arg2, ...argN], functionBody);

/*
let sum = new Function('a', 'b', 'return a + b');

alert( sum(1, 2) ); // 3

*/

/*
let sayHi = new Function('alert("Hello")');

sayHi(); // Hello
*/

/*
The major difference from other ways we’ve seen is that the function is created literally from 
a string, that is passed at run time.
All previous declarations required us, programmers, to write the function code in the script.
But new Function allows to turn any string into a function. For example, we can receive a new 
function from a server and then execute it:
Gördüğümüz diğer yöntemlerden en büyük farkı, fonksiyonun çalışma zamanında aktarılan bir dizeden
 tam anlamıyla oluşturulmasıdır.
Önceki tüm bildirimler biz programcıların fonksiyon kodunu kodun içine yazmamızı gerektiriyordu.
Ancak yeni Function herhangi bir dizeyi bir fonksiyona dönüştürmeye izin verir. Örneğin, bir 
sunucudan yeni bir fonksiyon alabilir ve sonra onu çalıştırabiliriz:

let str = ... receive the code from a server dynamically ...

let func = new Function(str);
func();
It is used in very specific cases, like when we receive code from a server, or to dynamically 
compile a function from a template, in complex web-applications.
Bir sunucudan kod aldığımızda veya karmaşık web uygulamalarında bir şablondan bir işlevi dinamik
 olarak derlemek gibi çok özel durumlarda kullanılır.
*/

/*
Closure

Usually, a function remembers where it was born in the special property [[Environment]]. 
It references the Lexical Environment from where it’s created (we covered that in the chapter 
Variable scope, closure).

But when a function is created using new Function, its [[Environment]] is set to reference
 not the current Lexical Environment, but the global one.

So, such function doesn’t have access to outer variables, only to the global ones.

function getFunc() {
  let value = "test";

  let func = new Function('alert(value)');

  return func;
}

getFunc()(); // error: value is not defined
*/

/*
🔍 Ne Oluyor?
let value = "test"; ➝ Bu değişken getFunc fonksiyonunun içindedir.
Ama sonra şunu yapıyoruz:
let func = new Function('alert(value)');
Bu, yeni bir fonksiyon objesi oluşturur ama hiçbir lexical scope kullanmaz!
🔥 Önemli Kural:
new Function(...) ile oluşturulan fonksiyonlar her zaman global scope içinde çalışır.
Yani:

value değişkeni sadece getFunc() fonksiyonu içinde tanımlı.
Ama new Function tarafından oluşturulan fonksiyon global scope’a bakar.
Global scope’ta value yok.
Dolayısıyla: ❌ ReferenceError: value is not defined
*/


/*
Compare it with the regular behavior:

 function getFunc() {
  let value = "test";

  let func = function() { alert(value); };

  return func;
}

getFunc()(); // "test", from the Lexical Environment of getFunc

*/

/*
🔍 Ne Oluyor?
let value = "test"; yine burada da aynı.
Ama fonksiyonu şöyle tanımlıyoruz:
let func = function() {
  alert(value);
};
Bu fonksiyon normal bir closure’dır.
Tanımlandığı yerdeki lexical environment’ı (çevresini) hatırlar.
Yani fonksiyon dönerken, value’yi yanında taşır.
getFunc()() çağrıldığında:
İçteki fonksiyon çalışır.
value = "test" olan değeri görür ve ekrana basar.

*/


/*
This special feature of new Function looks strange, but appears very useful in practice.
Imagine that we must create a function from a string. The code of that function is not known at 
the time of writing the script (that’s why we don’t use regular functions), but will be known in
 the process of execution. We may receive it from the server or from another source.
Our new function needs to interact with the main script.
What if it could access the outer variables?
The problem is that before JavaScript is published to production, it’s compressed using 
a minifier – a special program that shrinks code by removing extra comments, spaces and – 
what’s important, renames local variables into shorter ones.
For instance, if a function has let userName, minifier replaces it with let a (or another 
letter if this one is occupied), and does it everywhere. That’s usually a safe thing to do,
 because the variable is local, nothing outside the function can access it. And inside the 
 function, minifier replaces every mention of it. Minifiers are smart, they analyze the code 
 structure, so they don’t break anything. They’re not just a dumb find-and-replace.
So if new Function had access to outer variables, it would be unable to find renamed userName.
If new Function had access to outer variables, it would have problems with minifiers.
Besides, such code would be architecturally bad and prone to errors.
To pass something to a function, created as new Function, we should use its arguments.


Yeni Function'ın bu özelliği garip görünse de pratikte çok kullanışlı.
Bir dizeden bir fonksiyon oluşturmamız gerektiğini düşünün. Bu fonksiyonun kodu kod yazılırken 
bilinmiyor (bu yüzden normal fonksiyonları kullanmıyoruz), ancak yürütme sürecinde bilinecek.
 Bunu sunucudan ya da başka bir kaynaktan alabiliriz.
Yeni fonksiyonumuzun ana senaryo ile etkileşime girmesi gerekiyor.
Peki ya dış değişkenlere erişebilseydi?
Sorun şu ki, JavaScript üretimde yayınlanmadan önce, bir küçültücü kullanılarak sıkıştırılır - 
fazladan yorumları, boşlukları kaldırarak kodu küçülten ve - önemli olan, yerel değişkenleri
 daha kısa olanlarla yeniden adlandıran özel bir program.
Örneğin, bir fonksiyonda let userName varsa, minifier bunu let a (veya bu harf doluysa başka bir
 harf) ile değiştirir ve bunu her yerde yapar. Bu genellikle yapılacak güvenli bir şeydir, çünkü
  değişken yereldir, fonksiyon dışında hiçbir şey ona erişemez. Ve fonksiyonun içinde, küçültücü
   ondan bahsedilen her şeyi değiştirir. Küçültücüler akıllıdır, kod yapısını analiz ederler, 
   böylece hiçbir şeyi bozmazlar. Sadece aptalca bir bul ve değiştir değildirler.
Dolayısıyla, new Function'ın dış değişkenlere erişimi olsaydı, yeniden adlandırılmış userName'i
 bulamazdı.
Eğer new Function dış değişkenlere erişebilseydi, küçültücülerle sorun yaşardı.
Ayrıca, böyle bir kod mimari açıdan kötü ve hataya açık olacaktır.
new Function olarak oluşturulan bir fonksiyona bir şey aktarmak için onun argümanlarını 
kullanmalıyız.
*/

/*
Functions created with new Function, have [[Environment]] referencing the global Lexical 
Environment, not the outer one. Hence, they cannot use outer variables. But that’s actually 
good, because it insures us from errors. Passing parameters explicitly is a much better method 
architecturally and causes no problems with minifiers.


*/

//Scheduling: setTimeout and setInterval
/*
We may decide to execute a function not right now, but at a certain time later. That’s called
 “scheduling a call”.

There are two methods for it:

setTimeout allows us to run a function once after the interval of time.
setInterval allows us to run a function repeatedly, starting after the interval of time, then 
repeating continuously at that interval.
These methods are not a part of JavaScript specification. But most environments have the internal
 scheduler and provide these methods. In particular, they are supported in all browsers and 
 Node.js.


*/


/*
setTimeout

The syntax:

let timerId = setTimeout(func|code, [delay], [arg1], [arg2], ...)
Parameters:

func|code
Function or a string of code to execute. Usually, that’s a function. For historical reasons,
 a string of code can be passed, but that’s not recommended.
delay
The delay before run, in milliseconds (1000 ms = 1 second), by default 0.
arg1, arg2…
Arguments for the function
For instance, this code calls sayHi() after one second:

 function sayHi() {
  alert('Hello');
}

setTimeout(sayHi, 1000);
With arguments:

 function sayHi(phrase, who) {
  alert( phrase + ', ' + who );
}

setTimeout(sayHi, 1000, "Hello", "John"); // Hello, John
If the first argument is a string, then JavaScript creates a function from it.

/*
🧠 1. setTimeout("alert('Hello')", 1000);

Bu şekilde de çalışır. Çünkü:

setTimeout fonksiyonuna string olarak "alert('Hello')" geçiliyor.
JavaScript, bu stringi eval() gibi değerlendirir ve çalıştırır.
Ama bu neden önerilmez?
❌ Güvensiz: Eğer bu string dışarıdan geliyorsa (örneğin kullanıcıdan), XSS gibi güvenlik açıklarına neden olabilir.
❌ Hatalı kod takibi: String içindeki kodlar debug sırasında görünmez.
❌ Yavaş: JavaScript motoru stringi parse etmek zorunda kalır.

*/

/*
So, this will also work:

 setTimeout("alert('Hello')", 1000);
But using strings is not recommended, use arrow functions instead of them, like this:

 setTimeout(() => alert('Hello'), 1000);

*/

/*
Bu bir arrow function (ok fonksiyonu).
setTimeout fonksiyonun referansını alır.
1000 ms sonra alert('Hello') çalıştırılır.
Temiz, güvenli ve modern bir yazım şeklidir.

*/

/*
Pass a function, but don’t run it
Novice developers sometimes make a mistake by adding brackets () after the function:

// wrong!
setTimeout(sayHi(), 1000);
That doesn’t work, because setTimeout expects a reference to a function. And here sayHi() 
runs the function, and the result of its execution is passed to setTimeout. In our case the 
result of sayHi() is undefined (the function returns nothing), so nothing is scheduled.
*/


/*
🧠 2. Hatalı Kullanım: setTimeout(sayHi(), 1000);

Neden yanlış?
function sayHi() {
  alert("Hi");
}

setTimeout(sayHi(), 1000); // ❌ HATALI
sayHi() bu satırda hemen çalıştırılır.
Fonksiyonun sonucu undefined döner çünkü alert() bir şey döndürmez.
Dolayısıyla setTimeout(undefined, 1000) olur, yani hiçbir şey zamanlanmaz.

*/

/*
✅ Doğru Kullanım:
setTimeout(sayHi, 1000); // ✅ DOĞRU
Burada sayHi() çağrılmaz, sadece referansı verilir.
setTimeout 1 saniye bekledikten sonra kendi çağırır.

*/

/*
Canceling with clearTimeout

A call to setTimeout returns a “timer identifier” timerId that we can use to cancel the execution.

The syntax to cancel:

let timerId = setTimeout(...);
clearTimeout(timerId);
In the code below, we schedule the function and then cancel it (changed our mind). As a result, 
nothing happens:

 let timerId = setTimeout(() => alert("never happens"), 1000);
alert(timerId); // timer identifier

clearTimeout(timerId);
alert(timerId); // same identifier (doesn't become null after canceling)
As we can see from alert output, in a browser the timer identifier is a number. In other 
environments, this can be something else. For instance, Node.js returns a timer object with 
additional methods.


*/

/*

setTimeout(...) çağrılıyor ve bir timer tanımlanıyor.
Bu fonksiyonun dönüş değeri bir timer kimliği (ID) oluyor.
Bu timerId, daha sonra clearTimeout(timerId) ile iptal ediliyor.
Sonuç olarak: alert("never happens") çalışmaz.
Bu satırda bir fonksiyon 1000 ms (1 saniye) sonra çalışmak üzere planlanıyor.
Fonksiyon: () => alert("never happens")
Geri dönen timerId bir sayı olur (tarayıcıda).
alert(timerId); // Örnek: 1, 2, 3 gibi
Bu ID'yi gösterir. Genelde sayı olur, ama platforma bağlıdır.
Bu ID, setTimeout'un planladığı işlemi tanımlar.
clearTimeout(timerId);
Bu satırla işlemi iptal etmiş olursun.
Artık zaman dolsa bile, alert("never happens") çalıştırılmaz.
alert(timerId); // aynı ID yine gösterilir
timerId değişkeni aynı kalır.
clearTimeout() bu değeri değiştirmez.
İptal sadece işlemin yapılmasını engeller.

setTimeout(...) ile alert("never happens") adlı fonksiyon 1 saniye sonra çalışmak üzere planlanıyor.
Ama hemen ardından:
clearTimeout(timerId);
ile bu zamanlama iptal ediliyor.
Bu yüzden:
Zamanlayıcı hiç devreye girmiyor,
alert() çalıştırılmıyor.

*/


/*
setInterval

The setInterval method has the same syntax as setTimeout:

let timerId = setInterval(func|code, [delay], [arg1], [arg2], ...)
All arguments have the same meaning. But unlike setTimeout it runs the function not only once,
 but regularly after the given interval of time.
//verilen zaman icinde surekli calisir, settimeout 1 kez verilen sureden sonra calisiyor
To stop further calls, we should call clearInterval(timerId).

The following example will show the message every 2 seconds. After 5 seconds, the output is
stopped:

 // repeat with the interval of 2 seconds
let timerId = setInterval(() => alert('tick'), 2000);

// after 5 seconds stop
setTimeout(() => { clearInterval(timerId); alert('stop'); }, 5000);
*/

/*
Time goes on while alert is shown
In most browsers, including Chrome and Firefox the internal timer continues “ticking” while 
showing alert/confirm/prompt.

So if you run the code above and don’t dismiss the alert window for some time, then the next
 alert will be shown immediately as you do it. The actual interval between alerts will be 
 shorter than 2 seconds.
 //uyari cikinca kapatmazsan arkadan digeri calisir yine 
*/

/*
Nested setTimeout

There are two ways of running something regularly.

One is setInterval. The other one is a nested setTimeout, like this:

/**  instead of:
let timerId = setInterval(() => alert('tick'), 2000);
**/

/*

let timerId = setTimeout(function tick() {
  alert('tick');
  timerId = setTimeout(tick, 2000); // (*)
}, 2000);
The setTimeout above schedules the next call right at the end of the current one (*).

The nested setTimeout is a more flexible method than setInterval. This way the next call may be
 scheduled differently, depending on the results of the current one.
*/

/*
Çünkü bu yöntem, setInterval’dan daha esnektir:
🔁 setInterval şöyle çalışır:

setInterval(tick, 2000);
Bu durumda:

Her 2 saniyede bir tick() çağrılır.
Ama önceki çağrı tamamlanmamış olsa bile bir sonraki çalışır.
Bu, gecikmelerde çakışmalara ve üst üste bindirmelere neden olabilir.
🧠 setTimeout zinciri ise:

Her çalışmadan sonra manuel olarak bir sonraki çalışmayı planlar.
Böylece eğer işlem uzun sürerse, bir sonrakini daha sonra başlatabilirsin.
Gerekirse süreyi değiştirebilir, hata varsa bekleyebilir, dinamik zamanlayabilirsin.

*/

/*
 🧪 Örnek Durum:

Diyelim ki bir sunucudan veri alıyorsun, her 2 saniyede bir.

function tick() {
  fetch('/api/data')
    .then(() => {
      timerId = setTimeout(tick, 2000); // başarılıysa devam
    })
    .catch(() => {
      timerId = setTimeout(tick, 5000); // hata varsa 5 saniye bekle
    });
}

let timerId = setTimeout(tick, 2000);
Görüyor musun? Bu esneklik setInterval'da yok. Orası sadece düz aralıklarla çalışır.


*/

/*
For instance, we need to write a service that sends a request to the server every 5 seconds 
asking for data, but in case the server is overloaded, it should increase the interval to 10,
 20, 40 seconds…

Here’s the pseudocode:

let delay = 5000;

let timerId = setTimeout(function request() {
  ...send request...

  if (request failed due to server overload) {
    // increase the interval to the next run
    delay *= 2;
  }

  timerId = setTimeout(request, delay);

}, delay);
And if the functions that we’re scheduling are CPU-hungry, then we can measure the time taken 
by the execution and plan the next call sooner or later.

Nested setTimeout allows to set the delay between the executions more precisely than setInterval.
*/

/*
The first one uses setInterval:

let i = 1;
setInterval(function() {
  func(i++);
}, 100);
The second one uses nested setTimeout:

let i = 1;
setTimeout(function run() {
  func(i++);
  setTimeout(run, 100);
}, 100);
For setInterval the internal scheduler will run func(i++) every 100ms:


*/

/*
The real delay between func calls for setInterval is less than in the code!
That’s normal, because the time taken by func’s execution “consumes” a part of the interval.
It is possible that func’s execution turns out to be longer than we expected and takes more 
than 100ms.
In this case the engine waits for func to complete, then checks the scheduler and if the time
 is up, runs it again immediately.
In the edge case, if the function always executes longer than delay ms, then the calls will
 happen without a pause at all.
 setInterval için func çağrıları arasındaki gerçek gecikme koddakinden daha azdır!
Bu normaldir, çünkü func'un yürütülmesiyle geçen süre aralığın bir kısmını “tüketir”.
func'un yürütülmesinin beklediğimizden daha uzun sürmesi ve 100 ms'den fazla zaman alması 
mümkündür.
Bu durumda motor func'ın tamamlanmasını bekler, ardından zamanlayıcıyı kontrol eder ve süre 
dolmuşsa hemen tekrar çalıştırır.
Uç durumda, fonksiyon her zaman gecikme ms'den daha uzun süre çalışırsa, çağrılar hiç 
duraklamadan gerçekleşir.

The nested setTimeout guarantees the fixed delay (here 100ms).
That’s because a new call is planned at the end of the previous one.
İç içe geçmiş setTimeout sabit gecikmeyi (burada 100 ms) garanti eder.
Bunun nedeni, yeni bir çağrının bir öncekinin sonunda planlanmış olmasıdır.

*/


/*
Garbage collection and setInterval/setTimeout callback
When a function is passed in setInterval/setTimeout, an internal reference is created to it and
 saved in the scheduler. It prevents the function from being garbage collected, even if there are
  no other references to it.

// the function stays in memory until the scheduler calls it
setTimeout(function() {...}, 100);
For setInterval the function stays in memory until clearInterval is called.

There’s a side effect. A function references the outer lexical environment, so, while it lives,
 outer variables live too. They may take much more memory than the function itself. So when 
 we don’t need the scheduled function anymore, it’s better to cancel it, even if it’s very small.
*/


/*
Zero delay setTimeout
There’s a special use case: setTimeout(func, 0), or just setTimeout(func).
This schedules the execution of func as soon as possible. But the scheduler will invoke it
 only after the currently executing script is complete.
So the function is scheduled to run “right after” the current script.
For instance, this outputs “Hello”, then immediately “World”:

Bu, func'un mümkün olan en kısa sürede yürütülmesini planlar. Ancak zamanlayıcı bunu yalnızca 
o anda yürütülmekte olan kod tamamlandıktan sonra çağıracaktır.

 setTimeout(() => alert("World"));
alert("Hello");

The first line “puts the call into calendar after 0ms”. But the scheduler will only “check 
the calendar” after the current script is complete, so "Hello" is first, and "World" – after it.
There are also advanced browser-related use cases of zero-delay timeout,
*/

/*
Zero delay is in fact not zero (in a browser)
In the browser, there’s a limitation of how often nested timers can run. The HTML Living Standard
 says: “after five nested timers, the interval is forced to be at least 4 milliseconds.”.
Let’s demonstrate what it means with the example below. The setTimeout call in it re-schedules 
itself with zero delay. Each call remembers the real time from the previous one in the times 
array. What do the real delays look like? Let’s see:
Sıfır gecikme aslında sıfır değildir (tarayıcıda)
Tarayıcıda, iç içe geçmiş zamanlayıcıların ne sıklıkta çalışabileceğine dair bir sınırlama 
vardır. HTML Yaşam Standardı şöyle der: “beş iç içe zamanlayıcıdan sonra, aralık en az 
4 milisaniye olmaya zorlanır.”.
Bunun ne anlama geldiğini aşağıdaki örnekle gösterelim. İçindeki setTimeout çağrısı kendini 
sıfır gecikme ile yeniden programlıyor. Her çağrı, times dizisinde bir öncekinden gerçek zamanı 
hatırlar. Gerçek gecikmeler neye benziyor? Bir bakalım:

 let start = Date.now();
let times = [];

setTimeout(function run() {
  times.push(Date.now() - start); // remember delay from the previous call

  if (start + 100 < Date.now()) alert(times); // show the delays after 100ms
  else setTimeout(run); // else re-schedule
});

// an example of the output:
// 1,1,1,1,9,15,20,24,30,35,40,45,50,55,59,64,70,75,80,85,90,95,100
First timers run immediately (just as written in the spec), and then we see 9, 15, 20, 24.... 
The 4+ ms obligatory delay between invocations comes into play.
The similar thing happens if we use setInterval instead of setTimeout: setInterval(f) runs f few 
times with zero-delay, and afterwards with 4+ ms delay.
That limitation comes from ancient times and many scripts rely on it, so it exists for historical 
reasons
For server-side JavaScript, that limitation does not exist, and there exist other ways to 
schedule an immediate asynchronous job, like setImmediate for Node.js. So this note is 
browser-specific.
İlk zamanlayıcılar hemen çalışır (spesifikasyonda yazıldığı gibi) ve daha sonra 9, 15, 20, 24.... 
Çağrımlar arasındaki 4+ ms'lik zorunlu gecikme devreye giriyor.
Benzer şey setTimeout yerine setInterval kullanırsak da olur: setInterval(f) birkaç kez sıfır 
gecikme ile çalışır ve daha sonra 4+ ms gecikme ile çalışır.
Bu sınırlama eski zamanlardan gelmektedir ve birçok komut dosyası buna güvenmektedir, bu nedenle 
tarihsel nedenlerden dolayı mevcuttur.
Sunucu tarafı JavaScript için bu sınırlama mevcut değildir ve Node.js için setImmediate gibi 
anında eşzamansız bir iş planlamanın başka yolları da vardır. Dolayısıyla bu not tarayıcıya 
özeldir.
*/

/*
Methods setTimeout(func, delay, ...args) and setInterval(func, delay, ...args) allow us to 
run the func once/regularly after delay milliseconds.
To cancel the execution, we should call clearTimeout/clearInterval with the value returned by 
setTimeout/setInterval.
Nested setTimeout calls are a more flexible alternative to setInterval, allowing us to set the 
time between executions more precisely.
Zero delay scheduling with setTimeout(func, 0) (the same as setTimeout(func)) is used to schedule
 the call “as soon as possible, but after the current script is complete”.
The browser limits the minimal delay for five or more nested calls of setTimeout or for 
setInterval (after 5th call) to 4ms. That’s for historical reasons.
Please note that all scheduling methods do not guarantee the exact delay.
For example, the in-browser timer may slow down for a lot of reasons:
The CPU is overloaded.
The browser tab is in the background mode.
The laptop is on battery saving mode.
All that may increase the minimal timer resolution (the minimal delay) to 300ms or even 1000ms 
depending on the browser and OS-level performance settings.


*/


/*
Using setInterval:

 function printNumbers(from, to) {
  let current = from;

  let timerId = setInterval(function() {
    alert(current);
    if (current == to) {
      clearInterval(timerId);
    }
    current++;
  }, 1000);
}
*/

/*
🧠 Nasıl çalışır?
current değişkeni başlangıç sayısını (from) tutar.
setInterval her 1000 ms'de (1 saniye) bir çalışır.
İçeride:
alert(current) ile sayıyı gösterir.
Eğer current == to, yani son sayıya ulaşıldıysa clearInterval(timerId) ile durdurur.
Son olarak current++ ile sıradaki sayıya geçer.
📌 Örnek çıktı:
(1 saniyede bir)
5
6
7
8
9
10

*/


/*
// usage:
printNumbers(5, 10);
Using nested setTimeout:

 function printNumbers(from, to) {
  let current = from;

  setTimeout(function go() {
    alert(current);
    if (current < to) {
      setTimeout(go, 1000);
    }
    current++;
  }, 1000);
}

// usage:
printNumbers(5, 10);
/*

/*
🧠 Nasıl çalışır?
İlk setTimeout fonksiyonu, 1 saniye sonra go() fonksiyonunu çağırır.
go():
Sayıyı gösterir,
Eğer hâlâ to'ya ulaşılmadıysa kendini tekrar setTimeout ile 1 saniye sonra çağırır.
current++ ile sıradaki sayıya geçilir.
🔁 Yani:
Bir fonksiyon kendi kendini setTimeout ile tekrar çağırıyor.
Bu, setInterval’e göre daha esnek ve işlem bittiğinde otomatik gecikme sağlar (önceki iş bitmeden yenisi başlamaz).
🚨 DİKKAT: Her iki yöntemde de ilk sayı 1 saniye sonra gösterilir.

Çünkü hem setInterval hem de setTimeout gecikmeli başlar.


*/

/*
Note that in both solutions, there is an initial delay before the first output. The function 
is called after 1000ms the first time.

If we also want the function to run immediately, then we can add an additional call on a
 separate line, like this:


 function printNumbers(from, to) {
  let current = from;

  function go() {
    alert(current);
    if (current == to) {
      clearInterval(timerId);
    }
    current++;
  }

  go();
  let timerId = setInterval(go, 1000);
}

printNumbers(5, 10);
*/

/*
🧠 Ne farklı?
go() fonksiyonu ilk başta hemen çağrılır.
Böylece ilk sayı hemen gösterilir.
Ardından setInterval her saniye go() fonksiyonunu çağırmaya başlar.
🟢 Bu yöntemle:
İlk sayı anında çıkar,
Diğer sayılar 1 saniye aralıklarla gelir.

*/

/*
In the code below there’s a setTimeout call scheduled, then a heavy calculation is run,
 that takes more than 100ms to finish.

When will the scheduled function run?

After the loop.
Before the loop.
In the beginning of the loop.
What is alert going to show?

 let i = 0;

setTimeout(() => alert(i), 100); // 100000000

// assume that the time to execute this function is >100ms
for(let j = 0; j < 100000000; j++) {
  i++;
}

Any setTimeout will run only after the current code has finished.

The i will be the last one: 100000000.
*/

//Decorators and forwarding, call/apply

/*
Transparent caching

Let’s say we have a function slow(x) which is CPU-heavy, but its results are stable. In other
 words, for the same x it always returns the same result.
If the function is called often, we may want to cache (remember) the results to avoid spending
 extra-time on recalculations.
But instead of adding that functionality into slow() we’ll create a wrapper function, that adds
 caching. As we’ll see, there are many benefits of doing so.
Diyelim ki CPU ağırlıklı, ancak sonuçları sabit olan bir slow(x) fonksiyonumuz var. Başka bir 
deyişle, aynı x için her zaman aynı sonucu döndürür.
Fonksiyon sık sık çağrılıyorsa, yeniden hesaplamalara fazladan zaman harcamaktan kaçınmak için 
sonuçları önbelleğe almak (hatırlamak) isteyebiliriz.
Ancak bu işlevi slow() işlevine eklemek yerine, önbelleğe almayı ekleyen bir sarmalayıcı işlev 
oluşturacağız. Göreceğimiz gibi, bunu yapmanın birçok faydası var.

Here’s the code, and explanations follow:

 function slow(x) {
  // there can be a heavy CPU-intensive job here
  alert(`Called with ${x}`);
  return x;
}

function cachingDecorator(func) {
  let cache = new Map();

  return function(x) {
    if (cache.has(x)) {    // if there's such key in cache
      return cache.get(x); // read the result from it
    }

    let result = func(x);  // otherwise call func

    cache.set(x, result);  // and cache (remember) the result
    return result;
  };
}

slow = cachingDecorator(slow);
alert( slow(1) ); // slow(1) is cached and the result returned
alert( "Again: " + slow(1) ); // slow(1) result returned from cache
alert( slow(2) ); // slow(2) is cached and the result returned
alert( "Again: " + slow(2) ); // slow(2) result returned from cache

In the code above cachingDecorator is a decorator: a special function that takes another function
 and alters its behavior.
The idea is that we can call cachingDecorator for any function, and it will return the caching
 wrapper. That’s great, because we can have many functions that could use such a feature, and 
 all we need to do is to apply cachingDecorator to them.
By separating caching from the main function code we also keep the main code simpler.
The result of cachingDecorator(func) is a “wrapper”: function(x) that “wraps” the call of func(x)
 into caching logic: 
 Yukarıdaki kodda cachingDecorator bir dekoratördür: başka bir fonksiyonu alan ve davranışını
  değiştiren özel bir fonksiyon.
Buradaki fikir, herhangi bir fonksiyon için cachingDecorator'ı çağırabilmemiz ve fonksiyonun 
önbelleğe alma sarmalayıcısını döndürmesidir. Bu harika, çünkü böyle bir özelliği kullanabilecek
 birçok fonksiyona sahip olabiliriz ve tek yapmamız gereken cachingDecorator'ı onlara uygulamaktır.
Önbelleğe almayı ana fonksiyon kodundan ayırarak ana kodu da daha basit tutuyoruz.
cachingDecorator(func) işleminin sonucu bir “sarmalayıcıdır”: func(x) çağrısını önbellekleme 
mantığına “saran” function(x):

*/

/*
From an outside code, the wrapped slow function still does the same. It just got a caching
 aspect added to its behavior.
To summarize, there are several benefits of using a separate cachingDecorator instead of 
altering the code of slow itself:
The cachingDecorator is reusable. We can apply it to another function.
The caching logic is separate, it did not increase the complexity of slow itself 
(if there was any).
We can combine multiple decorators if needed (other decorators will follow).

Dış koddan bakıldığında, sarılmış yavaş işlev hala aynı şeyi yapar. Sadece davranışına bir 
önbellekleme özelliği eklenmiştir.
Özetlemek gerekirse, slow'un kendi kodunu değiştirmek yerine ayrı bir cachingDecorator 
kullanmanın çeşitli faydaları vardır:
cachingDecorator yeniden kullanılabilir. Onu başka bir fonksiyona uygulayabiliriz.
Önbelleğe alma mantığı ayrıdır, slow'un kendisinin karmaşıklığını artırmaz (eğer varsa).
Gerekirse birden fazla dekoratörü birleştirebiliriz (diğer dekoratörler takip edecektir).

*/

/*
Using “func.call” for the context
The caching decorator mentioned above is not suited to work with object methods.
For instance, in the code below worker.slow() stops working after the decoration:
Yukarıda bahsedilen önbellekleme dekoratörü nesne metotlarıyla çalışmak için uygun değildir.
Örneğin, aşağıdaki kodda worker.slow() dekorasyondan sonra çalışmayı durdurur:

// we'll make worker.slow caching
let worker = {
  someMethod() {
    return 1;
  },

  slow(x) {
    // scary CPU-heavy task here
    alert("Called with " + x);
    return x * this.someMethod(); // (*)
  }
};

// same code as before
function cachingDecorator(func) {
  let cache = new Map();
  return function(x) {
    if (cache.has(x)) {
      return cache.get(x);
    }
    let result = func(x); // (**)
    cache.set(x, result);
    return result;
  };
}

alert( worker.slow(1) ); // the original method works

worker.slow = cachingDecorator(worker.slow); // now make it caching

alert( worker.slow(2) ); // Whoops! Error: Cannot read property 'someMethod' of undefined
The error occurs in the line (*) that tries to access this.someMethod and fails. Can you see why?
The reason is that the wrapper calls the original function as func(x) in the line (**). And, 
when called like that, the function gets this = undefined.
Hata, this.someMethod öğesine erişmeye çalışan ve başarısız olan satırda (*) meydana geliyor.
Nedenini görebiliyor musunuz?
Bunun nedeni, sarmalayıcının orijinal işlevi (**) satırında func(x) olarak çağırmasıdır. Ve bu
 şekilde çağrıldığında, fonksiyon this = undefined değerini alır.
Eğer çalıştırmayı deneseydik benzer bir belirti gözlemlerdik:
We would observe a similar symptom if we tried to run:

let func = worker.slow;
func(2);
So, the wrapper passes the call to the original method, but without the context this. Hence the
 error.

Let’s fix it.

There’s a special built-in function method func.call(context, …args) that allows to call a 
function explicitly setting this.

The syntax is:

func.call(context, arg1, arg2, ...)
It runs func providing the first argument as this, and the next as the arguments.

To put it simply, these two calls do almost the same:

func(1, 2, 3);
func.call(obj, 1, 2, 3)
They both call func with arguments 1, 2 and 3. The only difference is that func.call also sets 
this to obj.

As an example, in the code below we call sayHi in the context of different objects: 
sayHi.call(user) runs sayHi providing this=user, and the next line sets this=admin:
Her ikisi de func'u 1, 2 ve 3 argümanlarıyla çağırır. Tek fark, func.call'un bunu obj'ye 
de ayarlamasıdır.
Örnek olarak, aşağıdaki kodda sayHi'yi farklı nesneler bağlamında çağırıyoruz: sayHi.call(user) 
this=user sağlayarak sayHi'yi çalıştırır ve bir sonraki satır this=admin olarak ayarlar:

 function sayHi() {
  alert(this.name);
}

let user = { name: "John" };
let admin = { name: "Admin" };

// use call to pass different objects as "this"
sayHi.call( user ); // John
sayHi.call( admin ); // Admin
And here we use call to call say with the given context and phrase:

 function say(phrase) {
  alert(this.name + ': ' + phrase);
}

let user = { name: "John" };

// user becomes this, and "Hello" becomes the first argument
say.call( user, "Hello" ); // John: Hello

*/


/*
In our case, we can use call in the wrapper to pass the context to the original function:

 let worker = {
  someMethod() {
    return 1;
  },

  slow(x) {
    alert("Called with " + x);
    return x * this.someMethod(); // (*)
  }
};

function cachingDecorator(func) {
  let cache = new Map();
  return function(x) {
    if (cache.has(x)) {
      return cache.get(x);
    }
    let result = func.call(this, x); // "this" is passed correctly now
    cache.set(x, result);
    return result;
  };
}

worker.slow = cachingDecorator(worker.slow); // now make it caching

alert( worker.slow(2) ); // works
alert( worker.slow(2) ); // works, doesn't call the original (cached)
Now everything is fine.

To make it all clear, let’s see more deeply how this is passed along:

After the decoration worker.slow is now the wrapper function (x) { ... }.
So when worker.slow(2) is executed, the wrapper gets 2 as an argument and this=worker 
(it’s the object before dot).
Inside the wrapper, assuming the result is not yet cached, func.call(this, x) passes the
 current this (=worker) and the current argument (=2) to the original method.

Her şeyi açıklığa kavuşturmak için, bunun nasıl aktarıldığını daha derinlemesine görelim:

Dekorasyondan sonra worker.slow artık sarmalayıcı işlevdir (x) { ... }.
Yani worker.slow(2) çalıştırıldığında, sarmalayıcı 2'yi argüman olarak alır ve this=worker 
(noktadan önceki nesne) olur.
Sarmalayıcının içinde, sonucun henüz önbelleğe alınmadığını varsayarak, func.call(this, x) 
geçerli this (=worker) ve geçerli argümanı (=2) orijinal yönteme aktarır.
*/

/*
💬 func.call(this, x) Ne Demek?

func.call(this, x);
Şu anlama gelir:

func fonksiyonunu çalıştır ama,
this'i şu anki objeye (örneğin worker) eşitle,
x de parametre olarak git.
Örnek:
function sayHi() {
  alert(this.name);
}

let user = { name: "Serkan" };
sayHi.call(user); // Serkan

*/

/*
Going multi-argument

Now let’s make cachingDecorator even more universal. Till now it was working only with 
single-argument functions.

Now how to cache the multi-argument worker.slow method?

let worker = {
  slow(min, max) {
    return min + max; // scary CPU-hogger is assumed
  }
};

// should remember same-argument calls
worker.slow = cachingDecorator(worker.slow);
Previously, for a single argument x we could just cache.set(x, result) to save the result and
 cache.get(x) to retrieve it. But now we need to remember the result for a combination of 
 arguments (min,max). The native Map takes single value only as the key.

There are many solutions possible:

Implement a new (or use a third-party) map-like data structure that is more versatile and allows 
multi-keys.
Use nested maps: cache.set(min) will be a Map that stores the pair (max, result). So we can get 
result as cache.get(min).get(max).
Join two values into one. In our particular case we can just use a string "min,max" as the Map 
key. For flexibility, we can allow to provide a hashing function for the decorator, that knows
 how to make one value from many.
For many practical applications, the 3rd variant is good enough, so we’ll stick to it.


*/

/*
Also we need to pass not just x, but all arguments in func.call. Let’s recall that in a
 function() we can get a pseudo-array of its arguments as arguments, so func.call(this, x) 
 should be replaced with func.call(this, ...arguments).

Ayrıca func.call'da sadece x'i değil, tüm argümanları geçirmemiz gerekir. Bir function() 
 içinde argümanlarının sözde dizisini argüman olarak alabileceğimizi hatırlayalım, bu nedenle
func.call(this, x), func.call(this, ...arguments) ile değiştirilmelidir.
 
 Here’s a more powerful cachingDecorator:


 let worker = {
  slow(min, max) {
    alert(`Called with ${min},${max}`);
    return min + max;
  }
};

function cachingDecorator(func, hash) {
  let cache = new Map();
  return function() {
    let key = hash(arguments); // (*)
    if (cache.has(key)) {
      return cache.get(key);
    }

    let result = func.call(this, ...arguments); // (**)

    cache.set(key, result);
    return result;
  };
}

function hash(args) {
  return args[0] + ',' + args[1];
}

worker.slow = cachingDecorator(worker.slow, hash);

alert( worker.slow(3, 5) ); // works
alert( "Again " + worker.slow(3, 5) ); // same (cached)
Now it works with any number of arguments (though the hash function would also need to be 
adjusted to allow any number of arguments. An interesting way to handle this will be covered below).

There are two changes:

In the line (*) it calls hash to create a single key from arguments. Here we use a simple
 “joining” function that turns arguments (3, 5) into the key "3,5". More complex cases may
  require other hashing functions.
Then (**) uses func.call(this, ...arguments) to pass both the context and all arguments the 
wrapper got (not just the first one) to the original function.

Artık herhangi bir sayıda argümanla çalışmaktadır (ancak hash fonksiyonunun da herhangi bir 
sayıda argümana izin verecek şekilde ayarlanması gerekecektir. Bunu ele almanın ilginç bir yolu 
aşağıda ele alınacaktır).

İki değişiklik var:

(*) satırında, argümanlardan tek bir anahtar oluşturmak için hash çağrısı yapar. Burada, 
argümanları (3, 5) "3,5" anahtarına dönüştüren basit bir "birleştirme" işlevi kullanıyoruz. 
Daha karmaşık durumlarda başka hash fonksiyonları gerekebilir.
Ardından (**), hem bağlamı hem de sarmalayıcının aldığı tüm argümanları (yalnızca ilkini değil) 
orijinal fonksiyona iletmek için func.call(this, ...arguments) kullanır.


*/


/*
(*) let key = hash(arguments);

arguments, fonksiyona gelen tüm argümanları içeren "array-like" bir yapıdır.
Burada hash fonksiyonu bu argümanları kullanarak tek bir anahtar (key) oluşturur.
Örnek: worker.slow(3, 5) → arguments = [3,5] → "3,5"
(**) func.call(this, ...arguments);

func.call(this, ...) sayesinde this bağlamı (örneğin worker) korunur.
...arguments ile tüm gelen argümanlar orijinal fonksiyona gönderilir.
Bu sayede slow(min, max) şeklindeki fonksiyon sorunsuz çalışır.

*/


/*
func.apply

Instead of func.call(this, ...arguments) we could use func.apply(this, arguments).

The syntax of built-in method func.apply is:

func.apply(context, args)
It runs the func setting this=context and using an array-like object args as the list of 
arguments.
The only syntax difference between call and apply is that call expects a list of arguments, 
while apply takes an array-like object with them.

func.apply(context, args)
this=context olarak ayarlayarak ve argüman listesi olarak dizi benzeri bir nesne olan args'yi
 kullanarak func'ı çalıştırır.
call ve apply arasındaki tek sözdizimi farkı, call'un bir argüman listesi beklemesi, apply'nin 
ise argümanlarla birlikte dizi benzeri bir nesne almasıdır.

*/

/*
So these two calls are almost equivalent:

func.call(context, ...args);
func.apply(context, args);
They perform the same call of func with given context and arguments.

There’s only a subtle difference regarding args:

The spread syntax ... allows to pass iterable args as the list to call.
The apply accepts only array-like args.
…And for objects that are both iterable and array-like, such as a real array, we can use any 
of them, but apply will probably be faster, because most JavaScript engines internally optimize 
it better.
Yayılma sözdizimi ... çağrılacak liste olarak yinelenebilir argümanların aktarılmasına izin verir.
apply yalnızca dizi benzeri argümanları kabul eder.
...Ve gerçek bir dizi gibi hem yinelenebilir hem de dizi benzeri nesneler için, bunlardan 
herhangi birini kullanabiliriz, ancak apply muhtemelen daha hızlı olacaktır, çünkü çoğu 
JavaScript motoru dahili olarak daha iyi optimize eder.

Tüm argümanları bağlamla birlikte başka bir fonksiyona aktarmaya çağrı yönlendirme denir.
Passing all arguments along with the context to another function is called call forwarding.
*/

//call: Argümanları tek tek alır.
//apply: Argümanları dizi olarak alır.

/*
Neden apply kullanılır?

Eğer argümanların zaten bir dizi veya arguments gibi bir yapıdaysa, apply daha uygundur.
call(...args) için ... spread operatörüne ihtiyaç vardır.
apply çoğu JavaScript motorunda biraz daha hızlı olabilir (dahili optimizasyonlar nedeniyle).
*/

/*
🔁 Call Forwarding (Çağrı Yönlendirme)

Yani bir fonksiyonu "sarmalayıcı" fonksiyon üzerinden, this ve gelen tüm argümanlarla birlikte çağırmak:

let wrapper = function() {
  return func.apply(this, arguments);
};
Bu kod:

this’i kaybetmeden
Tüm argümanları koruyarak
Orijinal fonksiyonu çalıştırır
🎯 Amaç:
Kullanıcı dışarıdan wrapper() çağırdığında, sanki func() çağrılmış gibi davranır.


*/

/*
let wrapper = function() {
  return func.apply(this, arguments);
};
When an external code calls such wrapper, it is indistinguishable from the call of the original
 function func.

 Bu en basit şeklidir:

let wrapper = function() {
 return func.apply(this, arguments);
};
Harici bir kod böyle bir wrapper'ı çağırdığında, orijinal func fonksiyonunun çağrısından ayırt
 edilemez.

*/



//Borrowing a method
/*
Borrowing a method

Now let’s make one more minor improvement in the hashing function:

function hash(args) {
  return args[0] + ',' + args[1];
}
As of now, it works only on two arguments. It would be better if it could glue any number of args.

The natural solution would be to use arr.join method:

func\tion hash(args) {
  return args.join();
}
…Unfortunately, that won’t work. Because we are calling hash(arguments), and arguments object 
is both iterable and array-like, but not a real array.

So calling join on it would fail, as we can see below:

 function hash() {
  alert( arguments.join() ); // Error: arguments.join is not a function
}

hash(1, 2);
Still, there’s an easy way to use array join:

 function hash() {
  alert( [].join.call(arguments) ); // 1,2
}

hash(1, 2);
The trick is called method borrowing.
*/

/*

📌 Açıklama:
[].join.call(arguments) ifadesiyle, gerçek bir diziden join() metodu ödünç alınır.
Bu metot, sadece this.length ve this[i] ile çalıştığı için, arguments gibi array-like yapılarla da uyumludur.
🎓 Neden Bu Mümkün?
Çünkü join() gibi yerleşik metotlar, herhangi bir "array-like" yapı ile çalışabilecek şekilde tasarlanmıştır.
*/

/*
We take (borrow) a join method from a regular array ([].join) and use [].join.call to run it
 in the context of arguments.

Why does it work?

That’s because the internal algorithm of the native method arr.join(glue) is very simple.

Taken from the specification almost “as-is”:

Let glue be the first argument or, if no arguments, then a comma ",".
Let result be an empty string.
Append this[0] to result.
Append glue and this[1].
Append glue and this[2].
…Do so until this.length items are glued.
Return result.
So, technically it takes this and joins this[0], this[1] …etc together. It’s intentionally 
written in a way that allows any array-like this (not a coincidence, many methods follow 
this practice). That’s why it also works with this=arguments.

teknik olarak bunu alır ve this[0], this[1] ...vb. öğeleri birleştirir. Kasıtlı olarak bu gibi 
herhangi bir diziye izin verecek şekilde yazılmıştır (tesadüf değil, birçok yöntem bu uygulamayı
 takip eder). Bu yüzden this=arguments ile de çalışır.
*/

/*
Create a decorator spy(func) that should return a wrapper that saves all calls to function in 
its calls property.

Every call is saved as an array of arguments.

function work(a, b) {
  alert( a + b ); // work is an arbitrary function or method
}
function spy(func) {

  function wrapper(...args) {
    // using ...args instead of arguments to store "real" array in wrapper.calls
    wrapper.calls.push(args);
    return func.apply(this, args);
  }

  wrapper.calls = [];

  return wrapper;
}
work = spy(work);

work(1, 2); // 3
work(4, 5); // 9

for (let args of work.calls) {
  alert( 'call:' + args.join() ); // "call:1,2", "call:4,5"
}

//The wrapper returned by spy(f) should store all arguments and then use f.apply to forward 
// the call.
*/
/*
📌 Ne yapıyor?
spy fonksiyonu, verilen func fonksiyonunu sarıyor (wrap ediyor).
Sarılmış fonksiyon (wrapper), her çağrıda gelen argümanları wrapper.calls adlı diziye kaydediyor.
Sonra func.apply(this, args) ile asıl fonksiyonu çağırıyor.
🎯 Amaç:
Hangi argümanlarla kaç kez çağrıldığını takip etmek.
🔍 Örnek Kullanım:
Test yazarken, bir fonksiyonun doğru şekilde çağrılıp çağrılmadığını kontrol etmek için kullanılır.


*/

/*
function delay(f, ms) {

  return function() {
    setTimeout(() => f.apply(this, arguments), ms);
  };

}

let f1000 = delay(alert, 1000);

f1000("test"); // shows "test" after 1000ms
*/

/*
📌 Ne yapıyor?
delay(f, ms) fonksiyonu, f fonksiyonunu sarıyor ve çağrısını ms milisaniye geciktiriyor.
apply(this, arguments) ile this bağlamı ve gelen argümanlar korunuyor.
📌 Neden arrow function?
Çünkü arrow function kendi this ve arguments’ına sahip değildir.
Bu yüzden dıştaki wrapper fonksiyonun this ve arguments değerlerini otomatik alır.

*/

/*
Please note how an arrow function is used here. As we know, arrow functions do not have own 
this and arguments, so f.apply(this, arguments) takes this and arguments from the wrapper.

If we pass a regular function, setTimeout would call it without arguments and this=window 
(assuming we’re in the browser).

We still can pass the right this by using an intermediate variable, but that’s a little bit 
more cumbersome:
//🧪 Alternatif: Arrow function kullanmadan da yapılabilir


function delay(f, ms) {

  return function(...args) {
    let savedThis = this; // store this into an intermediate variable
    setTimeout(function() {
      f.apply(savedThis, args); // use it here
    }, ms);
  };

}
*/

/*
//kullanici bir sey yazdiktan sonra islemi bittik sonra ekrana cikti gostermek
let f = _.debounce(alert, 1000);

f("a");
setTimeout( () => f("b"), 200);
setTimeout( () => f("c"), 500);
// debounced function waits 1000ms after the last call and then runs: alert("c")

function debounce(func, ms) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), ms);
  };
}
*/

/*
📌 Ne oluyor burada?
Her çağrıldığında (örneğin kullanıcı yazı yazdı) önceki zamanlayıcı iptal ediliyor.
Yeni bir setTimeout başlatılıyor.
Eğer ms süresi (örneğin 1000ms) geçmeden tekrar çağrılırsa, önceki iptal edilip yenisi başlar.
Yani en son çağrının üzerinden ms süresi geçince func çalışır.


🕵️‍♂️ Ne Oluyor Bu Örnekte?
Zaman (ms)            	Ne yapılıyor?	              Ne olur?
0ms	                      f("a")	              zamanlayıcı başlar
200ms	                  f("b")	                önceki iptal, yenisi başlar
500ms	                      f("c")	              yine iptal, yeni başlatılır
1500ms                  	⏰ 1000ms doldu	      sadece "c" çalıştırılır
Yani kullanıcı yazmayı bırakana kadar hiçbir işlem yapılmaz. Bıraktığında son yazdığı işleme göre çalışır.
*/

/*
Create a “throttling” decorator throttle(f, ms) – that returns a wrapper.

When it’s called multiple times, it passes the call to f at maximum once per ms milliseconds.

Compared to the debounce decorator, the behavior is completely different:

debounce runs the function once after the “cooldown” period. Good for processing the final result.
throttle runs it not more often than given ms time. Good for regular updates that shouldn’t be 
very often.
In other words, throttle is like a secretary that accepts phone calls, but bothers the boss 
(calls the actual f) not more often than once per ms milliseconds.

Bir “azaltma” dekoratörü throttle(f, ms) oluşturun - bu bir sarmalayıcı döndürür.

Birden çok kez çağrıldığında, çağrıyı f'ye en fazla ms milisaniye başına bir kez geçirir.

Debounce dekoratörü ile karşılaştırıldığında, davranış tamamen farklıdır:

debounce, “cooldown” süresinden sonra işlevi bir kez çalıştırır. Nihai sonucu işlemek için iyidir.
throttle, verilen ms süresinden daha sık çalıştırmaz. Çok sık olmaması gereken düzenli 
güncellemeler için iyidir.
Başka bir deyişle, throttle telefon çağrılarını kabul eden bir sekreter gibidir, ancak patronu 
rahatsız eder (asıl f'yi arar) ms milisaniye başına bir kereden daha sık değildir.

*/

/*
For instance, we want to track mouse movements.

In a browser we can setup a function to run at every mouse movement and get the pointer 
location as it moves. During an active mouse usage, this function usually runs very frequently, 
can be something like 100 times per second (every 10 ms). We’d like to update some information 
on the web-page when the pointer moves.

…But updating function update() is too heavy to do it on every micro-movement. There is also no
 sense in updating more often than once per 100ms.

So we’ll wrap it into the decorator: use throttle(update, 100) as the function to run on each 
mouse move instead of the original update(). The decorator will be called often, but forward 
the call to update() at maximum once per 100ms.

Örneğin, fare hareketlerini izlemek istiyoruz.

Bir tarayıcıda, her fare hareketinde çalışacak ve hareket ettikçe işaretçinin konumunu alacak
 bir işlev kurabiliriz. Aktif bir fare kullanımı sırasında, bu fonksiyon genellikle çok sık 
 çalışır, saniyede 100 kez (her 10 ms'de bir) gibi bir şey olabilir. İşaretçi hareket ettiğinde 
 web sayfasındaki bazı bilgileri güncellemek istiyoruz.

...Ancak update() işlevini güncellemek, her mikro harekette bunu yapmak için çok ağırdır. Ayrıca 
100 ms'de bir defadan daha sık güncelleme yapmanın da bir anlamı yok.

Bu yüzden bunu dekoratöre saracağız: orijinal update() yerine her fare hareketinde çalıştırılacak
 fonksiyon olarak throttle(update, 100) kullanın. Dekoratör sık sık çağrılacak, ancak update()
  çağrısını en fazla 100 ms'de bir kez iletecektir.

*/

/*

Visually, it will look like this:

For the first mouse movement the decorated variant immediately passes the call to update. 
That’s important, the user sees our reaction to their move immediately.
Then as the mouse moves on, until 100ms nothing happens. The decorated variant ignores calls.
At the end of 100ms – one more update happens with the last coordinates.
Then, finally, the mouse stops somewhere. The decorated variant waits until 100ms expire and 
then runs update with last coordinates. So, quite important, the final mouse coordinates are
 processed.

Görsel olarak şöyle görünecektir:

İlk fare hareketi için dekore edilmiş varyant hemen güncelleme çağrısını geçer. Bu önemlidir,
 kullanıcı hareketine verdiğimiz tepkiyi hemen görür.
Sonra fare hareket ettikçe, 100 ms'ye kadar hiçbir şey olmaz. Süslü varyant çağrıları yok sayar.
100ms'nin sonunda - son koordinatlarla bir güncelleme daha gerçekleşir.
Sonunda fare bir yerde durur. Süslü varyant 100 ms dolana kadar bekler ve ardından son 
koordinatlarla güncellemeyi çalıştırır. Yani, oldukça önemli olarak, son fare koordinatları
 işlenir.
*/

/*
function f(a) {
  console.log(a);
}

// f1000 passes calls to f at maximum once per 1000 ms
let f1000 = throttle(f, 1000);

f1000(1); // shows 1
f1000(2); // (throttling, 1000ms not out yet)
f1000(3); // (throttling, 1000ms not out yet)

// when 1000 ms time out...
// ...outputs 3, intermediate value 2 was ignored
P.S. Arguments and the context this passed to f1000 should be passed to the original f.

function throttle(func, ms) {

  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {

    if (isThrottled) { // (2)
      savedArgs = arguments;
      savedThis = this;
      return;
    }
    isThrottled = true;

    func.apply(this, arguments); // (1)

    setTimeout(function() {
      isThrottled = false; // (3)
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}
A call to throttle(func, ms) returns wrapper.

During the first call, the wrapper just runs func and sets the cooldown state (isThrottled = true).
In this state all calls are memorized in savedArgs/savedThis. Please note that both the context 
and the arguments are equally important and should be memorized. We need them simultaneously to 
reproduce the call.
After ms milliseconds pass, setTimeout triggers. The cooldown state is removed (isThrottled = false)
 and, if we had ignored calls, wrapper is executed with the last memorized arguments and context.
The 3rd step runs not func, but wrapper, because we not only need to execute func, but once again 
enter the cooldown state and setup the timeout to reset it.


*/


/*
🎬 Adım Adım Örnekle Ne Olur?

function f(a) {
  console.log(a);
}
let f1000 = throttle(f, 1000);

f1000(1); // hemen çalışır → 1
f1000(2); // saklanır (1000ms geçmediği için)
f1000(3); // en son bu saklanır, 2 unutulur

// 1000ms sonra → tekrar çalışır → 3
*/

/*
 Throttle vs Debounce Karşılaştırması

Özellik	                debounce	                            throttle
Ne zaman çalışır?	En son çağrıdan sonra ms kadar bekler	       İlk çağrı hemen, sonra en fazla ms'de bir
Kullanım senaryosu	Yazı bittikten sonra işlem (örneğin arama)	  Scroll, mousemove, resize gibi hızlı olaylar
Son değer çalışır mı?	✅ Evet	                                ✅ Evet (bu throttle bunu destekliyor)



throttle(func, ms) fonksiyonu, func'ı en fazla ms milisaniyede bir çalıştırır.
İlk çağrıda hemen çalışır.
Diğer çağrılar bloklanır ama sonuncusu saklanır.
setTimeout ile ms sonra sonuncu çağrı yeniden çalıştırılır.

*/

/*


//funciton binding
//When passing object methods as callbacks, for instance to setTimeout, there’s a known problem:
//  “losing this”.

/*
setTimeout:

 let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

setTimeout(user.sayHi, 1000); // Hello, undefined!
As we can see, the output shows not “John” as this.firstName, but undefined!

That’s because setTimeout got the function user.sayHi, separately from the object. The last 
line can be rewritten as:

let f = user.sayHi;
setTimeout(f, 1000); // lost user context
The method setTimeout in-browser is a little special: it sets this=window for the function call
 (for Node.js, this becomes the timer object, but doesn’t really matter here). So for 
 this.firstName it tries to get window.firstName, which does not exist. In other similar cases,
  usually this just becomes undefined.

The task is quite typical – we want to pass an object method somewhere else (here – to the 
scheduler) where it will be called. How to make sure that it will be called in the right context?


*/


/*
Solution 1: a wrapper

The simplest solution is to use a wrapping function:

 let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

setTimeout(function() {
  user.sayHi(); // Hello, John!
}, 1000);
Now it works, because it receives user from the outer lexical environment, and then calls the 
method normally.
*/

/*
✔️ Avantajı:
user.sayHi() çağrısı, ok fonksiyonu içinde çağrıldığı için user'ı bulabiliyor.
⚠️ Dezavantaj:
user objesi 1 saniye içinde değişirse, sayHi artık başka bir nesnenin fonksiyonu olabilir.

*/

/*
The same, but shorter:

setTimeout(() => user.sayHi(), 1000); // Hello, John!
Looks fine, but a slight vulnerability appears in our code structure.

What if before setTimeout triggers (there’s one second delay!) user changes value? Then, suddenly,
 it will call the wrong object!

 let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

setTimeout(() => user.sayHi(), 1000);

// ...the value of user changes within 1 second
user = {
  sayHi() { alert("Another user in setTimeout!"); }
};

// Another user in setTimeout!
The next solution guarantees that such thing won’t happen.


*/



/*
Solution 2: bind

Functions provide a built-in method bind that allows to fix this.

The basic syntax is:

// more complex syntax will come a little later
let boundFunc = func.bind(context);
The result of func.bind(context) is a special function-like “exotic object”, that is 
callable as function and transparently passes the call to func setting this=context.

In other words, calling boundFunc is like func with fixed this.

For instance, here funcUser passes a call to func with this=user:

 let user = {
  firstName: "John"
};

function func() {
  alert(this.firstName);
}

let funcUser = func.bind(user);
funcUser(); // John
Here func.bind(user) is a “bound variant” of func, with fixed this=user.
*/

/*
func.bind(context) bir yeni fonksiyon döndürür.
Bu fonksiyon her çağrıldığında this, verdiğin context olur.
Yani func'un bağlamı sabitlenmiş olur.
*/

//Artık sayHi, her nerede çağrılırsa çağrılsın, this daima user olacak.
/*
bind, argümanları da aktarır
let user = {
  firstName: "John",
  say(phrase) {
    alert(`${phrase}, ${this.firstName}!`);
  }
};

let say = user.say.bind(user);

say("Hello"); // ✅ Hello, John!
say("Bye");   // ✅ Bye, John!
*/

/*

All arguments are passed to the original func “as is”, for instance:

 let user = {
  firstName: "John"
};

function func(phrase) {
  alert(phrase + ', ' + this.firstName);
}

// bind this to user
let funcUser = func.bind(user);

funcUser("Hello"); // Hello, John (argument "Hello" is passed, and this=user)
Now let’s try with an object method:

 let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

let sayHi = user.sayHi.bind(user); // (*)

// can run it without an object
sayHi(); // Hello, John!

setTimeout(sayHi, 1000); // Hello, John!

// even if the value of user changes within 1 second
// sayHi uses the pre-bound value which is reference to the old user object
user = {
  sayHi() { alert("Another user in setTimeout!"); }
};
In the line (*) we take the method user.sayHi and bind it to user. The sayHi is a “bound”
 function, that can be called alone or passed to setTimeout – doesn’t matter, the context
  will be right.

Here we can see that arguments are passed “as is”, only this is fixed by bind:

 let user = {
  firstName: "John",
  say(phrase) {
    alert(`${phrase}, ${this.firstName}!`);
  }
};

let say = user.say.bind(user);

say("Hello"); // Hello, John! ("Hello" argument is passed to say)
say("Bye"); // Bye, John! ("Bye" is passed to say)
*/

/*  
Fonksiyon	    Ne işe yarar?   	                        Kullanım Durumu             	Avantaj	    Dezavantaj
setTimeout	Belirli süre sonra bir fonksiyon çalıştırır	-Zaman gecikmeli işlemler	-Basit kullanımlı	-this bağlamı kaybolabilir
bind	this bağlamını sabitler	     -                 Callback fonksiyonlarda bağlamın korunması-	Güvenli this	-Yeni fonksiyon döndürür
Wrapper (arrow function)	Geçici olarak this’i doğru şekilde kullanmanı sağlar -	setTimeout(() => user.sayHi()) gibi durumlar	-Kısa yazım	--Referans objesi değişirse bozulabilir
spy(func)	Fonksiyonun kaç kere ve nasıl çağrıldığını takip eder	Debug, test, log	-Tüm çağrıları izler	--Performans etkisi olabilir
delay(func, ms)	Fonksiyonu belirtilen süre sonra çalıştırır	Kısa erteleme işlemleri	-Kolayca geciktirme sağlar	-setTimeout zaten benzer işi yapar
debounce(func, ms)	Sürekli çağrılan bir fonksiyonu, son çağrıdan sonra ms gecikme ile çalıştırır	-Input, search gibi durumlar-	Gereksiz tekrarları engeller	-Kullanıcı alışkanlığına göre gecikme olabilir
throttle(func, ms)	Fonksiyonu en fazla ms sürede bir kez çalıştırır-	Mouse hareketleri, scroll gibi sürekli olaylar	-Performansı iyileştirir-	Bazı son değerleri atlayabilir

*/


/*
1. setTimeout
Kullan: Zaman gecikmesi istiyorsan.
Örnek: Uyarıyı 2 saniye sonra göster.
Dikkat: this kaybolur → çözüm olarak bind ya da wrapper kullanılır.
setTimeout(user.sayHi, 1000); // ❌
setTimeout(() => user.sayHi(), 1000); // ✔️
setTimeout(user.sayHi.bind(user), 1000); // ✔️

*/

/*
2. bind()
Kullan: Fonksiyonu başka bir yere göndereceksen (setTimeout, eventListener, vs).
Örnek: sayHi fonksiyonunu başka bir yere bağla, ama this user kalsın.
let sayHi = user.sayHi.bind(user);
setTimeout(sayHi, 1000); // ✔️ her zaman doğru context
*/

/*
. Wrapper (Arrow Function)
Kullan: Fonksiyon geçici olarak bağlamını korusun ama obje değişmeyecekse.
Örnek: setTimeout(() => user.sayHi(), 1000);
Dikkat: 1 saniye içinde user değişirse bu çözüm işe yaramaz!

*/

/*
4. spy(func)
Kullan: Bir fonksiyonun kaç kere ve hangi argümanlarla çağrıldığını kaydetmek için.
Örnek: Test, debug, analiz
let wrapped = spy(myFunc);
wrapped(1, 2);
console.log(wrapped.calls); // [[1, 2]]
*/

/*
 5. delay(func, ms)
Kullan: Bir fonksiyonun çalışmasını basitçe geciktirmek istiyorsan.
Örnek: delay(alert, 1000)("Hello"); → 1 sn sonra uyarı

*/

/*
6. debounce(func, ms)
Kullan: Kullanıcı bir şey yazarken sürekli fonksiyon çağırmak yerine, yazmayı bitirdikten sonra çağırmak için.
Örnek: Arama kutusu, input event
let onInput = debounce(() => fetchSearch(), 300);
input.addEventListener("input", onInput);
*/

/*
7. throttle(func, ms)
Kullan: Sürekli çalışan işlemlerde (scroll, mousemove) fonksiyonun çok sık çalışmasını engellemek için.
Örnek: Sayfa scroll'da pozisyonu göstermek ama performansı korumak
let onScroll = throttle(() => updatePosition(), 100);
window.addEventListener("scroll", onScroll);
*/


/*
Convenience method: bindAll
If an object has many methods and we plan to actively pass it around, then we could bind them 
all in a loop:

for (let key in user) {
  if (typeof user[key] == 'function') {
    user[key] = user[key].bind(user);
  }
}
JavaScript libraries also provide functions for convenient mass binding , e.g. _.bindAll(object,
 methodNames) in lodash.
*/

/*
Partial functions

Until now we have only been talking about binding this. Let’s take it a step further.

We can bind not only this, but also arguments. That’s rarely done, but sometimes can be handy.

The full syntax of bind:

let bound = func.bind(context, [arg1], [arg2], ...);
It allows to bind context as this and starting arguments of the function.

For instance, we have a multiplication function mul(a, b):

function mul(a, b) {
  return a * b;
}
Let’s use bind to create a function double on its base:

 function mul(a, b) {
  return a * b;
}

let double = mul.bind(null, 2);

alert( double(3) ); // = mul(2, 3) = 6
alert( double(4) ); // = mul(2, 4) = 8
alert( double(5) ); // = mul(2, 5) = 10
The call to mul.bind(null, 2) creates a new function double that passes calls to mul, fixing 
null as the context and 2 as the first argument. Further arguments are passed “as is”.

That’s called partial function application – we create a new function by fixing some parameters 
of the existing one.

Please note that we actually don’t use this here. But bind requires it, so we must put in 
something like null.

The function triple in the code below triples the value:

 function mul(a, b) {
  return a * b;
}

let triple = mul.bind(null, 3);

alert( triple(3) ); // = mul(3, 3) = 9
alert( triple(4) ); // = mul(3, 4) = 12
alert( triple(5) ); // = mul(3, 5) = 15
Why do we usually make a partial function?

The benefit is that we can create an independent function with a readable name (double, triple).
 We can use it and not provide the first argument every time as it’s fixed with bind.

In other cases, partial application is useful when we have a very generic function and want a
 less universal variant of it for convenience.

For instance, we have a function send(from, to, text). Then, inside a user object we may want 
to use a partial variant of it: sendTo(to, text) that sends from the current user.


*/

/*
Going partial without context

What if we’d like to fix some arguments, but not the context this? For example, for an object method.

The native bind does not allow that. We can’t just omit the context and jump to arguments.

Fortunately, a function partial for binding only arguments can be easily implemented.

Like this:

 function partial(func, ...argsBound) {
  return function(...args) { // (*)
    return func.call(this, ...argsBound, ...args);
  }
}
*/

/*
partial fonksiyonu, iki şeyi alıyor:
func: orijinal fonksiyon (örneğin user.say)
...argsBound: önceden sabitlemek istediğimiz bazı argümanlar (örneğin saat/dakika gibi)
partial fonksiyonu, yeni bir wrapper fonksiyon döndürüyor (satır (*)), bu wrapper:
Çağrıldığında aldığı ...args argümanlarını
argsBound ile birlikte, orijinal func fonksiyonuna geçiriyor.
func.call(this, ...) ile çağrıldığı için this bağlamı korunuyor! Yani func içinde this o anki çağrının bağlamı oluyor.

*/

/*
// Usage:
let user = {
  firstName: "John",
  say(time, phrase) {
    alert(`[${time}] ${this.firstName}: ${phrase}!`);
  }
};

// add a partial method with fixed time
user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes());

user.sayNow("Hello");
// Something like:
// [10:00] John: Hello!
The result of partial(func[, arg1, arg2...]) call is a wrapper (*) that calls func with:

Same this as it gets (for user.sayNow call it’s user)
Then gives it ...argsBound – arguments from the partial call ("10:00")
Then gives it ...args – arguments given to the wrapper ("Hello")
So easy to do it with the spread syntax, right?

Also there’s a ready _.partial implementation from lodash library.


*/

/*
Çağrı ve Sonuç
user.sayNow("Hello");
sayNow çağrıldığında, aslında aşağıdaki gibi çalışıyor:
user.say.call(user, "10:00", "Hello");
Yani, this bağlamı user olarak kalıyor,
İlk argüman olarak "10:00" (kısmi sabitlenmiş),
İkinci argüman olarak da "Hello" geçiyor.
Sonuç alert olarak şöyle gösterilir:

*/

/*
Method func.bind(context, ...args) returns a “bound variant” of function func that fixes the 
context this and first arguments if given.

Usually we apply bind to fix this for an object method, so that we can pass it somewhere. For 
example, to setTimeout.

When we fix some arguments of an existing function, the resulting (less universal) function is 
called partially applied or partial.

Partials are convenient when we don’t want to repeat the same argument over and over again. Like 
if we have a send(from, to) function, and from should always be the same for our task, we can get
 a partial and go on with it.
*/

/*
The answer: null.

 function f() {
  alert( this ); // null
}

let user = {
  g: f.bind(null)
};

user.g();
The context of a bound function is hard-fixed. There’s just no way to further change it.

So even while we run user.g(), the original function is called with this=null.



*/

/*
The answer: John.

 function f() {
  alert(this.name);
}

f = f.bind( {name: "John"} ).bind( {name: "Pete"} );

f(); // John
The exotic bound function object returned by f.bind(...) remembers the context (and arguments
if provided) only at creation time.

A function cannot be re-bound.
*/

/*
There’s a value in the property of a function. Will it change after bind? Why, or why not?

 function sayHi() {
  alert( this.name );
}
sayHi.test = 5;

let bound = sayHi.bind({
  name: "John"
});

alert( bound.test ); // what will be the output? why?
solution
The answer: undefined.

The result of bind is another object. It does not have the test property.
*/

/*
askPassword(user.loginOk, user.loginFail);
solution
The error occurs because askPassword gets functions loginOk/loginFail without the object.

When it calls them, they naturally assume this=undefined.

Let’s bind the context:

 function askPassword(ok, fail) {
  let password = prompt("Password?", '');
  if (password == "rockstar") ok();
  else fail();
}

let user = {
  name: 'John',

  loginOk() {
    alert(`${this.name} logged in`);
  },

  loginFail() {
    alert(`${this.name} failed to log in`);
  },

};

askPassword(user.loginOk.bind(user), user.loginFail.bind(user));
Now it works.

An alternative solution could be:

//...
askPassword(() => user.loginOk(), () => user.loginFail());
Usually that also works and looks good.

It’s a bit less reliable though in more complex situations where user variable might change
 after askPassword is called, but before the visitor answers and calls () => user.loginOk().
*/

/*
The task is a little more complex variant of Fix a function that loses "this".

The user object was modified. Now instead of two functions loginOk/loginFail, it has a single 
function user.login(true/false).

What should we pass askPassword in the code below, so that it calls user.login(true) as ok and 
user.login(false) as fail?

function askPassword(ok, fail) {
  let password = prompt("Password?", '');
  if (password == "rockstar") ok();
  else fail();
}

let user = {
  name: 'John',

  login(result) {
    alert( this.name + (result ? ' logged in' : ' failed to log in') );
  }
};

askPassword(?, ?); // ?
Your changes should only modify the highlighted fragment.

solution
Either use a wrapper function, an arrow to be concise:

askPassword(() => user.login(true), () => user.login(false));
Now it gets user from outer variables and runs it the normal way.

Or create a partial function from user.login that uses user as the context and has the correct 
first argument:

askPassword(user.login.bind(user, true), user.login.bind(user, false));
*/

/*
Arrow functions have no “this”

As we remember from the chapter Object methods, "this", arrow functions do not have this. If this
 is accessed, it is taken from the outside.

For instance, we can use it to iterate inside an object method:

 let group = {
  title: "Our Group",
  students: ["John", "Pete", "Alice"],

  showList() {
    this.students.forEach(
      student => alert(this.title + ': ' + student)
    );
  }
};

group.showList();
Here in forEach, the arrow function is used, so this.title in it is exactly the same as in the 
outer method showList. That is: group.title.

If we used a “regular” function, there would be an error:

 let group = {
  title: "Our Group",
  students: ["John", "Pete", "Alice"],

  showList() {
    this.students.forEach(function(student) {
      // Error: Cannot read property 'title' of undefined
      alert(this.title + ': ' + student);
    });
  }
};

group.showList();
The error occurs because forEach runs functions with this=undefined by default, so the attempt
 to access undefined.title is made.

That doesn’t affect arrow functions, because they just don’t have this.

Arrow functions can’t run with new
Not having this naturally means another limitation: arrow functions can’t be used as constructors.
 They can’t be called with new.
*/

/*
Arrow functions VS bind
There’s a subtle difference between an arrow function => and a regular function called with
 .bind(this):

.bind(this) creates a “bound version” of the function.
The arrow => doesn’t create any binding. The function simply doesn’t have this. The lookup of 
this is made exactly the same way as a regular variable search: in the outer lexical environment.
*/

/*
Arrow fonksiyon sadece dış this'i almak istediğinde kullanılır

Mesela, içinde başka bir fonksiyon kullanıyorsun ve oradaki this'i dış fonksiyonun this'iyle aynı yapmak istiyorsan:

let user = {
  name: 'John',
  sayHi() {
    let inner = () => {
      console.log(this.name); // burada 'this' user objesine işaret eder
    };
    inner();
  }
};

user.sayHi(); // 'John'
Burada:

sayHi normal fonksiyon, this user objesi.
inner ise arrow function, kendi this yok, dış sayHi'nin this'ini kullanıyor.

*/

/*
Arrows have no “arguments”

Arrow functions also have no arguments variable.

That’s great for decorators, when we need to forward a call with the current this and arguments.

For instance, defer(f, ms) gets a function and returns a wrapper around it that delays the call
 by ms milliseconds:

 function defer(f, ms) {
  return function() {
    setTimeout(() => f.apply(this, arguments), ms);
  };
}

function sayHi(who) {
  alert('Hello, ' + who);
}

let sayHiDeferred = defer(sayHi, 2000);
sayHiDeferred("John"); // Hello, John after 2 seconds
The same without an arrow function would look like:

function defer(f, ms) {
  return function(...args) {
    let ctx = this;
    setTimeout(function() {
      return f.apply(ctx, args);
    }, ms);
  };
}
Here we had to create additional variables args and ctx so that the function inside setTimeout 
could take them.
*/

