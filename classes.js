//classs
/* 

The constructor() method is called automatically by new, so we can initialize the object there.

For example:

 class User {

  constructor(name) {
    this.name = name;
  }

  sayHi() {
    alert(this.name);
  }

}

// Usage:
let user = new User("John");
user.sayHi();
When new User("John") is called:

A new object is created.
The constructor runs with the given argument and assigns it to this.name.
…Then we can call object methods, such as user.sayHi().

User adında bir sınıf tanımlanmış.
Sınıfın içinde bir constructor metodu var. Bu, new ile nesne oluşturulunca otomatik çalışır 
ve nesnenin özelliklerini başlatır (örneğin, name).
Sınıfa bir de sayHi metodu eklenmiş. Bu metod, nesnenin adını ekrana yazdırıyor.

Sınıflar, benzer özellik ve davranışlara sahip nesneleri kolayca oluşturmak için kullanılır.
constructor ile nesneye ilk değerler atanır.
Sınıfın metodları (sayHi gibi) ile nesneye davranışlar eklenir.

 */

/*
class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name); }
}

// proof: User is a function
alert(typeof User); // function
What class User {...} construct really does is:

Creates a function named User, that becomes the result of the class declaration. The function
 code is taken from the constructor method (assumed empty if we don’t write such method).
Stores class methods, such as sayHi, in User.prototype.
After new User object is created, when we call its method, it’s taken from the prototype, 
just as described in the chapter F.prototype. So the object has access to class methods.


*/


/* class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name); }
}

// class is a function
alert(typeof User); // function

// ...or, more precisely, the constructor method
alert(User === User.prototype.constructor); // true

// The methods are in User.prototype, e.g:
alert(User.prototype.sayHi); // the code of the sayHi method

// there are exactly two methods in the prototype
alert(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi
 */

/* 
Not just a syntactic sugar

Sometimes people say that class is a “syntactic sugar” (syntax that is designed to make things easier to read, but doesn’t introduce anything new), because we could actually declare the same thing without using the class keyword at all:

 // rewriting class User in pure functions

// 1. Create constructor function
function User(name) {
  this.name = name;
}
// a function prototype has "constructor" property by default,
// so we don't need to create it

// 2. Add the method to prototype
User.prototype.sayHi = function() {
  alert(this.name);
};

// Usage:
let user = new User("John");
user.sayHi();
The result of this definition is about the same. So, there are indeed reasons why class can be
 considered a syntactic sugar to define a constructor together with its prototype methods.

Still, there are important differences.

First, a function created by class is labelled by a special internal property 
[[IsClassConstructor]]: true. So it’s not entirely the same as creating it manually.

The language checks for that property in a variety of places. For example, unlike a regular
 function, it must be called with new:

 class User {
  constructor() {}
}

alert(typeof User); // function
User(); // Error: Class constructor User cannot be invoked without 'new'
Also, a string representation of a class constructor in most JavaScript engines starts with the 
“class…”

 class User {
  constructor() {}
}

alert(User); // class User { ... }
There are other differences, we’ll see them soon.

Class methods are non-enumerable. A class definition sets enumerable flag to false for all methods 
in the "prototype".

That’s good, because if we for..in over an object, we usually don’t want its class methods.

Classes always use strict. All code inside the class construct is automatically in strict mode.

Besides, class syntax brings many other features that we’ll explore later.


*/
/* 
   
Class Expression

Just like functions, classes can be defined inside another expression, passed around, returned,
 assigned, etc.

Here’s an example of a class expression:

let User = class {
  sayHi() {
    alert("Hello");
  }
};
Similar to Named Function Expressions, class expressions may have a name.

If a class expression has a name, it’s visible inside the class only:

 // "Named Class Expression"
// (no such term in the spec, but that's similar to Named Function Expression)
let User = class MyClass {
  sayHi() {
    alert(MyClass); // MyClass name is visible only inside the class
  }
};

new User().sayHi(); // works, shows MyClass definition

alert(MyClass); // error, MyClass name isn't visible outside of the class
We can even make classes dynamically “on-demand”, like this:

 function makeClass(phrase) {
  // declare a class and return it
  return class {
    sayHi() {
      alert(phrase);
    }
  };
}

// Create a new class
let User = makeClass("Hello");

new User().sayHi(); // Hello
 
 
Class Expression: Sınıfı bir değişkene atayarak, kodun daha esnek ve dinamik olmasını sağlar. Özellikle fonksiyonel programlama ve dinamik nesne üretimi için kullanışlıdır.
Named Class Expression: Sınıfın içinde hata ayıklama veya kendini referanslama için isim kullanılabilir, ama bu isim dışarıdan erişilemez.
Dinamik Sınıf: Fonksiyonlar aracılığıyla, parametreye göre farklı sınıflar üretmek mümkündür. Bu, fabrika fonksiyonları veya özel davranışlar için çok kullanışlıdır.
 */



/*
Getters/setters

Just like literal objects, classes may include getters/setters, computed properties etc.

Here’s an example for user.name implemented using get/set:

 class User {

  constructor(name) {
    // invokes the setter
    this.name = name;
    //satırı aslında doğrudan bir property ataması gibi görünse de, altta bir setter tanımlı olduğu için set name(value) fonksiyonu tetiklenir.
  }

  get name() {
    return this._name;
  }

  set name(value) {
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }

}

let user = new User("John");
alert(user.name); // John

user = new User(""); // Name is too short.
Technically, such class declaration works by creating getters and setters in User.prototype.


*/


/*

Getter ve setter'lar, User.prototype üzerinde tanımlanır. Yani, tüm User nesneleri bu özellikleri paylaşır.
_name property’si genellikle "protected" gibi davranır; dışarıdan doğrudan erişilmemesi önerilir (ama dil tarafından zorlanmaz).
Bu yapı, veri doğrulama ve kapsülleme (encapsulation) için çok kullanışlıdır.
Kapsülleme: Dışarıdan doğrudan property’ye erişimi engelleyip, kontrol ekleyebilirsin.
Doğrulama: Setter ile gelen veriyi kontrol edebilir, hatalıysa uyarı verebilirsin.
Okunabilirlik: user.name gibi doğal bir sözdizimiyle çalışır, fonksiyon gibi çağırmaya gerek yoktur.
Sınıflarda getter/setter ile property’lere erişimi ve atamayı kontrol edebilirsin.
Doğrudan property yerine, arka planda başka bir property (_name) kullanılır.
Bu sayede hem veri güvenliği hem de esneklik sağlanır.
JavaScript’te gerçek “protected” veya “private” alanlar uzun süre yoktu. Alt tire, geliştiriciler arasında “bu property’ye doğrudan erişme, setter/getter ile eriş” anlamında bir uyarıdır.
Getter/setter ile dışarıya kontrollü bir erişim sağlanır. Örneğin, set name(value) ile gelen değeri doğrulayabilir, get name() ile okunmasını sağlayabilirsin.
_name gibi bir alan, doğrudan dışarıdan değiştirilmemeli; çünkü veri doğrulama, kapsülleme (encapsulation) ve güvenlik için setter/getter kullanılır.
Alt tireli isimler, kodun okunabilirliğini artırır ve hangi alanların “internal” olduğunu gösterir.
*/



/* Computed names […]

Here’s an example with a computed method name using brackets [...]:
hesaplanmış/metinsel metod isimleri 

 class User {

  ['say' + 'Hi']() {
    alert("Hello");
  }
//Burada 'say' + 'Hi' ifadesi "sayHi" stringine dönüşür.
}

new User().sayHi();
Such features are easy to remember, as they resemble that of literal objects.
 */



/* “Class fields” is a syntax that allows to add any properties.

For instance, let’s add name property to class User:

 class User {
  name = "John";

  sayHi() {
    alert(`Hello, ${this.name}!`);
  }
}

new User().sayHi(); // Hello, John!
So, we just write “ = ” in the declaration, and that’s it.

The important difference of class fields is that they are set on individual objects, not 
User.prototype:

 class User {
  name = "John";
}

let user = new User();
alert(user.name); // John
alert(User.prototype.name); // undefined
We can also assign values using more complex expressions and function calls:

 class User {
  name = prompt("Name, please?", "John");
}

let user = new User();
alert(user.name); // John */

/*
name = "John"	Bir class field (özellik) tanımıdır.
Bu alan constructor yerine doğrudan sınıf içinde tanımlanabilir.
Her nesne kendi name kopyasına sahiptir.	
User.prototype.name yoktur, çünkü prototype değil instance özelliğidir.	
Değeri sabit olabileceği gibi prompt() gibi dinamik de olabilir.	
constructor ile de yapilabilir bu yaptigimiz class fields

*/


/*
Making bound methods with class fields

As demonstrated in the chapter Function binding functions in JavaScript have a dynamic this. 
It depends on the context of the call.

So if an object method is passed around and called in another context, this won’t be a reference
 to its object any more.

For instance, this code will show undefined:

 class Button {
  constructor(value) {
    this.value = value;
  }

  click() {
    alert(this.value);
  }
}

let button = new Button("hello");

setTimeout(button.click, 1000); // undefined
The problem is called “losing this”.

There are two approaches to fixing it, as discussed in the chapter Function binding:

Pass a wrapper-function, such as setTimeout(() => button.click(), 1000).
Bind the method to object, e.g. in the constructor.
Class fields provide another, quite elegant syntax:

 class Button {
  constructor(value) {
    this.value = value;
  }
  click = () => {
    alert(this.value);
  }
}

let button = new Button("hello");

setTimeout(button.click, 1000); // hello
The class field click = () => {...} is created on a per-object basis, there’s a separate function 
for each Button object, with this inside it referencing that object. We can pass button.click 
around anywhere, and the value of this will always be correct.
//click = () => {...} bir class field tanımıdır.
//Her Button nesnesi için yeni bir arrow function oluşturulur.
//Arrow function olduğu için this, nesneye (butona) bağlı kalır.
//setTimeout(button.click, 1000) çağrısı çalışır çünkü this bozulmaz.

That’s especially useful in browser environment, for event listeners.



//ya boyle
class Button {
  constructor(value) {
    this.value = value;
        this.click = this.click.bind(this); // Burada bağlama işlemi yapılıyor
//this.click.bind(this) ile click() metodunu kalıcı olarak this bağlamına (yani butona) bağlıyoruz.
//Böylece setTimeout(button.click, 1000) gibi çağrılarda bile this doğru kalır.

  }

  click() {
    alert(this.value);
  }
}

let button = new Button("hello");

setTimeout(button.click, 1000);



// ya boyle 
class Button {
  constructor(value) {
    this.value = value;
      
  }

  click() {
    alert(this.value);
  }
}

let button = new Button("hello");

setTimeout(() => button.click(), 1000)
//() => button.click() bir arrow function'dır.
//Arrow function'lar kendi this bağlamlarını miras alır, değiştirmez.
//Bu durumda button.click() yine button nesnesine bağlı çalışır ve this.value → "hello" olur.


//📌 Problem: "this" bağlamının kaybedilmesi
//bunu yukaridaki gibi farkli sekillerde yapabiliriz

*/



