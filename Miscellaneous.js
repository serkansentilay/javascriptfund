//Miscellaneous

//Proxy and Reflect


/*
A Proxy object wraps another object and intercepts operations, like reading/writing properties
 and others, optionally handling them on its own, or transparently allowing the object to handle them.
Proxy nesnesi, başka bir nesneyi sarar ve özellikleri okuma/yazma gibi işlemleri durdurur; isteğe 
bağlı olarak bunları kendi başına işleyebilir veya nesnenin bunları işlemesine şeffaf bir şekilde izin verebilir. 
*/

/*
Proxy
The syntax:

let proxy = new Proxy(target, handler)
target – is an object to wrap, can be anything, including functions.
handler – proxy configuration: an object with “traps”, methods that intercept operations.
 – e.g. get trap for reading a property of target, set trap for writing a property into 
 target, and so on.
For operations on proxy, if there’s a corresponding trap in handler, then it runs, and 
the proxy has a chance to handle it, otherwise the operation is performed on target.

As a starting example, let’s create a proxy without any traps:

 let target = {};
let proxy = new Proxy(target, {}); // empty handler

proxy.test = 5; // writing to proxy (1)
alert(target.test); // 5, the property appeared in target!

alert(proxy.test); // 5, we can read it from proxy too (2)

for(let key in proxy) alert(key); // test, iteration works (3)
As there are no traps, all operations on proxy are forwarded to target.

A writing operation proxy.test= sets the value on target.
A reading operation proxy.test returns the value from target.
Iteration over proxy returns values from target.
As we can see, without any traps, proxy is a transparent wrapper around target.

Proxy is a special “exotic object”. It doesn’t have own properties. With an empty handler 
it transparently forwards operations to target.

To activate more capabilities, let’s add traps.

What can we intercept with them?

For most operations on objects, there’s a so-called “internal method” in the JavaScript 
specification that describes how it works at the lowest level. For instance [[Get]], the 
internal method to read a property, [[Set]], the internal method to write a property, and 
so on. These methods are only used in the specification, we can’t call them directly by name.

Proxy traps intercept invocations of these methods. They are listed in the Proxy 
specification and in the table below.

For every internal method, there’s a trap in this table: the name of the method that we
 can add to the handler parameter of new Proxy to intercept the operation:


*/

/*

Internal Method                         	Handler Method	                            Triggers when…
[[Get]]	                                          get	                                reading a property
[[Set]]	                                            set	                                writing to a property
[[HasProperty]]	                                has	                                in operator
[[Delete]]	                                deleteProperty	                                delete operator
[[Call]]	                                apply	                                function call
[[Construct]]	                                construct	                                new operator
[[GetPrototypeOf]]	                                getPrototypeOf	                                Object.getPrototypeOf
[[SetPrototypeOf]]	                                setPrototypeOf	                                Object.setPrototypeOf
[[IsExtensible]]	                                isExtensible	                                Object.isExtensible
[[PreventExtensions]]	                            preventExtensions	                 Object.preventExtensions
[[DefineOwnProperty]]	                           defineProperty	                                Object.defineProperty, Object.defineProperties
[[GetOwnProperty]]	                        getOwnPropertyDescriptor	        Object.getOwnPropertyDescriptor, for..in, Object.keys/values/entries
[[OwnPropertyKeys]]	                       ownKey                        Object.getOwnPropertyNames,    Object.getOwnPropertySymbols, for..in, Object.keys/values/entries

*/

/*
Invariants
JavaScript enforces some invariants – conditions that must be fulfilled by internal methods and traps.

Most of them are for return values:

[[Set]] must return true if the value was written successfully, otherwise false.
[[Delete]] must return true if the value was deleted successfully, otherwise false.
…and so on, we’ll see more in examples below.
There are some other invariants, like:

[[GetPrototypeOf]], applied to the proxy object must return the same value as [[GetPrototypeOf]] 
applied to the proxy object’s target object. In other words, reading prototype of a proxy must 
always return the prototype of the target object.
Traps can intercept these operations, but they must follow these rules.

Invariants ensure correct and consistent behavior of language features. The full invariants 
list is in the specification. You probably won’t violate them if you’re not doing something weird.
*/

/*
Default value with “get” trap
The most common traps are for reading/writing properties.

To intercept reading, the handler should have a method get(target, property, receiver).

It triggers when a property is read, with following arguments:

target – is the target object, the one passed as the first argument to new Proxy,
property – property name,
receiver – if the target property is a getter, then receiver is the object that’s going 
to be used as this in its call. Usually that’s the proxy object itself (or an object that 
inherits from it, if we inherit from proxy). Right now we don’t need this argument, so it
 will be explained in more detail later.
Let’s use get to implement default values for an object.

We’ll make a numeric array that returns 0 for nonexistent values.

Usually when one tries to get a non-existing array item, they get undefined, but we’ll wrap 
a regular array into the proxy that traps reading and returns 0 if there’s no such property:

 let numbers = [0, 1, 2];

numbers = new Proxy(numbers, {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    } else {
      return 0; // default value
    }
  }
});

alert( numbers[1] ); // 1
alert( numbers[123] ); // 0 (no such item)
As we can see, it’s quite easy to do with a get trap.


*/


/*
We can use Proxy to implement any logic for “default” values.

Imagine we have a dictionary, with phrases and their translations:

 let dictionary = {
  'Hello': 'Hola',
  'Bye': 'Adiós'
};

alert( dictionary['Hello'] ); // Hola
alert( dictionary['Welcome'] ); // undefined
Right now, if there’s no phrase, reading from dictionary returns undefined. But in practice, 
leaving a phrase untranslated is usually better than undefined. So let’s make it return 
an untranslated phrase in that case instead of undefined.

To achieve that, we’ll wrap dictionary in a proxy that intercepts reading operations:

 let dictionary = {
  'Hello': 'Hola',
  'Bye': 'Adiós'
};

dictionary = new Proxy(dictionary, {
  get(target, phrase) { // intercept reading a property from dictionary
    if (phrase in target) { // if we have it in the dictionary
      return target[phrase]; // return the translation
    } else {
      // otherwise, return the non-translated phrase
      return phrase;
    }
  }
});

// Look up arbitrary phrases in the dictionary!
// At worst, they're not translated.
alert( dictionary['Hello'] ); // Hola
alert( dictionary['Welcome to Proxy']); // Welcome to Proxy (no translation)
Please note:
Please note how the proxy overwrites the variable:

dictionary = new Proxy(dictionary, ...);
The proxy should totally replace the target object everywhere. No one should ever reference 
the target object after it got proxied. Otherwise it’s easy to mess up.
*/

/*
Validation with “set” trap
Let’s say we want an array exclusively for numbers. If a value of another type is added, there should be an error.

The set trap triggers when a property is written.

set(target, property, value, receiver):

target – is the target object, the one passed as the first argument to new Proxy,
property – property name,
value – property value,
receiver – similar to get trap, matters only for setter properties.
The set trap should return true if setting is successful, and false otherwise (triggers TypeError).

Let’s use it to validate new values:

 let numbers = [];

numbers = new Proxy(numbers, { // (*)
  set(target, prop, val) { // to intercept property writing
    if (typeof val == 'number') {
      target[prop] = val;
      return true;
    } else {
      return false;
    }
  }
});

numbers.push(1); // added successfully
numbers.push(2); // added successfully
alert("Length is: " + numbers.length); // 2

numbers.push("test"); // TypeError ('set' on proxy returned false)

alert("This line is never reached (error in the line above)");
Please note: the built-in functionality of arrays is still working! Values are added 
by push. The length property auto-increases when values are added. Our proxy doesn’t break anything.

We don’t have to override value-adding array methods like push and unshift, and so on, 
to add checks in there, because internally they use the [[Set]] operation that’s intercepted by the proxy.

So the code is clean and concise.

Don’t forget to return true
As said above, there are invariants to be held.

For set, it must return true for a successful write.

If we forget to do it or return any falsy value, the operation triggers TypeError.
*/

/*
Iteration with “ownKeys” and “getOwnPropertyDescriptor”
Object.keys, for..in loop and most other methods that iterate over object properties use
 [[OwnPropertyKeys]] internal method (intercepted by ownKeys trap) to get a list of properties.

Such methods differ in details:

Object.getOwnPropertyNames(obj) returns non-symbol keys.
Object.getOwnPropertySymbols(obj) returns symbol keys.
Object.keys/values() returns non-symbol keys/values with enumerable flag (property flags
 were explained in the article Property flags and descriptors).
for..in loops over non-symbol keys with enumerable flag, and also prototype keys.
…But all of them start with that list.

In the example below we use ownKeys trap to make for..in loop over user, and also 
Object.keys and Object.values, to skip properties starting with an underscore _:

 let user = {
  name: "John",
  age: 30,
  _password: "***"
};

user = new Proxy(user, {
  ownKeys(target) {
    return Object.keys(target).filter(key => !key.startsWith('_'));
  }
});

// "ownKeys" filters out _password
for(let key in user) alert(key); // name, then: age

// same effect on these methods:
alert( Object.keys(user) ); // name,age
alert( Object.values(user) ); // John,30
So far, it works.
*/

/*
Although, if we return a key that doesn’t exist in the object, Object.keys won’t list it:

 let user = { };

user = new Proxy(user, {
  ownKeys(target) {
    return ['a', 'b', 'c'];
  }
});

alert( Object.keys(user) ); // <empty>
Why? The reason is simple: Object.keys returns only properties with the enumerable flag. To check for it, it calls the internal method [[GetOwnProperty]] for every property to get its descriptor. And here, as there’s no property, its descriptor is empty, no enumerable flag, so it’s skipped.

For Object.keys to return a property, we need it to either exist in the object, with the enumerable flag, or we can intercept calls to [[GetOwnProperty]] (the trap getOwnPropertyDescriptor does it), and return a descriptor with enumerable: true.

Here’s an example of that:

 let user = { };

user = new Proxy(user, {
  ownKeys(target) { // called once to get a list of properties
    return ['a', 'b', 'c'];
  },

  getOwnPropertyDescriptor(target, prop) { // called for every property
    return {
      enumerable: true,
      configurable: true
      // ...other flags, probable "value:..." 
    };
  }

});

alert( Object.keys(user) ); // a, b, c
Let’s note once again: we only need to intercept [[GetOwnProperty]] if the property is absent in the object.


*/

/*
Protected properties with “deleteProperty” and other traps
There’s a widespread convention that properties and methods prefixed by an underscore _ are internal. They shouldn’t be accessed from outside the object.

Technically that’s possible though:

 let user = {
  name: "John",
  _password: "secret"
};

alert(user._password); // secret
Let’s use proxies to prevent any access to properties starting with _.

We’ll need the traps:

get to throw an error when reading such property,
set to throw an error when writing,
deleteProperty to throw an error when deleting,
ownKeys to exclude properties starting with _ from for..in and methods like Object.keys.
Here’s the code:

 let user = {
  name: "John",
  _password: "***"
};

user = new Proxy(user, {
  get(target, prop) {
    if (prop.startsWith('_')) {
      throw new Error("Access denied");
    }
    let value = target[prop];
    return (typeof value === 'function') ? value.bind(target) : value; // (*)
  },
  set(target, prop, val) { // to intercept property writing
    if (prop.startsWith('_')) {
      throw new Error("Access denied");
    } else {
      target[prop] = val;
      return true;
    }
  },
  deleteProperty(target, prop) { // to intercept property deletion
    if (prop.startsWith('_')) {
      throw new Error("Access denied");
    } else {
      delete target[prop];
      return true;
    }
  },
  ownKeys(target) { // to intercept property list
    return Object.keys(target).filter(key => !key.startsWith('_'));
  }
});

// "get" doesn't allow to read _password
try {
  alert(user._password); // Error: Access denied
} catch(e) { alert(e.message); }

// "set" doesn't allow to write _password
try {
  user._password = "test"; // Error: Access denied
} catch(e) { alert(e.message); }

// "deleteProperty" doesn't allow to delete _password
try {
  delete user._password; // Error: Access denied
} catch(e) { alert(e.message); }

// "ownKeys" filters out _password
for(let key in user) alert(key); // name
Please note the important detail in the get trap, in the line (*):

get(target, prop) {
  // ...
  let value = target[prop];
  return (typeof value === 'function') ? value.bind(target) : value; // (*)
}
Why do we need a function to call value.bind(target)?

The reason is that object methods, such as user.checkPassword(), must be able to access _password:

user = {
  // ...
  checkPassword(value) {
    // object method must be able to read _password
    return value === this._password;
  }
}
A call to user.checkPassword() gets proxied user as this (the object before dot becomes this), 
so when it tries to access this._password, the get trap activates (it triggers on any property 
read) and throws an error.

So we bind the context of object methods to the original object, target, in the line (*). Then 
their future calls will use target as this, without any traps.

That solution usually works, but isn’t ideal, as a method may pass the unproxied object somewhere 
else, and then we’ll get messed up: where’s the original object, and where’s the proxied one?

Besides, an object may be proxied multiple times (multiple proxies may add different “tweaks” to 
the object), and if we pass an unwrapped object to a method, there may be unexpected consequences.

So, such a proxy shouldn’t be used everywhere.
Eğer nesnenin bir metodu varsa (ör: checkPassword), bu metodun içinde this anahtar kelimesi 
orijinal nesneyi (target) göstermelidir.
Çünkü Proxy ile erişim sırasında, this aslında Proxy'nin kendisi olur. Ama Proxy'nin get tuzağı,
 _password gibi özel alanlara erişimi engellediği için, metodun içinden this._password okunamaz 
 ve hata fırlatılır.
bind(target) ile metodun this bağlamı orijinal nesneye sabitlenir. Böylece metodun içinden
 this._password erişimi mümkün olur.
Özet: Proxy ile koruma yaparken, nesne metodlarının doğru çalışabilmesi için bind(target) ile 
orijinal nesneye bağlanıyor.

Bu çözümün eksikleri ve riskleri
Eğer birden fazla Proxy ile aynı nesne sarılırsa, bind(target) ile sadece ilk orijinal nesneye 
bağlanır, diğer Proxy'lerin getirdiği ek davranışlar kaybolabilir.
Ayrıca, bir metod başka bir yere aktarılırsa (ör: bir değişkene atanırsa), yine beklenmedik 
davranışlar olabilir.
Yani bu yöntem, küçük ve kontrollü senaryolar için uygundur, ama büyük ve karmaşık uygulamalarda 
sorun çıkarabilir.

Private properties of a class
Modern JavaScript engines natively support private properties in classes, prefixed with #. They 
are described in the article Private and protected properties and methods. No proxies required.

Such properties have their own issues though. In particular, they are not inherited.

Proxy ile yapılan koruma yazılımsal ve esnektir ama tam güvenli değildir. Sınıflardaki #private 
alanlar ise gerçekten gizlidir, fakat miras alınamaz. Bu yüzden, hangi yöntemi kullanacağınız 
ihtiyaca göre değişir.
*/

