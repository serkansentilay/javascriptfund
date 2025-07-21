
//variables


//let 

//let message;
//message='hello';  //bu sekilde de tanimlayabiliriz
//alert(message); 

//let message2 = 'hello2'; //bu sekilde de tanimlayabiliriz
//alert(message2);

//let message3 = 'hello3',  message4 ='hello4' , message5='hello5' //yan yana yazarken , virgulle ayri ayri 
//                                                             // let demeye gerek kalmaz
//alert(message3)                     //bu sekilde de tanimlayabiliriz
//alert(message4);
//alert(message5);

//ya da 

//let message6 = 'hello6';
//let message7 = 'hello7';
//let message8 = 'hello8'; //bu sekilde en basit ve en kolay okunabilir sekilde de tanimlayabiliriz
//alert(message6);
//alert(message7);


//let message9 = 'hello9',
//    message10 = 'hello10',
//    message11 = 'hello11'; 
                                // virguller sonda ya da basta da olabilir 
//let message12 = 'hello12' 
//     ,message13 = 'hello13' 
//     ,message14 = 'hello14';  


//Variables, declared with var, are either function-scoped or global-scoped. They are visible through blocks.

//var 

//if(true){
   //let test1 = false; // let ile tanimlanan degiskenler block scope yani sadece bu scope icinde gecerli
//    var test1 = true; // var ile tanimlanan degiskenler block scope degildir

    //var olunca scope icine giriyor , let olunca scope disinda kalir' 
    // scope icinde let ilen tanimlanirsa disardan erisilmiyor
//}
//alert(test1); 

//var cannot be block- or loop-local:
//for(var i = 0; i<10 ; i++){
//    if(true){
//        var one =1;
//    }
//}
//alert(i); // 10 sonucunu veriyor, cunku var ile tanimlanan degiskenler block scope degildir
//10, "i" is visible after loop, it's a global variable
//alert(one);// 1, "one" is visible after loop, it's a global variable

//let's try with let 

//for(let j = 0; j<10 ; j++){
//    if(true){
//        let two =2;
//    }
//}
//alert(j); // ReferenceError: j is not defined, cunku let ile tanimlanan degiskenler block scope'dur
//alert(two); // ReferenceError: two is not defined, cunku let ile tanimlanan degiskenler block scope'dur


//let cannot be re-declared in the same scope:
//If a code block is inside a function, then var becomes a function-level variable:
//Eğer bir kod bloğu bir fonksiyonun içerisindeyse, o zaman var fonksiyon seviyesinde bir değişken olur:

//function sayHi(){
//    if(true){
//        var phrase =`hello`
//    }    
//    alert(phrase); // hello, var ile tanimlanan degiskenler function scope'dur
//}

//sayHi(); // hello
//alert(phrase); // ReferenceError: phrase is not defined, cunku phrase sadece sayHi fonksiyonu icinde tanimlandi

//function sayHi2(){
//    if(true){
//        let phrase2 =`hello2`
//    }    
//    alert(phrase2); // ReferenceError: phrase2 is not defined, cunku let ile tanimlanan degiskenler block scope'dur
//}   
//sayHi2(); // ReferenceError: phrase2 is not defined, cunku phrase2 sadece sayHi2 fonksiyonu icinde tanimlandi
//alert(phrase2); // ReferenceError: phrase2 is not defined, cunku phrase2 sadece sayHi2 fonksiyonu icinde tanimlandi

//let user;
//let user; // SyntaxError: 'user' has already been declared 
    // let ile tanimlanan degiskenler block scope'dur ve ayni isimle tekrar tanimlanamaz
    //var ile tanimlanan degiskenler block scope degildir ve ayni isimle tekrar tanimlanabilir
//var user='ali';
//var user='mete'; // this "var" does nothing (already declared)
// ...it doesn't trigger an error
//alert(user); // mete
//son degisitirelen kaliyor

//var declarations are processed when the function starts (or script starts for globals).

//In other words, var variables are defined from the beginning of the function, 
// no matter where the definition is (assuming that the definition is not in the nested function).

//var da tanimlanan degisken var ile daha sonra tanimlanabilir
//let ile tanimlanan degisken ise let ile daha sonra tanimlanamaz

//function sayHi3(){
//   phrase='hello3';
//   alert(phrase); 
//   var phrase;}
//   sayHi3(); // hello3

//function sayHi4(){
//    var phrase;  //var icin ayni yukaridakiyle ayni sonucu verir calisir
//   phrase='hello3';
//   alert(phrase); 
//}
//   sayHi4(); // hello3

//ya da

//code blocks are ignored, 
//function sayHi3(){
//    phrase='hello3'; //* This is a global variable, not block scoped
   // If we had used "let" or "const" here, it would be block
   // scoped and the alert would not work outside of this block.

   //yukarda global degisken olarak tanimladik bunu varsayilan var olarak goruyor
//   if(false){
//    var phrase;// This "var" is hoisted to the top of the function
   // and processed at the beginning of the function.
   // So at the moment of (*) the variable exists, even though
   // the "if" branch is never executed.
   // If we had used "let" or "const" here, it would be block scoped
   // and the alert would not work outside of this block.
   // But since we used "var", it is function scoped and exists throughout the function.
   // So the alert works and shows "hello3".