/* 
The basic class syntax looks like this:

class MyClass {
  prop = value; // property

  constructor(...) { // constructor
    // ...
    //new MyClass(...) ile sınıfın yeni bir örneği (instance) oluşturulduğunda ilk çalışan fonksiyondur.
    //Nesneye başlangıç değerleri atamak için kullanılır.
  }

  method(...) {} // method
  //Bu tür metotlar, MyClass.prototype üzerinden tanımlanır.
  //Hafıza açısından verimlidir, çünkü her nesne için tekrar oluşturulmaz.
  //instance.method() şeklinde çağrılır.

  get something(...) {} // getter method
  set something(...) {} // setter method

  [Symbol.iterator]() {} // method with computed name (symbol here)
  // Bu, sınıfın for...of döngüsünde çalışabilir olmasını sağlar.
    //Symbol.iterator özel bir metottur ve iterable protokolünün parçasıdır.
    //Sınıfı döngüyle gezilebilir yapmak için kullanılır.

}
MyClass is technically a function (the one that we provide as constructor), while methods, 
getters and setters are written to MyClass.prototype
/**
 * 
 *  
typeof MyClass; // "function"
Her ne kadar class yazımı modern ve OOP tarzı görünse de, aslında perde arkasında hâlâ bir constructor function çalışır.
method, get, set gibi şeyler de MyClass.prototype üzerinde tanımlanır.
prop = value gibi class fields ise nesneye (this) atanır, prototype’a değil.

**/
 


/* 
//console ekraninda saati surekli gosteriyor
class Clock {
  constructor({ template }) {
    this.template = template;
  }

  render() {
    let date = new Date();

    let hours = date.getHours();
    if (hours < 10) hours = '0' + hours;

    let mins = date.getMinutes();
    if (mins < 10) mins = '0' + mins;

    let secs = date.getSeconds();
    if (secs < 10) secs = '0' + secs;

    let output = this.template
      .replace('h', hours)
      .replace('m', mins)
      .replace('s', secs);

    console.log(output);
  }

  stop() {
    clearInterval(this.timer);
  }

  start() {
    this.render();
    this.timer = setInterval(() => this.render(), 1000);
  }
  //İlk olarak this.render() çalışır → saati hemen yazdırır.
  //Ardından setInterval ile her 1 saniyede bir render edilir.
  //() => this.render() bir arrow function olduğu için this bağlamı korunur.

}


let clock = new Clock({template: 'h:m:s'});
clock.start();
 */

/*
Class inheritance is a way for one class to extend another class.

So we can create new functionality on top of the existing.

The “extends” keyword

Let’s say we have class Animal:

class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  run(speed) {
    this.speed = speed;
    alert(`${this.name} runs with speed ${this.speed}.`);
  }
  stop() {
    this.speed = 0;
    alert(`${this.name} stands still.`);
  }
}

let animal = new Animal("My animal");
*/

/* 
…And we would like to create another class Rabbit.

As rabbits are animals, Rabbit class should be based on Animal, have access to animal methods, 
so that rabbits can do what “generic” animals can do.

The syntax to extend another class is: class Child extends Parent.

Let’s create class Rabbit that inherits from Animal:

class Rabbit extends Animal {
  hide() {
    alert(`${this.name} hides!`);
  }
}

let rabbit = new Rabbit("White Rabbit");

rabbit.run(5); // White Rabbit runs with speed 5.
rabbit.hide(); // White Rabbit hides!
Object of Rabbit class have access both to Rabbit methods, such as rabbit.hide(), and also to 
Animal methods, such as rabbit.run().

Internally, extends keyword works using the good old prototype mechanics. It sets 
Rabbit.prototype.[[Prototype]] to Animal.prototype. So, if a method is not found in 
Rabbit.prototype, JavaScript takes it from Animal.prototype.

//Rabbit.prototype.__proto__ === Animal.prototype // ✅ true
//JavaScript'te extends, aslında Rabbit.prototype'ın [[Prototype]]'ını (yani gizli bağlantısını) Animal.prototype'a bağlar.
//Böylece JavaScript, rabbit.run() gibi bir çağrıda önce Rabbit.prototype'a bakar, bulamazsa zincirden Animal.prototype'a geçer.
//rabbit → Rabbit.prototype → Animal.prototype → Object.prototype→  null
//Her seferinde yukarı doğru giderek method aranır.
//super(...), üst sınıfın constructor'ını çağırır.
//Yani burada Animal sınıfının constructor(name) metodu çalışır ve this.name atanır.
//super() alt sınıf constructor'ının ilk satırı olmak zorundadır.
 



For instance, to find rabbit.run method, the engine checks (bottom-up on the picture):

The rabbit object (has no run).
Its prototype, that is Rabbit.prototype (has hide, but not run).
Its prototype, that is (due to extends) Animal.prototype, that finally has the run method.
As we can recall from the chapter Native prototypes, JavaScript itself uses prototypal inheritance
 for built-in objects. E.g. Date.prototype.[[Prototype]] is Object.prototype. That’s why dates 
 have access to generic object methods.

Any expression is allowed after extends
Class syntax allows to specify not just a class, but any expression after extends.
//run() metodu rabbit objesinde yok → geç Rabbit.prototype'a
//Rabbit.prototype içinde de yok → geç Animal.prototype'a
//Animal.prototype içinde run() bulundu → çalıştırılır ✅
//Bu yapı sayesinde Rabbit sınıfı, Animal'ın tüm metodlarını otomatik olarak kullanabilir.
//JavaScript’in prototip tabanlı kalıtım sistemi bu şekilde işler.
//Bu, yerleşik (native) sınıflarda da geçerlidir.
*/

/* 
For instance, a function call that generates the parent class:

 function f(phrase) {
  return class {
    sayHi() { alert(phrase); }
  };
}

class User extends f("Hello") {}

new User().sayHi(); // Hello
Here class User inherits from the result of f("Hello").

That may be useful for advanced programming patterns when we use functions to generate classes 
depending on many conditions and can inherit from them.

//extends ifadesinden sonra sabit bir sınıf değil, herhangi bir ifade yazılabilir!
//Bu sayede dinamik olarak sınıf türetilebilir.
//Mesela: Kullanıcının rolüne göre farklı sınıf yaratmak, farklı yetenekler eklemek vs.
function RoleMixin(role) {
  return class {
    getRole() {
      return role;
    }
  }
}

class AdminUser extends RoleMixin("admin") {}
class GuestUser extends RoleMixin("guest") {}

console.log(new AdminUser().getRole()); // "admin"
console.log(new GuestUser().getRole()); // "guest"
 */

/* 
Overriding a method

Now let’s move forward and override a method. By default, all methods that are not specified in 
class Rabbit are taken directly “as is” from class Animal.

But if we specify our own method in Rabbit, such as stop() then it will be used instead:

class Rabbit extends Animal {
  stop() {
    // ...now this will be used for rabbit.stop()
    // instead of stop() from class Animal
  }
}
Usually, however, we don’t want to totally replace a parent method, but rather to build on top of
 it to tweak or extend its functionality. We do something in our method, but call the parent 
 method before/after it or in the process.

Classes provide "super" keyword for that.

super.method(...) to call a parent method.
super(...) to call a parent constructor (inside our constructor only).
For instance, let our rabbit autohide when stopped:

 class Animal {

  constructor(name) {
    this.speed = 0;
    this.name = name;
  }

  run(speed) {
    this.speed = speed;
    alert(`${this.name} runs with speed ${this.speed}.`);
  }

  stop() {
    this.speed = 0;
    alert(`${this.name} stands still.`);
  }

}

class Rabbit extends Animal {
  hide() {
    alert(`${this.name} hides!`);
  }

  stop() {
    super.stop(); // call parent stop
    this.hide(); // and then hide
  }
}

let rabbit = new Rabbit("White Rabbit");

rabbit.run(5); // White Rabbit runs with speed 5.
rabbit.stop(); // White Rabbit stands still. White Rabbit hides!
Now Rabbit has the stop method that calls the parent super.stop() in the process.
//Genellikle üst sınıftaki metodu tamamen silmek yerine, onun üstüne bir şey eklemek isteriz.
//Yani önce (veya sonra) super.method() ile parent metodunu çalıştırırız, sonra kendi kodumuzu yazarız.
//Eğer constructor içinde super(...) çağırırsan, üst sınıfın constructor'ı çalışır.

//() => super.method()	 Arrow function dıştaki super'i kullanır
//Arrow function kendi super bağlamını oluşturmaz.
//Bu yüzden super, bulunduğu yer olan Rabbit'in stop() fonksiyonundan alınır.
//super.stop() ifadesi:
//super.stop() demek = Animal.prototype.stop'u çağır demek.
//Çünkü Rabbit sınıfı Animal sınıfını extend ediyor.
//Dolayısıyla burada çağrılan metod → 🔁 Animal’ın stop() metodudur.
//super demek = "bir üst sınıf" demek → Yani Animal.

//function() { super.method() }	Regular function içinde super tanımsızdır
//function():
//Kendi bağlamını (this, super, vs.) oluşturur.
//Ama bu function() bir class method değil, sadece bir fonksiyon.
//JavaScript’te super sadece class methodlarının içinde geçerlidir.
//Normal bir fonksiyonda super kullanamazsın.

// bind(this) ile this'i düzeltip super çağrısını dışarı yap:
//stop() {
//  const that = this;
//  setTimeout(function() {
//    // super yok ama that ile dolanabiliriz
//    Object.getPrototypeOf(Rabbit.prototype).stop.call(that);
//  }, 1000);
//}
//Ama bu ikinci yöntem karmaşıktır, bu yüzden arrow function önerilir ✅



Yani function() { super.xxx } → hiçbir zaman geçerli değil.

Arrow functions have no super
As was mentioned in the chapter Arrow functions revisited, arrow functions do not have super.

If accessed, it’s taken from the outer function. For instance:

class Rabbit extends Animal {
  stop() {
    setTimeout(() => super.stop(), 1000); // call parent stop after 1sec
  }
}
The super in the arrow function is the same as in stop(), so it works as intended. If we 
specified a “regular” function here, there would be an error:

// Unexpected super
setTimeout(function() { super.stop() }, 1000);
 */
/* 

Overriding constructor

With constructors it gets a little bit tricky.

Until now, Rabbit did not have its own constructor.

According to the specification, if a class extends another class and has no constructor, then 
the following “empty” constructor is generated:

class Rabbit extends Animal {
  // generated for extending classes without own constructors
  constructor(...args) {
    super(...args);
  }
}
As we can see, it basically calls the parent constructor passing it all the arguments. That 
happens if we don’t write a constructor of our own.

Now let’s add a custom constructor to Rabbit. It will specify the earLength in addition to name:

 class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  // ...
}

class Rabbit extends Animal {

  constructor(name, earLength) {
    this.speed = 0;
    this.name = name;
    this.earLength = earLength;
  }

  // ...
}

// Doesn't work!
let rabbit = new Rabbit("White Rabbit", 10); // Error: this is not defined.
Whoops! We’ve got an error. Now we can’t create rabbits. What went wrong?

The short answer is:

Constructors in inheriting classes must call super(...), and (!) do it before using this.

In JavaScript, there’s a distinction between a constructor function of an inheriting class 
(so-called “derived constructor”) and other functions. A derived constructor has a special 
internal property [[ConstructorKind]]:"derived". That’s a special internal label.

That label affects its behavior with new.

When a regular function is executed with new, it creates an empty object and assigns it to this.
But when a derived constructor runs, it doesn’t do this. It expects the parent constructor 
to do this job.
So a derived constructor must call super in order to execute its parent (base) constructor, 
otherwise the object for this won’t be created. And we’ll get an error.

For the Rabbit constructor to work, it needs to call super() before using this, like here:

 class Animal {

  constructor(name) {
    this.speed = 0;
    this.name = name;
  }

  // ...
}

class Rabbit extends Animal {

  constructor(name, earLength) {
    super(name); // Önce üst sınıfın constructor'ı çağrılır
    this.earLength = earLength; // Artık 'this' kullanılabilir
  }

  // Alt sınıfın (Rabbit) constructor’ı, “derived constructor” olarak etiketlenir (içsel: [[ConstructorKind]]: "derived").
//JavaScript, this nesnesini oluşturmayı üst sınıfa bırakır.
//Yani super(...) çağrılmadan önce this tanımlı değildir.
//Bu yüzden önce super(...) çağrılıp üst sınıf çalıştırılır. O da this nesnesini kurar.

}

// now fine
let rabbit = new Rabbit("White Rabbit", 10);
alert(rabbit.name); // White Rabbit
alert(rabbit.earLength); // 10
 */