/*
“In range” with “has” trap
Let’s see more examples.

We have a range object:

let range = {
  start: 1,
  end: 10
};
We’d like to use the in operator to check that a number is in range.

The has trap intercepts in calls.

has(target, property)

target – is the target object, passed as the first argument to new Proxy,
property – property name
Here’s the demo:

 let range = {
  start: 1,
  end: 10
};

range = new Proxy(range, {
  has(target, prop) {
    return prop >= target.start && prop <= target.end;
  }
});

alert(5 in range); // true
alert(50 in range); // false
Nice syntactic sugar, isn’t it? And very simple to implement.


*/

/*
Wrapping functions: "apply"
We can wrap a proxy around a function as well.

The apply(target, thisArg, args) trap handles calling a proxy as function:

target is the target object (function is an object in JavaScript),
thisArg is the value of this.
args is a list of arguments.
For example, let’s recall delay(f, ms) decorator, that we did in the article Decorators 
and forwarding, call/apply.

In that article we did it without proxies. A call to delay(f, ms) returned a function 
that forwards all calls to f after ms milliseconds.

Here’s the previous, function-based implementation:

 function delay(f, ms) {
  // return a wrapper that passes the call to f after the timeout
  return function() { // (*)
    setTimeout(() => f.apply(this, arguments), ms);
  };
}

function sayHi(user) {
  alert(`Hello, ${user}!`);
}

// after this wrapping, calls to sayHi will be delayed for 3 seconds
sayHi = delay(sayHi, 3000);

sayHi("John"); // Hello, John! (after 3 seconds)
As we’ve seen already, that mostly works. The wrapper function (*) performs the call after the timeout.


*/

/*
But a wrapper function does not forward property read/write operations or anything else. 
After the wrapping, the access is lost to properties of the original functions, such as name, 
length and others:
Ancak bir sarmalayıcı fonksiyon, özellik okuma/yazma işlemlerini veya başka bir şeyi iletmez.
 Sarmalama işleminden sonra, orijinal fonksiyonların name, length ve diğerleri gibi özelliklerine 
 erişim kaybolur:


 function delay(f, ms) {
  return function() {
    setTimeout(() => f.apply(this, arguments), ms);
  };
}

function sayHi(user) {
  alert(`Hello, ${user}!`);
}

alert(sayHi.length); // 1 (function length is the arguments count in its declaration)

sayHi = delay(sayHi, 3000);

alert(sayHi.length); // 0 (in the wrapper declaration, there are zero arguments)
Proxy is much more powerful, as it forwards everything to the target object.
Proxy çok daha güçlüdür, çünkü her şeyi hedef nesneye iletir.

*/

/*
Let’s use Proxy instead of a wrapping function:
Sarmalama fonksiyonu yerine Proxy kullanalım:


 function delay(f, ms) {
  return new Proxy(f, {
    apply(target, thisArg, args) {
      setTimeout(() => target.apply(thisArg, args), ms);
    }
  });
}

function sayHi(user) {
  alert(`Hello, ${user}!`);
}

sayHi = delay(sayHi, 3000);

alert(sayHi.length); // 1 (*) proxy forwards "get length" operation to the target

sayHi("John"); // Hello, John! (after 3 seconds)
The result is the same, but now not only calls, but all operations on the proxy are 
forwarded to the original function. So sayHi.length is returned correctly after the 
wrapping in the line (*).
Sonuç aynı, ancak artık sadece çağrılar değil, proxy üzerindeki tüm işlemler orijinal 
fonksiyona yönlendiriliyor. Yani (*) satırındaki sarmalamadan sonra sayHi.length doğru 
şekilde döndürülüyor.

*/


/*
Reflect
Reflect is a built-in object that simplifies creation of Proxy.

It was said previously that internal methods, such as [[Get]], [[Set]] and others are 
specification-only, they can’t be called directly.

The Reflect object makes that somewhat possible. Its methods are minimal wrappers around
 the internal methods.

Here are examples of operations and Reflect calls that do the same:

Operation	Reflect call	Internal method
obj[prop]	Reflect.get(obj, prop)	[[Get]]
obj[prop] = value	Reflect.set(obj, prop, value)	[[Set]]
delete obj[prop]	Reflect.deleteProperty(obj, prop)	[[Delete]]
new F(value)	Reflect.construct(F, value)	[[Construct]]
…	…	…
For example:

 let user = {};

Reflect.set(user, 'name', 'John');

alert(user.name); // John
In particular, Reflect allows us to call operators (new, delete…) as functions 
(Reflect.construct, Reflect.deleteProperty, …). That’s an interesting capability,
 but here another thing is important.

*/

/*
For every internal method, trappable by Proxy, there’s a corresponding method in Reflect, 
with the same name and arguments as the Proxy trap.

So we can use Reflect to forward an operation to the original object.

In this example, both traps get and set transparently (as if they didn’t exist) forward 
reading/writing operations to the object, showing a message:

 let user = {
  name: "John",
};

user = new Proxy(user, {
  get(target, prop, receiver) {
    alert(`GET ${prop}`);
    return Reflect.get(target, prop, receiver); // (1)
  },
  set(target, prop, val, receiver) {
    alert(`SET ${prop}=${val}`);
    return Reflect.set(target, prop, val, receiver); // (2)
  }
});

let name = user.name; // shows "GET name"
user.name = "Pete"; // shows "SET name=Pete"
Here:

Reflect.get reads an object property.
Reflect.set writes an object property and returns true if successful, false otherwise.
That is, everything’s simple: if a trap wants to forward the call to the object, it’s
 enough to call Reflect.<method> with the same arguments.

In most cases we can do the same without Reflect, for instance, reading a property 
Reflect.get(target, prop, receiver) can be replaced by target[prop]. There are important
 nuances though.


*/

/*
Proxying a getter

Let’s see an example that demonstrates why Reflect.get is better. And we’ll also see why 
get/set have the third argument receiver, that we didn’t use before.

We have an object user with _name property and a getter for it.

Here’s a proxy around it:

 let user = {
  _name: "Guest",
  get name() {
    return this._name;
  }
};

let userProxy = new Proxy(user, {
  get(target, prop, receiver) {
    return target[prop];
  }
});

alert(userProxy.name); // Guest
The get trap is “transparent” here, it returns the original property, and doesn’t do 
anything else. That’s enough for our example.

*/

/*
After inheriting another object admin from user, we can observe the incorrect behavior:

 let user = {
  _name: "Guest",
  get name() {
    return this._name;
  }
};

let userProxy = new Proxy(user, {
  get(target, prop, receiver) {
    return target[prop]; // (*) target = user
  }
});

let admin = {
  __proto__: userProxy,
  _name: "Admin"
};

// Expected: Admin
alert(admin.name); // outputs: Guest (?!?)
Reading admin.name should return "Admin", not "Guest"!

What’s the matter? Maybe we did something wrong with the inheritance?

But if we remove the proxy, then everything will work as expected.

The problem is actually in the proxy, in the line (*).

When we read admin.name, as admin object doesn’t have such own property, the search 
goes to its prototype.

The prototype is userProxy.

When reading name property from the proxy, its get trap triggers and returns it from
 the original object as target[prop] in the line (*).

A call to target[prop], when prop is a getter, runs its code in the context this=target.
 So the result is this._name from the original object target, that is: from user.

To fix such situations, we need receiver, the third argument of get trap. It keeps the 
correct this to be passed to a getter. In our case that’s admin.

How to pass the context for a getter? For a regular function we could use call/apply, but
 that’s a getter, it’s not “called”, just accessed.

Reflect.get can do that. Everything will work right if we use it.


*/

/*
Here’s the corrected variant:

 let user = {
  _name: "Guest",
  get name() {
    return this._name;
  }
};

let userProxy = new Proxy(user, {
  get(target, prop, receiver) { // receiver = admin
    return Reflect.get(target, prop, receiver); // (*)
  }
});


let admin = {
  __proto__: userProxy,
  _name: "Admin"
};

alert(admin.name); // Admin
Now receiver that keeps a reference to the correct this (that is admin), is passed to 
the getter using Reflect.get in the line (*).

We can rewrite the trap even shorter:

get(target, prop, receiver) {
  return Reflect.get(...arguments);
}
Reflect calls are named exactly the same way as traps and accept the same arguments. 
They were specifically designed this way.

So, return Reflect... provides a safe no-brainer to forward the operation and make sure 
we don’t forget anything related to that.


*/

/*
Built-in objects: Internal slots

Many built-in objects, for example Map, Set, Date, Promise and others make use of 
so-called “internal slots”.

These are like properties, but reserved for internal, specification-only purposes. For 
instance, Map stores items in the internal slot [[MapData]]. Built-in methods access them 
directly, not via [[Get]]/[[Set]] internal methods. So Proxy can’t intercept that.

Why care? They’re internal anyway!

Well, here’s the issue. After a built-in object like that gets proxied, the proxy doesn’t 
have these internal slots, so built-in methods will fail.
JavaScript'te bazı yerleşik (built-in) nesneler — örneğin Map, Set, Date, Promise gibi — 
"internal slot" (dahili slot) adı verilen özel alanlar kullanır. Bunlar, nesnenin içinde 
saklanan ve JavaScript kodundan doğrudan erişilemeyen, sadece motorun kendisinin kullandığı
 gizli veri alanlarıdır.

Örneğin, bir Map nesnesi, tüm anahtar-değer çiftlerini [[MapData]] adlı bir internal slot'ta 
saklar. Bu slotlara sadece JavaScript motoru erişebilir; normal property gibi erişemezsiniz.

Proxy ve Internal Slot Problemi
Bir nesneyi Proxy ile sardığınızda, ortaya çıkan proxy nesnesi, orijinal nesnenin internal 
slotlarına sahip değildir. Yani:


For example:

 let map = new Map();

let proxy = new Proxy(map, {});

proxy.set('test', 1); // Error
Internally, a Map stores all data in its [[MapData]] internal slot. The proxy doesn’t have
 such a slot. The built-in method Map.prototype.set method tries to access the internal 
 property this.[[MapData]], but because this=proxy, can’t find it in proxy and just fails.
Burada hata çıkar çünkü proxy.set çağrıldığında, this artık proxy nesnesi olur. Ancak proxy'nin içinde [[MapData]] internal slot'u yoktur. Map.prototype.set metodu, this.[[MapData]]'ya erişmeye çalışır ve bulamaz, bu yüzden hata fırlatır.
Bu problemi aşmak için, Proxy'nin get tuzağında fonksiyonları orijinal nesneye (target) bağlamamız gerekir

Fortunately, there’s a way to fix it:

 let map = new Map();

let proxy = new Proxy(map, {
  get(target, prop, receiver) {
    let value = Reflect.get(...arguments);
    return typeof value == 'function' ? value.bind(target) : value;
  }
});

proxy.set('test', 1);
alert(proxy.get('test')); // 1 (works!)
Now it works fine, because get trap binds function properties, such as map.set, to the 
target object (map) itself.

Unlike the previous example, the value of this inside proxy.set(...) will be not proxy, 
but the original map. So when the internal implementation of set tries to access this.[[MapData]] 
internal slot, it succeeds.

Burada, get tuzağına gelen fonksiyonlar (ör: set, get, has vs.) otomatik olarak target 
(yani orijinal map) nesnesine bağlanır. Böylece, fonksiyonun içindeki this artık proxy değil, 
gerçek map olur ve [[MapData]] slotuna erişebilir.

Neden Sadece Fonksiyonlar Bağlanıyor?
Çünkü internal slotlara erişim sadece fonksiyonlar (ör: set, get, has) üzerinden olur.
 Diğer property'ler için böyle bir ihtiyaç yoktur.

Array has no internal slots
A notable exception: built-in Array doesn’t use internal slots. That’s for historical 
reasons, as it appeared so long ago.

So there’s no such problem when proxying an array.
Array ([]) nesneleri, tarihsel nedenlerle internal slot kullanmaz. Yani bir array'i proxy 
ile sardığınızda, bu tür bir problem yaşamazsınız:
Çünkü array metodları (push, pop vs.) internal slot yerine, property'ler ve length gibi 
normal property'ler üzerinden çalışır.

Eğer bir Map, Set veya benzeri bir nesneyi proxy ile sarmak istiyorsanız, mutlaka fonksiyonları
 orijinal nesneye bağlamalısınız. Aksi halde, built-in metodlar çalışmaz ve beklenmedik hatalar alırsınız.
Array gibi internal slot kullanmayan nesnelerde bu tür bir bağlama gerekmez.
Internal slot'lar, sadece motorun erişebildiği gizli alanlardır.
Proxy ile sardığınızda, internal slot'lar proxy'ye geçmez.
Fonksiyonları orijinal nesneye bind ederek bu problemi çözebilirsiniz.
Array gibi nesnelerde bu sorun yoktur.



*/

