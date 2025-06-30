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