/* 
We can override not only methods, but also class fields.

Although, there’s a tricky behavior when we access an overridden field in parent constructor, quite different from most other programming languages.

Consider this example:

 class Animal {
  name = 'animal';

  constructor() {
    alert(this.name); // (*)
  }
}

class Rabbit extends Animal {
  name = 'rabbit';
}

new Animal(); // animal
new Rabbit(); // animal
Here, class Rabbit extends Animal and overrides the name field with its own value.

There’s no own constructor in Rabbit, so Animal constructor is called.

What’s interesting is that in both cases: new Animal() and new Rabbit(), the alert in the line (*) shows animal.

In other words, the parent constructor always uses its own field value, not the overridden one.

What’s odd about it?
//Neden rabbit yerine animal çıktı?
//Çünkü this.name satırı üst sınıfın constructor'ı çalışırken çalışıyor.
//Ama Rabbit sınıfına ait name = 'rabbit' alanı henüz tanımlanmamış oluyor.
//Animal constructor’ı çalışırken, henüz Rabbit içindeki name = 'rabbit' devreye girmedi.
//JavaScript, alanları (fields) constructor'dan sonra oluşturuyor.



If it’s not clear yet, please compare with methods.

Here’s the same code, but instead of this.name field we call this.showName() method:

 class Animal {
  showName() {  // instead of this.name = 'animal'
    alert('animal');
  }

  constructor() {
    this.showName(); // instead of alert(this.name);
  }
}

class Rabbit extends Animal {
  showName() {
    alert('rabbit');
  }
}

new Animal(); // animal
new Rabbit(); // rabbit
Please note: now the output is different.

And that’s what we naturally expect. When the parent constructor is called in the derived class,
 it uses the overridden method.

…But for class fields it’s not so. As said, the parent constructor always uses the parent field.

Why is there a difference?

Well, the reason is the field initialization order. The class field is initialized:

Before constructor for the base class (that doesn’t extend anything),
Immediately after super() for the derived class.
In our case, Rabbit is the derived class. There’s no constructor() in it. As said previously, 
that’s the same as if there was an empty constructor with only super(...args).

So, new Rabbit() calls super(), thus executing the parent constructor, and (per the rule for 
derived classes) only after that its class fields are initialized. At the time of the parent 
constructor execution, there are no Rabbit class fields yet, that’s why Animal fields are used.

This subtle difference between fields and methods is specific to JavaScript.

Luckily, this behavior only reveals itself if an overridden field is used in the parent 
constructor. Then it may be difficult to understand what’s going on, so we’re explaining it here.

If it becomes a problem, one can fix it by using methods or getters/setters instead of fields.


//Neden bu farklı çalıştı?
//Çünkü metotlar prototip zinciri üzerinden çağrılır. Yani this.showName() derken:
//Önce Rabbit.prototype kontrol edilir → bulur → çalıştırır.
//Bu mekanizma super() çağrıldığında bile geçerlidir.
//JavaScript’te sınıf alanlarının (fields) başlatılma sırası:

//Durum	                                Ne zaman başlatılır?
//Base class (extends olmayan)	      constructor'dan önce
//Derived class (extends eden)	      super() çağrısından sonra

//Konu	                   Field (name = '...')	                        Method (showName())
//Override edilirse	      super() sırasında geçerli değil	              super() sırasında geçerli
//Ne zaman çalışır?     	super()’den sonra tanımlanır	                Direkt prototype zincirinden alınır
//Çözüm	                  Getter kullan	                                Direkt metot override et

//super() sadece constructor içinde çalışır.
//Ama super çağrıldığında prototip zinciri oluşur.
//Bu zincirde metotlara erişilebilir, ama field'lar henüz tanımlanmaz.

//Tanım Türü	                                  Ne zaman işler?	                                 super() sırasında ulaşılabilir mi?
//name = 'rabbit' (field)   	                  super() sonrası	                                  ❌ Hayır, henüz tanımlı değil
//get name() { return 'rabbit' } (metot)	      super() öncesi bile erişilir (prototipten)      	✅ Evet


//field varsa atama gibi islemler super kullanacagiz ki calissin istedigimiz gibi
//diger turlu metot seklinde kullanacagiz
 */


/* 
//Super: internals, [[HomeObject]]
Let’s get a little deeper under the hood of super. We’ll see some interesting things along the way.

First to say, from all that we’ve learned till now, it’s impossible for super to work at all!

Yeah, indeed, let’s ask ourselves, how it should technically work? When an object method runs, it
 gets the current object as this. If we call super.method() then, the engine needs to get the 
 method from the prototype of the current object. But how?

The task may seem simple, but it isn’t. The engine knows the current object this, so it could get 
the parent method as this.__proto__.method. Unfortunately, such a “naive” solution won’t work.

Let’s demonstrate the problem. Without classes, using plain objects for the sake of simplicity.

You may skip this part and go below to the [[HomeObject]] subsection if you don’t want to know the 
details. That won’t harm. Or read on if you’re interested in understanding things in-depth.

In the example below, rabbit.__proto__ = animal. Now let’s try: in rabbit.eat() we’ll call
 animal.eat(), using this.__proto__:

// __proto__ (veya modern haliyle Object.setPrototypeOf) ile yapılır.

 let animal = {
  name: "Animal",
  eat() {
    alert(`${this.name} eats.`);
  }
};

let rabbit = {
  __proto__: animal,
  name: "Rabbit",
  eat() {
    // that's how super.eat() could presumably work
    this.__proto__.eat.call(this); // (*)
  }
};

rabbit.eat(); // Rabbit eats.
At the line (*) we take eat from the prototype (animal) and call it in the context of the current
 object. Please note that .call(this) is important here, because a simple this.__proto__.eat() 
 would execute parent eat in the context of the prototype, not the current object.

And in the code above it actually works as intended: we have the correct alert.

//rabbit.eat() çağrıldığında:
//this değeri = rabbit olur.
//this.__proto__ = animal olur.
//animal.eat.call(this) çalışır → this.name → "Rabbit" olur.
//Ekrana Rabbit eats. yazar.
//Her şey güzel. Ama sorun zincire bir nesne daha ekleyince başlıyor.



Now let’s add one more object to the chain. We’ll see how things break:

 let animal = {
  name: "Animal",
  eat() {
    alert(`${this.name} eats.`);
  }
};

let rabbit = {
  __proto__: animal,
  eat() {
    // ...bounce around rabbit-style and call parent (animal) method
    this.__proto__.eat.call(this); // (*)
  }
};

let longEar = {
  __proto__: rabbit,
  eat() {
    // ...do something with long ears and call parent (rabbit) method
    this.__proto__.eat.call(this); // (**)
  }
};

longEar.eat(); // Error: Maximum call stack size exceeded
The code doesn’t work anymore! We can see the error trying to call longEar.eat().

It may be not that obvious, but if we trace longEar.eat() call, then we can see why. In both 
lines (*) and (**) the value of this is the current object (longEar). That’s essential: all 
object methods get the current object as this, not a prototype or something.

//Ne Yanlış Gidiyor?
//longEar.eat() çağrılır → this = longEar
//this.__proto__ → rabbit
//rabbit.eat.call(this) çağrılır
//Şimdi rabbit.eat() çalışır ama this hâlâ longEar.

//rabbit.eat() içinde:
//this = longEar olduğu için yine this.__proto__ = rabbit
//Yani tekrar rabbit.eat.call(this) çalışır
//Bu sonsuza kadar böyle gider: rabbit → rabbit → rabbit...
//Yani super gibi bir şey yapmaya çalışırken aslında aynı metoda tekrar tekrar çağrı yapılıyor. 
// Zincirde yukarı çıkamıyor çünkü this.__proto__ hep aynı /nesneye (rabbit) işaret ediyor.

//[[HomeObject]].
//super çağrıldığında JavaScript motoru:
//Metodun tanımlandığı yeri ([[HomeObject]]) bulur
//Oradan yukarıdaki prototipi alır ([[HomeObject]].__proto__)
//O prototipteki metodu çalıştırır
//Yani, super aslında this'e değil, metodun tanımlandığı yere bakarak yukarı çıkar. Bu yüzden sonsuz döngüye girmez.

//super’in arkasındaki sistemi anlamak için yazılmış bir simülasyondur.
//Sadece this ve __proto__ kullanarak super’i taklit etmeye çalışır.
//Ama bu yöntem çalışmaz çünkü this her zaman en alttaki (çağıran) nesne olur.
//Gerçek super, metodun tanımlandığı yeri baz alarak yukarı çıkar ([[HomeObject]] sayesinde).


//super classlarda kullaniliyor , proto her yerde ama sonsuz donguye girebiliyor tehlikeli
//metotlarin icine de ekleyebiliriz ornek asagida var

So, in both lines (*) and (**) the value of this.__proto__ is exactly the same: rabbit. They 
both call rabbit.eat without going up the chain in the endless loop.

Inside longEar.eat(), the line (**) calls rabbit.eat providing it with this=longEar.

// inside longEar.eat() we have this = longEar
this.__proto__.eat.call(this) // (**)
// becomes
longEar.__proto__.eat.call(this)
// that is
rabbit.eat.call(this);
Then in the line (*) of rabbit.eat, we’d like to pass the call even higher in the chain, but
 this=longEar, so this.__proto__.eat is again rabbit.eat!

// inside rabbit.eat() we also have this = longEar
this.__proto__.eat.call(this) // (*)
// becomes
longEar.__proto__.eat.call(this)
// or (again)
rabbit.eat.call(this);
…So rabbit.eat calls itself in the endless loop, because it can’t ascend any further.

The problem can’t be solved by using this alone.
 */




/* [HomeObject]]

To provide the solution, JavaScript adds one more special internal property for functions: 
[[HomeObject]].

When a function is specified as a class or object method, its [[HomeObject]] property becomes 
that object.

Then super uses it to resolve the parent prototype and its methods.

Let’s see how it works, first with plain objects:

 let animal = {
  name: "Animal",
  eat() {         // animal.eat.[[HomeObject]] == animal
    alert(`${this.name} eats.`);
  }
};

let rabbit = {
  __proto__: animal,
  name: "Rabbit",
  eat() {         // rabbit.eat.[[HomeObject]] == rabbit
    super.eat();
  }
};

let longEar = {
  __proto__: rabbit,
  name: "Long Ear",
  eat() {         // longEar.eat.[[HomeObject]] == longEar
    super.eat();
  }
};

// works correctly
longEar.eat();  // Long Ear eats.
It works as intended, due to [[HomeObject]] mechanics. A method, such as longEar.eat, knows 
its [[HomeObject]] and takes the parent method from its prototype. Without any use of this.

//[[HomeObject]], JavaScript motorunun bir metoda "sen şu nesneye aitsin" diyebilmesi için tuttuğu gizli bir bağlamdır.
//Bir metot, bir nesne içinde tanımlandıysa, otomatik olarak o nesne onun [[HomeObject]]'i olur.
//super çağrıldığında, motor bu [[HomeObject]] üzerinden üst prototipi bulur.
//Eğer JavaScript motoru sadece this.__proto__ ile işlem yapsaydı, her şey bozulurdu çünkü this her zaman
//  çağıran nesneyi gösterir, tanımlandığı yeri değil.
 */