/*
Private fields

A similar thing happens with private class fields.

For example, getName() method accesses the private #name property and breaks after proxying:

 class User {
  #name = "Guest";

  getName() {
    return this.#name;
  }
}

let user = new User();

user = new Proxy(user, {});

alert(user.getName()); // Error
The reason is that private fields are implemented using internal slots. JavaScript 
does not use [[Get]]/[[Set]] when accessing them.

In the call getName() the value of this is the proxied user, and it doesn’t have 
the slot with private fields.

Once again, the solution with binding the method makes it work:

 class User {
  #name = "Guest";

  getName() {
    return this.#name;
  }
}

let user = new User();

user = new Proxy(user, {
  get(target, prop, receiver) {
    let value = Reflect.get(...arguments);
    return typeof value == 'function' ? value.bind(target) : value;
  }
});

alert(user.getName()); // Guest
That said, the solution has drawbacks, as explained previously: it exposes the 
original object to the method, potentially allowing it to be passed further and
 breaking other proxied functionality.


*/

/*
Proxy != target

The proxy and the original object are different objects. That’s natural, right?

So if we use the original object as a key, and then proxy it, then the proxy can’t be found:

 let allUsers = new Set();

class User {
  constructor(name) {
    this.name = name;
    allUsers.add(this);
  }
}

let user = new User("John");

alert(allUsers.has(user)); // true

user = new Proxy(user, {});

alert(allUsers.has(user)); // false
As we can see, after proxying we can’t find user in the set allUsers, because the 
proxy is a different object.


*/

/*
Proxies can’t intercept a strict equality test ===
Proxies can intercept many operators, such as new (with construct), in (with has), 
delete (with deleteProperty) and so on.

But there’s no way to intercept a strict equality test for objects. An object is 
strictly equal to itself only, and no other value.

So all operations and built-in classes that compare objects for equality will 
differentiate between the object and the proxy. No transparent replacement here.
*/

/*
Revocable proxies
A revocable proxy is a proxy that can be disabled.

Let’s say we have a resource, and would like to close access to it any moment.

What we can do is to wrap it into a revocable proxy, without any traps. Such a
 proxy will forward operations to object, and we can disable it at any moment.

The syntax is:

let {proxy, revoke} = Proxy.revocable(target, handler)
The call returns an object with the proxy and revoke function to disable it.

Here’s an example:

 let object = {
  data: "Valuable data"
};

let {proxy, revoke} = Proxy.revocable(object, {});

// pass the proxy somewhere instead of object...
alert(proxy.data); // Valuable data

// later in our code
revoke();

// the proxy isn't working any more (revoked)
alert(proxy.data); // Error
A call to revoke() removes all internal references to the target object from the 
proxy, so they are no longer connected.

Initially, revoke is separate from proxy, so that we can pass proxy around while 
leaving revoke in the current scope.

We can also bind revoke method to proxy by setting proxy.revoke = revoke.


*/

/*
Another option is to create a WeakMap that has proxy as the key and the corresponding 
revoke as the value, that allows to easily find revoke for a proxy:

 let revokes = new WeakMap();

let object = {
  data: "Valuable data"
};

let {proxy, revoke} = Proxy.revocable(object, {});

revokes.set(proxy, revoke);

// ..somewhere else in our code..
revoke = revokes.get(proxy);
revoke();

alert(proxy.data); // Error (revoked)
We use WeakMap instead of Map here because it won’t block garbage collection. If a proxy 
object becomes “unreachable” (e.g. no variable references it any more), WeakMap allows 
it to be wiped from memory together with its revoke that we won’t need any more.
*/

/*
Proxy is a wrapper around an object, that forwards operations on it to the object, 
optionally trapping some of them.

It can wrap any kind of object, including classes and functions.

The syntax is:

let proxy = new Proxy(target, {
  // traps 
});
…Then we should use proxy everywhere instead of target. A proxy doesn’t have its own 
properties or methods. It traps an operation if the trap is provided, otherwise forwards 
it to target object.

We can trap:

Reading (get), writing (set), deleting (deleteProperty) a property (even a non-existing one).
Calling a function (apply trap).
The new operator (construct trap).
Many other operations (the full list is at the beginning of the article and in the docs).
That allows us to create “virtual” properties and methods, implement default values, 
observable objects, function decorators and so much more.

We can also wrap an object multiple times in different proxies, decorating it with various
 aspects of functionality.

The Reflect API is designed to complement Proxy. For any Proxy trap, there’s a Reflect 
call with same arguments. We should use those to forward calls to target objects.

Proxies have some limitations:

Built-in objects have “internal slots”, access to those can’t be proxied. See the 
workaround above.
The same holds true for private class fields, as they are internally implemented using
 slots. So proxied method calls must have the target object as this to access them.
Object equality tests === can’t be intercepted.
Performance: benchmarks depend on an engine, but generally accessing a property using 
a simplest proxy takes a few times longer. In practice that only matters for some 
“bottleneck” objects though.

*/

/*
let user = {
  name: "John"
};

function wrap(target) {
  return new Proxy(target, {
    get(target, prop, receiver) {
      if (prop in target) {
        return Reflect.get(target, prop, receiver);
      } else {
        throw new ReferenceError(`Property doesn't exist: "${prop}"`)
      }
    }
  });
}

user = wrap(user);

alert(user.name); // John
alert(user.age); // ReferenceError: Property doesn't exist: "age"



*/

/*
let array = [1, 2, 3];

array = new Proxy(array, {
  get(target, prop, receiver) {
    if (prop < 0) {
      // even if we access it like arr[1]
      // prop is a string, so need to convert it to number
      prop = +prop + target.length;
    }
    return Reflect.get(target, prop, receiver);
  }
});


alert(array[-1]); // 3
alert(array[-2]); // 2

1. array[-1] çağrısı
JavaScript, Proxy'nin get tuzağını tetikler.
prop parametresi olarak "-1" (string) gelir.
2. get tuzağına giriyoruz
target: Orijinal dizi ([1, 2, 3])
prop: "-1" (string)
receiver: Proxy'nin kendisi
3. if (prop < 0) kontrolü
JavaScript'te karşılaştırma sırasında prop otomatik olarak sayıya çevrilir.
"-1" < 0 → true olur.
4. prop = +prop + target.length;
+prop ile prop'u sayıya çeviriyoruz: +("-1") = -1
target.length = 3
prop = -1 + 3 = 2
5. return Reflect.get(target, prop, receiver);
Artık prop = 2 oldu.
Reflect.get(target, 2, receiver) çağrılır.
target[2] yani 3 döner.
6. alert(array[-1]);
Sonuç: 3 ekrana basılır.


*/


/*
let handlers = Symbol('handlers');

function makeObservable(target) {
  // 1. Initialize handlers store
  target[handlers] = [];

  // Store the handler function in array for future calls
  target.observe = function(handler) {
    this[handlers].push(handler);
  };

  // 2. Create a proxy to handle changes
  return new Proxy(target, {
    set(target, property, value, receiver) {
      let success = Reflect.set(...arguments); // forward the operation to object
      if (success) { // if there were no error while setting the property
        // call all handlers
        target[handlers].forEach(handler => handler(property, value));
      }
      return success;
    }
  });
}

let user = {};

user = makeObservable(user);

user.observe((key, value) => {
  alert(`SET ${key}=${value}`);
});

user.name = "John";

Bu kod, bir nesneye (örnekte user) "observable" (gözlemlenebilir) özelliği kazandırmak 
için yazılmıştır. Amaç, nesnenin herhangi bir özelliği değiştiğinde (örneğin 
user.name = "John" gibi), daha önce kaydedilmiş olan "gözlemci" (observer) fonksiyonların
 otomatik olarak çağrılmasıdır.

Adım adım açıklama:

Symbol ile özel bir anahtar oluşturuluyor:
let handlers = Symbol('handlers');
Bu, nesneye dışarıdan erişilemeyen, çakışma riski olmayan bir dizi eklemek için kullanılır.
makeObservable fonksiyonu:

Verilen nesneye bir gözlemci listesi (handlers) ekler.
observe adında bir metot ekler. Bu metot, gözlemci fonksiyonları kaydeder.
Nesneyi bir Proxy ile sarar. Proxy'nin set tuzağı, nesneye bir değer atandığında 
(ör: user.name = "John") çalışır.
Proxy'nin set tuzağı:

Özelliğe değer ataması başarılı olursa, tüm gözlemci fonksiyonlar çağrılır ve hangi 
özellik değiştiyse (property) ve yeni değeri (value) parametre olarak verilir.
Kullanım:

user.observe(...) ile bir gözlemci fonksiyonu eklenir.
user.name = "John" yazıldığında, gözlemci fonksiyonu otomatik olarak çalışır ve bir alert gösterir.
Gerçek hayatta bu desen, veri değişikliklerini izlemek ve tepki vermek (örneğin UI 
güncellemek, log tutmak, otomatik işlem başlatmak) için kullanılır. Modern frameworklerdeki
 reactivity/observable sistemlerinin temel mantığı budur.
Bu kod, bir nesnede herhangi bir özellik değiştiğinde otomatik olarak haber verilmesini 
(bildirim/gözlemci) sağlar. Böylece dışarıdan eklenen fonksiyonlar, değişiklikleri anında 
algılayabilir ve tepki verebilir.

*/


/*
Eval: run a code string
The built-in eval function allows to execute a string of code.

The syntax is:

let result = eval(code);
For example:

 let code = 'alert("Hello")';
eval(code); // Hello
A string of code may be long, contain line breaks, function declarations, variables and so on.

The result of eval is the result of the last statement.

For example:

 let value = eval('1+1');
alert(value); // 2
 let value = eval('let i = 0; ++i');
alert(value); // 1
The eval’ed code is executed in the current lexical environment, so it can see outer variables:

 let a = 1;

function f() {
  let a = 2;

  eval('alert(a)'); // 2
}

f();
It can change outer variables as well:

 let x = 5;
eval("x = 10");
alert(x); // 10, value modified
In strict mode, eval has its own lexical environment. So functions and variables, 
declared inside eval, are not visible outside:

 // reminder: 'use strict' is enabled in runnable examples by default

eval("let x = 5; function f() {}");

alert(typeof x); // undefined (no such variable)
// function f is also not visible
Without use strict, eval doesn’t have its own lexical environment, so we would see x and f outside.

//Sıkı modda, eval'in kendi sözcüksel ortamı vardır. Dolayısıyla, eval içinde tanımlanan 
// fonksiyonlar ve değişkenler, eval dışında görünmez:

use strict ve let ile ve eval varsa disariya paylasmiyor
ama use strict kaldirip val ile tanimlarsak disardan erisiliyor


*/



/*
Using “eval”
In modern programming eval is used very sparingly. It’s often said that “eval is evil”.

The reason is simple: long, long time ago JavaScript was a much weaker language, many 
things could only be done with eval. But that time passed a decade ago.

Right now, there’s almost no reason to use eval. If someone is using it, there’s a good 
chance they can replace it with a modern language construct or a JavaScript Module.

Please note that its ability to access outer variables has side-effects.

Code minifiers (tools used before JS gets to production, to compress it) rename local
variables into shorter ones (like a, b etc) to make the code smaller. That’s usually 
safe, but not if eval is used, as local variables may be accessed from eval’ed code 
string. So minifiers don’t do that renaming for all variables potentially visible from
 eval. That negatively affects code compression ratio.

Using outer local variables inside eval is also considered a bad programming practice,
as it makes maintaining the code more difficult.

There are two ways how to be totally safe from such problems.

If eval’ed code doesn’t use outer variables, please call eval as window.eval(...):
Modern programlamada eval çok az kullanılır. Sıklıkla "eval kötüdür" denir.

Sebebi basit: Çok uzun zaman önce JavaScript çok daha zayıf bir dildi ve birçok şey 
yalnızca eval ile yapılabiliyordu. Ancak o zamanlar on yıl önce geçti.

Şu anda eval kullanmak için neredeyse hiçbir sebep yok. Eğer biri kullanıyorsa, büyük 
olasılıkla onu modern bir dil yapısı veya bir JavaScript Modülü ile değiştirebilir.

Dış değişkenlere erişim yeteneğinin yan etkileri olduğunu lütfen unutmayın.

Kod küçültücüler (JS üretime geçmeden önce sıkıştırmak için kullanılan araçlar), kodu 
küçültmek için yerel değişkenleri daha kısa olanlara (a, b vb.) dönüştürür. Bu genellikle 
güvenlidir, ancak eval kullanılıyorsa güvenli değildir, çünkü yerel değişkenlere eval ile 
kodlanmış kod dizesinden erişilebilir. Bu nedenle küçültücüler, eval tarafından görülebilecek 
tüm değişkenler için bu yeniden adlandırmayı yapmaz. Bu, kod sıkıştırma oranını olumsuz etkiler.

eval içinde dış yerel değişkenleri kullanmak da kötü bir programlama uygulaması olarak kabul 
'edilir, çünkü kodun bakımını zorlaştırır.

Bu tür sorunlardan tamamen korunmanın iki yolu vardır.

Eval'li kod dış değişkenleri kullanmıyorsa, lütfen eval'i window.eval(...) olarak çağırın:

Kod bu şekilde genel kapsamda yürütülür:
This way the code is executed in the global scope:

 let x = 1;
{
  let x = 5;
  window.eval('alert(x)'); // 1 (global variable)
}
If eval’ed code needs local variables, change eval to new Function and pass them as arguments:

 let f = new Function('a', 'alert(a)');

f(5); // 5
The new Function construct is explained in the chapter The "new Function" syntax. It 
creates a function from a string, also in the global scope. So it can’t see local 
variables. But it’s so much clearer to pass them explicitly as arguments, like in the example above.

Summary
A call to eval(code) runs the string of code and returns the result of the last statement.

Rarely used in modern JavaScript, as there’s usually no need.
Can access outer local variables. That’s considered bad practice.
Instead, to eval the code in the global scope, use window.eval(code).
Or, if your code needs some data from the outer scope, use new Function and pass it as arguments.

*/

