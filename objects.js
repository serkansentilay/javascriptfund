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
//Memory management in JavaScript is performed automatically and invisibly to us. We create 
// primitives, objects, functions… All that takes memory.

//Simply put, “reachable” values are those that are accessible or usable somehow. They are
//  guaranteed to be stored in memory.
//Basitçe ifade etmek gerekirse, "ulaşılabilir" değerler bir şekilde erişilebilir veya 
// kullanılabilir olan değerlerdir. Bellekte saklanmaları garanti edilir.

//There’s a base set of inherently reachable values, that cannot be deleted for obvious reasons.
//Açık nedenlerden dolayı silinemeyen, doğası gereği erişilebilir değerlerin bir temel kümesi vardır.

/*
The currently executing function, its local variables and parameters.
Other functions on the current chain of nested calls, their local variables and parameters.
Global variables.
(there are some other, internal ones as well)
These values are called roots.
*/

//Any other value is considered reachable if it’s reachable from a root by a reference or by
//  a chain of references.
//Başka herhangi bir değer, bir referans veya bir referans zinciri aracılığıyla bir kökten 
// erişilebilirse erişilebilir olarak kabul edilir.

//For instance, if there’s an object in a global variable, and that object has a property 
// referencing another object, that object is considered reachable. And those that it 
// references are also reachable.
//Örneğin, genel bir değişkende bir nesne varsa ve bu nesnenin başka bir nesneye başvuran bir
//  özelliği varsa, bu nesne erişilebilir olarak kabul edilir. Ve başvurduğu nesneler de
//  erişilebilirdir.

//There’s a background process in the JavaScript engine that is called garbage collector. It 
// monitors all objects and removes those that have become unreachable.
//JavaScript motorunda çöp toplayıcı adı verilen bir arka plan işlemi vardır. Tüm nesneleri izler
//  ve ulaşılamaz hale gelenleri kaldırır.

// user has a reference to the object
//let user = {
//  name: "John"
//};
//If the value of user is overwritten, the reference is lost:
//user = null;
//Now John becomes unreachable. There’s no way to access it, no references to it. Garbage 
// collector will junk the data and free the memory.


//Two references
//Now let’s imagine we copied the reference from user to admin:

// user has a reference to the object
//let user = {
//  name: "John"
//};
//let admin = user;

//Now if we do the same:

//user = null;
//…Then the object is still reachable via admin global variable, so it must stay in memory.
//  If we overwrite admin too, then it can be removed.

//Interlinked objects
/*
function marry(man, woman) {
  woman.husband = man;
  man.wife = woman;

  return {
    father: man,
    mother: woman
  }
}

let family = marry({
  name: "John"
}, {
  name: "Ann"
});
Function marry “marries” two objects by giving them references to each other and returns a new
 object that contains them both.
*/

/*
As of now, all objects are reachable.

Now let’s remove two references:

delete family.father;
delete family.mother.husband;

*/

//It’s not enough to delete only one of these two references, because all objects would 
// still be reachable.
//Bu iki referanstan yalnızca birini silmek yeterli değildir, çünkü tüm nesnelere hala 
// ulaşılabilir olacaktır.
//But if we delete both, then we can see that John has no incoming reference any more:
//Ancak ikisini de silersek, John'un artık gelen bir referansı olmadığını görebiliriz:

//Outgoing references do not matter. Only incoming ones can make an object reachable. So, 
// John is now unreachable and will be removed from the memory with all its data that also 
// became unaccessible.
//Giden referansların önemi yoktur. Sadece gelen referanslar bir nesneyi ulaşılabilir kılabilir. 
// Yani, John artık ulaşılamazdır ve erişilemez hale gelen tüm verileriyle birlikte 
// hafızadan kaldırılacaktır.

//Unreachable island
//It is possible that the whole island of interlinked objects becomes unreachable and is 
// removed from the memory.
//The source object is the same as above. Then:
//family = null;
//This example demonstrates how important the concept of reachability is.
//It’s obvious that John and Ann are still linked, both have incoming references. But that’s 
// not enough.
//The former "family" object has been unlinked from the root, there’s no reference to it any more,
//  so the whole island becomes unreachable and will be removed.
//onlara gelen family referansi silindigi icin memoryden father ve mother silinecek


/*
Internal algorithms
The basic garbage collection algorithm is called “mark-and-sweep”.
The following “garbage collection” steps are regularly performed:
The garbage collector takes roots and “marks” (remembers) them.
Then it visits and “marks” all references from them.
Then it visits marked objects and marks their references. All visited objects are remembered,
so as not to visit the same object twice in the future.
…And so on until every reachable (from the roots) references are visited.
All objects except marked ones are removed.

Now the objects that could not be visited in the process are considered unreachable and will 
be removed:
//Artık ziyaret edilemeyen nesneler ulaşılamaz olarak kabul edilecek ve kaldırılacak: 
*/

/*
Garbage collection is performed automatically. We cannot force or prevent it.
Objects are retained in memory while they are reachable.
Being referenced is not the same as being reachable (from a root): a pack of interlinked objects 
can become unreachable as a whole, as we’ve seen in the example above.
*/

//Object methods, "this"

//temel yazim sekli
/*
let user = {
  name: "John",
  age: 30
};

user.sayHi = function() {
  alert("Hello!");
};

user.sayHi(); // Hello!
*/

