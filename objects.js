//objects

//opbje olusturmak alttaki 2 sinden biri tercih edilir
// let user = new Object(); // "object constructor" syntax
//let user = {};  // "object literal" syntax

//let user = { // an object
//  name: "John", // by key "name" store value "John"
//  age: 30, // by key "age" store value 30
//}

// get property values of the object:
//alert( user.name ); // John
//alert( user.age ); // 30

//The value can be of any type. Let’s add a boolean one:, sonradan deger ekleyebiliriz

//user.isAdmin = true;

//To remove a property, we can use the delete operator:

//delete user.age;

//alert( user ); // 
//alert( user.isAdmin); // 
//alert(user.name)
//alert(user.age); // undefined, age is deleted

//let user = {
//  name: "John",
//  age: 30,
//  "likes birds": true,  // multiword property name must be quoted
//};
//The last property in the list may end with a comma:
//son kisim virgulle bitebilir sorun yok

//That is called a “trailing” or “hanging” comma. 
// Makes it easier to add/remove/move around properties, because all lines become alike.
//Buna ”sondaki“ veya ”asılı" virgül denir. Özelliklerin 
// eklenmesini / kaldırılmasını / taşınmasını kolaylaştırır, çünkü tüm satırlar birbirine benzer hale gelir.


//bu multiword property lere erismek icin su tercih edilir
//alert( user["likes birds"] ); // true, use quotes to access multiword property
//alert( user.likes birds ); // error, no such property 

//let user = {};

// set
//user["likes birds"] = true;

// get
//alert(user["likes birds"]); // true

// delete
//delete user["likes birds"];

//let key = "likes birds";

// same as user["likes birds"] = true;
//user[key] = true;

//let user = {
//  name: "John",
//  age: 30
//};

//let key = prompt("What do you want to know about the user?", "name");

// access by variable
//alert( user[key] ); // John (if enter "name")
//The dot notation cannot be used in a similar way:
//let key = "name";
//alert( user.key ) // undefined

//We can use square brackets in an object literal, when creating an object. That’s called computed properties.

//let fruit = prompt("Which fruit to buy?", "apple");

//let bag = {
//  [fruit]: 5, // the name of the property is taken from the variable fruit
//};

//alert( bag.apple ); // 5 if fruit="apple"
//that works the same as:

//let fruit = prompt("Which fruit to buy?", "apple");
//let bag = {};

// take property name from the fruit variable
//bag[fruit] = 5;
//alert( bag.apple ); 

//let fruit = 'apple';
//let bag = {
//  [fruit + 'Computers']: 5 // bag.appleComputers = 5
//};

//Square brackets are much more powerful than dot notation. They allow any property 
// names and variables. But they are also more cumbersome to write.

//Instead of name:name we can just write name, like this:

//name: name, ----> name, , name name yazacagina ayni isim oldugu icin direkt name yaz yeterli

//let user = {
//  name,  // same as name:name
//  age: 30
//};


//Property names limitations

//As we already know, a variable cannot have a name equal to one of the language-reserved
//  words like “for”, “let”, “return” etc.
//But for an object property, there’s no such restriction:
//objelerde bu kisitlama yok 

// these properties are all right
//let obj = {
//  for: 1,
//  let: 2,
//  return: 3
//};

//alert( obj.for + obj.let + obj.return );  // 6

//In short, there are no limitations on property names. They can be any strings or symbols 
// (a special type for identifiers, to be covered later).
//Other types are automatically converted to strings.
//For instance, a number 0 becomes a string "0" when used as a property key:

//let obj = {
//  0: "test" // same as "0": "test"
//};

// both alerts access the same property (the number 0 is converted to string "0")
//alert( obj["0"] ); // test
//alert( obj[0] ); // test (same property)

//There’s a minor gotcha with a special property named __proto__. We can’t set it to a non-object value:

//let obj = {};
//obj.__proto__ = 5; // assign a number
//alert(obj.__proto__); // [object Object] - the value is an object, didn't work as intended