/* 
Methods are not “free”

As we’ve known before, generally functions are “free”, not bound to objects in JavaScript. So 
they can be copied between objects and called with another this.

The very existence of [[HomeObject]] violates that principle, because methods remember their 
objects. [[HomeObject]] can’t be changed, so this bond is forever.

The only place in the language where [[HomeObject]] is used – is super. So, if a method does not
 use super, then we can still consider it free and copy between objects. But with super things
  may go wrong.

Here’s the demo of a wrong super result after copying:

 let animal = {
  sayHi() {
    alert(`I'm an animal`);
  }
};

// rabbit inherits from animal
let rabbit = {
  __proto__: animal,
  sayHi() {
    super.sayHi();
  }
};

let plant = {
  sayHi() {
    alert("I'm a plant");
  }
};

// tree inherits from plant
let tree = {
  __proto__: plant,
  sayHi: rabbit.sayHi // (*)
};

tree.sayHi();  // I'm an animal (?!?)
A call to tree.sayHi() shows “I’m an animal”. Definitely wrong.

The reason is simple:

In the line (*), the method tree.sayHi was copied from rabbit. Maybe we just wanted to avoid code
 duplication?
Its [[HomeObject]] is rabbit, as it was created in rabbit. There’s no way to change [[HomeObject]].
The code of tree.sayHi() has super.sayHi() inside. It goes up from rabbit and takes the method
 from animal.

//JavaScript'te fonksiyonlar genellikle bağımsızdır: Yani bir fonksiyonu bir nesneden başka bir nesneye 
// kopyalayabilir, başka this ile çalıştırabilirsin.
//Ancak super kullanan fonksiyonlar öyle değildir. Onlar bağlı oldukları nesneyi (yani [[HomeObject]]) hatırlarlar.
//Bu bağ değiştirilemez. Dolayısıyla başka bir nesneye kopyalanınca, beklenmeyen şekilde hala eski nesneyle ilişkili kalır.
// JavaScript’in bakış açısı şöyle:
//“Bu fonksiyon ilk olarak rabbit içinde tanımlanmış, dolayısıyla super çağrısı yapılınca rabbit’in prototipine (animal) çıkılır.”
//Bu yüzden sonuç seni şaşırtıyor:
//📣 tree.sayHi() çağrısı "I'm a plant" yerine "I'm an animal" yazıyor!

//super kullanan metotları kopyalamak tehlikelidir.
//Kod tekrarını azaltayım derken yanlış prototip zincirinden fonksiyon çağırabilirsin.
//[[HomeObject]], JavaScript’in bu “bağlılık” mekanizmasını sağlayan içsel özelliktir.
 */


/* 
Methods, not function properties

[[HomeObject]] is defined for methods both in classes and in plain objects. But for objects, 
methods must be specified exactly as method(), not as "method: function()".

The difference may be non-essential for us, but it’s important for JavaScript.

In the example below a non-method syntax is used for comparison. [[HomeObject]] property is not 
set and the inheritance doesn’t work:

 let animal = {
  eat: function() { // intentionally writing like this instead of eat() {...
    // ...
  }
};

let rabbit = {
  __proto__: animal,
  eat: function() {
    super.eat();
  }
  //Bu sadece bir fonksiyondur. JavaScript bunu bir özellik (property) olarak görür, [[HomeObject]] oluşturmaz.


};

rabbit.eat();  // Error calling super (because there's no [[HomeObject]])
//rabbit.eat() çağrılıyor.
//İçeride super.eat() var ama [[HomeObject]] yok.
//JavaScript super'in nereden başlaması gerektiğini bilmiyor.
//Sonuç: ❗ "Cannot use super outside of method" hatası gibi bir şey çıkar.
 */



/* To extend a class: class Child extends Parent:
That means Child.prototype.__proto__ will be Parent.prototype, so methods are inherited.
When overriding a constructor:
We must call parent constructor as super() in Child constructor before using this.
When overriding another method:
We can use super.method() in a Child method to call Parent method.
Internals:
Methods remember their class/object in the internal [[HomeObject]] property. That’s how super 
resolves parent methods.
So it’s not safe to copy a method with super from one object to another.
Also:
//Child.prototype.__proto__ === Parent.prototype;
//Child sınıfının prototipi (Child.prototype)
//Parent.prototype üzerinden miras alır
//Bu zincir sayesinde Child nesneleri Parent metodlarına erişebilir.


Arrow functions don’t have their own this or super, so they transparently fit into the 
surrounding context.
 */



/* class Animal {

  constructor(name) {
    this.name = name;
  }

}

class Rabbit extends Animal {
  constructor(name) {
    super(name);
    this.created = Date.now();
  }
}

let rabbit = new Rabbit("White Rabbit"); // ok now
alert(rabbit.name); // White Rabbit
 */

/* 
class Clock {
  constructor({ template }) {
    this.template = template;
  }

  render() {
    let date = new Date();

    let hours = date.getHours();
    if (hours < 10) hours = '0' + hours;

    let mins = date.getMinutes();
    if (mins < 10) mins = '0' + mins;

    let secs = date.getSeconds();
    if (secs < 10) secs = '0' + secs;

    let output = this.template
      .replace('h', hours)
      .replace('m', mins)
      .replace('s', secs);

    console.log(output);
  }

  stop() {
    clearInterval(this.timer);
  }

  start() {
    this.render();
    this.timer = setInterval(() => this.render(), 1000);
  }
}

class ExtendedClock extends Clock {
  constructor(options) {
    super(options);
    let { precision = 1000 } = options;
    this.precision = precision;
  }

  start() {
    this.render();
    this.timer = setInterval(() => this.render(), this.precision);
  }
};


//Miras: extends Clock → ExtendedClock, Clock sınıfının tüm özellik ve metodlarını devralır (render, stop vb.).
//constructor(options)
//super(options) çağrısı ile üst sınıfın (Clock) constructor’ı çalıştırılır ve template ayarlanır.
//Ardından precision (milisaniye cinsinden güncelleme aralığı) okunur; verilmemişse varsayılan 1000 ms kullanılır.
//this.precision = precision olarak saklanır.
//start() override
//Clock’taki start() yerine kendi start() metodunu kullanır.
//Hemen render eder.
//Ardından setInterval(..., this.precision) ile belirtilen aralığa göre günceller (örn. 500 ms’de bir).
//Üst sınıfın start() metodunu tamamen değiştiriyoruz. İstersek super.start() deyip sonra timer’ı 
// güncelleyebilirdik; ama burada direkt kendi zamanlayıcımızı kuruyoruz.

//super(options) çağrısını ilk satırlarda yapmak zorundayız (constructor içinde this kullanmadan önce).
//Arrow function (() => this.render()) kullanılması kritik; aksi halde this kaybolabilir.
//Timer id’sini örnek (instance) üzerinde saklıyoruz (this.timer), böylece her saat ayrı durdurulabilir.
//precision değerini çok küçük verirsen (örn. 10 ms), render çağrıları konsolu doldurur ve performansı etkileyebilir.
 */


//Static properties and methods
/* 
We can also assign a method to the class as a whole. Such methods are called static.

In a class declaration, they are prepended by static keyword, like this:

 class User {
  static staticMethod() {
    alert(this === User);
  }
}

User.staticMethod(); // true
That actually does the same as assigning it as a property directly:

 class User { }

User.staticMethod = function() {
  alert(this === User);
};

User.staticMethod(); // true
The value of this in User.staticMethod() call is the class constructor User itself (the “object before dot” rule).

Usually, static methods are used to implement functions that belong to the class as a whole, but not to any particular object of it.
//static ile tanımlanan metodlar, sınıfa (class) aittir.
//Nesneye (örneğe/instance’a) değil, doğrudan sınıfın kendisine uygulanır.
//Çünkü sayHi bir instance metodu değil, sınıfa ait bir metod.

//Örneğin, bir sınıfa ait nesneleri karşılaştırmak istiyorsun ama bu metodun nesnelerin üstünde değil sınıfın kendisinde olması daha mantıklı:
 */


/* 
For instance, we have Article objects and need a function to compare them.

A natural solution would be to add Article.compare static method:

 class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }

  static compare(articleA, articleB) {
    return articleA.date - articleB.date;
  }
}

// usage
let articles = [
  new Article("HTML", new Date(2019, 1, 1)),
  new Article("CSS", new Date(2019, 0, 1)),
  new Article("JavaScript", new Date(2019, 11, 1))
];

articles.sort(Article.compare);

alert( articles[0].title ); // CSS
Here Article.compare method stands “above” articles, as a means to compare them. It’s not a 
method of an article, but rather of the whole class.

// Burada compare tüm Article'lar için çalışan genel bir işlemdir.
//Nesnenin kendisinde (article.compare) olması gerekmez, çünkü bir örneğe özel değil.

Another example would be a so-called “factory” method.

Let’s say, we need multiple ways to create an article:

Create by given parameters (title, date etc).
Create an empty article with today’s date.
…or else somehow.
The first way can be implemented by the constructor. And for the second one we can make a static
 method of the class.

Such as Article.createTodays() here:

 class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }

  static createTodays() {
    // remember, this = Article
    return new this("Today's digest", new Date());
  }
  //Burada createTodays() statik bir metod ve her çağrıldığında bugünün tarihine göre yeni bir nesne üretir.


}

let article = Article.createTodays();

alert( article.title ); // Today's digest
Now every time we need to create a today’s digest, we can call Article.createTodays(). Once 
again, that’s not a method of an article, but a method of the whole class.

//Özellik	                     Normal Metot	                  static Metot
//Nerede tanımlanır?	          Sınıf içinde method() {}	     Sınıf içinde static method() {}
//Nereden çağrılır?	            Nesne üzerinden	               Sınıf üzerinden
//this neyi gösterir?	              Nesneyi (örneği)	           Sınıfın kendisini
//Ne için uygundur?	              Nesneye özel davranış	          Genel yardımcı/factory görevleri


Static methods are also used in database-related classes to search/save/remove entries from
 the database, like this:

// assuming Article is a special class for managing articles
// static method to remove the article by id:
Article.remove({id: 12345});
Static methods aren’t available for individual objects
Static methods are callable on classes, not on individual objects.

E.g. such code won’t work:

// ...
article.createTodays(); /// Error: article.createTodays is not a function
//Çünkü createTodays() sadece sınıf (Article) üzerinden çağrılabilir.
//🧩 Eğer metod, belirli bir nesneye (örneğe) ait değilse ve genel işlevi varsa → static metod yap!
 */

/* 

Static properties are also possible, they look like regular class properties, but prepended by 
static:

 class Article {
  static publisher = "Ilya Kantor";
}

alert( Article.publisher ); // Ilya Kantor
That is the same as a direct assignment to Article:

Article.publisher = "Ilya Kantor";


//Özellik                 	Static Property	                       Normal (instance) Property
//Tanımlandığı yer        	static propertyName = value           	this.propertyName = value
//Erişim şekli	            ClassName.propertyName	                 object.propertyName
//Kime aittir?	                Sınıfın kendisine	                   Oluşturulan nesneye (örneğe)
//Paylaşım durumu	              Tüm örnekler arasında ortaktır	      Her nesne kendine ait değer taşır

 */