//pre-declared
/*
let user = {
  // ...
};

// first, declare
function sayHi() {
  alert("Hello!");
}

// then add as a method
user.sayHi = sayHi;

user.sayHi(); // Hello!
*/

//kisa yazimi tercih edilir
/*
// these objects do the same

user = {
  sayHi: function() {
    alert("Hello");
  }
};

// method shorthand looks better, right?
user = {
  sayHi() { // same as "sayHi: function(){...}"
    alert("Hello");
  }
};
*/

/*
“this” in methods
It’s common that an object method needs to access the information stored in the object to do 
its job.
For instance, the code inside user.sayHi() may need the name of the user.
To access the object, a method can use the this keyword.
The value of this is the object “before dot”, the one used to call the method.
Bir nesne yönteminin işini yapmak için nesnede depolanan bilgilere erişmesi yaygın bir durumdur.
Örneğin, user.sayHi() içindeki kod kullanıcının adına ihtiyaç duyabilir.
Nesneye erişmek için bir yöntem this anahtar sözcüğünü kullanabilir.
this'nin değeri, yöntemi çağırmak için kullanılan nesne olan "before dot" nesnesidir.
*/

/*
let user = {
  name: "John",
  age: 30,

  sayHi() {
    // "this" is the "current object"
    alert(this.name);
  }

};

user.sayHi(); // John
*/

//Here during the execution of user.sayHi(), the value of this will be user.
//Technically, it’s also possible to access the object without this, by referencing it via
//  the outer variable:

/*
let user = {
  name: "John",
  age: 30,

  sayHi() {
    alert(user.name); // "user" instead of "this"
  }

};
*/
//But such code is unreliable. If we decide to copy user to another variable, e.g. admin = user 
// and overwrite user with something else, then it will access the wrong object.
/*
let user = {
  name: "John",
  age: 30,

  sayHi() {
    alert( user.name ); // leads to an error
  }

};
let admin = user;
user = null; // overwrite to make things obvious

admin.sayHi(); // TypeError: Cannot read property 'name' of null
If we used this.name instead of user.name inside the alert, then the code would work.
*/

/*
“this” is not bound

In JavaScript, keyword this behaves unlike most other programming languages. It can be used in any function, even if it’s not a method of an object.

There’s no syntax error in the following example:

function sayHi() {
  alert( this.name );
}
The value of this is evaluated during the run-time, depending on the context.


*/


/*
here the same function is assigned to two different objects and has different “this” in the calls:
let user = { name: "John" };
let admin = { name: "Admin" };

function sayHi() {
  alert( this.name );
}

// use the same function in two objects
user.f = sayHi;
admin.f = sayHi;

// these calls have different this
// "this" inside the function is the object "before the dot"
user.f(); // John  (this == user)
admin.f(); // Admin  (this == admin)

admin['f'](); // Admin (dot or square brackets access the method – doesn't matter)
The rule is simple: if obj.f() is called, then this is obj during the call of f. So it’s either 
user or admin in the example above.
*/

/*
Calling without an object: this == undefined
We can even call the function without an object at all:

In this case this is undefined in strict mode. If we try to access this.name, there will be
 an error.
In non-strict mode the value of this in such case will be the global object (window in a browser,
 we’ll get to it later in the chapter Global object). This is a historical behavior that 
 "use strict" fixes.
Usually such call is a programming error. If there’s this inside a function, it expects to be 
called in an object context.
Bu durumda bu, sıkı modda tanımsızdır. this.name'e erişmeye çalışırsak bir hata olur.
Sıkı olmayan modda, bu durumda this'nin değeri genel nesne olacaktır (bir tarayıcıdaki pencere,
 buna daha sonra Küresel nesne bölümünde değineceğiz). Bu, "sıkı" düzeltmeleri kullanan tarihi 
 bir davranıştır.
Genellikle bu çağrı bir programlama hatasıdır. Bir fonksiyonun içinde this varsa, bir nesne
 bağlamında çağrılmasını bekler.
*/

/*
The consequences of unbound this
If you come from another programming language, then you are probably used to the idea of
 a “bound this”, where methods defined in an object always have this referencing that object.

In JavaScript this is “free”, its value is evaluated at call-time and does not depend on where 
the method was declared, but rather on what object is “before the dot”.

The concept of run-time evaluated this has both pluses and minuses. On the one hand, a function
 can be reused for different objects. On the other hand, the greater flexibility creates more possibilities for mistakes.

*/

//global objects
//The global object provides variables and functions that are available anywhere. By default,
//  those that are built into the language or the environment.
//Küresel nesne, her yerde kullanılabilen değişkenler ve işlevler sağlar. Varsayılan olarak,
//  dile veya ortama yerleşik olanlar.

//All properties of the global object can be accessed directly:
//alert("Hello");
// is the same as
//window.alert("Hello");


//In a browser, global functions and variables declared with var (not let/const!) become the 
// property of the global object:
//var gVar = 5;
//alert(window.gVar); // 5 (became a property of the global object)

/*
Function declarations have the same effect (statements with function keyword in the main code 
flow, not function expressions).
Please don’t rely on that! This behavior exists for compatibility reasons. Modern scripts use 
JavaScript modules where such a thing doesn’t happen.
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
*/