//Prototypal inheritance is a language feature that helps in that.
//Prototip kalıtım, buna yardımcı olan bir dil özelliğidir.

//let animal = {
//  eats: true
//};
//let rabbit = {
//  jumps: true
//};

//rabbit.__proto__ = animal; // sets rabbit.[[Prototype]] = animal
// // we can find both properties in rabbit now:
//alert( rabbit.eats ); // true (**)
//alert( rabbit.jumps ); // true


//let animal = {
//  eats: true,
//  walk() {
//    alert("Animal walk");
//  }
//};

//let rabbit = {
//  jumps: true,
//  __proto__: animal
//};
//let longEar = {
//  earLength: 10,
//  __proto__: rabbit
//};
// walk is taken from the prototype
//rabbit.walk(); // Animal walk
//alert(longEar.jumps); // true (from rabbit)

//The method is automatically taken from the prototype,

//There are only two limitations:

//The references can’t go in circles. JavaScript will throw an error if we try to 
// assign __proto__ in a circle.
//The value of __proto__ can be either an object or null. Other types are ignored.
//Also it may be obvious, but still: there can be only one [[Prototype]].
//  An object may not inherit from two others.

//let user = {
//  name: "John",
//  surname: "Smith",

//  set fullName(value) {
//    [this.name, this.surname] = value.split(" ");
//  },

//  get fullName() {
//    return `${this.name} ${this.surname}`;
//  }
//};

//let admin = {
//  __proto__: user,
//  isAdmin: true
//};

//alert(admin.fullName); // John Smith (*)

// setter triggers!
//admin.fullName = "Alice Cooper"; // (**)

//alert(admin.fullName); // Alice Cooper, state of admin modified
//alert(user.fullName); // John Smith, state of user protected

//the value of “this”

//An interesting question may arise in the example above: what’s the value of this inside 
// set fullName(value)? Where are the properties this.name and this.surname written: into user or admin?
//The answer is simple: this is not affected by prototypes at all.
//No matter where the method is found: in an object or its prototype. In a method call, 
// this is always the object before the dot.
//Yukarıdaki örnekte ilginç bir soru ortaya çıkabilir: Bu ınside set fullName(değer) 
// değerinin değeri nedir? Özellikleri nerede this.name bunu da.soyadı yazılı: 
// kullanıcıya mı yoksa yöneticiye mi?
//Cevap basit: Bu prototiplerden hiç etkilenmiyor.
//Yöntemin nerede bulunduğuna bakılmaksızın: bir nesnede veya prototipinde. 
// Bir yöntem çağrısında, bu her zaman noktadan önceki nesnedir.

//So, the setter call admin.fullName= uses admin as this, not user.

//That is actually a super-important thing, because we may have a big object with many methods, 
// and have objects that inherit from it. And when the inheriting objects run the inherited methods,
//  they will modify only their own states, not the state of the big object.
//Bu aslında çok önemli bir şey, çünkü birçok yönteme sahip büyük bir nesnemiz olabilir ve 
// ondan miras kalan nesnelerimiz olabilir. Ve devralınan nesneler devralınan yöntemleri çalıştırdıklarında, 
// büyük nesnenin durumunu değil, yalnızca kendi durumlarını değiştireceklerdir.

//For instance, here animal represents a “method storage”, and rabbit makes use of it.

//The call rabbit.sleep() sets this.isSleeping on the rabbit object:

// animal has methods
//let animal = {
//  walk() {
//    if (!this.isSleeping) {
//      alert(`I walk`);
//    }
// },
//  sleep() {
//    this.isSleeping = true;
//  }
//};

//let rabbit = {
//  name: "White Rabbit",
//  __proto__: animal
//};

// modifies rabbit.isSleeping
//rabbit.sleep();

//alert(rabbit.isSleeping); // true
//alert(animal.isSleeping); // undefined (no such property in the prototype)


//let animal = {
//  eats: true
//};

//let rabbit = {
//  jumps: true,
//  __proto__: animal
//};

