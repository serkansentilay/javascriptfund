
//ninja style code style

//// altta ki kod gibi kisa yazmaya calis 
//i = i ? i < 0 ? Math.max(0, len + i) : i : 0;

//list → lst.
//userAgent → ua.
//browser → brsr.
//Only the one with truly good intuition will be able to understand such names. 
// Try to shorten everything. Only a worthy person should be able to uphold the development 
// of your code.

//Only a truly attentive programmer should be able to understand your code.

//The purpose is to develop the intuition and memory of a person reading the code.
//  A person with weak intuition would have to analyze the code line-by-line and track 
// the changes through every code branch.
//Ayrıca nereden geldiğini de. Amaç, kodu okuyan bir kişinin sezgisini ve hafızasını
//  geliştirmektir. Zayıf sezgiye sahip bir kişi, kodu satır satır analiz etmeli ve her
//  kod dalındaki değişiklikleri izlemelidir.

//Don’t limit the function by what’s written in its name. Be broader.
//For instance, a function validateEmail(email) could (besides checking the email for 
// correctness) show an error message and ask to re-enter the email.
//Additional actions should not be obvious from the function name. A true ninja coder will 
// make them not obvious from the code as well.
//Joining several actions into one protects your code from reuse.
//Imagine, another developer wants only to check the email, and not output any message. Your 
// function validateEmail(email) that does both will not suit them. So they won’t break your 
// meditation by asking anything about it.


//transpilers
/*
A transpiler would analyze our code and rewrite height ?? 100 into (height !== undefined && height !== null) ? height : 100.

// before running the transpiler
height = height ?? 100;

// after running the transpiler
height = (height !== undefined && height !== null) ? height : 100;
//Now the rewritten code is suitable for older JavaScript engines.
*/

//polyfiils
/*
For example, Math.trunc(n) is a function that “cuts off” the decimal part of a number, 
e.g Math.trunc(1.23) returns 1.
In some (very outdated) JavaScript engines, there’s no Math.trunc, so such code will fail.
As we’re talking about new functions, not syntax changes, there’s no need to transpile anything
 here. We just need to declare the missing function.
A script that updates/adds new functions is called “polyfill”. It “fills in” the gap and adds 
missing implementations.
For this particular case, the polyfill for Math.trunc is a script that implements it, like this:
*/

/*
if (!Math.trunc) { // if no such function
  // implement it
  Math.trunc = function(number) {
    // Math.ceil and Math.floor exist even in ancient JavaScript engines
    // they are covered later in the tutorial
    return number < 0 ? Math.ceil(number) : Math.floor(number);
  };
}
*/


//Just don’t forget to use a transpiler (if using modern syntax or operators) and polyfills 
// (to add functions that may be missing). They’ll ensure that the code works.