/*
That said, using global variables is generally discouraged. There should be as few global 
variables as possible. The code design where a function gets “input” variables and produces 
certain “outcome” is clearer, less prone to errors and easier to test than if it uses outer or
 global variables.
Bununla birlikte, genel değişkenlerin kullanılması genellikle önerilmez. Mümkün olduğunca az 
genel değişken olmalıdır. Bir fonksiyonun "giriş" değişkenleri aldığı ve belirli "sonuç" ürettiği 
kod tasarımı, dış veya genel değişkenler kullandığından daha net, hataya daha az eğilimli ve test
 edilmesi daha kolaydır.
*/

/*
Using for polyfills

We use the global object to test for support of modern language features.

For instance, test if a built-in Promise object exists (it doesn’t in really old browsers):

 if (!window.Promise) {
  alert("Your browser is really old!");
}
If there’s none (say, we’re in an old browser), we can create “polyfills”: add functions that are
 not supported by the environment, but exist in the modern standard.

 if (!window.Promise) {
  window.Promise = ... // custom implementation of the modern language feature
}
*/

/*
The global object holds variables that should be available everywhere.
That includes JavaScript built-ins, such as Array and environment-specific values, such as 
window.innerHeight – the window height in the browser.
The global object has a universal name globalThis.
…But more often is referred by “old-school” environment-specific names, such as window (browser)
 and global (Node.js).
We should store values in the global object only if they’re truly global for our project. And
 keep their number at minimum.
In-browser, unless we’re using modules, global functions and variables declared with var become 
a property of the global object.
To make our code future-proof and easier to understand, we should access properties of the global
 object directly, as window.x

 Küresel nesne, her yerde bulunması gereken değişkenleri tutar.
Bunlara Array ve window.innerHeight gibi ortam-özel değerler gibi JavaScript yerleşikleri 
dahildir – tarayıcıdaki pencere yüksekliği.
Küresel nesnenin evrensel bir adı vardır globalThis.
…Ancak daha sık olarak window (tarayıcı) ve global (Node.js) gibi "eski usul" ortam-özel 
adlarla anılır.
Değerleri yalnızca projemiz için gerçekten global iseler küresel nesnede saklamalıyız. Ve 
sayılarını minimumda tutmalıyız.
Tarayıcıda, modüller kullanmıyorsak, var ile bildirilen küresel işlevler ve değişkenler küresel
 nesnenin bir özelliği haline gelir.
Kodumuzu geleceğe hazır ve anlaşılması daha kolay hale getirmek için küresel nesnenin
 özelliklerine doğrudan, window.x olarak erişmeliyiz
*/


/*
Arrow functions have no “this”

Arrow functions are special: they don’t have their “own” this. If we reference this from such a function, it’s taken from the outer “normal” function.

For instance, here arrow() uses this from the outer user.sayHi() method:

 let user = {
  firstName: "Ilya",
  sayHi() {
    let arrow = () => alert(this.firstName);
    arrow();
  }
};

user.sayHi(); // Ilya
*/

/*
Functions that are stored in object properties are called “methods”.
Methods allow objects to “act” like object.doSomething().
Methods can reference the object as this.
The value of this is defined at run-time.

When a function is declared, it may use this, but that this has no value until the function is 
called.
A function can be copied between objects.
When a function is called in the “method” syntax: object.method(), the value of this during the 
call is object.
Please note that arrow functions are special: they have no this. When this is accessed inside 
an arrow function, it is taken from outside.
Nesne özelliklerinde saklanan işlevlere "yöntemler" denir.
Yöntemler nesnelerin object.doSomething() gibi "davranmasını" sağlar.
Yöntemler nesneye this olarak başvurabilir.
This'in değeri çalışma zamanında tanımlanır.

Bir işlev bildirildiğinde this'i kullanabilir, ancak this'in işlev çağrılana kadar bir değeri
 yoktur.
Bir işlev nesneler arasında kopyalanabilir.
Bir işlev "method" sözdiziminde çağrıldığında: object.method(), çağrı sırasında this'in değeri
 object'tir.
Lütfen ok işlevlerinin özel olduğunu unutmayın: this'leri yoktur. this bir ok işlevi içinde 
erişildiğinde, dışarıdan alınır.
*/

/*
function makeUser() {
  return {
    name: "John",
    ref: this
  };
}

let user = makeUser();

alert( user.ref.name ); // What's the result?
 Error: Cannot read property 'name' of undefined

That’s because rules that set this do not look at object definition. Only the moment of call
 matters.
Here the value of this inside makeUser() is undefined, because it is called as a function, 
not as a method with “dot” syntax.
The value of this is one for the whole function, code blocks and object literals do not affect it.
So ref: this actually takes current this of the function.
We can rewrite the function and return the same this with undefined value:


function makeUser(){
  return this; // this time there's no object literal
}

alert( makeUser().name ); // Error: Cannot read property 'name' of undefined
As you can see the result of alert( makeUser().name ) is the same as the result of 
alert( user.ref.name ) from the previous example.



function makeUser() {
  return {
    name: "John",
    ref() {
      return this;
    }
  };
}

let user = makeUser();

alert( user.ref().name ); // John
Now it works, because user.ref() is a method. And the value of this is set to the object before dot ..
*/

/*
let calculator = {
  sum() {
    return this.a + this.b;
  },

  mul() {
    return this.a * this.b;
  },

  read() {
    this.a = +prompt('a?', 0);
    this.b = +prompt('b?', 0);
  }
};

calculator.read();
alert( calculator.sum() );
alert( calculator.mul() );
*/