// Object.keys only returns own keys
//alert(Object.keys(rabbit)); // jumps

// for..in loops over both own and inherited keys
//for(let prop in rabbit) alert(prop); // jumps, then eats


//let animal = {
//  eats: true
//};

//let rabbit = {
//  jumps: true,
//  __proto__: animal
//};

//for(let prop in rabbit) {
//  let isOwn = rabbit.hasOwnProperty(prop);

//  if (isOwn) {
//    alert(`Our: ${prop}`); // Our: jumps
//  } else {
//    alert(`Inherited: ${prop}`); // Inherited: eats
//  }
//}


//Almost all other key/value-getting methods, such as Object.keys, 
// Object.values and so on ignore inherited properties.
//They only operate on the object itself. Properties from the prototype are not taken into account.
//Nesne gibi hemen hemen tüm diğer anahtar / değer alma yöntemleri.anahtarlar, 
// Nesne.değerler vb. Devralınan özellikleri yoksayar.
//Sadece nesnenin kendisi üzerinde çalışırlar. Prototipin özellikleri dikkate alınmaz.


//let hamster = {
//  stomach: [],

//  eat(food) {
    // assign to this.stomach instead of this.stomach.push
//    this.stomach = [food];
//  }
//};

//let speedy = {
//   __proto__: hamster
//};

//let lazy = {
//  __proto__: hamster
//};

// Speedy one found the food
//speedy.eat("apple");
//alert( speedy.stomach ); // apple

// Lazy one's stomach is empty
//alert( lazy.stomach ); // <nothing>

//let animal = {
//  eats: true
//};

// create a new object with animal as a prototype
//let rabbit = Object.create(animal); // same as {__proto__: animal}

//alert(rabbit.eats); // true

//alert(Object.getPrototypeOf(rabbit) === animal); // true

//Object.setPrototypeOf(rabbit, {}); // change the prototype of rabbit to {}


//let animal = {
//  eats: true
//};

//let rabbit = Object.create(animal, {
//  jumps: {
//    value: true
//  }
//});

//alert(rabbit.jumps); // true

//let user = {
//  name: "John"
//};

//let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

//alert( JSON.stringify(descriptor, null, 2 ) );
/* property descriptor:
{
  "value": "John",
  "writable": true,
  "enumerable": true,
  "configurable": true
}
*/

//let user = {};

//Object.defineProperty(user, "name", {
//  value: "John"
//});

//let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

//alert( JSON.stringify(descriptor, null, 2 ) );
/*
{
  "value": "John",
  "writable": false,
  "enumerable": false,
  "configurable": false
}
 */

//let user = {
//  name: "John"
//};

//Object.defineProperty(user, "name", {
//  writable: false
//});

//user.name = "Pete"; // Error: Cannot assign to read only property 'name'

//let user = { };

//Object.defineProperty(user, "name", {
//  value: "John",
  // for new properties we need to explicitly list what's true
//  enumerable: true,
//  configurable: true
//});

//alert(user.name); // John
//user.name = "Pete"; // Error

//Normally, a built-in toString for objects is non-enumerable, it does not show up in for..in. But if we add a toString of our own, then by default it shows up in for..in, like this:

// let user = {
//  name: "John",
//  toString() {
//    return this.name;
//  }
//};

// By default, both our properties are listed:
//for (let key in user) alert(key); // name, toString


//If we don’t like it, then we can set enumerable:false. Then it won’t appear in a for..in loop,
//  just like the built-in one:


//let user = {
//  name: "John",
//  toString() {
//    return this.name;
//  }
//};

//Object.defineProperty(user, "toString", {
//  enumerable: false
//});

// Now our toString disappears:
//for (let key in user) alert(key); // name

//Non-enumerable properties are also excluded from Object.keys:

//alert(Object.keys(user)); // name

//The non-configurable flag (configurable:false) is sometimes preset for built-in objects and properties.

//A non-configurable property can’t be deleted, its attributes can’t be modified.

//For instance, Math.PI is non-writable, non-enumerable and non-configurable:

