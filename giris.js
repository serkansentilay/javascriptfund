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