/*
eturn the object itself from every call.

 let ladder = {
  step: 0,
  up() {
    this.step++;
    return this;
  },
  down() {
    this.step--;
    return this;
  },
  showStep() {
    alert( this.step );
    return this;
  }
};

ladder.up().up().down().showStep().down().showStep(); // shows 1 then 0
*/

//Constructor, operator "new"
//The regular {...} syntax allows us to create one object. But often we need to create many
//  similar objects, like multiple users or menu items and so on.
//That can be done using constructor functions and the "new" operator.

//They are named with capital letter first.
//They should be executed only with "new" operator.

/*
function User(name) {
  this.name = name;
  this.isAdmin = false;
}

let user = new User("Jack");

alert(user.name); // Jack
alert(user.isAdmin); // false
*/

/*
When a function is executed with new, it does the following steps:

A new empty object is created and assigned to this.
The function body executes. Usually it modifies this, adds new properties to it.
The value of this is returned.
*/

/*
In other words, new User(...) does something like:

function User(name) {
  // this = {};  (implicitly)

  // add properties to this
  this.name = name;
  this.isAdmin = false;

  // return this;  (implicitly)
}
So let user = new User("Jack") gives the same result as:
let user = {
  name: "Jack",
  isAdmin: false
};
Now if we want to create other users, we can call new User("Ann"), new User("Alice") and so on. 
Much shorter than using literals every time, and also easy to read.

That’s the main purpose of constructors – to implement reusable object creation code.

Let’s note once again – technically, any function (except arrow functions, as they don’t have 
this) can be used as a constructor. It can be run with new, and it will execute the algorithm
 above. The “capital letter first” is a common agreement, to make it clear that a function is 
 to be run with new.
*/


/*
// create a function and immediately call it with new
let user = new function() {
  this.name = "John";
  this.isAdmin = false;

  // ...other code for user creation
  // maybe complex logic and statements
  // local variables etc
};
This constructor can’t be called again, because it is not saved anywhere, just created and 
called. So this trick aims to encapsulate the code that constructs the single object, without 
future reuse.

*/

//new target
/*
Inside a function, we can check whether it was called with new or without it, using a special new.target property.

It is undefined for regular calls and equals the function if called with new:

 function User() {
  alert(new.target);
}

// without "new":
User(); // undefined

// with "new":
new User(); // function User { ... }
*/

/*
That can be used inside the function to know whether it was called with new, 
“in constructor mode”, or without it, “in regular mode”.

We can also make both new and regular calls to do the same, like this:

 function User(name) {
  if (!new.target) { // if you run me without new
    return new User(name); // ...I will add new for you
  }

  this.name = name;
}

let john = User("John"); // redirects call to new User
alert(john.name); // John
This approach is sometimes used in libraries to make the syntax more flexible. So that people 
may call the function with or without new, and it still works.

Probably not a good thing to use everywhere though, because omitting new makes it a bit less
 obvious what’s going on. With new we all know that the new object is being created.

*/

/*
Return from constructors

Usually, constructors do not have a return statement. Their task is to write all necessary stuff into this, and it automatically becomes the result.

But if there is a return statement, then the rule is simple:

If return is called with an object, then the object is returned instead of this.
If return is called with a primitive, it’s ignored.
In other words, return with an object returns that object, in all other cases this is returned.

For instance, here return overrides this by returning an object:
function BigUser() {

  this.name = "John";

  return { name: "Godzilla" };  // <-- returns this object
}

alert( new BigUser().name );  // Godzilla, got that object
And here’s an example with an empty return (or we could place a primitive after it,
 doesn’t matter):

 function SmallUser() {

  this.name = "John";

  return; // <-- returns this
}

alert( new SmallUser().name );  // John
Usually constructors don’t have a return statement. Here we mention the special behavior
 with returning objects mainly for the sake of completeness.


*/

/*
Omitting parentheses
By the way, we can omit parentheses after new:

let user = new User; // <-- no parentheses
// same as
let user = new User();
Omitting parentheses here is not considered a “good style”, but the syntax is permitted by 
specification.

*/


/*
Methods in constructor

Using constructor functions to create objects gives a great deal of flexibility. The constructor
 function may have parameters that define how to construct the object, and what to put in it.
Of course, we can add to this not only properties, but methods as well.
Nesneleri oluşturmak için oluşturucu işlevlerini kullanmak büyük bir esneklik sağlar. Oluşturucu 
işlevi, nesnenin nasıl oluşturulacağını ve içine ne konulacağını tanımlayan parametrelere sahip 
olabilir.
Elbette, buna yalnızca özellikler değil, yöntemler de ekleyebiliriz.


For instance, new User(name) below creates an object with the given name and the method sayHi:

 function User(name) {
  this.name = name;

  this.sayHi = function() {
    alert( "My name is: " + this.name );
  };
}

let john = new User("John");

john.sayHi(); // My name is: John


//john = {
//   name: "John",
/   sayHi: function() { ... }
//}
*/

/*
Constructor functions or, briefly, constructors, are regular functions, but there’s a common
 agreement to name them with capital letter first.
Constructor functions should only be called using new. Such a call implies a creation of empty 
this at the start and returning the populated one at the end.
We can use constructor functions to make multiple similar objects.
Yapıcı işlevler veya kısaca oluşturucular, düzenli işlevlerdir, ancak bunları önce büyük harfle
 adlandırmak konusunda ortak bir fikir birliği vardır.
Oluşturucu işlevler yalnızca new kullanılarak çağrılmalıdır. Böyle bir çağrı, başlangıçta boş 
this oluşturulmasını ve sonunda doldurulmuş olanın döndürülmesini gerektirir.
Oluşturucu işlevlerini kullanarak birden fazla benzer nesne oluşturabiliriz.

*/