/* 
Inheritance of static properties and methods

Static properties and methods are inherited.

For instance, Animal.compare and Animal.planet in the code below are inherited and accessible as Rabbit.compare and Rabbit.planet:

 class Animal {
  static planet = "Earth";

  constructor(name, speed) {
    this.speed = speed;
    this.name = name;
  }

  run(speed = 0) {
    this.speed += speed;
    alert(`${this.name} runs with speed ${this.speed}.`);
  }

  static compare(animalA, animalB) {
    return animalA.speed - animalB.speed;
  }

}

// Inherit from Animal
class Rabbit extends Animal {
  hide() {
    alert(`${this.name} hides!`);
  }
}

let rabbits = [
  new Rabbit("White Rabbit", 10),
  new Rabbit("Black Rabbit", 5)
];

rabbits.sort(Rabbit.compare);

rabbits[0].run(); // Black Rabbit runs with speed 5.

alert(Rabbit.planet); // Earth
Now when we call Rabbit.compare, the inherited Animal.compare will be called.

How does it work? Again, using prototypes. As you might have already guessed, extends gives
 Rabbit the [[Prototype]] reference to Animal.


 //Rabbit.compare
//Normalde compare() metodu Animal sınıfına ait.
//Ama Rabbit.compare() diye çağırabiliyoruz çünkü statik metotlar da miras alınır.
//Burada rabbits dizisi, hızlarına göre sıralanıyor (en yavaş ilk sıraya).
//🔸 Rabbit.planet
//planet property’si Animal içinde tanımlı.
//Ancak Rabbit de bunu kullanabilir: Rabbit.planet → "Earth"

//Rabbit.__proto__ === Animal // ✅ true
//extends deyimi sayesinde:

//Rabbit’ın [[Prototype]]’ı Animal olur.
//Bu da Rabbit üzerinden Animal'ın statik özellik ve metodlarına erişim sağlar.

//Ama bu sadece sınıfın (class) kendisi içindir, örnekler (instance) bu static şeylere erişemez:

 */

/* 
So, Rabbit extends Animal creates two [[Prototype]] references:

Rabbit function prototypally inherits from Animal function.
Rabbit.prototype prototypally inherits from Animal.prototype.
As a result, inheritance works both for regular and static methods.

Here, let’s check that by code:

 class Animal {}
class Rabbit extends Animal {}

// for statics
alert(Rabbit.__proto__ === Animal); // true
// Rabbit sınıfı, Animal sınıfının statik özelliklerini ve metodlarını miras alıyor mu?
//✅ Evet, alıyor. Çünkü Rabbit.__proto__ → Animal olur.

// for regular methods
alert(Rabbit.prototype.__proto__ === Animal.prototype); // true
// Rabbit sınıfının örnekleri (instance'ları), Animal sınıfındaki metodlara erişebiliyor mu?
//✅ Evet, erişebiliyor. Çünkü Rabbit.prototype.__proto__ → Animal.prototype olur.

//Sınıf için: Rabbit.__proto__ === Animal
//Nesneler için: Rabbit.prototype.__proto__ === Animal.prototype
 */

/*
Static methods are used for the functionality that belongs to the class “as a whole”. It doesn’t 
relate to a concrete class instance.
For example, a method for comparison Article.compare(article1, article2) or a factory method 
Article.createTodays().
They are labeled by the word static in class declaration.
Static properties are used when we’d like to store class-level data, also not bound to an instance.
Statik yöntemler, "bir bütün olarak" sınıfa ait olan işlevsellik için kullanılır. Somut bir sınıf
 örneğiyle ilişkili değildir.
Örneğin, Article.compare(article1, article2) karşılaştırma yöntemi veya Article.createTodays() 
fabrika yöntemi.
Sınıf bildiriminde static kelimesiyle etiketlenirler.
Statik özellikler, bir örneğe bağlı olmayan, sınıf düzeyinde verileri depolamak istediğimizde 
kullanılır.
*/


/* class MyClass {
  static property = ...;

  static method() {
    ...
  }
}
Technically, static declaration is the same as assigning to the class itself:

MyClass.property = ...
MyClass.method = ...
Static properties and methods are inherited.

For class B extends A the prototype of the class B itself points to A: B.[[Prototype]] = A. 
So if a field is not found in B, the search continues in A.
 */



/* 
As we know, all objects normally inherit from Object.prototype and get access to “generic” 
object methods like hasOwnProperty etc.

For instance:

 class Rabbit {
  constructor(name) {
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

// hasOwnProperty method is from Object.prototype
alert( rabbit.hasOwnProperty('name') ); // true
But if we spell it out explicitly like "class Rabbit extends Object", then the result would be
 different from a simple "class Rabbit"?

What’s the difference?

//Rabbit sınıfından oluşturulan nesneler (new Rabbit(...)) zaten Object'in tüm metotlarını miras alır:
//let rabbit = new Rabbit("Rab");
//console.log(rabbit.hasOwnProperty("name")); // ✅ true
//Ama dikkat:
//Rabbit.getOwnPropertyNames // ❌ Error (çünkü Object'in static metodlarını almaz)


Here’s an example of such code (it doesn’t work – why? fix it?):

class Rabbit extends Object {
  constructor(name) {
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

alert( rabbit.hasOwnProperty('name') ); // Error
solution

First, let’s see why the latter code doesn’t work.

The reason becomes obvious if we try to run it. An inheriting class constructor must call super().
 Otherwise "this" won’t be “defined”.

So here’s the fix:

 class Rabbit extends Object {
  constructor(name) {
    super(); // need to call the parent constructor when inheriting, Eksik olursa hata 
    this.name = name;
  }
}
 
let rabbit = new Rabbit("Rab");                                  //   , Error: Must call super constructor

alert( rabbit.hasOwnProperty('name') ); // true
But that’s not all yet.

//Ama dikkat:
//Eğer super() çağırmazsan this tanımlanmaz ve hata verir:



Even after the fix, there’s still an important difference between "class Rabbit extends Object" 
and class Rabbit.

As we know, the “extends” syntax sets up two prototypes:

Between "prototype" of the constructor functions (for methods).
Between the constructor functions themselves (for static methods).
In the case of class Rabbit extends Object it means:

 class Rabbit extends Object {}

alert( Rabbit.prototype.__proto__ === Object.prototype ); // (1) true
alert( Rabbit.__proto__ === Object ); // (2) true
So Rabbit now provides access to the static methods of Object via Rabbit, like this:

 class Rabbit extends Object {}

// normally we call Object.getOwnPropertyNames
alert ( Rabbit.getOwnPropertyNames({a: 1, b: 2})); // a,b
But if we don’t have extends Object, then Rabbit.__proto__ is not set to Object.

Here’s the demo:

 class Rabbit {}

alert( Rabbit.prototype.__proto__ === Object.prototype ); // (1) true
alert( Rabbit.__proto__ === Object ); // (2) false (!)
alert( Rabbit.__proto__ === Function.prototype ); // as any function by default

// error, no such function in Rabbit
alert ( Rabbit.getOwnPropertyNames({a: 1, b: 2})); // Error
So Rabbit doesn’t provide access to static methods of Object in that case.

By the way, Function.prototype also has “generic” function methods, like call, bind etc. They 
are ultimately available in both cases, because for the built-in Object constructor, 
Object.__proto__ === Function.prototype.

So, to put it short, there are two differences:

class Rabbit	                                    class Rabbit extends Object
–	                                            needs to call super() in constructor
Rabbit.__proto__ === Function.prototype	                Rabbit.__proto__ === Object

//Eğer sadece Object metotları (örnek: hasOwnProperty, toString) kullanacaksan → class Rabbit yeterlidir.
//Ama Object’in static metotlarını (Object.getOwnPropertyNames, Object.assign vs.) 
// Rabbit sınıfına da vermek istiyorsan → extends Object yap.

 */


/*
//Private and protected properties and methods
//One of the most important principles of object oriented programming – delimiting internal 
// interface from the external one.
//Internal and external interface

//Terim	                       Anlamı	                                JavaScript Karşılığı
//External Interface	        Dışa açık, herkes erişebilir	         Public alan ve metotlar
//Internal Interface	        Sadece içeride kullanılmalı	           Private # ve Protected _ üyeler


In JavaScript, there are two types of object fields (properties and methods):

Public: accessible from anywhere. They comprise the external interface. Until now we were only 
using public properties and methods.
Private: accessible only from inside the class. These are for the internal interface.
In many other languages there also exist “protected” fields: accessible only from inside 
the class and those extending it (like private, but plus access from inheriting classes). They 
are also useful for the internal interface. They are in a sense more widespread than private
 ones, because we usually want inheriting classes to gain access to them.
*/




/* Protecting “waterAmount”

Let’s make a simple coffee machine class first:

 class CoffeeMachine {
  waterAmount = 0; // the amount of water inside

  constructor(power) {
    this.power = power;
    alert( `Created a coffee-machine, power: ${power}` );
  }

}

// create the coffee machine
let coffeeMachine = new CoffeeMachine(100); //constructor baslangic degeri oldugu icin power icin 100

// add water
coffeeMachine.waterAmount = 200;
Right now the properties waterAmount and power are public. We can easily get/set them from the 
outside to any value.

Let’s change waterAmount property to protected to have more control over it. For instance, we 
don’t want anyone to set it below zero.
 */

/* 
Protected properties are usually prefixed with an underscore _.

That is not enforced on the language level, but there’s a well-known convention between
 programmers that such properties and methods should not be accessed from the outside.

So our property will be called _waterAmount:

 class CoffeeMachine {
  _waterAmount = 0;

  set waterAmount(value) {
    if (value < 0) {
      value = 0;
    }
    this._waterAmount = value;
  }

  get waterAmount() {
    return this._waterAmount;
  }

  constructor(power) {
    this._power = power;
  }

}

// create the coffee machine
let coffeeMachine = new CoffeeMachine(100);

// add water
coffeeMachine.waterAmount = -10; // _waterAmount will become 0, not -10
Now the access is under control, so setting the water amount below zero becomes impossible.
 */



/* 
Read-only “power”

For power property, let’s make it read-only. It sometimes happens that a property must be set 
at creation time only, and then never modified.

That’s exactly the case for a coffee machine: power never changes.

To do so, we only need to make getter, but not the setter:

 class CoffeeMachine {
  // ...

  constructor(power) {
    this._power = power;
  }

  get power() {
    return this._power;
  }

}

// create the coffee machine
let coffeeMachine = new CoffeeMachine(100);

alert(`Power is: ${coffeeMachine.power}W`); // Power is: 100W

coffeeMachine.power = 25; // Error (no setter)
 */


/* 
Getter/setter functions
Here we used getter/setter syntax.

But most of the time get.../set... functions are preferred, like this:

class CoffeeMachine {
  _waterAmount = 0;

  setWaterAmount(value) {
    if (value < 0) value = 0;
    this._waterAmount = value;
  }

  getWaterAmount() {
    return this._waterAmount;
  }
}

new CoffeeMachine().setWaterAmount(100);
That looks a bit longer, but functions are more flexible. They can accept multiple arguments
 (even if we don’t need them right now).

On the other hand, get/set syntax is shorter, so ultimately there’s no strict rule, it’s up 
to you to decide.

Protected fields are inherited
If we inherit class MegaMachine extends CoffeeMachine, then nothing prevents us from accessing 
this._waterAmount or this._power from the methods of the new class.

So protected fields are naturally inheritable. Unlike private ones that we’ll see below.

//coffeeMachine.waterAmount = 100; // get/set kullanımı
//coffeeMachine.setWaterAmount(100); // function kullanımı
//İki yaklaşım da geçerlidir. Seçim tamamen senin yazım tercihlerine ve kullanım senaryona bağlıdır:
//UI bileşenleri gibi nesnelerde get/set daha yaygındır.
//Çok parametre alacaksa, validation işlemi gerekiyorsa → setX() fonksiyonu daha uygundur.
 */