// let descriptor = Object.getOwnPropertyDescriptor(Math, 'PI');

//alert( JSON.stringify(descriptor, null, 2 ) );
/*
{
  "value": 3.141592653589793,
  "writable": false,
  "enumerable": false,
  "configurable": false
}
*/

//Math.PI = 3; // Error, because it has writable: false
// delete Math.PI won't work either
//We also can’t change Math.PI to be writable again:

 // Error, because of configurable: false
//Object.defineProperty(Math, "PI", { writable: true });
//There’s absolutely nothing we can do with Math.PI.

//configurable: false prevents changes of property flags and its deletion, while allowing to change its value.

//Here user.name is non-configurable, but we can still change it (as it’s writable):

// let user = {
//  name: "John"
//};

//Object.defineProperty(user, "name", {
//  configurable: false
//});

//user.name = "Pete"; // works fine
//delete user.name; // Error

//let user = {
//  name: "John"
//};

//Object.defineProperty(user, "name", {
//  writable: false,
//  configurable: false
//});

// won't be able to change user.name or its flags
// all this won't work:
//user.name = "Pete";
//delete user.name;
//Object.defineProperty(user, "name", { value: "Pete" });

//Object.defineProperties(user, {
//  name: { value: "John", writable: false },
//  surname: { value: "Smith", writable: false },
  // ...
//});

//let obj = {};

//let key = prompt("What's the key?", "__proto__");
//obj[key] = "some value";

//alert(obj[key]); // [object Object], not "some value"!

//we can just switch to using Map for storage instead of plain objects, then everything’s fine:

// let map = new Map();

//let key = prompt("What's the key?", "__proto__");
//map.set(key, "some value");

//alert(map.get(key)); // "some value" (as intended)
//…But Object syntax is often more appealing, as it’s more concise.

//__proto__ is not a property of an object, but an accessor property of Object.prototype:
//Bildiğimiz gibi, __proto__ bir nesnenin özelliği değil, Nesnenin erişimci özelliğidir.prototip:

//let obj = Object.create(null);
// or: obj = { __proto__: null }

//let key = prompt("What's the key?", "__proto__");
//obj[key] = "some value";

//alert(obj[key]); // "some value"
//Object.create(null) creates an empty object without a prototype ([[Prototype]] is null):

//So, there is no inherited getter/setter for __proto__. Now it is processed as a regular
//  data property, so the example above works right.
//We can call such objects “very plain” or “pure dictionary” objects, because they are even
//  simpler than the regular plain object {...}.
//A downside is that such objects lack any built-in object methods, e.g. toString:


//let obj = Object.create(null);
//alert(obj); // Error (no toString)

//Note that most object-related methods are Object.something(...), like Object.keys(obj) – 
// they are not in the prototype, so they will keep working on such objects:

//let chineseDictionary = Object.create(null);
//chineseDictionary.hello = "你好";
//chineseDictionary.bye = "再见";

//alert(Object.keys(chineseDictionary)); // hello,bye

//let dictionary = Object.create(null, {
//  toString: { // define toString property
//    value() { // the value is a function
//      return Object.keys(this).join();
//    }
//  }
//});

//dictionary.apple = "Apple";
//dictionary.__proto__ = "test";

// apple and __proto__ is in the loop
//for(let key in dictionary) {
//  alert(key); // "apple", then "__proto__"
//}

// comma-separated list of properties by toString
//alert(dictionary); // "apple,__proto__"

//function Rabbit(name) {
//  this.name = name;
//}
//Rabbit.prototype.sayHi = function() {
//  alert( this.name );
//}

//let rabbit = new Rabbit("Rabbit");

//rabbit.sayHi();                        // Rabbit
//Rabbit.prototype.sayHi();              // undefined
//Object.getPrototypeOf(rabbit).sayHi(); // undefined
//rabbit.__proto__.sayHi();              // undefined

//let user = {};

//alert( user.noSuchProperty === undefined ); // true means "no such property"

//let user = { name: "John", age: 30 };