/*
let obj = {};

function A() { return obj; }
function B() { return obj; }

alert( new A() == new B() ); // true


*/


/*
function Calculator() {

  this.read = function() {
    this.a = +prompt('a?', 0);
    this.b = +prompt('b?', 0);
  };

  this.sum = function() {
    return this.a + this.b;
  };

  this.mul = function() {
    return this.a * this.b;
  };
}

let calculator = new Calculator();
calculator.read();

alert( "Sum=" + calculator.sum() );
alert( "Mul=" + calculator.mul() );

*/

/*
function Accumulator(startingValue) {
  this.value = startingValue;

  this.read = function() {
    this.value += +prompt('How much to add?', 0);
  };

}

let accumulator = new Accumulator(1);
accumulator.read();
accumulator.read();
alert(accumulator.value);
*/


//Optional chaining '?.'

//The optional chaining ?. is a safe way to access nested object properties, even if an 
// intermediate property doesn’t exist.

//let user = {}; // a user without "address" property
//alert(user.address.street); // Error!

// In Web development, we can get an object that corresponds to a web page element using a 
// special method call, such as document.querySelector('.elem'), and it returns null when 
// there’s no such element.


// document.querySelector('.elem') is null if there's no element
//let html = document.querySelector('.elem').innerHTML; // error if it's null

//let html = document.querySelector('.elem') ? document.querySelector('.elem').innerHTML : null;
//We can see that the element search document.querySelector('.elem') is actually called twice
//  here. Not good.

/*
The optional chaining ?. stops the evaluation if the value before ?. is undefined or null and returns undefined.

Further in this article, for brevity, we’ll be saying that something “exists” if it’s not null and not undefined.

In other words, value?.prop:

works as value.prop, if value exists,
otherwise (when value is undefined/null) it returns undefined.
*/

//let user = {}; // user has no address
//alert( user?.address?.street ); // undefined (no error)

//let html = document.querySelector('.elem')?.innerHTML; // will be undefined, if there's 
// no element

/*
Reading the address with user?.address works even if user object doesn’t exist:

 let user = null;

alert( user?.address ); // undefined
alert( user?.address.street ); // undefined
*/

/*
Please note: the ?. syntax makes optional the value before it, but not any further.
E.g. in user?.address.street.name the ?. allows user to safely be null/undefined 
(and returns undefined in that case), but that’s only for user. Further properties are 
accessed in a regular way. If we want some of them to be optional, then we’ll need to 
replace more . with ?..
*/

/*
Don’t overuse the optional chaining
We should use ?. only where it’s ok that something doesn’t exist.

For example, if according to our code logic user object must exist, but address is optional,
 then we should write user.address?.street, but not user?.address?.street.

Then, if user happens to be undefined, we’ll see a programming error about it and fix it.
 Otherwise, if we overuse ?., coding errors can be silenced where not appropriate, and become more difficult to debug.
*/

//The variable before ?. must be declared
//If there’s no variable user at all, then user?.anything triggers an error:

 // ReferenceError: user is not defined
//user?.address;
//The variable must be declared (e.g. let/const/var user or as a function parameter). 
// The optional chaining works only for declared variables.

/*
Short-circuiting
As it was said before, the ?. immediately stops (“short-circuits”) the evaluation
 if the left part doesn’t exist.
So, if there are any further function calls or operations to the right of ?., they won’t be made.


let user = null;
let x = 0;

user?.sayHi(x++); // no "user", so the execution doesn't reach sayHi call and x++

alert(x); // 0, value not incremented
*/

/*
The optional chaining ?. is not an operator, but a special syntax construct, that also works 
with functions and square brackets.

For example, ?.() is used to call a function that may not exist.

In the code below, some of our users have admin method, and some don’t:

 let userAdmin = {
  admin() {
    alert("I am admin");
  }
};

let userGuest = {};

userAdmin.admin?.(); // I am admin

userGuest.admin?.(); // nothing happens (no such method)
Here, in both lines we first use the dot (userAdmin.admin) to get admin property, because we
assume that the user object exists, so it’s safe read from it.

Then ?.() checks the left part: if the admin function exists, then it runs (that’s so for 
userAdmin). Otherwise (for userGuest) the evaluation stops without errors.

The ?.[] syntax also works, if we’d like to use brackets [] to access properties instead 
of dot .. Similar to previous cases, it allows to safely read a property from an object 
that may not exist.


*/

/*
let key = "firstName";

let user1 = {
  firstName: "John"
};

let user2 = null;

alert( user1?.[key] ); // John
alert( user2?.[key] ); // undefined
Also we can use ?. with delete:

 delete user?.name; // delete user.name if user exists
 */

 /*
 We can use ?. for safe reading and deleting, but not writing
The optional chaining ?. has no use on the left side of an assignment.

For example:

 let user = null;

user?.name = "John"; // Error, doesn't work
// because it evaluates to: undefined = "John"\
*/