/*
Let’s use eval to calculate the maths expression:

 let expr = prompt("Type an arithmetic expression?", '2*3+2');

alert( eval(expr) );
The user can input any text or code though.

To make things safe, and limit it to arithmetics only, we can check the expr using a regular 
expression, so that it only may contain digits and operators.
*/


//currying

/*
Currying is an advanced technique of working with functions. It’s used not only in 
JavaScript, but in other languages as well.

Currying is a transformation of functions that translates a function from callable as 
f(a, b, c) into callable as f(a)(b)(c).

Currying doesn’t call a function. It just transforms it.

Let’s see an example first, to better understand what we’re talking about, and then 
practical applications.

We’ll create a helper function curry(f) that performs currying for a two-argument f. 
In other words, curry(f) for two-argument f(a, b) translates it into a function that runs as f(a)(b):

 function curry(f) { // curry(f) does the currying transform
  return function(a) {
    return function(b) {
      return f(a, b);
    };
  };
}

// usage
function sum(a, b) {
  return a + b;
}

let curriedSum = curry(sum);

alert( curriedSum(1)(2) ); // 3
As you can see, the implementation is straightforward: it’s just two wrappers.

The result of curry(func) is a wrapper function(a).
When it is called like curriedSum(1), the argument is saved in the Lexical Environment, 
and a new wrapper is returned function(b).
Then this wrapper is called with 2 as an argument, and it passes the call to the original sum.

*/

/*
More advanced implementations of currying, such as _.curry from lodash library, return 
a wrapper that allows a function to be called both normally and partially:

 function sum(a, b) {
  return a + b;
}

let curriedSum = _.curry(sum); // using _.curry from lodash library

alert( curriedSum(1, 2) ); // 3, still callable normally
alert( curriedSum(1)(2) ); // 3, called partially

//_ lodash kütüphanesinden _.curry fonksiyonunu kullanarak yapilmis hali
*/

/*
Currying? What for?
To understand the benefits we need a worthy real-life example.

For instance, we have the logging function log(date, importance, message) that formats and outputs 
the information. In real projects such functions have many useful features like sending logs over
the network, here we’ll just use alert:

function log(date, importance, message) {
  alert(`[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`);
}
Let’s curry it!

log = _.curry(log);
After that log works normally:

log(new Date(), "DEBUG", "some debug"); // log(a, b, c)
…But also works in the curried form:

log(new Date())("DEBUG")("some debug"); // log(a)(b)(c)
Now we can easily make a convenience function for current logs:

// logNow will be the partial of log with fixed first argument
let logNow = log(new Date());

// use it
logNow("INFO", "message"); // [HH:mm] INFO message
Now logNow is log with fixed first argument, in other words “partially applied 
function” or “partial” for short.

We can go further and make a convenience function for current debug logs:

let debugNow = logNow("DEBUG");

debugNow("message"); // [HH:mm] DEBUG message
So:

We didn’t lose anything after currying: log is still callable normally.
We can easily generate partial functions such as for today’s logs.


*/

/*
Advanced curry implementation
In case you’d like to get in to the details, here’s the “advanced” curry implementation 
for multi-argument functions that we could use above.

It’s pretty short:

function curry(func) {

  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      }
    }
  };

}
Usage examples:

function sum(a, b, c) {
  return a + b + c;
}

let curriedSum = curry(sum);

alert( curriedSum(1, 2, 3) ); // 6, still callable normally
alert( curriedSum(1)(2,3) ); // 6, currying of 1st arg
alert( curriedSum(1)(2)(3) ); // 6, full currying
The new curry may look complicated, but it’s actually easy to understand.

The result of curry(func) call is the wrapper curried that looks like this:

// func is the function to transform
function curried(...args) {
  if (args.length >= func.length) { // (1)
    return func.apply(this, args);
  } else {
    return function(...args2) { // (2)
      return curried.apply(this, args.concat(args2));
    }
  }
};
When we run it, there are two if execution branches:

If passed args count is the same or more than the original function has in its definition 
(func.length) , then just pass the call to it using func.apply.
Otherwise, get a partial: we don’t call func just yet. Instead, another wrapper is returned, 
that will re-apply curried providing previous arguments together with the new ones.
Then, if we call it, again, we’ll get either a new partial (if not enough arguments) or, 
finally, the result.

Fixed-length functions only
The currying requires the function to have a fixed number of arguments.

A function that uses rest parameters, such as f(...args), can’t be curried this way.

A little more than currying
By definition, currying should convert sum(a, b, c) into sum(a)(b)(c).

But most implementations of currying in JavaScript are advanced, as described: they also
 keep the function callable in the multi-argument variant.


*/

/*
Currying is a transform that makes f(a,b,c) callable as f(a)(b)(c). JavaScript implementations 
usually both keep the function callable normally and return the partial if the arguments 
count is not enough.

Currying allows us to easily get partials. As we’ve seen in the logging example, after currying
 the three argument universal function log(date, importance, message) gives us partials when 
 called with one argument (like log(date)) or two arguments (like log(date, importance)).


*/

/*

Kısmi uygulama (Partial Application): Bir fonksiyonun bazı argümanlarını önceden 
sabitleyip, kalanlarını daha sonra verebilmenizi sağlar. Böylece, tekrar tekrar aynı
 argümanları yazmak yerine, sabitlenmiş fonksiyonlar oluşturabilirsiniz.
Kodun yeniden kullanılabilirliğini ve okunabilirliğini artırır.
Fonksiyonel zincirleme ve kompozisyonu kolaylaştırır.
curry(func): Herhangi bir fonksiyonu alır ve onu currying uygulanmış bir fonksiyona dönüştürür.
curried(...args): Fonksiyonun argümanlarını alır.
Eğer argüman sayısı yeterliyse (args.length >= func.length), fonksiyon normal şekilde çağrılır.
Yeterli değilse, yeni bir fonksiyon döner ve kalan argümanları bekler.
Bu sayede hem normal çağrı (f(a, b, c)) hem de kısmi çağrı (f(a)(b)(c) veya f(a, b)(c)) mümkündür.

*/

/*
UI Frameworkleri: React, Vue gibi frameworklerde event handler, selector, middleware gibi alanlarda.
Validation ve Data Transformation: Form validasyonu, veri dönüştürme işlemlerinde.
Logging ve Analytics: Sık kullanılan parametrelerle log fonksiyonları oluşturmak için.
API ve Network Katmanı: Sabit endpoint veya method ile kısmi fonksiyonlar üretmek için.

*/

/*
Kodunuzu daha modüler ve okunabilir yapar.
Tekrar eden kodu azaltır.
Fonksiyonel programlama teknikleriyle uyumlu hale getirir.
Özellikle büyük projelerde, kodun bakımını ve test edilmesini kolaylaştırır.

*/


/*
Fonksiyonu parça parça çağırmak kolaylık sağlar.
Özellikle bazı değerler sabitken, diğerlerini sonradan eklemek istediğimizde çok işe yarar.

*/

/*
function selamla(isim, mesaj) {
  console.log(isim + ": " + mesaj);
}


function currySelamla(isim) {
  return function(mesaj) {
    console.log(isim + ": " + mesaj);
  }
}

let ahmetSelamla = currySelamla("Ahmet");
ahmetSelamla("Günaydın!"); // Ahmet: Günaydın!
ahmetSelamla("Nasılsın?"); // Ahmet: Nasılsın?

Burada “Ahmet” sabit, mesajı sonradan ekliyoruz. Yani fonksiyonu parça parça kullanabiliyoruz.
Currying, fonksiyonu tek seferde değil, parça parça çağırmamızı sağlar.
Özellikle bazı değerler sabitken, diğerlerini sonradan eklemek için kullanılır.
Kodun tekrarını azaltır, daha esnek ve okunabilir hale getirir.
Kısaca: Currying, bir fonksiyonu “adım adım” çağırmak demektir.

*/


//Reference Type

/*
A dynamically evaluated method call can lose this.

For instance:

 let user = {
  name: "John",
  hi() { alert(this.name); },
  bye() { alert("Bye"); }
};

user.hi(); // works

// now let's call user.hi or user.bye depending on the name
(user.name == "John" ? user.hi : user.bye)(); // Error!
On the last line there is a conditional operator that chooses either 
user.hi or user.bye. In this case the result is user.hi.

Then the method is immediately called with parentheses (). But it doesn’t work correctly!

As you can see, the call results in an error, because the value of "this"
 inside the call becomes undefined.

This works (object dot method):

user.hi();
This doesn’t (evaluated method):

(user.name == "John" ? user.hi : user.bye)(); // Error!
Why? If we want to understand why it happens, let’s get under the hood of 
how obj.method() call works.



*/

/*
let user = {
  name: "John",
  go: function() { alert(this.name) }
}

(user.go)() // error!
The error message in most browsers does not give us much of a clue about what went wrong.

The error appears because a semicolon is missing after user = {...}.

JavaScript does not auto-insert a semicolon before a bracket (user.go)(), so it reads the code like:

let user = { go:... }(user.go)()
Then we can also see that such a joint expression is syntactically a call of the
 object { go: ... } as a function with the argument (user.go). And that also happens on 
 the same line with let user, so the user object has not yet even been defined, hence the error.

If we insert the semicolon, all is fine:

 let user = {
  name: "John",
  go: function() { alert(this.name) }
};

(user.go)() // John
Please note that parentheses around (user.go) do nothing here. Usually they setup the order 
of operations, but here the dot . works first anyway, so there’s no effect. Only the semicolon thing matters.
*/

/*
let obj, method;

obj = {
  go: function() { alert(this); }
};

obj.go();               // (1) [object Object]

(obj.go)();             // (2) [object Object]

(method = obj.go)();    // (3) undefined

(obj.go || obj.stop)(); // (4) undefined
solution
Here’s the explanations.

That’s a regular object method call.

The same, parentheses do not change the order of operations here, the dot is first anyway.

Here we have a more complex call (expression)(). The call works as if it were split into two lines:

f = obj.go; // calculate the expression
f();        // call what we have
Here f() is executed as a function, without this.

The similar thing as (3), to the left of the parentheses () we have an expression.

To explain the behavior of (3) and (4) we need to recall that property accessors 
(dot or square brackets) return a value of the Reference Type.

Any operation on it except a method call (like assignment = or ||) turns it into 
an ordinary value, which does not carry the information allowing to set this.



*/

/*
JavaScript’te bir nesne metodu çağırırken (ör: user.hi()), fonksiyonun içinde this otomatik
 olarak o nesneyi (user) gösterir. Yani:
let user = {
  name: "John",
  hi() { alert(this.name); }
};

user.hi(); // "John" gösterir, çünkü this = user


Burada her şey yolunda.

Ama şu kodda hata olur:
let hi = user.hi;
hi(); // HATA! Çünkü this artık user değil, undefined

Burada, fonksiyonu bir değişkene atadık. Artık fonksiyonun "bağlamı" (this) kayboldu.

Dinamik çağrıda da aynı sorun:
(user.name == "John" ? user.hi : user.bye)(); // HATA!

Burada, önce bir fonksiyon seçiyoruz (user.hi veya user.bye), sonra hemen çağırıyoruz. 
Ama bu seçme işlemi, fonksiyonu nesneden koparıyor ve this kayboluyor.

JavaScript’in iç mekanizmasında, user.hi gibi bir erişim aslında özel bir "Reference 
Type" döndürür. Bu tip, hem fonksiyonu hem de hangi nesneden geldiğini (user) saklar.
Sonra, hemen parantezle çağırırsak (user.hi()), JavaScript bu bilgiyi kullanır ve this’i 
doğru şekilde ayarlar.

Ama fonksiyonu bir değişkene atarsak (let hi = user.hi), Reference Type kaybolur, elimizde 
sadece fonksiyon kalır ve this artık yoktur.

let obj = {
  go: function() { alert(this); }
};

obj.go();               // (1) this = obj, çalışır
(obj.go)();             // (2) yine this = obj, çalışır
(method = obj.go)();    // (3) this = undefined, çalışmaz
(obj.go || obj.stop)(); // (4) this = undefined, çalışmaz
(1) ve (2): Doğrudan nesne üzerinden çağrı, this doğru. (3) ve (4): Fonksiyon nesneden 
koparıldı, this kayboldu.

Bir fonksiyonu nesne üzerinden çağırırsan (obj.go()), this doğru olur.
Fonksiyonu bir değişkene atarsan veya bir işlemle koparırsan (let f = obj.go; f();), this kaybolur.
JavaScript’in iç mekanizması, nesneyle birlikte çağrılan fonksiyonlarda "Reference Type" 
ile this bilgisini taşır. Ama başka bir işlem yaparsan bu bilgi kaybolur.

Eğer fonksiyonu nesneden koparıyorsan, bind ile this’i sabitleyebilirsin:
let hi = user.hi.bind(user);
hi(); // Artık this = user

*/