//alert( "age" in user ); // true, user.age exists
//alert( "blabla" in user ); // false, user.blabla doesn't exist

//let user = { age: 30 };

//let key = "age";
//alert( key in user ); // true, property "age" exists

//let obj = {
//  test: undefined
//};

//alert( obj.test ); // it's undefined, so - no such property?

//alert( "test" in obj ); // true, the property does exist!

//To walk over all keys of an object, there exists a special form of the loop: for..in. 
// This is a completely different thing from the for(;;) construct that we studied before.

//let user = {
//  name: "John",
//  age: 30,
//  isAdmin: true
//};

//for (let key in user) {
  // keys
//  alert( key );  // name, age, isAdmin
  // values for the keys
//  alert( user[key] ); // John, 30, true
//}

//let codes = {
 // "49": "Germany",
//  "41": "Switzerland",
//  "44": "Great Britain",
  // ..,
//  "1": "USA"
//};

//for (let code in codes) {
//  alert(code); // 1, 41, 44, 49
//}


// Number(...) explicitly converts to a number
// Math.trunc is a built-in function that removes the decimal part
//alert( String(Math.trunc(Number("49"))) ); // "49", same, integer property
//alert( String(Math.trunc(Number("+49"))) ); // "49", not same "+49" ⇒ not integer property
//alert( String(Math.trunc(Number("1.2"))) ); // "1", not same "1.2" ⇒ not integer property



//let user = {
//  name: "John",
//  surname: "Smith"
//};
//user.age = 25; // add one more
//// tamsayı olmayan özellikler oluşturma sırasına göre listelenir
// non-integer properties are listed in the creation order
//for (let prop in user) {
//  alert( prop ); // name, surname, age
//}

//So, to fix the issue with the phone codes, we can “cheat” by making the codes non-integer.
//  Adding a plus "+" sign before each code is enough.

// let codes = {
//  "+49": "Germany",
//  "+41": "Switzerland",
//  "+44": "Great Britain",
  // ..,
//  "+1": "USA"
//};

//for (let code in codes) {
//  alert( +code ); // 49, 41, 44, 1
//}


//Object references and copying
//One of the fundamental differences of objects versus primitives is that objects are stored 
// and copied “by reference”, whereas primitive values: strings, numbers, booleans, etc – are 
// always copied “as a whole value”.

//let message = "Hello!";
//let phrase = message;
//As a result we have two independent variables, each one storing the string "Hello!".
//Objects are not like that.

//A variable assigned to an object stores not the object itself, but its “address in memory” –
//  in other words “a reference” to it.
//objelerde bellekteki adresi referans alarak islem yapar

/*
The object is stored somewhere in memory (at the right of the picture), while the user variable
 (at the left) has a “reference” to it.
We may think of an object variable, such as user, like a sheet of paper with the address of the 
object on it.
When we perform actions with the object, e.g. take a property user.name, the JavaScript engine 
looks at what’s at that address and performs the operation on the actual object.
Now here’s why it’s important.
When an object variable is copied, the reference is copied, but the object itself is not 
duplicated.

let user = { name: "John" };
let admin = user; // copy the reference
*/


/*
As you can see, there’s still one object, but now with two variables that reference it.
We can use either variable to access the object and modify its contents:

let user = { name: 'John' };
let admin = user;
admin.name = 'Pete'; // changed by the "admin" reference
alert(user.name); // 'Pete', changes are seen from the "user" reference

It’s as if we had a cabinet with two keys and used one of them (admin) to get into it and make 
changes. Then, if we later use another key (user), we are still opening the same cabinet and can 
access the changed contents.
*/

/*
Two objects are equal only if they are the same object.
For instance, here a and b reference the same object, thus they are equal:

let a = {};
let b = a; // copy the reference
alert( a == b ); // true, both variables reference the same object
alert( a === b ); // true

And here two independent objects are not equal, even though they look alike (both are empty):

let a = {};
let b = {}; // two independent objects
alert( a == b ); // false

For comparisons like obj1 > obj2 or for a comparison against a primitive obj == 5, objects are 
converted to primitives. We’ll study how object conversions work very soon, but to tell the truth,
 such comparisons are needed very rarely – usually they appear as a result of a programming mistake.
*/