/*
The optional chaining ?. syntax has three forms:

obj?.prop – returns obj.prop if obj exists, otherwise undefined.
obj?.[prop] – returns obj[prop] if obj exists, otherwise undefined.
obj.method?.() – calls obj.method() if obj.method exists, otherwise returns undefined.
As we can see, all of them are straightforward and simple to use. The ?. checks the left 
part for null/undefined and allows the evaluation to proceed if it’s not so.

A chain of ?. allows to safely access nested properties.

Still, we should apply ?. carefully, only where it’s acceptable, according to our code logic,
that the left part doesn’t exist. So that it won’t hide programming errors from us, if they occur.
*/



//Symbol type

//Upon creation, we can give symbols a description (also called a symbol name), mostly useful
//  for debugging purposes:

// id is a symbol with the description "id"
//let id = Symbol("id");

/*
Symbols are guaranteed to be unique. Even if we create many symbols with exactly the same 
description, they are different values. The description is just a label that doesn’t affect 
anything.

For instance, here are two symbols with the same description – they are not equal:

 let id1 = Symbol("id");
let id2 = Symbol("id");

alert(id1 == id2); // false
*/

/*
Symbols don’t auto-convert to a string
Most values in JavaScript support implicit conversion to a string. For instance, we can alert almost any value, and it will work. Symbols are special. They don’t auto-convert.

For instance, this alert will show an error:

 let id = Symbol("id");
alert(id); // TypeError: Cannot convert a Symbol value to a string

*/


/*
That’s a “language guard” against messing up, because strings and symbols are fundamentally different and should not accidentally convert one into another.

If we really want to show a symbol, we need to explicitly call .toString() on it, like here:

 let id = Symbol("id");
alert(id.toString()); // Symbol(id), now it works
Or get symbol.description property to show the description only:

 let id = Symbol("id");
alert(id.description); // id

*/

/*
“Hidden” properties

Symbols allow us to create “hidden” properties of an object, that no other part of code can accidentally access or overwrite.

For instance, if we’re working with user objects, that belong to a third-party code. We’d like to add identifiers to them.

Let’s use a symbol key for it:

let user = { // belongs to another code
  name: "John"
};

let id = Symbol("id");

user[id] = 1;

alert( user[id] ); // we can access the data using the symbol as the key
*/

/*
What’s the benefit of using Symbol("id") over a string "id"?

As user objects belong to another codebase, it’s unsafe to add fields to them, since we 
might affect pre-defined behavior in that other codebase. However, symbols cannot be accessed 
accidentally. The third-party code won’t be aware of newly defined symbols, so it’s safe to 
add symbols to the user objects.

Also, imagine that another script wants to have its own identifier inside user, for its own
 purposes.

Then that script can create its own Symbol("id"), like this:


let id = Symbol("id");

user[id] = "Their id value";
*/


/*
There will be no conflict between our and their identifiers, because symbols are always 
different, even if they have the same name.

…But if we used a string "id" instead of a symbol for the same purpose, then there would be
 a conflict:

let user = { name: "John" };

// Our script uses "id" property
user.id = "Our id value";

// ...Another script also wants "id" for its purposes...

user.id = "Their id value"
// Boom! overwritten by another script!
*/

/*
Symbols in an object literal

If we want to use a symbol in an object literal {...}, we need square brackets around it.

Like this:

let id = Symbol("id");

let user = {
  name: "John",
  [id]: 123 // not "id": 123
};
That’s because we need the value from the variable id as the key, not the string “id”.
*/

/*
Symbols are skipped by for…in

Symbolic properties do not participate in for..in loop.

For instance:

 let id = Symbol("id");
let user = {
  name: "John",
  age: 30,
  [id]: 123
};

for (let key in user) alert(key); // name, age (no symbols)

// the direct access by the symbol works
alert( "Direct: " + user[id] ); // Direct: 123
*/

/*
Object.keys(user) also ignores them. That’s a part of the general “hiding symbolic properties”
 principle. If another script or a library loops over our object, it won’t unexpectedly access 
 a symbolic property.

In contrast, Object.assign copies both string and symbol properties:

 let id = Symbol("id");
let user = {
  [id]: 123
};

let clone = Object.assign({}, user);

alert( clone[id] ); // 123
There’s no paradox here. That’s by design. The idea is that when we clone an object or merge 
objects, we usually want all properties to be copied (including symbols like id).
*/

/*
Global symbols
As we’ve seen, usually all symbols are different, even if they have the same name. But sometimes 
we want same-named symbols to be same entities. For instance, different parts of our application
 want to access symbol "id" meaning exactly the same property.

To achieve that, there exists a global symbol registry. We can create symbols in it and access 
them later, and it guarantees that repeated accesses by the same name return exactly the same 
symbol.

In order to read (create if absent) a symbol from the registry, use Symbol.for(key).

That call checks the global registry, and if there’s a symbol described as key, then returns it,
 otherwise creates a new symbol Symbol(key) and stores it in the registry by the given key.

// read from the global registry
let id = Symbol.for("id"); // if the symbol did not exist, it is created

// read it again (maybe from another part of the code)
let idAgain = Symbol.for("id");

// the same symbol
alert( id === idAgain ); // true
Symbols inside the registry are called global symbols. If we want an application-wide symbol,
 accessible everywhere in the code – that’s what they are for.

 */


 /*
We have seen that for global symbols, Symbol.for(key) returns a symbol by name. To do the 
opposite – return a name by global symbol – we can use: Symbol.keyFor(sym):

For instance:

 // get symbol by name
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// get name by symbol
alert( Symbol.keyFor(sym) ); // name
alert( Symbol.keyFor(sym2) ); // id
The Symbol.keyFor internally uses the global symbol registry to look up the key for the symbol.
 So it doesn’t work for non-global symbols. If the symbol is not global, it won’t be able to 
 find it and returns undefined.

That said, all symbols have the description property.

For instance:

 let globalSymbol = Symbol.for("name");
let localSymbol = Symbol("name");

alert( Symbol.keyFor(globalSymbol) ); // name, global symbol
alert( Symbol.keyFor(localSymbol) ); // undefined, not global

alert( localSymbol.description ); // name
 */