/* //Private “#waterLimit”
There’s a finished JavaScript proposal, almost in the standard, that provides language-level 
support for private properties and methods.

Privates should start with #. They are only accessible from inside the class.

For instance, here’s a private #waterLimit property and the water-checking private method 
#fixWaterAmount:

 class CoffeeMachine {
  #waterLimit = 200;

  #fixWaterAmount(value) {
    if (value < 0) return 0;
    if (value > this.#waterLimit) return this.#waterLimit;
  }

  setWaterAmount(value) {
    this.#waterLimit = this.#fixWaterAmount(value);
  }

}

let coffeeMachine = new CoffeeMachine();

// can't access privates from outside of the class
coffeeMachine.#fixWaterAmount(123); // Error
coffeeMachine.#waterLimit = 1000; // Error
On the language level, # is a special sign that the field is private. We can’t access it from 
outside or from inheriting classes.

Private fields do not conflict with public ones. We can have both private #waterAmount and 
public waterAmount fields at the same time.

For instance, let’s make waterAmount an accessor for #waterAmount:

 class CoffeeMachine {

  #waterAmount = 0;

  get waterAmount() {
    return this.#waterAmount;
  }

  set waterAmount(value) {
    if (value < 0) value = 0;
    this.#waterAmount = value;
  }
}

let machine = new CoffeeMachine();

machine.waterAmount = 100;
alert(machine.#waterAmount); // Error
Unlike protected ones, private fields are enforced by the language itself. That’s a good thing.

But if we inherit from CoffeeMachine, then we’ll have no direct access to #waterAmount. We’ll 
need to rely on waterAmount getter/setter:

class MegaCoffeeMachine extends CoffeeMachine {
  method() {
    alert( this.#waterAmount ); // Error: can only access from CoffeeMachine
  }
}
In many scenarios such limitation is too severe. If we extend a CoffeeMachine, we may have 
legitimate reasons to access its internals. That’s why protected fields are used more often,
 even though they are not supported by the language syntax.

Private fields are not available as this[name]
Private fields are special.

As we know, usually we can access fields using this[name]:

class User {
  ...
  sayHi() {
    let fieldName = "name";
    alert(`Hello, ${this[fieldName]}`);
  }
}
With private fields that’s impossible: this['#name'] doesn’t work. That’s a syntax limitation
 to ensure privacy.
 
 //❌ this["#name"] gibi dolaylı yollarla da erişilemezler.
  // private oldugu icin disardan erisilemiyor
 */



/* To hide an internal interface we use either protected or private properties:

Protected fields start with _. That’s a well-known convention, not enforced at the language 
level. Programmers should only access a field starting with _ from its class and classes 
inheriting from it.
Private fields start with #. JavaScript makes sure we can only access those from inside the
 class.
Right now, private fields are not well-supported among browsers, but can be polyfilled.

 */


//Extending built-in classes

/* 
Extending built-in classes
Built-in classes like Array, Map and others are extendable also.

For instance, here PowerArray inherits from the native Array:

 // add one more method to it (can do more)
class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }
}

let arr = new PowerArray(1, 2, 5, 10, 50);
alert(arr.isEmpty()); // false

let filteredArr = arr.filter(item => item >= 10);
alert(filteredArr); // 10, 50
alert(filteredArr.isEmpty()); // false
Please note a very interesting thing. Built-in methods like filter, map and others – return
 new objects of exactly the inherited type PowerArray. Their internal implementation uses the 
 object’s constructor property for that.
//filter() gibi metotlar, yeni bir dizi döndürür.
//Ama bu yeni dizi PowerArray türünde olur, yani özel metodunu korur!
//alert(filteredArr instanceof PowerArray); // ✅ true
//alert(filteredArr.isEmpty());             // ✅ çalışır
//Çünkü filter() gibi metotlar this.constructor üzerinden yeni nesne yaratır.
//Yani arr.constructor === PowerArray, ve filter() sonucu da PowerArray olur.


In the example above,

arr.constructor === PowerArray
When arr.filter() is called, it internally creates the new array of results using exactly 
arr.constructor, not basic Array. That’s actually very cool, because we can keep using 
PowerArray methods further on the result.

Even more, we can customize that behavior.

We can add a special static getter Symbol.species to the class. If it exists, it should return 
the constructor that JavaScript will use internally to create new entities in map, filter and
 so on.

If we’d like built-in methods like map or filter to return regular arrays, we can return Array 
in Symbol.species, like here:

 class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }

  //Bazı durumlarda filter(), map() gibi metotların PowerArray değil, normal Array dönmesini isteyebilirsin.
//işte bu durumda Symbol.species devreye girer:


  // built-in methods will use this as the constructor
  static get [Symbol.species]() { 
    return Array; //YENİ OLUŞAN nesneler normal Array olacak
  }
  //filter(), map() gibi metodlar yeni nesne üretirken bu değeri kullanır.
//Bu sayede türetilmiş sınıfın davranışını kontrol edebilirsin.

}

let arr = new PowerArray(1, 2, 5, 10, 50);
alert(arr.isEmpty()); // false

// filter creates new array using arr.constructor[Symbol.species] as constructor
let filteredArr = arr.filter(item => item >= 10);

// filteredArr is not PowerArray, but Array
alert(filteredArr.isEmpty()); // Error: filteredArr.isEmpty is not a function
As you can see, now .filter returns Array. So the extended functionality is not passed any 
further.

Other collections work similarly
Other collections, such as Map and Set, work alike. They also use Symbol.species.


//filteredArr artık normal Array olur.
//Dolayısıyla özel metodun (isEmpty) kaybolur:
//Aynı kalıtım mantığı Map, Set gibi yerleşik koleksiyonlarda da geçerlidir:

//Yeni davranışlar eklemek	Array, Map, vs. sınıflara özel metodlar tanımlayabilirsin.
//filter/map sonucu kontrolü	 Symbol.species ile bu metodların ne tür nesne döndüreceğini sen belirleyebilirsin.
//Genişletilebilir yapı kurmak	Kodunu modüler ve yeniden kullanılabilir hale getirir.
//Symbol.species	Bu davranışı özelleştirir (örneğin Array döndürmesini sağlar). duz array olusturuyor
//eski metotlari kayboluyor


//Özellik	                          Symbol.species YOK	              Symbol.species VAR (Array döner)
//filter(), map() sonucu      	     PowerArray	                      Array
//Özel metodlar (isEmpty)	             KALIR                          	KAYBOLUR
//Genişletilmiş sınıf korunur mu?	     ✅ Evet	                       ❌ Hayır
//filtered instanceof PowerArray	     ✅ true	                       ❌ false

 */

/* 
No static inheritance in built-ins

Built-in objects have their own static methods, for instance Object.keys, Array.isArray etc.

As we already know, native classes extend each other. For instance, Array extends Object.

Normally, when one class extends another, both static and non-static methods are inherited.
 That was thoroughly explained in the article Static properties and methods.

But built-in classes are an exception. They don’t inherit statics from each other.

For example, both Array and Date inherit from Object, so their instances have methods from 
Object.prototype. But Array.[[Prototype]] does not reference Object, so there’s no, for instance, 
Array.keys() (or Date.keys()) static method.

//Normal sınıflar static methodları miras alır. (yani static olan şeyler üst sınıftan alt sınıfa geçer)
//Ama yerleşik sınıflar (Array, Date, Map, vs.) bu kuralı bozuyor:
//"Statik methodlar miras alınmaz"

//Array.isArray([]); // ✅ Bu çalışır: Array'in static methodu
//Object.keys({});   // ✅ Bu da çalışır: Object'in static methodu
//Ama:
//Array.keys(); // ❌ TypeError: Array.keys is not a function
//Date.keys();  // ❌ TypeError
//❓ Neden? Çünkü:
//Array, Object'tan kalıtsal olarak geliyor olsa bile
//Object.keys gibi statik methodlar, Array'e aktarılmaz
//Yani Object.keys var ama Array.keys diye bir şey yok çünkü Array, Object'ın statik methodlarını miras almaz.

//console.log(Object.keys({a:1})); // ✅ ['a']
//console.log(Array.keys);        // ❌ undefined
//console.log(Date.keys);         // ❌ undefined
//Halbuki Array ve Date, Object sınıfından geliyor... ama static methodları geçmiyor.
//Yerleşik sınıflar "native code" ile yazılmıştır
//Array, Date, Map gibi sınıflar JavaScript ile değil, tarayıcı motorunun içinde C++ gibi dillerle tanımlanmıştır.
//Bu nedenle onların static prototip zinciri, normal sınıflardan farklı davranır.

 */


/* 
//Class checking: "instanceof"
The instanceof operator allows to check whether an object belongs to a certain class. It also
 takes inheritance into account.
//instanceof operatörü, bir nesnenin hangi sınıftan (veya onun mirasçılarından) türediğini kontrol eder.

Such a check may be necessary in many cases. For example, it can be used for building a 
polymorphic function, the one that treats arguments differently depending on their type.

The instanceof operator
//instanceof şu şekilde çalışır:
//arr instanceof Array ⇒ arr.__proto__ zincirinde Array.prototype var mı?
//Varsa ✅ true döner
//Yoksa 🔴 false döner

The syntax is:

obj instanceof Class
It returns true if obj belongs to the Class or a class inheriting from it.

For instance:

 class Rabbit {}
let rabbit = new Rabbit();

// is it an object of Rabbit class?
alert( rabbit instanceof Rabbit ); // true
It also works with constructor functions:

 // instead of class
function Rabbit() {}

alert( new Rabbit() instanceof Rabbit ); // true
…And with built-in classes like Array:

 let arr = [1, 2, 3];
alert( arr instanceof Array ); // true
alert( arr instanceof Object ); // true
Please note that arr also belongs to the Object class. That’s because Array prototypically 
inherits from Object.

Normally, instanceof examines the prototype chain for the check. We can also set a custom 
logic in the static method Symbol.hasInstance
 */


/* 
The algorithm of obj instanceof Class works roughly as follows:

If there’s a static method Symbol.hasInstance, then just call it: Class[Symbol.hasInstance](obj). It 
should return either true or false, and we’re done. That’s how we can customize the behavior of instanceof.

For example:

 // setup instanceOf check that assumes that
// anything with canEat property is an animal
class Animal {
  static [Symbol.hasInstance](obj) {
    if (obj.canEat) return true;
  }
}

let obj = { canEat: true };

alert(obj instanceof Animal); // true: Animal[Symbol.hasInstance](obj) is called
//İlk olarak, class’ın içinde özel olarak tanımlanmış bir Symbol.hasInstance() metodu varsa, instanceof bunu çağırır.
//Burada, obj aslında Animal sınıfından oluşturulmamış ama canEat özelliği var diye biz true dönüyoruz.


Most classes do not have Symbol.hasInstance. In that case, the standard logic is used: obj 
instanceOf Class checks whether Class.prototype is equal to one of the prototypes in the obj 
prototype chain.

In other words, compare one after another:

obj.__proto__ === Class.prototype?
obj.__proto__.__proto__ === Class.prototype?
obj.__proto__.__proto__.__proto__ === Class.prototype?
...
// if any answer is true, return true
// otherwise, if we reached the end of the chain, return false
In the example above rabbit.__proto__ === Rabbit.prototype, so that gives the answer immediately.

In the case of an inheritance, the match will be at the second step:

 class Animal {}
class Rabbit extends Animal {}

let rabbit = new Rabbit();
alert(rabbit instanceof Animal); // true

// rabbit.__proto__ === Animal.prototype (no match)
// rabbit.__proto__.__proto__ === Animal.prototype (match!)

 */