/*
Const objects can be modified
An important side effect of storing objects as references is that an object declared as const can
 be modified.

 const user = {
  name: "John"
};

user.name = "Pete"; // (*)
alert(user.name); // Pete

It might seem that the line (*) would cause an error, but it does not. The value of user is 
constant, it must always reference the same object, but properties of that object are free to 
change.
In other words, the const user gives an error only if we try to set user=... as a whole.
*/

//Cloning and merging, Object.assign
//So, copying an object variable creates one more reference to the same object.
//We can create a new object and replicate the structure of the existing one, by iterating
//  over its properties and copying them on the primitive level.

/*
let user = {
  name: "John",
  age: 30
};
let clone = {}; // the new empty object
// let's copy all user properties into it
for (let key in user) {
  clone[key] = user[key];
}
// now clone is a fully independent object with the same content
clone.name = "Pete"; // changed the data in it
alert( user.name ); // still John in the original object
*/

/*
We can also use the method Object.assign.

The syntax is:
Object.assign(dest, ...sources)

The first argument dest is a target object.
Further arguments is a list of source objects.
It copies the properties of all source objects into the target dest, and then returns it as the
 result.
İlk argüman dest bir hedef nesnedir.
Diğer argümanlar kaynak nesnelerin bir listesidir.
Tüm kaynak nesnelerinin özelliklerini hedef dest'e kopyalar ve ardından bunu sonuç olarak döndürür.
*/

/*
let user = { name: "John" };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

// copies all properties from permissions1 and permissions2 into user
Object.assign(user, permissions1, permissions2);

// now user = { name: "John", canView: true, canEdit: true }
alert(user.name); // John
alert(user.canView); // true
alert(user.canEdit); // true
*/

/*
If the copied property name already exists, it gets overwritten:
 let user = { name: "John" };
Object.assign(user, { name: "Pete" });
alert(user.name); // now user = { name: "Pete" }
*/

/*
let user = {
  name: "John",
  age: 30
};

let clone = Object.assign({}, user);

alert(clone.name); // John
alert(clone.age); // 30
Here it copies all properties of user into the empty object and returns it.
*/

/*
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };

const returnedTarget = Object.assign(target, source);

console.log(target);
// Expected output: Object { a: 1, b: 4, c: 5 }

console.log(returnedTarget === target);
// Expected output: true
*/


//Rest parameters and spread syntax
//Many JavaScript built-in functions support an arbitrary number of arguments.
//Math.max(arg1, arg2, ..., argN) – returns the greatest of the arguments.
//Object.assign(dest, src1, ..., srcN) – copies properties from src1..N into dest.

//Rest parameters ...
//A function can be called with any number of arguments, no matter how it is defined.

/*
function sum(a, b) {
  return a + b;
}
alert( sum(1, 2, 3, 4, 5) );

There will be no error because of “excessive” arguments. But of course in the result only the 
first two will be counted, so the result in the code above is 3.
The rest of the parameters can be included in the function definition by using three dots ... 
followed by the name of the array that will contain them. The dots literally mean “gather the
 remaining parameters into an array”.
 */

 /*
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
*/

/*
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
*/

/*
The rest parameters must be at the end
The rest parameters gather all remaining arguments, so the following does not make sense 
and causes an error:

function f(arg1, ...rest, arg2) { // arg2 after ...rest ?!
  // error
}
The ...rest must always be last.
*/

/*
The “arguments” variable
There is also a special array-like object named arguments that contains all arguments by their 
index.

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


*/

