//"use strict"; //modern mode oluyor ve en ustte olmasi gerekiyor
//alert("some code");
// "use strict" below is ignored--it must be at the top


//(function() {
 // 'use strict';
//alert("some code");
  // ...your code here...
//})() bu da diger kullanim sekli 



// strict mode is not activated

//alert('Hello')
//alert('World')
// hello
// world sirayla gosteriyor

//alert(3 +
//1
//+ 2);
// 6 sonucunu veriyor 

//alert("Hello");
//[1, 2].forEach(alert);
// hello 
// 1
// 2 sirayla gosteriyor 

//alert("Hello")
//[1, 2].forEach(alert);
// hello
// ; noktali virgul semicolon olmayinca  1 ve 2 yi gostermedi sadece hello yazisi
//Bunun nedeni, JavaScript'in köşeli parantezlerden önce noktalı virgül varsaymamasıdır [...]. 
// Bu nedenle, son örnekteki kod tek bir ifade olarak ele alınır.

//alert("Hello")[1, 2].forEach(alert);
//yine sadece hello yazar
//Bu durumda böyle bir birleştirme yanlıştır. 
// Kodun doğru çalışması için uyarıdan sonra noktalı virgül koymamız gerekir.



//result = prompt(title, [default]);
//let age = prompt('How old are you?', 100);

//alert(`You are ${age} years old!`); // You are 100 years old!

//The function confirm shows a modal window with a question and two buttons: OK and Cancel.

//The result is true if OK is pressed and false otherwise.

//let isBoss = confirm("Are you the boss?");

//alert( isBoss ); // true if OK is pressed

//son incelikler

//That’s called “automatic semicolon insertion”. Sometimes it doesn’t work, for instance:

// alert("There will be an error after this message")

//[1, 2].forEach(alert)


//Semicolons are not required after code blocks {...} and syntax constructs with them like loops:

//function f() {
  // no semicolon needed after function declaration
//}

//for(;;) {
  // no semicolon needed after the loop
//}
//…But even if we can put an “extra” semicolon somewhere, that’s not an error. It will be ignored.


//To fully enable all features of modern JavaScript, we should start scripts with "use strict".
//The directive must be at the top of a script or at the beginning of a function body.
//Without "use strict", everything still works, but some features behave in the old-fashioned, “compatible” way.
//  We’d generally prefer the modern behavior.
//"use strict" olmadan her şey hala çalışır, ancak bazı özellikler eski moda, "uyumlu" şekilde davranır. 
// Genellikle modern davranışı tercih ederiz.
//Some modern features of the language (like classes that we’ll study in the future) enable strict mode implicitly.

//All these functions are modal, they pause the code execution and prevent the visitor from interacting with the page until they answer.
//let userName = prompt("Your name?", "Alice");
//let isTeaWanted = confirm("Do you want some tea?");
//alert( "Visitor: " + userName ); // Alice
//alert( "Tea wanted: " + isTeaWanted ); // true





// Debugging in the browser
//code hata ayiklama
//We can also pause the code by using the debugger command in it, like this:

//function hello(name) { 
//  let phrase = `Hello, ${name}!`;

  //debugger;  // <-- the debugger stops here

//  say(phrase);
//}

//function say(phrase){ phrase="jogn"
//    alert(`** ${phrase} **`)
//}
//Such command works only when the development tools are open, otherwise the browser ignores it.

// open console to see
//for (let i = 0; i < 5; i++) {
//  console.log("value,", i);
//}

//hata ayiklamada chrome dan cmd+option+c ile sourcesa ulas oradan sag taraftaki panellerden test edebilirsin