/* 
By the way, there’s also a method objA.isPrototypeOf(objB), that returns true if objA is 
somewhere in the chain of prototypes for objB. So the test of obj instanceof Class can be 
rephrased as Class.prototype.isPrototypeOf(obj).

It’s funny, but the Class constructor itself does not participate in the check! Only the chain
 of prototypes and Class.prototype matters.

That can lead to interesting consequences when a prototype property is changed after the object
 is created.
//Animal.prototype.isPrototypeOf(dog) , dog instanceof Animal ifadesi ile aynı anlama gelir
//dog instanceof Animal ≈ Animal.prototype.isPrototypeOf(dog)

Like here:

 function Rabbit() {}
let rabbit = new Rabbit();

// changed the prototype
Rabbit.prototype = {};

// ...not a rabbit any more!
alert( rabbit instanceof Rabbit ); // false

 */

/* 
Bonus: Object.prototype.toString for the type
//"tip tespiti" (type detection).
We already know that plain objects are converted to string as [object Object]:

 let obj = {};

alert(obj); // [object Object]
alert(obj.toString()); // the same
That’s their implementation of toString. But there’s a hidden feature that makes toString 
actually much more powerful than that. We can use it as an extended typeof and an alternative 
for instanceof.
//obj nesnesinin toString metodunun Object.prototype.toString olmasıdır ve bu da varsayılan olarak [object Object] döner.
Sounds strange? Indeed. Let’s demystify.

By specification, the built-in toString can be extracted from the object and executed in the 
context of any other value. And its result depends on that value.

For a number, it will be [object Number]
For a boolean, it will be [object Boolean]
For null: [object Null]
For undefined: [object Undefined]
For arrays: [object Array]
…etc (customizable).
Let’s demonstrate:

 // copy toString method into a variable for convenience
let objectToString = Object.prototype.toString;

// what type is this?
let arr = [];

alert( objectToString.call(arr) ); // [object Array]
Here we used call as described in the chapter Decorators and forwarding, call/apply to execute 
the function objectToString in the context this=arr.

//Ancak Object.prototype.toString metodu, yalnızca object tipinde değil, her türlü veri tipi 
// için kullanılabilir — sayılar, diziler, fonksiyonlar, null, undefined vs.
//Ama nasıl?
//Metodu başka veri tiplerine uygulayarak. Bunu da .call() veya .apply() ile yapabiliyoruz.

//call(arr) sayesinde this = arr olarak çalıştırıyoruz.
//Yani: Object.prototype.toString.call([]) → "[object Array]"
//Bu bize dizinin tipini net olarak veriyor. Normalde typeof arr sadece "object" derdi,
//  ama bu yöntemle "Array" olduğunu görebiliyoruz.



Internally, the toString algorithm examines this and returns the corresponding result. More
 examples:

 let s = Object.prototype.toString;

alert( s.call(123) ); // [object Number]
alert( s.call(null) ); // [object Null]
alert( s.call(alert) ); // [object Function]


//Normalde JavaScript'te typeof bazı tipler için yetersizdir:
//typeof null;      // "object"  ❌ beklenen "null"
//typeof [];        // "object"  ❌ beklenen "array"
//Ama:
//Object.prototype.toString.call(null); // "[object Null]" ✅
//Object.prototype.toString.call([]);   // "[object Array]" ✅
//Bu yöntemi kullanarak veri tipini %100 doğru şekilde öğrenebiliriz.


//Kütüphaneler (Lodash, Underscore, vs.) genellikle veri tipini güvenli 
// şekilde anlamak için bu yöntemi kullanır.
//instanceof bazı durumlarda işe yaramaz (özellikle farklı global context'lerde).
//typeof da karmaşık nesnelerde yetersizdir.

//verdigmiz degiskenin thisini kullaniyoruz
//a.call(b) demek = Object.prototype.toString.call(b) demek
//Bu sadece toString fonksiyonunu, this = b olarak çalıştırır
//Sonuç: "[object Array]"
//🟡 Ama b hâlâ dizidir, başka bir tipe dönüşmez.
//call() metodu, bir fonksiyonu istediğimiz this değeriyle çalıştırmak için kullanılır. 
// Yani: func.call(thisArg, arg1, arg2, ...)

// a.call(b) demek, a fonksiyonunu this = b olarak çalıştır demektir.
//Yani Object.prototype.toString.call(b) sadece b'nin tipini string olarak bize gösterir
//  ama b hâlâ aynı türde kalır (örneğin bir dizi).
 */
/*
function selamla(isim) {
  console.log(this.prefix + isim);
}

let baglam = { prefix: "Merhaba " };

selamla.call(baglam, "Serkan"); // Merhaba Serkan
this = baglam oldu çünkü call()'a ilk argüman olarak baglam verdik.
"Serkan" ise fonksiyonun normal parametresi olarak geçti.

*/

/*
function toplam(a, b) {
  console.log(this.prefix + (a + b));
}

let obj = { prefix: "Toplam: " };

toplam.call(obj, 3, 5); // Toplam: 8
this → obj
a = 3, b = 5 → parametre olarak geçti

*/



/* 
Symbol.toStringTag

The behavior of Object toString can be customized using a special object property
 Symbol.toStringTag.
//Symbol.toStringTag, bir nesneye Object.prototype.toString.call(...) ile 
// baktığımızda görünen ismi belirleyen özel (symbol) bir özelliktir.


For instance:

 let user = {
  [Symbol.toStringTag]: "User"
};

alert( {}.toString.call(user) ); // [object User]
//user adlı nesneye özel bir özellik tanımlanıyor: [Symbol.toStringTag]: "User"
//Sonra {}.toString.call(user) ile Object.prototype.toString çağrılıyor
//Normalde bu [object Object] dönerdi
//Ama şimdi Symbol.toStringTag tanımlandığı için: [object User] olarak döner
//Yani çıktı artık özelleştirildi.

//Bu şu demek:
//Object.prototype.toString.call(user)
//Ama daha kısa olsun diye şöyle yazılıyor:
//{}.toString.call(user)
//Burada {} aslında boş bir nesne. Bu nesnenin toString metodu = Object.prototype.toString.


For most environment-specific objects, there is such a property. Here are some browser specific 
examples:

 // toStringTag for the environment-specific object and class:
alert( window[Symbol.toStringTag]); // Window
alert( XMLHttpRequest.prototype[Symbol.toStringTag] ); // XMLHttpRequest

alert( {}.toString.call(window) ); // [object Window]
alert( {}.toString.call(new XMLHttpRequest()) ); // [object XMLHttpRequest]
As you can see, the result is exactly Symbol.toStringTag (if exists), wrapped into [object ...].

At the end we have “typeof on steroids” that not only works for primitive data types, but also 
for built-in objects and even can be customized.

We can use {}.toString.call instead of instanceof for built-in objects when we want to get the
 type as a string rather than just to check.

//Yöntem	                                   Açıklama
//typeof	                                     Primitifler için uygun, nesnelerde yetersiz
//instanceof	                                Sınıf kontrolü için kullanılır ama farklı global ortamlar (iframe vs.) sorun yaratabilir
//Object.prototype.toString.call(...)	          Detaylı, her tür için güvenilir, Symbol.toStringTag ile özelleştirilebilir
 */


/* 
                                works for	                                  returns
typeof	                                primitives	                            string
{}.toString	primitives,   built-in objects,objects with Symbol.toStringTag	    string
instanceof	                                objects	                              true/false

As we can see, {}.toString is technically a “more advanced” typeof.
And instanceof operator really shines when we are working with a class hierarchy and want 
to check for the class taking into account inheritance.

//typeof null       // ❌ "object" (tarihsel hata!)
//typeof {}         // "object"
//typeof []         // "object" (Dizi olduğunu söylemez!)

// {}.toString.call(...): Gelişmiş Tip Algılama
//Object.prototype.toString.call(null);          // [object Null]
//true/false değil, string döner, karşılaştırma için ekstra işlem gerekebilir.


//instanceof: Nesne ve Sınıf Kontrolü
//Class/constructor ilişkisi kontrolü için çok kullanışlıdır.
//Mirası (inheritance) dikkate alır.
//Sadece nesnelerde çalışır.
//Farklı global ortamlarda (iframe, window) sınıf referansları farklı olabilir, bu da false verebilir.
 */
/* 

In the code below, why does instanceof return true? We can easily see that a is not 
created by B().

 function A() {}
function B() {}

A.prototype = B.prototype = {};
//Bu satırda, hem A.prototype hem de B.prototype aynı boş objeye ({}) eşitleniyor.

//
let a = new A();

alert( a instanceof B ); // true
But instanceof does not care about the function, but rather about its prototype, that it
 matches against the prototype chain.

And here a.__proto__ == B.prototype, so instanceof returns true.

So, by the logic of instanceof, the prototype actually defines the type, not the constructor
 function.

 //new A() dediğimizde şu olur:

//Boş bir obje oluşturulur: {}
//Bu objenin __proto__'su (yani prototip referansı) A.prototype olur.
//Yani:
//a.__proto__ === A.prototype
//Şimdi a.__proto__ === A.prototype === B.prototype
//Çünkü A.prototype ile B.prototype aynı objeye işaret ediyor.

//instanceof constructor fonksiyonuna değil, o fonksiyonun prototype objesine bakar.
//a.__proto__ (yani a'nın prototipi), B.prototype ile aynıysa a instanceof B true olur.
//A.prototype = B.prototype yaptığımız için aslında a'nın prototipi B.prototype ile aynı.
//Bu yüzden a instanceof B true.

//Neden a B tarafından yaratılmamış gibi gözükür ama instanceof B true döner?
//Çünkü instanceof sadece prototip zincirini kontrol eder, constructor fonksiyonunun kim 
// olduğu veya new ile hangi fonksiyonun çağrıldığına bakmaz.
//a instanceof B  // true
//çünkü:
//a.__proto__ === B.prototype (çünkü A.prototype = B.prototype = {})
//instanceof sadece prototip zincirinde arama yapar.
 */

//mixins

/*
In JavaScript we can only inherit from a single object. There can be only one [[Prototype]] 
for an object. And a class may extend only one other class.
But sometimes that feels limiting. For instance, we have a class StreetSweeper and a class 
Bicycle, and want to make their mix: a StreetSweepingBicycle.
Or we have a class User and a class EventEmitter that implements event generation, and we’d like 
to add the functionality of EventEmitter to User, so that our users can emit events.
There’s a concept that can help here, called “mixins”.
As defined in Wikipedia, a mixin is a class containing methods that can be used by other classes 
without a need to inherit from it.
In other words, a mixin provides methods that implement a certain behavior, but we do not use it 
alone, we use it to add the behavior to other classes.
JavaScript'te yalnızca tek bir nesneden miras alabiliriz. Bir nesne için sadece bir [[Prototype]]
 olabilir. Bir sınıf sadece bir sınıfı daha genişletebilir.
Ama bazen bu sınırlayıcı geliyor. Örneğin, bir sınıf StreetSweeper ve bir sınıf Bisikletimiz var 
ve karışımlarını yapmak istiyoruz: bir StreetSweepingBicycle.
Ya da olay üretimini uygulayan bir sınıf Kullanıcı ve bir sınıf EventEmitter var ve 
kullanıcılarımızın etkinlik yayabilmesi için EventEmitter'in işlevselliğini Kullanıcıya eklemek 
istiyoruz.
Burada yardımcı olabilecek bir konsept var, “mixins”.
Vikipedi'de tanımlandığı gibi, bir mixin, diğer sınıflar tarafından ondan miras almaya gerek 
kalmadan kullanılabilecek yöntemler içeren bir sınıftır.
Başka bir deyişle, bir mixin belirli bir davranışı uygulayan yöntemler sağlar, ancak bunu tek
 başına kullanmayız, davranışı diğer sınıflara eklemek için kullanırız.
*/