/*
In old times, rest parameters did not exist in the language, and using arguments was the only way
 to get all arguments of the function. And it still works, we can find it in the old code.
But the downside is that although arguments is both array-like and iterable, it’s not an array. 
It does not support array methods, so we can’t call arguments.map(...) for example.
Also, it always contains all arguments. We can’t capture them partially, like we did with rest
 parameters.
So when we need these features, then rest parameters are preferred.
Eskiden, rest parametreleri dilde yoktu ve argümanları kullanmak, fonksiyonun tüm argümanlarını 
almanın tek yoluydu. Ve hala işe yarıyor, bunu eski kodda bulabiliriz.
Ancak dezavantajı, arguments hem dizi benzeri hem de yinelebilir olmasına rağmen, bir dizi 
olmamasıdır. Dizi yöntemlerini desteklemez, bu nedenle örneğin arguments.map(...) çağıramayız.
Ayrıca, her zaman tüm argümanları içerir. Rest parametrelerinde yaptığımız gibi bunları kısmen
 yakalayamayız.
Bu nedenle, bu özelliklere ihtiyaç duyduğumuzda, rest parametreleri tercih edilir.
*/

/*
Arrow functions do not have "arguments"
If we access the arguments object from an arrow function, it takes them from the outer 
“normal” function.

Here’s an example:

 function f() {
  let showArg = () => alert(arguments[0]);
  showArg();
}

f(1); // 1
As we remember, arrow functions don’t have their own this. Now we know they don’t have the 
special arguments object either.
*/

//Spread syntax
/*
there’s a built-in function Math.max that returns the greatest number from a list:

 alert( Math.max(3, 5, 1) ); // 5
Now let’s say we have an array [3, 5, 1]. How do we call Math.max with it?

Passing it “as is” won’t work, because Math.max expects a list of numeric arguments, not 
a single array:

 let arr = [3, 5, 1];

alert( Math.max(arr) ); // NaN
And surely we can’t manually list items in the code Math.max(arr[0], arr[1], arr[2]), because
 we may be unsure how many there are. As our script executes, there could be a lot, or there 
 could be none. And that would get ugly.

*/

//Spread syntax to the rescue! It looks similar to rest parameters, also using ..., but does
//  quite the opposite.
//When ...arr is used in the function call, it “expands” an iterable object arr into the list
//  of arguments.

/*
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

*/

/*
In the examples above we used an array to demonstrate the spread syntax, but any iterable will do.
For instance, here we use the spread syntax to turn the string into array of characters:

 let str = "Hello";

alert( [...str] ); // H,e,l,l,o
The spread syntax internally uses iterators to gather elements, the same way as for..of does.

So, for a string, for..of returns characters and ...str becomes "H","e","l","l","o". The list
 of characters is passed to array initializer [...str].

For this particular task we could also use Array.from, because it converts an iterable 
(like a string) into an array:

 let str = "Hello";

// Array.from converts an iterable into an array
alert( Array.from(str) ); // H,e,l,l,o
The result is the same as [...str].

But there’s a subtle difference between Array.from(obj) and [...obj]:

Array.from operates on both array-likes and iterables.
The spread syntax works only with iterables.
So, for the task of turning something into an array, Array.from tends to be more universal.
*/

//Copy an array/object
/*
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
*/

/*
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
This way of copying an object is much shorter than let objCopy = Object.assign({}, obj) or for an array let arrCopy = Object.assign([], arr) so we prefer to use it whenever we can.

*/


/*
When we see "..." in the code, it is either rest parameters or the spread syntax.
Kodda "..." gördüğümüzde, bu ya rest parametreleridir ya da spread sözdizimidir.

There’s an easy way to distinguish between them:

When ... is at the end of function parameters, it’s “rest parameters” and gathers the rest of 
the list of arguments into an array.
... fonksiyon parametrelerinin sonunda olduğunda, bu "kalan parametreler"dir ve argüman listesinin
 geri kalanını bir dizide toplar.

When ... occurs in a function call or alike, it’s called a “spread syntax” and expands an array
 into a list.
Use patterns:
... bir fonksiyon çağrısında veya benzerinde geçtiğinde buna "yayılma sözdizimi" denir ve bir 
diziyi bir listeye genişletir.

Rest parameters are used to create functions that accept any number of arguments.
Kalan parametreler, herhangi sayıda argümanı kabul eden fonksiyonlar oluşturmak için kullanılır.

The spread syntax is used to pass an array to functions that normally require a list of many
 arguments.
Yayılma sözdizimi, normalde çok sayıda argümana ihtiyaç duyan fonksiyonlara bir dizi geçirmek
 için kullanılır.

Together they help to travel between a list and an array of parameters with ease.

All arguments of a function call are also available in “old-style” arguments: array-like
 iterable object.

*/