//Unicode, String internals

/*
As we already know, JavaScript strings are based on Unicode: each character is 
represented by a byte sequence of 1-4 bytes.

JavaScript allows us to insert a character into a string by specifying its hexadecimal 
Unicode code with one of these three notations:

\xXX

XX must be two hexadecimal digits with a value between 00 and FF, then \xXX is the 
character whose Unicode code is XX.

Because the \xXX notation supports only two hexadecimal digits, it can be used only 
for the first 256 Unicode characters.

These first 256 characters include the Latin alphabet, most basic syntax characters,
 and some others. For example, "\x7A" is the same as "z" (Unicode U+007A).

 alert( "\x7A" ); // z
alert( "\xA9" ); // ©, the copyright symbol
\uXXXX XXXX must be exactly 4 hex digits with the value between 0000 and FFFF, 
then \uXXXX is the character whose Unicode code is XXXX.

Characters with Unicode values greater than U+FFFF can also be represented with this 
notation, but in this case, we will need to use a so called surrogate pair (we will 
talk about surrogate pairs later in this chapter).

 alert( "\u00A9" ); // ©, the same as \xA9, using the 4-digit hex notation
alert( "\u044F" ); // я, the Cyrillic alphabet letter
alert( "\u2191" ); // ↑, the arrow up symbol
\u{X…XXXXXX}

X…XXXXXX must be a hexadecimal value of 1 to 6 bytes between 0 and 10FFFF (the highest
 code point defined by Unicode). This notation allows us to easily represent all 
 existing Unicode characters.

 alert( "\u{20331}" ); // 佫, a rare Chinese character (long Unicode)
alert( "\u{1F60D}" ); // 😍, a smiling face symbol (another long Unicode)

*/

/*
Surrogate pairs
All frequently used characters have 2-byte codes (4 hex digits). Letters in most
 European languages,
 numbers, and the basic unified CJK ideographic sets (CJK – from Chinese, Japanese, and
  Korean writing systems), have a 2-byte representation.

Initially, JavaScript was based on UTF-16 encoding that only allowed 2 bytes per character. 
But 2 bytes only allow 65536 combinations and that’s not enough for every possible symbol of Unicode.

So rare symbols that require more than 2 bytes are encoded with a pair of 2-byte characters 
called “a surrogate pair”.

As a side effect, the length of such symbols is 2:

 alert( '𝒳'.length ); // 2, MATHEMATICAL SCRIPT CAPITAL X
alert( '😂'.length ); // 2, FACE WITH TEARS OF JOY
alert( '𩷶'.length ); // 2, a rare Chinese character
That’s because surrogate pairs did not exist at the time when JavaScript was created, and
 thus are not correctly processed by the language!

We actually have a single symbol in each of the strings above, but the length property shows a length of 2.

Getting a symbol can also be tricky, because most language features treat surrogate pairs as two characters.

For example, here we can see two odd characters in the output:

 alert( '𝒳'[0] ); // shows strange symbols...
alert( '𝒳'[1] ); // ...pieces of the surrogate pair
Pieces of a surrogate pair have no meaning without each other. So the alerts in the 
example above actually display garbage.

Technically, surrogate pairs are also detectable by their codes: if a character has the 
code in the interval of 0xd800..0xdbff, then it is the first part of the surrogate pair. 
The next character (second part) must have the code in interval 0xdc00..0xdfff. These 
intervals are reserved exclusively for surrogate pairs by the standard.


So the methods String.fromCodePoint and str.codePointAt were added in JavaScript to deal 
with surrogate pairs.

They are essentially the same as String.fromCharCode and str.charCodeAt, but they treat
 surrogate pairs correctly.

One can see the difference here:

 // charCodeAt is not surrogate-pair aware, so it gives codes for the 1st part of 𝒳:

alert( '𝒳'.charCodeAt(0).toString(16) ); // d835

// codePointAt is surrogate-pair aware
alert( '𝒳'.codePointAt(0).toString(16) ); // 1d4b3, reads both parts of the surrogate pair
That said, if we take from position 1 (and that’s rather incorrect here), then they both 
return only the 2nd part of the pair:

 alert( '𝒳'.charCodeAt(1).toString(16) ); // dcb3
alert( '𝒳'.codePointAt(1).toString(16) ); // dcb3
// meaningless 2nd half of the pair
You will find more ways to deal with surrogate pairs later in the chapter Iterables. There 
are probably special libraries for that too, but nothing famous enough to suggest here.

Takeaway: splitting strings at an arbitrary point is dangerous
We can’t just split a string at an arbitrary position, e.g. take str.slice(0, 4) and expect 
it to be a valid string, e.g.:

 alert( 'hi 😂'.slice(0, 4) ); //  hi [?]
Here we can see a garbage character (first half of the smile surrogate pair) in the output.

Just be aware of it if you intend to reliably work with surrogate pairs. May not be a big 
problem, but at least you should understand what happens.
*/

/*
Diacritical marks and normalization
In many languages, there are symbols that are composed of the base character with
 a mark above/under it.

For instance, the letter a can be the base character for these characters: àáâäãåā.

Most common “composite” characters have their own code in the Unicode table. But not
 all of them, because there are too many possible combinations.

To support arbitrary compositions, the Unicode standard allows us to use several Unicode
 characters: the base character followed by one or many “mark” characters that “decorate” it.

For instance, if we have S followed by the special “dot above” character (code \u0307), 
it is shown as Ṡ.

 alert( 'S\u0307' ); // Ṡ
If we need an additional mark above the letter (or below it) – no problem, just add 
the necessary mark character.

For instance, if we append a character “dot below” (code \u0323), then we’ll have 
“S with dots above and below”: Ṩ.

For example:

 alert( 'S\u0307\u0323' ); // Ṩ
This provides great flexibility, but also an interesting problem: two characters may
 visually look the same, but be represented with different Unicode compositions.

For instance:

 let s1 = 'S\u0307\u0323'; // Ṩ, S + dot above + dot below
let s2 = 'S\u0323\u0307'; // Ṩ, S + dot below + dot above

alert( `s1: ${s1}, s2: ${s2}` );

alert( s1 == s2 ); // false though the characters look identical (?!)
To solve this, there exists a “Unicode normalization” algorithm that brings each 
string to the single “normal” form.

It is implemented by str.normalize().

 alert( "S\u0307\u0323".normalize() == "S\u0323\u0307".normalize() ); // true
It’s funny that in our situation normalize() actually brings together a sequence of 
3 characters to one: \u1e68 (S with two dots).

 alert( "S\u0307\u0323".normalize().length ); // 1

alert( "S\u0307\u0323".normalize() == "\u1e68" ); // true
In reality, this is not always the case. The reason is that the symbol Ṩ is “common enough”,
 so Unicode creators included it in the main table and gave it the code.

If you want to learn more about normalization rules and variants – they are described in 
the appendix of the Unicode standard: Unicode Normalization Forms, but for most practical 
purposes the information from this section is enough.




*/


/*
WeakRef and FinalizationRegistry
//  the user variable holds a strong reference to the object
let user = { name: "John" };

// copied the strong reference to the object into the admin variable
let admin = user;

// let's overwrite the value of the user variable
user = null;

// the object is still reachable through the admin variable
The object { name: "John" } would only be deleted from memory if there were no 
strong references to it (if we also overwrote the value of the admin variable).

In JavaScript, there is a concept called WeakRef, which behaves slightly differently in this case.

Terms: “Strong reference”, “Weak reference”
Strong reference – is a reference to an object or value, that prevents them from 
being deleted by the garbage collector. Thereby, keeping the object or value in
 memory, to which it points.

This means, that the object or value remains in memory and is not collected by 
the garbage collector as long, as there are active strong references to it.

In JavaScript, ordinary references to objects are strong references. For example:

// the user variable holds a strong reference to this object
let user = { name: "John" };
Weak reference – is a reference to an object or value, that does not prevent them 
from being deleted by the garbage collector. An object or value can be deleted by 
the garbage collector if, the only remaining references to them are weak references.


*/

/*
WeakRef – is an object, that contains a weak reference to another object, 
called target or referent.

The peculiarity of WeakRef is that it does not prevent the garbage collector from 
deleting its referent-object. In other words, a WeakRef object does not keep the 
referent object alive.

Now let’s take the user variable as the “referent” and create a weak reference from 
it to the admin variable. To create a weak reference, you need to use the WeakRef 
constructor, passing in the target object (the object you want a weak reference to).

In our case — this is the user variable:

//  the user variable holds a strong reference to the object
let user = { name: "John" };

//  the admin variable holds a weak reference to the object
let admin = new WeakRef(user);
The diagram below depicts two types of references: a strong reference using the user 
variable and a weak reference using the admin variable:
Then, at some point, we stop using the user variable – it gets overwritten, goes out 
of scope, etc., while keeping the WeakRef instance in the admin variable:

// let's overwrite the value of the user variable
user = null;
A weak reference to an object is not enough to keep it “alive”. When the only remaining 
references to a referent-object are weak references, the garbage collector is free to
 destroy this object and use its memory for something else.

However, until the object is actually destroyed, the weak reference may return it, even 
if there are no more strong references to this object. That is, our object becomes 
a kind of “Schrödinger’s cat” – we cannot know for sure whether it’s “alive” or “dead”:
At this point, to get the object from the WeakRef instance, we will use its deref() method.

The deref() method returns the referent-object that the WeakRef points to, if the object 
is still in memory. If the object has been deleted by the garbage collector, then the
deref() method will return undefined:

let ref = admin.deref();

if (ref) {
  // the object is still accessible: we can perform any manipulations with it
} else {
  // the object has been collected by the garbage collector
}


*/

/*
JavaScript’te nesneler bellekte tutulur. Bir nesneye “güçlü referans” varsa (örneğin 
bir değişkende tutuluyorsa), çöp toplayıcı (garbage collector) onu silmez. Ama “zayıf
 referans” (weak reference) varsa, nesneye erişim devam edebilir ama çöp toplayıcı onu
  istediği zaman silebilir.
Güçlü Referans
let user = { name: "Ahmet" };
let admin = user; // admin da aynı nesneyi gösteriyor

user = null; // user artık nesneyi göstermiyor
// admin hâlâ nesneyi gösterdiği için nesne silinmez

Zayıf Referans (WeakRef)
let user = { name: "Ahmet" };
let admin = new WeakRef(user); // admin artık zayıf referans

user = null; // güçlü referans kalmadı
// Nesne, çöp toplayıcı tarafından silinebilir!

WeakRef ile Nesneye Erişim
WeakRef ile nesneye erişmek için .deref() metodu kullanılır. Eğer nesne hâlâ 
bellekteyse, onu döndürür; silindiyse undefined döner.
let ref = admin.deref();

if (ref) {
  // Nesne hâlâ erişilebilir, işlemler yapılabilir
} else {
  // Nesne çöp toplayıcı tarafından silinmiş
}

Büyük veri yapılarında, cache (önbellek) tutarken, gereksiz nesnelerin otomatik silinmesini sağlamak için.
DOM elemanları veya event handler’lar ile çalışırken, bellek sızıntısını önlemek için.


*/

/*
WeakRef use cases
WeakRef is typically used to create caches or associative arrays that store resource-intensive 
objects. This allows one to avoid preventing these objects from being collected by the garbage 
collector solely based on their presence in the cache or associative array.

One of the primary examples – is a situation when we have numerous binary image objects (for 
instance, represented as ArrayBuffer or Blob), and we want to associate a name or path with
 each image. Existing data structures are not quite suitable for these purposes:

Using Map to create associations between names and images, or vice versa, will keep the image 
objects in memory since they are present in the Map as keys or values.
WeakMap is ineligible for this goal either: because the objects represented as WeakMap keys 
use weak references, and are not protected from deletion by the garbage collector.
But, in this situation, we need a data structure that would use weak references in its values.

For this purpose, we can use a Map collection, whose values are WeakRef instances referring 
to the large objects we need. Consequently, we will not keep these large and unnecessary objects
 in memory longer than they should be.

Otherwise, this is a way to get the image object from the cache if it is still reachable. If 
it has been garbage collected, we will re-generate or re-download it again.

This way, less memory is used in some situations.


WeakRef, genellikle kaynak yoğun nesneleri depolayan önbellekler veya ilişkisel diziler oluşturmak
 için kullanılır. Bu, yalnızca önbellekteki veya ilişkisel dizideki varlıklarına dayanarak bu 
 nesnelerin çöp toplayıcı tarafından toplanmasını engellemeyi önler.

Öncelikli örneklerden biri, çok sayıda ikili görüntü nesnemizin (örneğin, ArrayBuffer veya Blob
 olarak temsil edilen) olduğu ve her bir görüntüyle bir ad veya yol ilişkilendirmek istediğimiz 
 bir durumdur. Mevcut veri yapıları bu amaçlar için pek uygun değildir:

Adlar ve görüntüler arasında ilişki oluşturmak için Map kullanmak veya tam tersi, görüntü nesnelerini 
Map'te anahtar veya değer olarak bulundukları için bellekte tutar.
WeakMap bu amaç için de uygun değildir: çünkü WeakMap anahtarları olarak temsil edilen nesneler zayıf 
referanslar kullanır ve çöp toplayıcı tarafından silinmeye karşı korunmazlar.
Ancak bu durumda, değerlerinde zayıf referanslar kullanacak bir veri yapısına ihtiyacımız vardır.

Bu amaçla, değerleri ihtiyacımız olan büyük nesnelere atıfta bulunan WeakRef örnekleri olan bir Map 
koleksiyonu kullanabiliriz. Dolayısıyla, bu büyük ve gereksiz nesneleri bellekte olması gerekenden 
daha uzun süre tutmayacağız.

Aksi takdirde, bu, hala erişilebilir durumdaysa görüntü nesnesini önbellekten almanın bir yoludur. 
Çöp toplama işlemi uygulanmışsa, yeniden oluşturur veya yeniden indiririz.

Bu şekilde, bazı durumlarda daha az bellek kullanılır.


*/