/*
System symbols

There exist many “system” symbols that JavaScript uses internally, and we can use them to 
fine-tune various aspects of our objects.

They are listed in the specification in the Well-known symbols table:

Symbol.hasInstance
Symbol.isConcatSpreadable
Symbol.iterator
Symbol.toPrimitive
…and so on.
For instance, Symbol.toPrimitive allows us to describe object to primitive conversion

*/

/*
Symbol is a primitive type for unique identifiers.

Symbols are created with Symbol() call with an optional description (name).

Symbols are always different values, even if they have the same name. If we want same-named 
symbols to be equal, then we should use the global registry: Symbol.for(key) returns 
(creates if needed) a global symbol with key as the name. Multiple calls of Symbol.for with
 the same key return exactly the same symbol.

Symbols have two main use cases:

“Hidden” object properties.

If we want to add a property into an object that “belongs” to another script or a library, we 
can create a symbol and use it as a property key. A symbolic property does not appear in for..in, 
so it won’t be accidentally processed together with other properties. Also it won’t be accessed 
directly, because another script does not have our symbol. So the property will be protected
 from accidental use or overwrite.

So we can “covertly” hide something into objects that we need, but others should not see, using
 symbolic properties.

There are many system symbols used by JavaScript which are accessible as Symbol.*. We can use 
them to alter some built-in behaviors. For instance, later in the tutorial we’ll use 
Symbol.iterator for iterables, Symbol.toPrimitive to setup object-to-primitive conversion and 
so on.

Technically, symbols are not 100% hidden. There is a built-in method 
Object.getOwnPropertySymbols(obj) that allows us to get all symbols. Also there is a 
method named Reflect.ownKeys(obj) that returns all keys of an object including symbolic ones. 
But most libraries, built-in functions and syntax constructs don’t use these methods.

Sembol, benzersiz tanımlayıcılar için ilkel bir türdür.

Semboller, isteğe bağlı bir açıklama (isim) ile Symbol() çağrısıyla oluşturulur.

Semboller, aynı ada sahip olsalar bile her zaman farklı değerlerdir. Aynı adlı sembollerin eşit
 olmasını istiyorsak, o zaman genel kayıt defterini kullanmalıyız: Symbol.for(key), adı anahtar 
 olan genel bir sembol döndürür (gerekirse oluşturur). Aynı anahtarla birden fazla Symbol.for 
 çağrısı tam olarak aynı sembolü döndürür.

Sembollerin iki ana kullanım durumu vardır:

“Gizli” nesne özellikleri.

Başka bir betiğe veya bir kütüphaneye “ait” bir nesneye bir özellik eklemek istiyorsak, bir 
sembol oluşturabilir ve bunu bir özellik anahtarı olarak kullanabiliriz. Sembolik bir özellik
 for..in'de görünmez, bu nedenle diğer özelliklerle birlikte yanlışlıkla işlenmez. Ayrıca, 
 başka bir betikte sembolümüz olmadığı için doğrudan erişilmez. Bu nedenle özellik, yanlışlıkla 
 kullanımdan veya üzerine yazmaktan korunacaktır.

Yani sembolik özellikler kullanarak, ihtiyacımız olan ancak başkalarının görmemesi gereken bir
 şeyi nesnelere "gizlice" gizleyebiliriz.

JavaScript tarafından kullanılan ve Symbol.* olarak erişilebilen birçok sistem sembolü vardır. 
Bunları bazı yerleşik davranışları değiştirmek için kullanabiliriz. Örneğin, eğitimin ilerleyen 
kısımlarında yineleyiciler için Symbol.iterator'ı, nesneden ilkel dönüşümünü ayarlamak için 
Symbol.toPrimitive'i vb. kullanacağız.

Teknik olarak, semboller %100 gizli değildir. Tüm sembolleri almamızı sağlayan yerleşik bir 
Object.getOwnPropertySymbols(obj) yöntemi vardır. Ayrıca, sembolik olanlar da dahil olmak üzere 
bir nesnenin tüm anahtarlarını döndüren Reflect.ownKeys(obj) adlı bir yöntem vardır. Ancak çoğu 
kütüphane, yerleşik işlev ve sözdizimi yapısı bu yöntemleri kullanmaz.
*/



//Object to primitive conversion

/*
"string"
For an object-to-string conversion, when we’re doing an operation on an object that expects a string, like alert:

// output
alert(obj);

// using object as a property key
anotherObj[obj] = 123;
"number"
For an object-to-number conversion, like when we’re doing maths:

// explicit conversion
let num = Number(obj);

// maths (except binary plus)
let n = +obj; // unary plus
let delta = date1 - date2;

// less/greater comparison
let greater = user1 > user2;
Most built-in mathematical functions also include such conversion.

"default"
Occurs in rare cases when the operator is “not sure” what type to expect.

For instance, binary plus + can work both with strings (concatenates them) and numbers 
(adds them). So if a binary plus gets an object as an argument, it uses the "default" hint 
to convert it.

Also, if an object is compared using == with a string, number or a symbol, it’s also unclear 
which conversion should be done, so the "default" hint is used.

// binary plus uses the "default" hint
let total = obj1 + obj2;

// obj == number uses the "default" hint
if (user == 1) { ... };
The greater and less comparison operators, such as < >, can work with both strings and numbers 
too. Still, they use the "number" hint, not "default". That’s for historical reasons.

In practice though, things are a bit simpler.

All built-in objects except for one case (Date object, we’ll learn it later) implement "default" 
conversion the same way as "number". And we probably should do the same.
*/