//nested clone

/*
Until now we assumed that all properties of user are primitive. But properties can be references
 to other objects.
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

alert( user.sizes.height ); // 182
*/

/*
Now it’s not enough to copy clone.sizes = user.sizes, because user.sizes is an object, and will 
be copied by reference, so clone and user will share the same sizes:
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

let clone = Object.assign({}, user);

alert( user.sizes === clone.sizes ); // true, same object

// user and clone share sizes
user.sizes.width = 60;    // change a property from one place
alert(clone.sizes.width); // 60, get the result from the other one
To fix that and make user and clone truly separate objects, we should use a cloning loop that 
examines each value of user[key] and, if it’s an object, then replicate its structure as well. 
That is called a “deep cloning” or “structured cloning”. There’s structuredClone method that 
implements deep cloning.
*/

//structuredClone

//The call structuredClone(object) clones the object with all nested properties
//structuredClone(object) çağrısı nesneyi tüm iç içe geçmiş özellikleriyle klonlar.

/*
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

let clone = structuredClone(user);

alert( user.sizes === clone.sizes ); // false, different objects

// user and clone are totally unrelated now
user.sizes.width = 60;    // change a property from one place
alert(clone.sizes.width); // 50, not related
The structuredClone method can clone most data types, such as objects, arrays, primitive values.

It also supports circular references, when an object property references the object itself 
(directly or via a chain or references).

For instance:

 let user = {};
// let's create a circular reference:
// user.me references the user itself
user.me = user;

let clone = structuredClone(user);
alert(clone.me === clone); // true
As you can see, clone.me references the clone, not the user! So the circular reference was 
cloned correctly as well.

Although, there are cases when structuredClone fails.

For instance, when an object has a function property:

 // error
structuredClone({
  f: function() {}
});
Function properties aren’t supported.

To handle such complex cases we may need to use a combination of cloning methods, write custom 
code or, to not reinvent the wheel, take an existing implementation, for instance _.cloneDeep(obj)
 from the JavaScript library lodash.
*/

/*
Objects are assigned and copied by reference. In other words, a variable stores not the 
“object value”, but a “reference” (address in memory) for the value. So copying such 
a variable or passing it as a function argument copies that reference, not the object itself.
Nesneler referansla atanır ve kopyalanır. Başka bir deyişle, bir değişken "nesne değerini" 
değil, değer için bir "referansı" (bellekteki adresi) depolar. Bu nedenle böyle bir değişkeni 
kopyalamak veya bir fonksiyon argümanı olarak geçirmek, nesnenin kendisini değil, o referansı 
kopyalar.

All operations via copied references (like adding/removing properties) are performed on the same
 single object.
Kopyalanan referanslar üzerinden yapılan tüm işlemler (özellik ekleme/çıkarma gibi) aynı tek 
nesne üzerinde gerçekleştirilir.

To make a “real copy” (a clone) we can use Object.assign for the so-called “shallow copy”
 (nested objects are copied by reference) or a “deep cloning” function structuredClone or
  use a custom cloning implementation, such as _.cloneDeep(obj).
"Gerçek bir kopya" (bir klon) oluşturmak için, sözde "sığ kopya" (iç içe geçmiş nesneler 
referansla kopyalanır) için Object.assign'ı veya yapılandırılmış bir "derin klonlama" işlevi 
olan Clone'u kullanabilir veya _.cloneDeep(obj) gibi özel bir klonlama uygulamasını kullanabiliriz.
*/

//Garbage collection