/* 
A mixin example

The simplest way to implement a mixin in JavaScript is to make an object with useful methods, 
so that we can easily merge them into a prototype of any class.

For instance here the mixin sayHiMixin is used to add some “speech” for User:

 // mixin
let sayHiMixin = {
  sayHi() {
    alert(`Hello ${this.name}`);
  },
  sayBye() {
    alert(`Bye ${this.name}`);
  }
};

// usage:
class User {
  constructor(name) {
    this.name = name;
  }
}

// copy the methods
Object.assign(User.prototype, sayHiMixin);
//Object.assign() fonksiyonu, bir nesnenin özelliklerini başka bir nesneye kopyalar.
//Burada sayHiMixin içindeki metodlar, doğrudan User.prototype içine kopyalanıyor.
//Sonuç olarak User sınıfının örnekleri (User objeleri), sayHi() ve sayBye() metodlarına sahip oluyorlar.

// now User can say hi
new User("Dude").sayHi(); // Hello Dude!
There’s no inheritance, but a simple method copying. So User may inherit from another class 
and also include the mixin to “mix-in” the additional methods, like this:

class User extends Person {
  // ...
}

Object.assign(User.prototype, sayHiMixin);
Mixins can make use of inheritance inside themselves.

//User burada başka bir sınıf (Person) üzerinden kalıtım alıyor.
//Ama sayHiMixin'in metodları kopyalandığı için, User sınıfı sanki birden fazla yerden özellik almış gibi davranıyor.
//User hem Person'dan kalıtım alıyor, hem de sayHiMixin ile karışım (mixin) alıyor.

//JavaScript tekli kalıtım destekler (sadece bir extends).
//Ama birçok sınıfta tekrar kullanmak istediğin metodlar varsa, mixin ile tekrar eden kodları merkezi hale getirebilirsin.
//Özellikle davranış bazlı parçalar için idealdir (örneğin: konuşma, loglama, zamanlama gibi şeyler).


//Mixin İçinde Kalıtım Kullanımı

let advancedMixin = {
  __proto__: sayHiMixin, // kalıtım gibi davranır
  sayWelcome() {
    alert(`Welcome ${this.name}`);
  }
};
//Burada advancedMixin, sayHiMixin'i kendi içinde kalıtım gibi kullanıyor.
//Artık advancedMixin hem sayHi() ve sayBye()'a, hem de sayWelcome() metoduna sahip olur.
 */


/* For instance, here sayHiMixin inherits from sayMixin:

 let sayMixin = {
  say(phrase) {
    alert(phrase);
  }
};

let sayHiMixin = {
  __proto__: sayMixin, // (or we could use Object.setPrototypeOf to set the prototype here)
//Alternatif olarak şu da yazılabilir:
//Object.setPrototypeOf(sayHiMixin, sayMixin);
  
sayHi() {
    // call parent method
    super.say(`Hello ${this.name}`); // (*)
  },

  sayBye() {
    super.say(`Bye ${this.name}`); // (*)
  }
//Burada super, sayHiMixin'in prototipini (yani sayMixin) temsil eder.
//Bu yüzden super.say(...) çağrısı, sayMixin.say(...) fonksiyonunu çağırır.
//super ifadesi, literal olarak __proto__ ile ayarlanmış nesneye erişmek için kullanılıyor.

//Bu super çağrısı bir sınıfın içinde değil, bir nesne (mixin) metodunda çalışıyor. 
// Yine de super çalışıyor çünkü JavaScript bunu destekliyor — eğer nesnenin 
// prototipi başka bir nesneye ayarlanmışsa.

};

class User {
  constructor(name) {
    this.name = name;
  }
}

// copy the methods
Object.assign(User.prototype, sayHiMixin);

// now User can say hi
new User("Dude").sayHi(); // Hello Dude!
Please note that the call to the parent method super.say() from sayHiMixin (at lines labelled
 with (*)) looks for the method in the prototype of that mixin, not the class.

 //say() metodu kopyalanmaz!
//Çünkü say() sadece sayHiMixin.__proto__’da var. Yani sayHiMixin kendi içinde super.say() 
// diyerek ulaşıyor buna. Bu yüzden mixin’in içindeki super.say(...) hâlâ çalışıyor.

 */

/*
EventMixin

Now let’s make a mixin for real life.

An important feature of many browser objects (for instance) is that they can generate events. 
Events are a great way to “broadcast information” to anyone who wants it. So let’s make a mixin 
that allows us to easily add event-related functions to any class/object.
The mixin will provide a method .trigger(name, [...data]) to “generate an event” when something 
important happens to it. The name argument is a name of the event, optionally followed by 
additional arguments with event data.
Also the method .on(name, handler) that adds handler function as the listener to events with the
 given name. It will be called when an event with the given name triggers, and get the arguments 
 from the .trigger call.
…And the method .off(name, handler) that removes the handler listener.
After adding the mixin, an object user will be able to generate an event "login" when the visitor
 logs in. And another object, say, calendar may want to listen for such events to load the 
 calendar for the logged-in person.
Or, a menu can generate the event "select" when a menu item is selected, and other objects may
 assign handlers to react on that event. And so on.
Now’s gerçek hayat için bir mixin yapalım.
Birçok tarayıcı nesnesinin önemli bir özelliği (örneğin) olay üretebilmeleridir. Etkinlikler, 
“yayın bilgisi”'ı isteyen herkese harika bir yoldur. Bu yüzden’ler, herhangi bir sınıfa/nesneye 
olayla ilgili işlevleri kolayca eklememizi sağlayan bir mixin yapsınlar.
Mixin, “'a bir yöntem sağlayacak .trigger(isim, [...data]), başına önemli bir şey geldiğinde bir 
event” üretir. Ad argümanı, isteğe bağlı olarak olay verileriyle ek argümanlar izleyen olayın bir
 adıdır.
Ayrıca verilen adla olaylara dinleyici olarak işleyicilik işlevi ekleyen yöntem .on(isim, 
işleyici). Verilen adı taşıyan bir olay tetiklendiğinde ve argümanları .trigger çağrısından 
aldığında çağrılacaktır.
...Ve işleyici dinleyiciyi kaldıran yöntem .off(isim, işleyici).
Mixin eklendikten sonra, bir nesne kullanıcısı ziyaretçi giriş yaptığında bir olay "girişi" 
oluşturabilir. Ve başka bir nesne, örneğin, takvim, oturum açan kişinin takvimini yüklemek 
için bu tür olayları dinlemek isteyebilir.
Veya bir menü öğesi seçildiğinde bir menü olayı "seç" oluşturabilir ve diğer nesneler bu 
olaya tepki vermek için işleyiciler atayabilir. Ve benzeri.

*/

/* 
let eventMixin = {
  
  // * Subscribe to event, usage:
  // *  menu.on('select', function(item) { ... }
  
  on(eventName, handler) {
    if (!this._eventHandlers) this._eventHandlers = {};
    if (!this._eventHandlers[eventName]) {
      this._eventHandlers[eventName] = [];
    }
    this._eventHandlers[eventName].push(handler);
  },

  
 //  * Cancel the subscription, usage:
 //  *  menu.off('select', handler)
 //  *
  off(eventName, handler) {
    let handlers = this._eventHandlers?.[eventName];
    if (!handlers) return;
    for (let i = 0; i < handlers.length; i++) {
      if (handlers[i] === handler) {
        handlers.splice(i--, 1);
      }
    }
  },
  //splice(i--, 1):
//Önce i'deki elemanı siler.
//Sonra i-- ile bir geri gider.
//Bu, dizi elemanları silindikten sonra kaymayı telafi etmek için yapılır.
//Aksi halde bazı elemanlar atlanabilir.


  
  // * Generate an event with the given name and data
  // *  this.trigger('select', data1, data2);
  // *
  trigger(eventName, ...args) {
    if (!this._eventHandlers?.[eventName]) {
      return; // no handlers for that event name
    }

    // call the handlers
    this._eventHandlers[eventName].forEach(handler => handler.apply(this, args));
  }
};
.on(eventName, handler) – assigns function handler to run when the event with that name occurs. 
Technically, there’s an _eventHandlers property that stores an array of handlers for each event 
name, and it just adds it to the list.
.off(eventName, handler) – removes the function from the handlers list.
.trigger(eventName, ...args) – generates the event: all handlers from _eventHandlers[eventName] 
are called, with a list of arguments ...args.
Usage:

 // Make a class
class Menu {
  choose(value) {
    this.trigger("select", value);
  }
}
// Add the mixin with event-related methods
Object.assign(Menu.prototype, eventMixin);

let menu = new Menu();

// add a handler, to be called on selection:
menu.on("select", value => alert(`Value selected: ${value}`));

// triggers the event => the handler above runs and shows:
// Value selected: 123
menu.choose("123");
Now, if we’d like any code to react to a menu selection, we can listen for it with menu.on(...).

And eventMixin mixin makes it easy to add such behavior to as many classes as we’d like, without interfering with the inheritance chain.

//Bu mixin, herhangi bir sınıfa event sistemi eklemeyi mümkün kılar.
//Başka sınıflardan extends almanı engellemez (inheritance zincirine karışmaz).
//Çok sayıda nesneye, yeniden yazmadan ortak event davranışı katmanı sağlar.

//trigger, on ve off ile kendi olay sistemimizi (custom event system) yazmış olduk. Bu
//  sayede sınıflar arası iletişim kurabiliyoruz. Yani bir sınıf, dışarıya “şimdi bir şey 
// oldu!” diyebiliyor; başka bir kod da “olduysa bana haber ver!” diyebiliyor.

// örneğin:
//Kullanıcı tıkladığında
//Sunucudan veri geldiğinde
//Bir iş bittiğinde
//bir olay (event) oluşturur ve bazı işlemleri otomatik olarak tetiklemek ister.
//Tarayıcıda buna örnek:
//button.addEventListener("click", () => { ... });
//Biz de kendi sınıflarımız için benzer bir sistem kurduk.
 */



/*
Mixin – is a generic object-oriented programming term: a class that contains methods for other
 classes.
Some other languages allow multiple inheritance. JavaScript does not support multiple inheritance,
 but mixins can be implemented by copying methods into prototype.
We can use mixins as a way to augment a class by adding multiple behaviors, like event-handling 
as we have seen above.
Mixins may become a point of conflict if they accidentally overwrite existing class methods. So 
generally one should think well about the naming methods of a mixin, to minimize the probability
 of that happening.
Mixin –, genel bir nesne yönelimli programlama terimidir: diğer sınıflar için yöntemler içeren
 bir sınıf.
Diğer bazı diller birden fazla kalıtıma izin verir. JavaScript çoklu kalıtlamayı desteklemez, 
ancak mixinler yöntemleri prototipe kopyalayarak uygulanabilir.
Karışımları, yukarıda gördüğümüz gibi olay işleme gibi birden fazla davranış ekleyerek bir sınıfı
 büyütmenin bir yolu olarak kullanabiliriz.
Miksinler, yanlışlıkla mevcut sınıf yöntemlerinin üzerine yazılırsa bir çatışma noktası haline
 gelebilir. Bu nedenle, genel olarak, bunun gerçekleşme olasılığını en aza indirmek için bir 
 mixinin adlandırma yöntemleri hakkında iyi düşünülmelidir.

*/