/*
To do the conversion, JavaScript tries to find and call three object methods:

Call obj[Symbol.toPrimitive](hint) – the method with the symbolic key Symbol.toPrimitive
 (system symbol), if such method exists,
Otherwise if hint is "string"
try calling obj.toString() or obj.valueOf(), whatever exists.
Otherwise if hint is "number" or "default"
try calling obj.valueOf() or obj.toString(), whatever exists.



*/

/*
There’s a built-in symbol named Symbol.toPrimitive that should be used to name the conversion method, like this:

obj[Symbol.toPrimitive] = function(hint) {
  // here goes the code to convert this object to a primitive
  // it must return a primitive value
  // hint = one of "string", "number", "default"
};

If the method Symbol.toPrimitive exists, it’s used for all hints, and no more methods are needed.

For instance, here user object implements it:

 let user = {
  name: "John",
  money: 1000,

  [Symbol.toPrimitive](hint) {
    alert(`hint: ${hint}`);
    return hint == "string" ? `{name: "${this.name}"}` : this.money;
  }
};

// conversions demo:
alert(user); // hint: string -> {name: "John"}
alert(+user); // hint: number -> 1000
alert(user + 500); // hint: default -> 1500
As we can see from the code, user becomes a self-descriptive string or a money amount,
 depending on the conversion. The single method user[Symbol.toPrimitive] handles all 
 conversion cases.
*/


//If there’s no Symbol.toPrimitive then JavaScript tries to find methods toString and valueOf:
//These methods must return a primitive value. If toString or valueOf returns an object, 
// then it’s ignored (same as if there were no method).

//The toString method returns a string "[object Object]".
//The valueOf method returns the object itself.
//let user = {name: "John"};
//alert(user); // [object Object]
//alert(user.valueOf() === user); // true

//So if we try to use an object as a string, like in an alert or so, then by default we see 
// [object Object].

/*
For instance, here user does the same as above using a combination of toString and valueOf instead of Symbol.toPrimitive:

 let user = {
  name: "John",
  money: 1000,

  // for hint="string"
  toString() {
    return `{name: "${this.name}"}`;
  },

  // for hint="number" or "default"
  valueOf() {
    return this.money;
  }

};

alert(user); // toString -> {name: "John"}
alert(+user); // valueOf -> 1000
alert(user + 500); // valueOf -> 1500
As we can see, the behavior is the same as the previous example with Symbol.toPrimitive.
*/

/*
Often we want a single “catch-all” place to handle all primitive conversions. In this case, 
we can implement toString only, like this:

 let user = {
  name: "John",

  toString() {
    return this.name;
  }
};

alert(user); // toString -> John
alert(user + 500); // toString -> John500
In the absence of Symbol.toPrimitive and valueOf, toString will handle all primitive conversions.


*/

/*
A conversion can return any primitive type

The important thing to know about all primitive-conversion methods is that they do not 
necessarily return the “hinted” primitive.

There is no control whether toString returns exactly a string, or whether Symbol.toPrimitive
 method returns a number for the hint "number".

The only mandatory thing: these methods must return a primitive, not an object.
*/

/*
Further conversions

As we know already, many operators and functions perform type conversions, 
e.g. multiplication * converts operands to numbers.

If we pass an object as an argument, then there are two stages of calculations:

The object is converted to a primitive (using the rules described above).
If necessary for further calculations, the resulting primitive is also converted.

*/

/*
let obj = {
  // toString handles all conversions in the absence of other methods
  toString() {
    return "2";
  }
};

alert(obj * 2); // 4, object converted to primitive "2", then multiplication made it a number
The multiplication obj * 2 first converts the object to primitive (that’s a string "2").
Then "2" * 2 becomes 2 * 2 (the string is converted to number).
Binary plus will concatenate strings in the same situation, as it gladly accepts a string:

 let obj = {
  toString() {
    return "2";
  }
};

alert(obj + 2); // "22" ("2" + 2), conversion to primitive returned a string => concatenation
*/


/*
The object-to-primitive conversion is called automatically by many built-in functions and
 operators that expect a primitive as a value.

There are 3 types (hints) of it:

"string" (for alert and other operations that need a string)
"number" (for maths)
"default" (few operators, usually objects implement it the same way as "number")
The specification describes explicitly which operator uses which hint.

The conversion algorithm is:

Call obj[Symbol.toPrimitive](hint) if the method exists,
Otherwise if hint is "string"
try calling obj.toString() or obj.valueOf(), whatever exists.
Otherwise if hint is "number" or "default"
try calling obj.valueOf() or obj.toString(), whatever exists.
All these methods must return a primitive to work (if defined).

In practice, it’s often enough to implement only obj.toString() as a “catch-all” method for 
string conversions that should return a “human-readable” representation of an object, for 
logging or debugging purposes.
*/