/*
Example №1: using WeakRef for caching
Below is a code snippet that demonstrates the technique of using WeakRef.

In short, we use a Map with string keys and WeakRef objects as their values. If the 
WeakRef object has not been collected by the garbage collector, we get it from the 
cache. Otherwise, we re-download it again and put it in the cache for further possible reuse:

function fetchImg() {
    // abstract function for downloading images...
}

function weakRefCache(fetchImg) { // (1)
    const imgCache = new Map(); // (2)

    return (imgName) => { // (3)
        const cachedImg = imgCache.get(imgName); // (4)

        if (cachedImg?.deref()) { // (5)
            return cachedImg?.deref();
        }

        const newImg = fetchImg(imgName); // (6)
        imgCache.set(imgName, new WeakRef(newImg)); // (7)

        return newImg;
    };
}

const getCachedImg = weakRefCache(fetchImg);
Let’s delve into the details of what happened here:

weakRefCache – is a higher-order function that takes another function, fetchImg, as an 
'argument. In this example, we can neglect a detailed description of the fetchImg function, 
since it can be any logic for downloading images.
imgCache – is a cache of images, that stores cached results of the fetchImg function, in 
the form of string keys (image name) and WeakRef objects as their values.
Return an anonymous function that takes the image name as an argument. This argument will 
be used as a key for the cached image.
Trying to get the cached result from the cache, using the provided key (image name).
If the cache contains a value for the specified key, and the WeakRef object has not been 
deleted by the garbage collector, return the cached result.
If there is no entry in the cache with the requested key, or deref() method returns undefined 
(meaning that the WeakRef object has been garbage collected), the fetchImg function downloads the image again.
Put the downloaded image into the cache as a WeakRef object.
Now we have a Map collection, where the keys – are image names as strings, and values – 
are WeakRef objects containing the images themselves.

This technique helps to avoid allocating a large amount of memory for resource-intensive 
objects, that nobody uses anymore. It also saves memory and time in case of reusing cached objects.

But, this implementation has its drawbacks: over time, Map will be filled with strings as keys,
 that point to a WeakRef, whose referent-object has already been garbage collected:
Ancak bu uygulamanın dezavantajları da var: Zamanla, Map, referans nesnesi zaten çöp toplanmış 
olan bir WeakRef'i işaret eden anahtarlar olarak dizelerle doldurulacak:
One way to handle this problem – is to periodically scavenge the cache and clear out “dead” entries. 
Another way – is to use finalizers, which we will explore next.

Bu sorunu çözmenin bir yolu, önbelleği düzenli olarak tarayıp "boş" girdileri temizlemektir. Bir 
diğer yol ise, birazdan inceleyeceğimiz sonlandırıcıları kullanmaktır.


*/

/*
Example №2: Using WeakRef to track DOM objects
Another use case for WeakRef – is tracking DOM objects.

Let’s imagine a scenario where some third-party code or library interacts with 
elements on our page as long as they exist in the DOM. For example, it could 
be an external utility for monitoring and notifying about the system’s state 
(commonly so-called “logger” – a program that sends informational messages called “logs”).

Interactive example:

index.js
const startMessagesBtn = document.querySelector('.start-messages'); // (1)
const closeWindowBtn = document.querySelector('.window__button'); // (2)
const windowElementRef = new WeakRef(document.querySelector(".window__body")); // (3)

startMessagesBtn.addEventListener('click', () => { // (4)
    startMessages(windowElementRef);
    startMessagesBtn.disabled = true;
});

closeWindowBtn.addEventListener('click', () =>  document.querySelector(".window__body").remove()); // (5)


const startMessages = (element) => {
    const timerId = setInterval(() => { // (6)
        if (element.deref()) { // (7)
            const payload = document.createElement("p");
            payload.textContent = `Message: System status OK: ${new Date().toLocaleTimeString()}`;
            element.deref().append(payload);
        } else { // (8)
            alert("The element has been deleted."); // (9)
            clearInterval(timerId);
        }
    }, 1000);
};



*/

/*
When the “Start sending messages” button is clicked, in the so-called “logs display window” 
(an element with the .window__body class), messages (logs) start to appear.
But, as soon as this element is deleted from the DOM, the logger should stop sending messages. 
To reproduce the removal of this element, just click the “Close” button in the top right corner.
In order not to complicate our work, and not to notify third-party code every time our 
DOM-element is available, and when it is not, it will be enough to create a weak reference to it using WeakRef.
Once the element is removed from the DOM, the logger will notice it and stop sending messages.
Now let’s take a closer look at the source code (tab index.js):
Get the DOM-element of the “Start sending messages” button.
Get the DOM-element of the “Close” button.
Get the DOM-element of the logs display window using the new WeakRef() constructor. 
This way, the windowElementRef variable holds a weak reference to the DOM-element.
Add an event listener on the “Start sending messages” button, responsible for starting 
the logger when clicked.
Add an event listener on the “Close” button, responsible for closing the logs display
 window when clicked.
Use setInterval to start displaying a new message every second.
If the DOM-element of the logs display window is still accessible and kept in memory,
 create and send a new message.
If the deref() method returns undefined, it means that the DOM-element has been deleted 
from memory. In this case, the logger stops displaying messages and clears the timer.
alert, which will be called, after the DOM-element of the logs display window is deleted
 from memory (i.e. after clicking the “Close” button). Note, that deletion from memory may 
 not happen immediately, as it depends only on the internal mechanisms of the garbage collector.
We cannot control this process directly from the code. However, despite this, we still have 
the option to force garbage collection from the browser.
In Google Chrome, for example, to do this, you need to open the developer tools 
(Ctrl + Shift + J on Windows/Linux or Option + ⌘ + J on macOS), go to the “Performance” tab,
 and click on the bin icon button – “Collect garbage”:
Image "/article/weakref-finalizationregistry/google-chrome-developer-tools.png" is corrupted
This functionality is supported in most modern browsers. After the actions are taken,
 the alert will trigger immediately.
"Mesaj göndermeye başla" düğmesine tıklandığında, "günlük görüntüleme penceresi" (.window__body
 sınıfına sahip bir öğe) olarak adlandırılan pencerede mesajlar (günlükler) görünmeye başlar.
Ancak, bu öğe DOM'dan silinir silinmez, günlük kaydedici mesaj göndermeyi durdurmalıdır. 
Bu öğenin silinmesini tekrarlamak için, sağ üst köşedeki "Kapat" düğmesine tıklamanız yeterlidir.
İşimizi zorlaştırmamak ve DOM öğemiz her kullanılabilir olduğunda ve olmadığında üçüncü 
taraf kodlarını bilgilendirmemek için, WeakRef kullanarak ona zayıf bir referans oluşturmak yeterli olacaktır.
Öğe DOM'dan kaldırıldıktan sonra, günlük kaydedici bunu fark edecek ve mesaj göndermeyi durduracaktır.
Şimdi kaynak koduna daha yakından bakalım (sekme index.js):
"Mesaj göndermeye başla" düğmesinin DOM öğesini alın.
"Kapat" düğmesinin DOM öğesini alın.
Yeni WeakRef() oluşturucusunu kullanarak günlük görüntüleme penceresinin DOM öğesini alın. 
Bu şekilde, windowElementRef değişkeni DOM öğesine zayıf bir referans tutar.
"Mesaj göndermeye başla" düğmesine tıklandığında günlük kaydediciyi başlatmaktan sorumlu 
bir olay dinleyicisi ekleyin.
"Kapat" düğmesine tıklandığında günlük görüntüleme penceresini kapatmaktan sorumlu 
bir olay dinleyicisi ekleyin.
Her saniye yeni bir mesaj görüntülemeye başlamak için setInterval kullanın.
Günlük görüntüleme penceresinin DOM öğesi hala erişilebilir durumdaysa ve bellekte 
tutuluyorsa, yeni bir mesaj oluşturun ve gönderin.
deref() yöntemi tanımsız döndürürse, bu DOM öğesinin bellekten silindiği anlamına 
gelir. Bu durumda, günlük kaydedici mesajları görüntülemeyi durdurur ve zamanlayıcıyı temizler.
Günlük görüntüleme penceresinin DOM öğesi bellekten silindikten sonra (yani "Kapat" 
düğmesine tıklandıktan sonra) çağrılacak olan uyarı. Bellekten silme işleminin, yalnızca 
çöp toplayıcının dahili mekanizmalarına bağlı olduğundan, hemen gerçekleşmeyebileceğini unutmayın.
Bu işlemi doğrudan koddan kontrol edemeyiz. Ancak buna rağmen, tarayıcıdan çöp toplamayı

*/

//FinalizationRegistry

/*
Cleanup callback (finalizer) – is a function that is executed, when an object, 
registered in the FinalizationRegistry, is deleted from memory by the garbage collector.

Its purpose – is to provide the ability to perform additional operations, related to 
the object, after it has been finally deleted from memory.

Registry (or FinalizationRegistry) – is a special object in JavaScript that manages the 
registration and unregistration of objects and their cleanup callbacks.

This mechanism allows registering an object to track and associate a cleanup callback
 with it. Essentially it is a structure that stores information about registered objects 
 and their cleanup callbacks, and then automatically invokes those callbacks when the 
 objects are deleted from memory.

To create an instance of the FinalizationRegistry, it needs to call its constructor, 
which takes a single argument – the cleanup callback (finalizer).


*/

/*
function cleanupCallback(heldValue) {
  // cleanup callback code
}

const registry = new FinalizationRegistry(cleanupCallback);
Here:

cleanupCallback – a cleanup callback that will be automatically called when a registered 
object is deleted from memory.
heldValue – the value that is passed as an argument to the cleanup callback. If heldValue
 is an object, the registry keeps a strong reference to it.
registry – an instance of FinalizationRegistry.
FinalizationRegistry methods:

register(target, heldValue [, unregisterToken]) – used to register objects in the registry.

target – the object being registered for tracking. If the target is garbage collected, the 
cleanup callback will be called with heldValue as its argument.

Optional unregisterToken – an unregistration token. It can be passed to unregister an object 
before the garbage collector deletes it. Typically, the target object is used as unregisterToken,
 which is the standard practice.

unregister(unregisterToken) – the unregister method is used to unregister an object from the 
registry. It takes one argument – unregisterToken (the unregister token that was obtained when
 registering the object).

Now let’s move on to a simple example. Let’s use the already-known user object and create an
 instance of FinalizationRegistry:

let user = { name: "John" };

const registry = new FinalizationRegistry((heldValue) => {
  console.log(`${heldValue} has been collected by the garbage collector.`);
});
Then, we will register the object, that requires a cleanup callback by calling the register method:

registry.register(user, user.name);
The registry does not keep a strong reference to the object being registered, as this would 
defeat its purpose. If the registry kept a strong reference, then the object would never be 
garbage collected.

If the object is deleted by the garbage collector, our cleanup callback may be called at some 
point in the future, with the heldValue passed to it:

// When the user object is deleted by the garbage collector, the following message will be 
// printed in the console:
"John has been collected by the garbage collector."
There are also situations where, even in implementations that use a cleanup callback, there
 is a chance that it will not be called.

For example:

When the program fully terminates its operation (for example, when closing a tab in a browser).
When the FinalizationRegistry instance itself is no longer reachable to JavaScript code. If 
the object that creates the FinalizationRegistry instance goes out of scope or is deleted, 
the cleanup callbacks registered in that registry might also not be invoked.
*/

/*
Caching with FinalizationRegistry
Returning to our weak cache example, we can notice the following:

Even though the values wrapped in the WeakRef have been collected by the garbage collector, 
there is still an issue of “memory leakage” in the form of the remaining keys, whose values 
have been collected by the garbage collector.
Here is an improved caching example using FinalizationRegistry:

function fetchImg() {
  // abstract function for downloading images...
}

function weakRefCache(fetchImg) {
  const imgCache = new Map();

  const registry = new FinalizationRegistry((imgName) => { // (1)
    const cachedImg = imgCache.get(imgName);
    if (cachedImg && !cachedImg.deref()) imgCache.delete(imgName);
  });

  return (imgName) => {
    const cachedImg = imgCache.get(imgName);

    if (cachedImg?.deref()) {
      return cachedImg?.deref();
    }

    const newImg = fetchImg(imgName);
    imgCache.set(imgName, new WeakRef(newImg));
    registry.register(newImg, imgName); // (2)

    return newImg;
  };
}

const getCachedImg = weakRefCache(fetchImg);
To manage the cleanup of “dead” cache entries, when the associated WeakRef objects are 
collected by the garbage collector, we create a FinalizationRegistry cleanup registry.

The important point here is, that in the cleanup callback, it should be checked, if the 
entry was deleted by the garbage collector and not re-added, in order not to delete a “live” entry.

Once the new value (image) is downloaded and put into the cache, we register it in the
 finalizer registry to track the WeakRef object.

This implementation contains only actual or “live” key/value pairs. In this case, each
 WeakRef object is registered in the FinalizationRegistry. And after the objects are
  cleaned up by the garbage collector, the cleanup callback will delete all undefined values.
*/