//   }
//   alert(phrase); 
//   }
//   sayHi3(); // hello3

   //var da scope suslu parantezleri gormezden gelip tanimlamayi en basa aliyor.

//People also call such behavior “hoisting” (raising),
// because all var are “hoisted” (raised) to the top of the function.
//So in the example above, if (false) branch never executes, but that doesn’t matter. 
// The var inside it is processed in the beginning of the function, 
// so at the moment of (*) the variable exists.

//let and const are not hoisted, they are block scoped.

//Declarations are hoisted, but assignments are not.
//beyanlar veriliyor ama atamalar yapilmiyor

//function sayHello(){
//    alert(phrase); // undefined, because the variable is hoisted but not assigned yet
//    var phrase = 'hello'; // assignment happens here
//}
//sayHello(); // undefined

//The declaration is processed at the start of function execution (“hoisted”), 
// but the assignment always works at the place where it appears. 
// So the code works essentially like this:

//Bildirim, fonksiyon yürütmenin başlangıcında işlenir ("hoisted"), 
// ancak atama her zaman göründüğü yerde çalışır. Yani kod temelde şu şekilde çalışır:

//function sayHi() {
//  var phrase; // declaration works at the start...

//  alert(phrase); // undefined

//  phrase = "Hello"; // ...assignment - when the execution reaches it.
//}

//sayHi();

//Because all var declarations are processed at the function start, 
// we can reference them at any place. But variables are undefined until the assignments.

//In both examples above, alert runs without an error, because the variable phrase exists.
//  But its value is not yet assigned, so it shows undefined.


//var tanimlamasi nerede yaparsan basta tanimlanmis oluyor, 
// ama atama yapilinca o scope icinde gecerli oluyor, o satirda islem goruyor

//var variables have no block scope, their visibility is scoped to current function, or global, 
// if declared outside function.
//var declarations are processed at function start (script start for globals).
//var değişkenlerinin blok kapsamı yoktur, görünürlükleri geçerli işleve veya 
// işlev dışında bildirilirse globale göre kapsamlandırılır.
//var bildirimleri işlev başlangıcında işlenir (globaller için betik başlangıcında).

//These differences make var worse than let most of the time. Block-level variables is such a great thing. 
// That’s why let was introduced in the standard long ago, and is now a major way (along with const)
//  to declare a variable.
//Bu farklar var'ı çoğu zaman let'ten daha kötü hale getirir. Blok düzeyindeki değişkenler 
// harika bir şeydir. Bu yüzden let uzun zaman önce standartta tanıtıldı ve 
// artık (const ile birlikte) bir değişken bildirmenin önemli bir yoludur.


//let message;

//message = 'hello';  
//message = 'hello2'; //tanimlanan degiskeni degistirebiliriz, eski veri silinir

//alert(message);

//let hello=`my world`;
//let mssg;
//mssg=hello; //bu sekilde kopyalayabiliriz

//alert(hello); 
//alert(mssg);  //2 degisken de ayni degeri gosteriyor



//A variable should be declared only once.
//A repeated declaration of the same variable is an error:
//Bir değişken yalnızca bir kez bildirilmelidir.
//Aynı değişkenin tekrarlanan bildirimi bir hatadır:

//let deger =`hello world`;
//alert(deger); // my worldç
//let deger =`my world`
//alert(deger); // my worldç
// repeated 'let' leads to an error
// SyntaxError: 'message' has already been declared


//Variable naming
//The name must contain only letters, digits, or the symbols $ and _.
//The first character must not be a digit.
//Variables named apple and APPLE are two different variables.
//There is a list of reserved words, which cannot be used as variable names
//  because they are used by the language itself.
//For example: let, class, return, and function are reserved.


//use strict de onceye kaldi 
// note: no "use strict" in this example
//num = 5; // the variable "num" is created if it didn't exist
//alert(num); // 5


//"use strict";
//num = 5; // error: num is not defined


//const
//Variables declared using const are called “constants”.
//  They cannot be reassigned. An attempt to do so would cause an error:

//const myBirthday = '18.04.1982';
//myBirthday = '01.01.2001'; // error, can't reassign the constant!

//Uppercase constants
//const COLOR_ORANGE = "#FF7F00";
// ...when we need to pick a color
//let color = COLOR_ORANGE;
//alert(color); // #FF7F00

// a “constant” just means that a variable’s value never changes


//let – is a modern variable declaration.
//var – is an old-school variable declaration. Normally we don’t use it at all, 
// but we’ll cover subtle differences from let in the chapter The old "var", just in case you need them.
//const – is like let, but the value of the variable can’t be changed.


//let and const are block-scoped, var is function-scoped.
//let and const are not hoisted, var is hoisted.    
//Hoisting, JavaScript’in çalışma zamanında değişken ve fonksiyon bildirimlerini 
// kodun en üstüne "taşıması" (hoist etmesi) anlamına gelir.



//let and const can’t be re-declared in the same scope, var can.    
//let and const can’t be used before declaration, var can.
//let and const are preferred, var is rarely used.