/*
A key aspect of the updated implementation is that finalizers allow parallel processes to be 
created between the “main” program and cleanup callbacks. In the context of JavaScript, the 
“main” program – is our JavaScript-code, that runs and executes in our application or web page.

Hence, from the moment an object is marked for deletion by the garbage collector, and to the 
actual execution of the cleanup callback, there may be a certain time gap. It is important to 
understand that during this time gap, the main program can make any changes to the object or 
even bring it back to memory.

That’s why, in the cleanup callback, we must check to see if an entry has been added back to 
the cache by the main program to avoid deleting “live” entries. Similarly, when searching for
 a key in the cache, there is a chance that the value has been deleted by the garbage collector, 
 but the cleanup callback has not been executed yet.

Such situations require special attention if you are working with FinalizationRegistry.


*/

/*
Using WeakRef and FinalizationRegistry in practice
Moving from theory to practice, imagine a real-life scenario, where a user synchronizes their
 photos on a mobile device with some cloud service (such as iCloud or Google Photos), and wants 
 to view them from other devices. In addition to the basic functionality of viewing photos,
  such services offer a lot of additional features, for example:

Photo editing and video effects.
Creating “memories” and albums.
Video montage from a series of photos.
…and much more.
Here, as an example, we will use a fairly primitive implementation of such a service. The main 
point – is to show a possible scenario of using WeakRef and FinalizationRegistry together in real life.
Here is what it looks like:
Image "/article/weakref-finalizationregistry/weakref-finalizationregistry-demo-01.png" is corrupted
On the left side, there is a cloud library of photos (they are displayed as thumbnails). We can 
select the images we need and create a collage, by clicking the "Create collage" button on the 
right side of the page. Then, the resulting collage can be downloaded as an image.
To increase page loading speed, it would be reasonable to download and display photo thumbnails 
in compressed quality. But, to create a collage from selected photos, download and use them in full-size quality.
Below, we can see, that the intrinsic size of the thumbnails is 240x240 pixels. The size was
 chosen on purpose to increase loading speed. Moreover, we do not need full-size photos in preview mode.
Image "/article/weakref-finalizationregistry/weakref-finalizationregistry-demo-02.png" is corrupted
Let's assume, that we need to create a collage of 4 photos: we select them, and then click the
 "Create collage" button. At this stage, the already known to us weakRefCache function checks 
 whether the required image is in the cache. If not, it downloads it from the cloud and puts it 
 in the cache for further use. This happens for each selected image:
Image "/article/weakref-finalizationregistry/weakref-finalizationregistry-demo-03.gif" is corrupted
Paying attention to the output in the console, you can see, which of the photos were downloaded 
from the cloud – this is indicated by FETCHED_IMAGE. Since this is the first attempt to create
 a collage, this means, that at this stage the “weak cache” was still empty, and all the photos
  were downloaded from the cloud and put in it.
But, along with the process of downloading images, there is also a process of memory cleanup by
 the garbage collector. This means, that the object stored in the cache, which we refer to, using
 a weak reference, is deleted by the garbage collector. And our finalizer executes successfully,
  thereby deleting the key, by which the image was stored in the cache. CLEANED_IMAGE notifies us about it:
Image "/article/weakref-finalizationregistry/weakref-finalizationregistry-demo-04.jpg" is corrupted
Next, we realize that we do not like the resulting collage, and decide to change one of the 
images and create a new one. To do this, just deselect the unnecessary image, select another 
one, and click the "Create collage" button again:
Image "/article/weakref-finalizationregistry/weakref-finalizationregistry-demo-05.gif" is corrupted
But this time not all images were downloaded from the network, and one of them was taken from 
the weak cache: the CACHED_IMAGE message tells us about it. This means that at the time of collage 
creation, the garbage collector had not yet deleted our image, and we boldly took it from the cache,
 thereby reducing the number of network requests and speeding up the overall time of the collage creation process:
Image "/article/weakref-finalizationregistry/weakref-finalizationregistry-demo-06.jpg" is corrupted
Let's "play around" a little more, by replacing one of the images again and creating a new collage:
Image "/article/weakref-finalizationregistry/weakref-finalizationregistry-demo-07.gif" is corrupted
This time the result is even more impressive. Of the 4 images selected, 3 of them were taken from 
the weak cache, and only one had to be downloaded from the network. The reduction in network load 
was about 75%. Impressive, isn't it?
Image "/article/weakref-finalizationregistry/weakref-finalizationregistry-demo-08.jpg" is corrupted
Of course, it is important to remember, that such behavior is not guaranteed, and depends on the 
specific implementation and operation of the garbage collector.
Based on this, a completely logical question immediately arises: why do not we use an ordinary cache,
 where we can manage its entities ourselves, instead of relying on the garbage collector? That’s right, 
 in the vast majority of cases there is no need to use WeakRef and FinalizationRegistry.
Here, we simply demonstrated an alternative implementation of similar functionality, using a non-trivial 
approach with interesting language features. Still, we cannot rely on this example, if we need a constant 
and predictable result.
WeakRef ve FinalizationRegistry'nin Pratikte Kullanımı
Teoriden pratiğe geçecek olursak, bir kullanıcının mobil cihazındaki fotoğraflarını bir bulut 
hizmetiyle (iCloud veya Google Fotoğraflar gibi) senkronize ettiği ve bunları diğer cihazlardan 
görüntülemek istediği gerçek bir senaryoyu hayal edin. Fotoğraf görüntüleme gibi temel işlevlerin
 yanı sıra, bu tür hizmetler birçok ek özellik sunar, örneğin:
Fotoğraf düzenleme ve video efektleri.
"Anılar" ve albümler oluşturma.
Bir dizi fotoğraftan video montajı.
…ve çok daha fazlası.
Burada, örnek olarak, böyle bir hizmetin oldukça ilkel bir uygulamasını kullanacağız. Asıl amaç,
 WeakRef ve FinalizationRegistry'nin gerçek hayatta birlikte kullanımına dair olası bir senaryoyu göstermektir.
İşte şöyle görünüyor:
"/article/weakref-finalizationregistry/weakref-finalizationregistry-demo-01.png" resmi bozuk
Sol tarafta, fotoğraflardan oluşan bir bulut kütüphanesi var (küçük resimler olarak görüntülenirler). 
Sayfanın sağ tarafındaki "Kolaj Oluştur" butonuna tıklayarak ihtiyacımız olan resimleri seçip bir kolaj 
oluşturabiliriz. Ardından, ortaya çıkan kolajı resim olarak indirebilirsiniz.
Sayfa yükleme hızını artırmak için, fotoğraf küçük resimlerini sıkıştırılmış kalitede indirip görüntülemek 
mantıklı olacaktır. Ancak, seçili fotoğraflardan bir kolaj oluşturmak için, bunları tam boyutlu olarak indirip kullanın.
Aşağıda, küçük resimlerin gerçek boyutunun 240x240 piksel olduğunu görebiliriz. Bu boyut, yükleme 
hızını artırmak için özel olarak seçilmiştir. Ayrıca, önizleme modunda tam boyutlu fotoğraflara ihtiyacımız yoktur.
"/article/weakref-finalizationregistry/weakref-finalizationregistry-demo-02.png" görseli bozuk
Diyelim ki 4 fotoğraftan oluşan bir kolaj oluşturmamız gerekiyor: fotoğrafları seçip "Kolaj Oluştur"
 butonuna tıklıyoruz. Bu aşamada, zaten bildiğimiz weakRefCache fonksiyonu, istenen görselin önbellekte 
 olup olmadığını kontrol eder. Değilse, buluttan indirir ve daha sonra kullanılmak üzere önbelleğe alır. 
 Bu, seçilen her görsel için geçerlidir:
"/article/weakref-finalizationregistry/weakref-finalizationregistry-demo-03.gif" görseli bozuk
Konsoldaki çıktıya dikkat ederek, hangi fotoğrafların buluttan indirildiğini görebilirsiniz; bu, 
FETCHED_IMAGE ile belirtilir. Bu, bir kolaj oluşturma girişiminin ilk adımı olduğundan, bu aşamada 
"zayıf önbellek"in hala boş olduğu ve tüm fotoğrafların buluttan indirilip buluta yüklendiği anlamına gelir.
Ancak, görsel indirme işleminin yanı sıra, çöp toplayıcı tarafından bir bellek temizleme işlemi de 
gerçekleşir. Bu, zayıf bir referans kullanarak atıfta bulunduğumuz önbellekte depolanan nesnenin çöp 
toplayıcı tarafından silindiği anlamına gelir. Sonlandırıcımız başarıyla çalışır ve böylece görselin 
önbelleğe kaydedildiği anahtarı siler. CLEANED_IMAGE bunu bize bildirir:
"/article/weakref-finalizationregistry/weakref-finalizationregistry-demo-04.jpg" görseli bozulmuş.
Sonra, ortaya çıkan kolajı beğenmediğimizi fark eder ve görsellerden birini değiştirip yeni bir tane
 oluşturmaya karar veririz. Bunu yapmak için, gereksiz görselin seçimini kaldırın, başka bir görsel 
 seçin ve "Kolaj oluştur" butonuna tekrar tıklayın:
"/article/weakref-finalizationregistry/weakref-finalizationregistry-demo-05.gif" görseli bozuk
Ancak bu sefer görsellerin tamamı ağdan indirilmemiş ve bunlardan biri zayıf önbellekten alınmış: 
CACHED_IMAGE mesajı bunu bize gösteriyor. Bu, kolaj oluşturma sırasında çöp toplayıcının henüz resmimizi 
silmediği ve biz de cesurca önbellekten aldığımız anlamına gelir; böylece ağ isteklerinin sayısı azalır 
ve kolaj oluşturma süreci genel olarak hızlanır:
"/article/weakref-finalizationregistry/weakref-finalizationregistry-demo-06.jpg" resmi bozulmuş
Resimlerden birini tekrar değiştirerek ve yeni bir kolaj oluşturarak biraz daha "oynayalım":
"/article/weakref-finalizationregistry/weakref-finalizationregistry-demo-07.gif" resmi bozulmuş
Bu sefer sonuç daha da etkileyici. Seçilen 4 resimden 3'ü zayıf önbellekten alınmış ve yalnızca birinin 
ağdan indirilmesi gerekmiş. Ağ yükündeki azalma yaklaşık %75 oldu. Etkileyici, değil mi?
"/article/weakref-finalizationregistry/weakref-finalizationregistry-demo-08.jpg" görseli bozuk
Elbette, böyle bir davranışın garanti edilmediğini ve çöp toplayıcının belirli uygulamasına ve
 işleyişine bağlı olduğunu unutmamak önemlidir.
Buna dayanarak, hemen akla gelen mantıklı bir soru şudur: Çöp toplayıcıya güvenmek yerine,
 varlıklarını kendimiz yönetebileceğimiz sıradan bir önbellek neden kullanmıyoruz? Evet, çoğu
  durumda WeakRef ve FinalizationRegistry kullanmaya gerek yoktur.
Burada, ilginç dil özelliklerine sahip, basit olmayan bir yaklaşım kullanarak benzer işlevselliğin
 alternatif bir uygulamasını gösterdik. Yine de, sabit ve öngörülebilir bir sonuca ihtiyacımız varsa, 
 bu örneğe güvenemeyiz.



*/



/*
import {
    createImageFile,
    loadImage,
    weakRefCache,
    LAYOUTS,
    images,
    THUMBNAIL_PARAMS,
    stateObj,
} from "./utils.js";

export const state = new Proxy(stateObj, {
    set(target, property, value) {
        const previousValue = target[property];

        target[property] = value;

        if (previousValue !== value) {
            handleStateChange(target);
        }

        return true;
    },
});

// Elements.
const thumbnailsContainerEl = document.querySelector(".thumbnails-container");
const selectEl = document.querySelector(".select");
const previewContainerEl = document.querySelector(".previewContainer");
const canvasEl = document.querySelector(".canvas");
const createCollageBtn = document.querySelector(".btn-create-collage");
const startOverBtn = document.querySelector(".btn-start-over");
const downloadBtn = document.querySelector(".btn-download");
const spinnerContainerEl = document.querySelector(".spinnerContainer");
const spinnerTextEl = document.querySelector(".spinnerText");
const loggerContainerEl = document.querySelector(".loggerContainer");

// Renders.
// Render thumbnails previews.
images.forEach((img) => {
    const thumbnail = document.createElement("div");
    thumbnail.classList.add("thumbnail-item");

    thumbnail.innerHTML = `
        <img src='${img.img}?${THUMBNAIL_PARAMS}' class="img">
  `;

    thumbnail.addEventListener("click", (e) => handleSelection(e, img));

    thumbnailsContainerEl.appendChild(thumbnail);
});
// Render layouts select.
LAYOUTS.forEach((layout) => {
    const option = document.createElement("option");
    option.value = JSON.stringify(layout);
    option.innerHTML = layout.name;
    selectEl.appendChild(option);
});

const handleStateChange = (state) => {
    if (state.loading) {
        selectEl.disabled = true;
        createCollageBtn.disabled = true;
        startOverBtn.disabled = true;
        downloadBtn.disabled = true;
        previewContainerEl.classList.add("previewContainer--disabled");
        spinnerContainerEl.classList.remove("spinnerContainer--hidden");
        spinnerTextEl.innerText = "Loading...";
        canvasEl.classList.remove("canvas--ready");
    } else if (!state.loading) {
        selectEl.disabled = false;
        createCollageBtn.disabled = false;
        startOverBtn.disabled = false;
        downloadBtn.disabled = false;
        previewContainerEl.classList.remove("previewContainer--disabled");
        spinnerContainerEl.classList.add("spinnerContainer--hidden");
        canvasEl.classList.add("canvas--ready");
    }

    if (!state.selectedImages.size) {
        createCollageBtn.disabled = true;
        document.querySelectorAll(".badge").forEach((item) => item.remove());
    } else if (state.selectedImages.size && !state.loading) {
        createCollageBtn.disabled = false;
    }

    if (!state.collageRendered) {
        downloadBtn.disabled = true;
    } else if (state.collageRendered) {
        downloadBtn.disabled = false;
    }
};
handleStateChange(state);

const handleSelection = (e, imgName) => {
    const imgEl = e.currentTarget;

    imgEl.classList.toggle("thumbnail-item--selected");

    if (state.selectedImages.has(imgName)) {
        state.selectedImages.delete(imgName);
        state.selectedImages = new Set(state.selectedImages);
        imgEl.querySelector(".badge")?.remove();
    } else {
        state.selectedImages = new Set(state.selectedImages.add(imgName));

        const badge = document.createElement("div");
        badge.classList.add("badge");
        badge.innerHTML = `
            <div class="check" />
        `;
        imgEl.prepend(badge);
    }
};

// Make a wrapper function.
let getCachedImage;
(async () => {
    getCachedImage = await weakRefCache(loadImage);
})();

const calculateGridRows = (blobsLength) =>
    Math.ceil(blobsLength / state.currentLayout.columns);

const drawCollage = (images) => {
    state.drawing = true;

    let context = canvasEl.getContext("2d");

    
     // Calculate canvas dimensions based on the current layout.
     
    context.canvas.width =
        state.currentLayout.itemWidth * state.currentLayout.columns;
    context.canvas.height =
        calculateGridRows(images.length) * state.currentLayout.itemHeight;

    let currentRow = 0;
    let currentCanvasDx = 0;
    let currentCanvasDy = 0;

    for (let i = 0; i < images.length; i++) {
        
         // Get current row of the collage.
         
        if (i % state.currentLayout.columns === 0) {
            currentRow += 1;
            currentCanvasDx = 0;

            if (currentRow > 1) {
                currentCanvasDy += state.currentLayout.itemHeight;
            }
        }

        context.drawImage(
            images[i],
            0,
            0,
            images[i].width,
            images[i].height,
            currentCanvasDx,
            currentCanvasDy,
            state.currentLayout.itemWidth,
            state.currentLayout.itemHeight,
        );

        currentCanvasDx += state.currentLayout.itemWidth;
    }

    state.drawing = false;
    state.collageRendered = true;
};

const createCollage = async () => {
    state.loading = true;

    const images = [];

    for (const image of state.selectedImages.values()) {
        const blobImage = await getCachedImage(image.img);

        const url = URL.createObjectURL(blobImage);
        const img = await createImageFile(url);

        images.push(img);
        URL.revokeObjectURL(url);
    }

    state.loading = false;

    drawCollage(images);
};


 // Clear all settled data to start over.
 
const startOver = () => {
    state.selectedImages = new Set();
    state.collageRendered = false;
    const context = canvasEl.getContext("2d");
    context.clearRect(0, 0, canvasEl.width, canvasEl.height);

    document
        .querySelectorAll(".thumbnail-item--selected")
        .forEach((item) => item.classList.remove("thumbnail-item--selected"));

    loggerContainerEl.innerHTML = '<p class="logger-title">Logger:</p>';
};

const downloadCollage = () => {
    const date = new Date();
    const fileName = `Collage-${date.getDay()}-${date.getMonth()}-${date.getFullYear()}.png`;
    const img = canvasEl.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = fileName;
    link.href = img;
    link.click();
    link.remove();
};

const changeLayout = ({ target }) => {
    state.currentLayout = JSON.parse(target.value);
};

// Listeners.
selectEl.addEventListener("change", changeLayout);
createCollageBtn.addEventListener("click", createCollage);
startOverBtn.addEventListener("click", startOver);
downloadBtn.addEventListener("click", downloadCollage);
*/

/*
1. State Yönetimi ve Proxy Kullanımı
export const state = new Proxy(stateObj, {
    set(target, property, value) {
        const previousValue = target[property];
        target[property] = value;
        if (previousValue !== value) {
            handleStateChange(target);
        }
        return true;
    },
});
stateObj uygulamanın durumunu tutan bir nesne (ör: seçili resimler, mevcut layout, yükleniyor mu vs.).
Proxy ile, state üzerinde herhangi bir değişiklik olduğunda otomatik olarak handleStateChange 
fonksiyonu tetikleniyor. Böylece UI güncelleniyor.
Proxy, reaktif bir yapı sağlar: State değişince arayüz otomatik güncellenir.


*/

/*
2. DOM Elementlerini Seçme
const thumbnailsContainerEl = document.querySelector(".thumbnails-container");
const selectEl = document.querySelector(".select");
const previewContainerEl = document.querySelector(".previewContainer");
const canvasEl = document.querySelector(".canvas");
const createCollageBtn = document.querySelector(".btn-create-collage");
const startOverBtn = document.querySelector(".btn-start-over");
const downloadBtn = document.querySelector(".btn-download");
const spinnerContainerEl = document.querySelector(".spinnerContainer");
const spinnerTextEl = document.querySelector(".spinnerText");
const loggerContainerEl = document.querySelector(".loggerContainer");

Uygulamadaki ana HTML elementleri seçiliyor. Bunlar üzerinden UI güncellemeleri ve event
işlemleri yapılacak.
*/

/*
3. Thumbnail ve Layout Render Etme
images.forEach((img) => {
    const thumbnail = document.createElement("div");
    thumbnail.classList.add("thumbnail-item");
    thumbnail.innerHTML = `<img src='${img.img}?${THUMBNAIL_PARAMS}' class="img">`;
    thumbnail.addEventListener("click", (e) => handleSelection(e, img));
    thumbnailsContainerEl.appendChild(thumbnail);
});
Tüm resimler için küçük resim (thumbnail) oluşturuluyor ve ekrana ekleniyor.
Her bir thumbnail'a tıklama olayı ekleniyor: Kullanıcı bir resmi seçtiğinde handleSelection 
fonksiyonu çalışıyor.

LAYOUTS.forEach((layout) => {
    const option = document.createElement("option");
    option.value = JSON.stringify(layout);
    option.innerHTML = layout.name;
    selectEl.appendChild(option);
});
Farklı kolaj düzenleri (layout) için select kutusuna seçenekler ekleniyor.



*/

/*
4. State Değişimlerini Yönetme
const handleStateChange = (state) => {
    // Yükleniyor mu? Butonları ve arayüzü devre dışı bırak.
    // Yükleme bittiğinde tekrar aktif et.
    // Seçili resim yoksa "Kolaj Oluştur" butonunu kapat.
    // Kolaj oluşturulmuşsa "İndir" butonunu aç.
};
handleStateChange(state);

State değiştiğinde arayüzdeki butonlar, spinner ve diğer elementler güncelleniyor.
Kullanıcı deneyimini iyileştiriyor: Yükleme sırasında butonlar devre dışı, işlem bitince tekrar aktif.


*/

/**
 5. Resim Seçimi
const handleSelection = (e, imgName) => {
    const imgEl = e.currentTarget;
    imgEl.classList.toggle("thumbnail-item--selected");
    if (state.selectedImages.has(imgName)) {
        state.selectedImages.delete(imgName);
        state.selectedImages = new Set(state.selectedImages);
        imgEl.querySelector(".badge")?.remove();
    } else {
        state.selectedImages = new Set(state.selectedImages.add(imgName));
        const badge = document.createElement("div");
        badge.classList.add("badge");
        badge.innerHTML = `<div class="check" />`;
        imgEl.prepend(badge);
    }
};

Kullanıcı bir thumbnail'a tıkladığında seçili/ seçili değil durumunu değiştiriyor.
Seçili olanlara bir "badge" ekleniyor (görsel işaret).
Seçili resimler state.selectedImages setinde tutuluyor.
 */

/*
6. WeakRef ile Cache Kullanımı
let getCachedImage;
(async () => {
    getCachedImage = await weakRefCache(loadImage);
})();
Resimlerin bellekte gereksiz yere tutulmaması için WeakRef tabanlı bir cache kullanılıyor.
getCachedImage, bir resmi cache'den alıyor; yoksa yeniden yüklüyor ve cache'e ekliyor.
Bellek yönetimi ve performans için önemli.

*/

/*
7. Kolajı Çizme
const drawCollage = (images) => {
    state.drawing = true;
    let context = canvasEl.getContext("2d");
    // Canvas boyutunu ve grid düzenini ayarla.
    // Seçilen resimleri uygun yerlere çiz.
    state.drawing = false;
    state.collageRendered = true;
};

Seçilen resimler, belirlenen layout'a göre canvas üzerine çiziliyor.
Her resim, griddeki doğru yere yerleştiriliyor.

*/

/*
8. Kolaj Oluşturma
const createCollage = async () => {
    state.loading = true;
    const images = [];
    for (const image of state.selectedImages.values()) {
        const blobImage = await getCachedImage(image.img);
        const url = URL.createObjectURL(blobImage);
        const img = await createImageFile(url);
        images.push(img);
        URL.revokeObjectURL(url);
    }
    state.loading = false;
    drawCollage(images);
};

Seçili resimler cache'den veya ağdan alınır.
Blob'dan gerçek resim nesnesi oluşturulur.
Canvas'a çizilir.
Yükleme bitince arayüz güncellenir.
*/

/*
9. Sıfırdan Başlatma
const startOver = () => {
    state.selectedImages = new Set();
    state.collageRendered = false;
    const context = canvasEl.getContext("2d");
    context.clearRect(0, 0, canvasEl.width, canvasEl.height);
    document.querySelectorAll(".thumbnail-item--selected").forEach((item) =>
       item.classList.remove("thumbnail-item--selected"));
    loggerContainerEl.innerHTML = '<p class="logger-title">Logger:</p>';
};

Tüm seçimler ve kolaj temizlenir.
Canvas sıfırlanır.
Arayüz ilk haline döner.

*/

/*
10. Kolajı İndirme
const downloadCollage = () => {
    const date = new Date();
    const fileName = `Collage-${date.getDay()}-${date.getMonth()}-${date.getFullYear()}.png`;
    const img = canvasEl.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = fileName;
    link.href = img;
    link.click();
    link.remove();
};

Kolajı PNG olarak indirmenizi sağlar.
Canvas'tan veri URL'si alınır, geçici bir link ile indirme başlatılır.
*/

/*
11. Layout Değiştirme
const changeLayout = ({ target }) => {
    state.currentLayout = JSON.parse(target.value);
};
Kullanıcı farklı bir layout seçtiğinde, state güncellenir ve arayüz ona göre değişir.
*/

/*
12. Event Listener'lar
selectEl.addEventListener("change", changeLayout);
createCollageBtn.addEventListener("click", createCollage);
startOverBtn.addEventListener("click", startOver);
downloadBtn.addEventListener("click", downloadCollage);
Kullanıcı arayüzdeki butonlara veya select kutusuna tıkladığında ilgili fonksiyonlar çalışır.

*/

/*
Proxy ile state yönetimi: Her değişiklikte arayüz otomatik güncellenir.
Thumbnail ve layout render: Dinamik olarak resimler ve seçenekler eklenir.
Seçim ve kolaj oluşturma: Kullanıcı seçimini yapar, kolaj oluşturulur ve indirilebilir.
WeakRef cache: Bellek yönetimi için resimler zayıf referansla tutulur, gereksiz olanlar otomatik silinir.
Event handler'lar: Kullanıcı etkileşimleri ile uygulama akışı yönetilir.

*/

/*
WeakRef – designed to create weak references to objects, allowing them to be deleted from
 memory by the garbage collector if there are no longer strong references to them. This 
 is beneficial for addressing excessive memory usage and optimizing the utilization of 
 system resources in applications.

FinalizationRegistry – is a tool for registering callbacks, that are executed when objects 
that are no longer strongly referenced, are destroyed. This allows releasing resources 
associated with the object or performing other necessary operations before deleting the object from memory.

WeakRef – nesnelere zayıf referanslar oluşturmak ve artık güçlü referansları yoksa çöp toplayıcı 
tarafından bellekten silinmelerine olanak tanımak için tasarlanmıştır. Bu, aşırı bellek kullanımını 
ele almak ve uygulamalarda sistem kaynaklarının kullanımını optimize etmek için faydalıdır.

FinalizationRegistry – artık güçlü referansı olmayan nesneler yok edildiğinde yürütülen geri
 aramaları kaydetmek için bir araçtır. Bu, nesneyle ilişkili kaynakların serbest bırakılmasına 
 veya nesneyi bellekten silmeden önce diğer gerekli işlemlerin gerçekleştirilmesine olanak tanır.

*/

