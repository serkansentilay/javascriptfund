//callbacks
//Many functions are provided by JavaScript host environments that allow you to schedule 
// asynchronous actions. In other words, actions that we initiate now, but they finish 
// later.


/*
the function loadScript(src), that loads a script with the given src:

function loadScript(src) {
  // creates a <script> tag and append it to the page
  // this causes the script with given src to start loading and run when complete
  let script = document.createElement('script');
  script.src = src;
  document.head.append(script);
}
It inserts into the document a new, dynamically created, tag <script src="…"> with the 
given src. The browser automatically starts loading it and executes when complete.

We can use this function like this:

// load and execute the script at the given path
loadScript('/my/script.js');
The script is executed “asynchronously”, as it starts loading now, but runs later, when 
the function has already finished.

If there’s any code below loadScript(…), it doesn’t wait until the script loading finishes.

loadScript('/my/script.js');
// the code below loadScript
// doesn't wait for the script loading to finish
// ...
Let’s say we need to use the new script as soon as it loads. It declares new functions,
 and we want to run them.

But if we do that immediately after the loadScript(…) call, that wouldn’t work:

loadScript('/my/script.js'); // the script has "function newFunction() {…}"

newFunction(); // no such function!
Naturally, the browser probably didn’t have time to load the script. As of now, the loadScript 
function doesn’t provide a way to track the load completion. The script loads and eventually 
runs, that’s all. But we’d like to know when it happens, to use new functions and variables 
from that script.

//fonk src linki veriliyor , beklemeden icindeki kodlari calistiriyor
*/

/*
Let’s add a callback function as a second argument to loadScript that should execute 
when the script loads:

function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(script);

  document.head.append(script);
}
The onload event is described in the article Resource loading: onload and onerror, it 
basically executes a function after the script is loaded and executed.

Now if we want to call new functions from the script, we should write that in the callback:

loadScript('/my/script.js', function() {
  // the callback runs after the script is loaded
  newFunction(); // so now it works
  ...
});
That’s the idea: the second argument is a function (usually anonymous) that runs when 
the action is completed.


*/

/*
callback fonksiyonu, script başarıyla yüklendikten sonra çağrılır.
script.onload: Bu event, <script> etiketi içindeki dosya yüklendiğinde tetiklenir.

*/


/*
Here’s a runnable example with a real script:

 function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;
  script.onload = () => callback(script);
  document.head.append(script);
}

loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', script => {
  alert(`Cool, the script ${script.src} is loaded`);
  alert( _ ); // _ is a function declared in the loaded script
});
That’s called a “callback-based” style of asynchronous programming. A function that does 
something asynchronously should provide a callback argument where we put the function to 
run after it’s complete.

Here we did it in loadScript, but of course it’s a general approach.


*/

/*
Callback in callback

How can we load two scripts sequentially: the first one, and then the second one after it?

The natural solution would be to put the second loadScript call inside the callback, like this:

loadScript('/my/script.js', function(script) {

  alert(`Cool, the ${script.src} is loaded, let's load one more`);

  loadScript('/my/script2.js', function(script) {
    alert(`Cool, the second script is loaded`);
  });

});
After the outer loadScript is complete, the callback initiates the inner one.

What if we want one more script…?

loadScript('/my/script.js', function(script) {

  loadScript('/my/script2.js', function(script) {

    loadScript('/my/script3.js', function(script) {
      // ...continue after all scripts are loaded
    });

  });

});
So, every new action is inside a callback. That’s fine for few actions, but not good for
 many, so we’ll see other variants soon.
*/
/*
Burada her script, bir önceki tamamen yüklendikten sonra yükleniyor.
Çünkü script.onload callback’i içinde diğer loadScript çağrılıyor.
Bu yönteme “callback hell” veya “pyramid of doom” denir. Kod iç içe girer, okunabilirlik düşer.
Terim	                              Açıklama
document.createElement('script')	Yeni bir <script> etiketi oluşturur.
script.src = '...'	Script'in nereden yükleneceğini belirler.
document.head.append(script)	Script sayfaya eklenir, yükleme başlar.
script.onload = () => ...	Script yüklendiğinde çalışacak kod bloğu.
callback	Script yüklendikten sonra yapılacak işlemleri barındırır.
asenkron	İşlem başlar ama sonucu hemen gelmez; beklemeden diğer kodlar çalışır.  
*/
/*
Handling errors

In the above examples we didn’t consider errors. What if the script loading fails? Our 
callback should be able to react on that.

Here’s an improved version of loadScript that tracks loading errors:

function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}
It calls callback(null, script) for successful load and callback(error) otherwise.

The usage:

loadScript('/my/script.js', function(error, script) {
  if (error) {
    // handle error
  } else {
    // script loaded successfully
  }
});
Once again, the recipe that we used for loadScript is actually quite common. It’s called 
the “error-first callback” style.

The convention is:

The first argument of the callback is reserved for an error if it occurs. Then 
callback(err) is called.
The second argument (and the next ones if needed) are for the successful result. Then
 callback(null, result1, result2…) is called.
So the single callback function is used both for reporting errors and passing back results.


*/

/*
Pyramid of Doom

At first glance, it looks like a viable approach to asynchronous coding. And indeed
 it is. For one or maybe two nested calls it looks fine.

But for multiple asynchronous actions that follow one after another, we’ll have code 
like this:

loadScript('1.js', function(error, script) {

  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', function(error, script) {
      if (error) {
        handleError(error);
      } else {
        // ...
        loadScript('3.js', function(error, script) {
          if (error) {
            handleError(error);
          } else {
            // ...continue after all scripts are loaded (*)
          }
        });

      }
    });
  }
});
In the code above:

We load 1.js, then if there’s no error…
We load 2.js, then if there’s no error…
We load 3.js, then if there’s no error – do something else (*).
As calls become more nested, the code becomes deeper and increasingly more difficult
 to manage, especially if we have real code instead of ... that may include more loops,
  conditional statements and so on.

That’s sometimes called “callback hell” or “pyramid of doom.”


The “pyramid” of nested calls grows to the right with every asynchronous action. Soon 
it spirals out of control.

So this way of coding isn’t very good.

We can try to alleviate the problem by making every action a standalone function, like this:

loadScript('1.js', step1);

function step1(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', step2);
  }
}

function step2(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('3.js', step3);
  }
}

function step3(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...continue after all scripts are loaded (*)
  }
}
See? It does the same thing, and there’s no deep nesting now because we made every 
action a separate top-level function.

It works, but the code looks like a torn apart spreadsheet. It’s difficult to read, 
and you probably noticed that one needs to eye-jump between pieces while reading it. 
That’s inconvenient, especially if the reader is not familiar with the code and doesn’t
 know where to eye-jump.

Also, the functions named step* are all of single use, they are created only to avoid 
the “pyramid of doom.” No one is going to reuse them outside of the action chain. So 
there’s a bit of namespace cluttering here.

We’d like to have something better.

Luckily, there are other ways to avoid such pyramids. One of the best ways is to use 
“promises”, described in the next chapter.
*/

//promise
/*
The constructor syntax for a promise object is:

let promise = new Promise(function(resolve, reject) {
  // executor (the producing code, "singer")
});
The function passed to new Promise is called the executor. When new Promise is created, 
the executor runs automatically. It contains the producing code which should eventually 
produce the result. In terms of the analogy above: the executor is the “singer”.
Its arguments resolve and reject are callbacks provided by JavaScript itself. Our code 
is only inside the executor.
When the executor obtains the result, be it soon or late, doesn’t matter, it should call
one of these callbacks:
resolve(value) — if the job is finished successfully, with result value.
reject(error) — if an error has occurred, error is the error object.
So to summarize: the executor runs automatically and attempts to perform a job. When it 
is finished with the attempt, it calls resolve if it was successful or reject if there 
was an error.
Yürütücü sonucu elde ettiğinde, ister erken ister geç olsun, şu geri çağırmalardan birini
 çağırmalıdır:
resolve(value) — iş başarıyla tamamlandıysa, sonuç değeriyle.
reject(error) — bir hata oluştuysa, error hata nesnesidir.
Özetle: yürütücü otomatik olarak çalışır ve bir iş gerçekleştirmeye çalışır. Denemeyi 
tamamladığında, başarılıysa resolve'u, hata varsa reject'i çağırır
The promise object returned by the new Promise constructor has these internal properties:
state — initially "pending", then changes to either "fulfilled" when resolve is called or 
"rejected" when reject is called.
result — initially undefined, then changes to value when resolve(value) is called or error 
when reject(error) is called.



*/

/*
Here’s an example of a promise constructor and a simple executor function with “producing code” 
that takes time (via setTimeout):

let promise = new Promise(function(resolve, reject) {
  // the function is executed automatically when the promise is constructed

  // after 1 second signal that the job is done with the result "done"
  setTimeout(() => resolve("done"), 1000);
});
We can see two things by running the code above:

The executor is called automatically and immediately (by new Promise).

The executor receives two arguments: resolve and reject. These functions are pre-defined by the 
JavaScript engine, so we don’t need to create them. We should only call one of them when ready.

After one second of “processing”, the executor calls resolve("done") to produce the result. This 
changes the state of the promise object:


*/

/*
That was an example of a successful job completion, a “fulfilled promise”.

And now an example of the executor rejecting the promise with an error:

let promise = new Promise(function(resolve, reject) {
  // after 1 second signal that the job is finished with an error
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});
The call to reject(...) moves the promise object to "rejected" state:


*/

/*
There can be only a single result or an error
The executor should call only one resolve or one reject. Any state change is final.

All further calls of resolve and reject are ignored:

let promise = new Promise(function(resolve, reject) {
  resolve("done");

  reject(new Error("…")); // ignored
  setTimeout(() => resolve("…")); // ignored
});
The idea is that a job done by the executor may have only one result or an error.
Buradaki fikir, yürütücü tarafından yapılan bir işin yalnızca bir sonucu veya bir
 hatası olabileceğidir.
Also, resolve/reject expect only one argument (or none) and will ignore additional
 arguments.

*/

/*
Reject with Error objects
In case something goes wrong, the executor should call reject. That can be done with 
any type of argument (just like resolve). But it is recommended to use Error objects 
(or objects that inherit from Error). The reasoning for that will soon become apparent.

Immediately calling resolve/reject
In practice, an executor usually does something asynchronously and calls resolve/reject
 after some time, but it doesn’t have to. We also can call resolve or reject immediately,
  like this:

let promise = new Promise(function(resolve, reject) {
  // not taking our time to do the job
  resolve(123); // immediately give the result: 123
});
For instance, this might happen when we start to do a job but then see that everything 
has already been completed and cached.

That’s fine. We immediately have a resolved promise.
*/

/*
The state and result are internal
The properties state and result of the Promise object are internal. We can’t directly access
 them. We can use the methods .then/.catch/.finally for that. They are described below.
*/

/*
Consumers: then, catch

A Promise object serves as a link between the executor (the “producing code” or “singer”)
 and the consuming functions (the “fans”), which will receive the result or error. Consuming 
 functions can be registered (subscribed) using the methods .then and .catch.

then

The most important, fundamental one is .then.

The syntax is:

promise.then(
  function(result) { // handle a successful result  },
  function(error) { // handle an error  }
);
The first argument of .then is a function that runs when the promise is resolved and receives the result.

The second argument of .then is a function that runs when the promise is rejected and receives the error.

For instance, here’s a reaction to a successfully resolved promise:

 let promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve("done!"), 1000);
});

// resolve runs the first function in .then
promise.then(
  result => alert(result), // shows "done!" after 1 second
  error => alert(error) // doesn't run
);
The first function was executed.

And in the case of a rejection, the second one:

 let promise = new Promise(function(resolve, reject) {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});

// reject runs the second function in .then
promise.then(
  result => alert(result), // doesn't run
  error => alert(error) // shows "Error: Whoops!" after 1 second
);
If we’re interested only in successful completions, then we can provide only one 
function argument to .then:

 let promise = new Promise(resolve => {
  setTimeout(() => resolve("done!"), 1000);
});

promise.then(alert); // shows "done!" after 1 second
*/

/*
catch

If we’re interested only in errors, then we can use null as the first argument: 
.then(null, errorHandlingFunction). Or we can use .catch(errorHandlingFunction),
 which is exactly the same:

 let promise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});

// .catch(f) is the same as promise.then(null, f)
promise.catch(alert); // shows "Error: Whoops!" after 1 second
The call .catch(f) is a complete analog of .then(null, f), it’s just a shorthand.


*/

/*
Cleanup: finally

Just like  there’s a finally clause in a regular try {...} catch {...}, there’s finally 
in promises.

The call .finally(f) is similar to .then(f, f) in the sense that f runs always, when the 
promise is settled: be it resolve or reject.

The idea of finally is to set up a handler for performing cleanup/finalizing after the 
previous operations are complete.

E.g. stopping loading indicators, closing no longer needed connections, etc.

Think of it as a party finisher. Irresepective of whether a party was good or bad, how 
many friends were in it, we still need (or at least should) do a cleanup after it.

The code may look like this:

new Promise((resolve, reject) => {
  // do something that takes time, and then call resolve or maybe reject 
})
  // runs when the promise is settled, doesn't matter successfully or not
  .finally(() => stop loading indicator)
  // so the loading indicator is always stopped before we go on
  .then(result => show result, err => show error)
Please note that finally(f) isn’t exactly an alias of then(f,f) though.


*/


/*
There are important differences:

A finally handler has no arguments. In finally we don’t know whether the promise is 
successful or not. That’s all right, as our task is usually to perform “general” 
finalizing procedures.

Please take a look at the example above: as you can see, the finally handler has no 
arguments, and the promise outcome is handled by the next handler.

A finally handler “passes through” the result or error to the next suitable handler.

For instance, here the result is passed through finally to then:

 new Promise((resolve, reject) => {
  setTimeout(() => resolve("value"), 2000);
})
  .finally(() => alert("Promise ready")) // triggers first
  .then(result => alert(result)); // <-- .then shows "value"
As you can see, the value returned by the first promise is passed through finally to 
the next then.

That’s very convenient, because finally is not meant to process a promise result. As 
said, it’s a place to do generic cleanup, no matter what the outcome was.

And here’s an example of an error, for us to see how it’s passed through finally to catch:

 new Promise((resolve, reject) => {
  throw new Error("error");
})
  .finally(() => alert("Promise ready")) // triggers first
  .catch(err => alert(err));  // <-- .catch shows the error
A finally handler also shouldn’t return anything. If it does, the returned value is 
silently ignored.

The only exception to this rule is when a finally handler throws an error. Then this 
error goes to the next handler, instead of any previous outcome.


*/

/*
A finally handler doesn’t get the outcome of the previous handler (it has no arguments).
 This outcome is passed through instead, to the next suitable handler.
If a finally handler returns something, it’s ignored.
When finally throws an error, then the execution goes to the nearest error handler.
These features are helpful and make things work just the right way if we use finally how 
it’s supposed to be used: for generic cleanup procedures.

Bir finally işleyicisi, önceki işleyicinin sonucunu almaz (argümanı yoktur). Bu sonuç, 
bir sonraki uygun işleyiciye aktarılır.
Bir finally işleyicisi bir şey döndürürse, bu yoksayılır.
Finally bir hata fırlattığında, yürütme en yakın hata işleyicisine gider.
Bu özellikler faydalıdır ve finally'i olması gerektiği gibi, yani genel temizleme prosedürleri 
için kullandığımızda, işlerin tam olarak doğru şekilde yürümesini sağlar.
*/

/*
We can attach handlers to settled promises
If a promise is pending, .then/catch/finally handlers wait for its outcome.

Sometimes, it might be that a promise is already settled when we add a handler to it.

In such case, these handlers just run immediately:

 // the promise becomes resolved immediately upon creation
let promise = new Promise(resolve => resolve("done!"));

promise.then(alert); // done! (shows up right now)
Note that this makes promises more powerful than the real life “subscription list” scenario.
 If the singer has already released their song and then a person signs up on the subscription 
 list, they probably won’t receive that song. Subscriptions in real life must be done prior
  to the event.

Promises are more flexible. We can add handlers any time: if the result is already there,
 they just execute.
 JavaScript'te bir Promise (söz) nesnesi oluşturulup hemen çözülürse (örneğin:
  resolve("done!")), daha sonra bu Promise'e .then, .catch veya .finally ile bir "handler"
   (işleyici) eklerseniz, bu işleyici hemen çalışır. Yani, Promise'in sonucu hazırsa,
    handler'ı sonradan ekleseniz bile sonucu hemen alırsınız.
    Burada promise zaten çözülmüş durumda. .then(alert) satırı çalıştığında, alert hemen 
    çağrılır.
Promise'ler, sonucu hazır olduktan sonra bile handler eklemenize ve sonucu hemen almanıza
 izin verir. Bu, onları gerçek hayattaki aboneliklerden daha esnek yapar.
*/

/*
Promise, JavaScript’te asenkron (zaman alan, beklemeli) işlemleri yönetmek için kullanılan bir 
yapıdır. Özellikle veri çekme, dosya okuma, zamanlayıcı gibi işlemlerde kullanılır. Promise,
 işlemin sonucunu gelecekte (hemen değil) döndürür ve üç durumda olabilir:

pending (beklemede): İşlem devam ediyor, henüz sonuç yok.
fulfilled (başarılı): İşlem başarıyla tamamlandı, bir değer döndü.
rejected (reddedildi): İşlem hata ile sonuçlandı.
Promise Nasıl Oluşturulur?
Promise Nerede Kullanılır?
Sunucudan veri çekme (fetch, AJAX)
Dosya okuma/yazma (Node.js)
setTimeout, setInterval gibi zamanlayıcılar
Her türlü uzun süren veya sonucu hemen belli olmayan işlemler
.then, .catch, .finally Nedir?
.then
Başarılı olursa çalışacak fonksiyonu tanımlar.
promise.then(function(result) {
  // promise başarılıysa burası çalışır
});
.catch
Hata olursa çalışacak fonksiyonu tanımlar.
promise.catch(function(error) {
  // promise hata verirse burası çalışır
});
.finally
İşlem başarılı da olsa, hata da olsa her durumda çalışır. Genellikle temizlik, yükleniyor
 göstergesini kapatma gibi işler için kullanılır.
promise.finally(function() {
  // her durumda çalışır
});

*/

/*
Örnek
let promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("işlem tamam"), 1000);
});

promise
  .then(result => alert(result))      // 1 saniye sonra: "işlem tamam"
  .catch(error => alert(error))       // hata olursa çalışır
  .finally(() => alert("bitti"));     // her durumda çalışır

Promise, asenkron işlemlerde sonucu yönetmek için kullanılır.
.then ile başarı, .catch ile hata, .finally ile her durumda yapılacak işlemler tanımlanır.
Promise’ler, callback hell’i (iç içe fonksiyonlar) önler, kodu daha okunabilir ve 
yönetilebilir yapar.
*/

/*
Example: loadScript

Next, let’s see more practical examples of how promises can help us write asynchronous code.

We’ve got the loadScript function for loading a script from the previous chapter.

Here’s the callback-based variant, just to remind us of it:

function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}
Let’s rewrite it using Promises.

The new function loadScript will not require a callback. Instead, it will create 
and return a Promise object that resolves when the loading is complete. The outer 
code can add handlers (subscribing functions) to it using .then:

 function loadScript(src) {
  return new Promise(function(resolve, reject) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Script load error for ${src}`));

    document.head.append(script);
  });
}
Usage:

 let promise = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");

promise.then(
  script => alert(`${script.src} is loaded!`),
  error => alert(`Error: ${error.message}`)
);

promise.then(script => alert('Another handler...'));
We can immediately see a few benefits over the callback-based pattern:


*/

/*
Promises	                                                    
Promises allow us to do things in the natural order. First, we run loadScript(script), and 
.then we write what to do with the result.
Sözler, işleri doğal düzende yapmamızı sağlar. Önce loadScript(script)'i çalıştırırız ve 
ardından sonuçla ne yapacağımızı yazarız.

We can call .then on a Promise as many times as we want. Each time, we’re adding a new 
“fan”, a new subscribing function, to the “subscription list”. 
Bir Promise'da .then'i istediğimiz kadar çağırabiliriz. Her seferinde, "abonelik listesine" 
yeni bir "hayran", yani yeni bir abonelik işlevi ekliyoruz.

Callbacks
We must have a callback function at our disposal when calling loadScript(script, callback). 
In other words, we must know what to do with the result before loadScript is called.
loadScript(script, callback) çağrılırken elimizde bir geri çağırma fonksiyonu bulunmalıdır.
Başka bir deyişle, loadScript çağrılmadan önce sonuçla ne yapacağımızı bilmeliyiz.

There can be only one callback.
Sadece bir geri çağırma olabilir.

*/

/*
What’s the output of the code below?

let promise = new Promise(function(resolve, reject) {
  resolve(1);

  setTimeout(() => resolve(2), 1000);
});

promise.then(alert);
solution
The output is: 1.

The second call to resolve is ignored, because only the first call of reject/resolve is 
taken into account. Further calls are ignored.
*/

/*
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

delay(3000).then(() => alert('runs after 3 seconds'));
Please note that in this task resolve is called without arguments. We don’t return 
any value from delay, just ensure the delay.
*/

//Promises chaining

/*
new Promise(function(resolve, reject) {

  setTimeout(() => resolve(1), 1000); // (*)
//resolve(1) fulfilled (basarili) duruma gecir ve sonucu 1 olarak ayarla
//.then(function(result) { ... }) kısmında, result parametresi olarak bu
//  1 değeri gelir.
}).then(function(result) { // (**)

  alert(result); // 1
  return result * 2;

}).then(function(result) { // (***)

  alert(result); // 2
  return result * 2;

}).then(function(result) {

  alert(result); // 4
  return result * 2;

});
The idea is that the result is passed through the chain of .then handlers.

Here the flow is:

The initial promise resolves in 1 second (*),
Then the .then handler is called (**), which in turn creates a new promise 
(resolved with 2 value).
The next then (***) gets the result of the previous one, processes it (doubles) 
and passes it to the next handler.
…and so on.
As the result is passed along the chain of handlers, we can see a sequence of 
alert calls: 1 → 2 → 4.

The whole thing works, because every call to a .then returns a new promise, so 
that we can call the next .then on it.

When a handler returns a value, it becomes the result of that promise, so the 
next .then is called with it.


*/

/*
resolve(1) ile Promise fulfilled (başarılı) olur ve sonucu 1 olur.
Aynı şekilde:

resolve(0) dersen Promise fulfilled olur ve sonucu 0 olur.
resolve(-1) dersen Promise fulfilled olur ve sonucu -1 olur.
Yani, resolve ile hangi değeri verirsen, Promise başarılı olur ve o değeri taşır.
Bu değer true, false, 0, -1, "merhaba", {} vs. olabilir. Hepsi fulfilled (başarılı) 
demektir, değer ne olursa olsun rejected olmaz.

Bekleme (pending) durumu:

Promise oluşturulup resolve veya reject çağrılmadığı sürece pending (beklemede) kalır
Rejected (reddedildi) yapmak için:

reject(hata) çağırmalısın.
Örnek:
new Promise((resolve, reject) => {
  reject("Bir hata oluştu!");
})
  .then(result => alert("Başarılı: " + result))
  .catch(error => alert("Hata: " + error)); // "Hata: Bir hata oluştu!"

resolve(herhangi bir değer): Promise fulfilled olur, değer ne olursa olsun.
reject(hata): Promise rejected olur, hata ile.
resolve(0), resolve(-1), resolve(false) hepsi fulfilled (başarılı) demektir, rejected değildir.
*/

/*
A classic newbie error: technically we can also add many .then to a single promise. This is
 not chaining.

For example:

 let promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve(1), 1000);
});

promise.then(function(result) {
  alert(result); // 1
  return result * 2;
});

promise.then(function(result) {
  alert(result); // 1
  return result * 2;
});

promise.then(function(result) {
  alert(result); // 1
  return result * 2;
});
What we did here is just adding several handlers to one promise. They don’t pass 
the result to
 each other; instead they process it independently.

 All .then on the same promise get the same result – the result of that promise.
  So in the code above all alert show the same: 1.

In practice we rarely need multiple handlers for one promise. Chaining is used 
much more often.


*/

/*
Returning promises

A handler, used in .then(handler) may create and return a promise.

In that case further handlers wait until it settles, and then get its result.

For instance:

 new Promise(function(resolve, reject) {

  setTimeout(() => resolve(1), 1000);

}).then(function(result) {

  alert(result); // 1

  return new Promise((resolve, reject) => { // (*)
    setTimeout(() => resolve(result * 2), 1000);
  });

}).then(function(result) { // (**)

  alert(result); // 2

  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(result * 2), 1000);
  });

}).then(function(result) {

  alert(result); // 4

});
Here the first .then shows 1 and returns new Promise(…) in the line (*). After one
 second it resolves, and the result (the argument of resolve, here it’s result * 2)
  is passed on to the handler of the second .then. That handler is in the line (**),
   it shows 2 and does the same thing.

So the output is the same as in the previous example: 1 → 2 → 4, but now with 1 
second delay between alert calls.

Returning promises allows us to build chains of asynchronous actions.


*/

/*
Example: loadScript

Let’s use this feature with the promisified loadScript, defined in the previous
 chapter, to load scripts one by one, in sequence:

 loadScript("/article/promise-chaining/one.js")
  .then(function(script) {
    return loadScript("/article/promise-chaining/two.js");
  })
  .then(function(script) {
    return loadScript("/article/promise-chaining/three.js");
  })
  .then(function(script) {
    // use functions declared in scripts
    // to show that they indeed loaded
    one();
    two();
    three();
  });
This code can be made bit shorter with arrow functions:

 loadScript("/article/promise-chaining/one.js")
  .then(script => loadScript("/article/promise-chaining/two.js"))
  .then(script => loadScript("/article/promise-chaining/three.js"))
  .then(script => {
    // scripts are loaded, we can use functions declared there
    one();
    two();
    three();
  });
Here each loadScript call returns a promise, and the next .then runs when it resolves.
 Then it initiates the loading of the next script. So scripts are loaded one after another.

We can add more asynchronous actions to the chain. Please note that the code is still 
“flat” — it grows down, not to the right. There are no signs of the “pyramid of doom”.

Technically, we could add .then directly to each loadScript, like this:

 loadScript("/article/promise-chaining/one.js").then(script1 => {
  loadScript("/article/promise-chaining/two.js").then(script2 => {
    loadScript("/article/promise-chaining/three.js").then(script3 => {
      // this function has access to variables script1, script2 and script3
      one();
      two();
      three();
    });
  });
});
This code does the same: loads 3 scripts in sequence. But it “grows to the right”. So
 we have the same problem as with callbacks.

People who start to use promises sometimes don’t know about chaining, so they write it
 this way. Generally, chaining is preferred.

Sometimes it’s ok to write .then directly, because the nested function has access to the
 outer scope. In the example above the most nested callback has access to all variables 
 script1, script2, script3. But that’s an exception rather than a rule.


*/

/*
Thenables
To be precise, a handler may return not exactly a promise, but a so-called “thenable” 
object – an arbitrary object that has a method .then. It will be treated the same way 
as a promise.

The idea is that 3rd-party libraries may implement “promise-compatible” objects of their
 own. They can have an extended set of methods, but also be compatible with native 
 promises, because they implement .then.

Here’s an example of a thenable object:

 class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve); // function() { native code }
    // resolve with this.num*2 after the 1 second
    setTimeout(() => resolve(this.num * 2), 1000); // (**)
  }
}

new Promise(resolve => resolve(1))
  .then(result => {
    return new Thenable(result); // (*)
  })
  .then(alert); // shows 2 after 1000ms
JavaScript checks the object returned by the .then handler in line (*): if it has a 
callable method named then, then it calls that method providing native functions resolve,
 reject as arguments (similar to an executor) and waits until one of them is called. In 
 the example above resolve(2) is called after 1 second (**). Then the result is passed 
 further down the chain.

This feature allows us to integrate custom objects with promise chains without having to 
inherit from Promise.

*/

//Bigger example: fetch
/*
let promise = fetch(url);
This makes a network request to the url and returns a promise. The promise resolves
 with a response object when the remote server responds with headers, but before the 
 full response is downloaded.
To read the full response, we should call the method response.text(): it returns 
a promise that resolves when the full text is downloaded from the remote server, with 
that text as a result.
The code below makes a request to user.json and loads its text from the server:
Bu, URL'ye bir ağ isteği gönderir ve bir söz döndürür. Söz, uzak sunucu başlıklarla 
yanıt verdiğinde, ancak tam yanıt indirilmeden önce bir yanıt nesnesiyle çözümlenir.
Tam yanıtı okumak için response.text() yöntemini çağırmalıyız: Bu yöntem, tam metin 
uzak sunucudan indirildiğinde ve sonuç olarak bu metinle birlikte çözümlenen bir söz döndürür.
Aşağıdaki kod, user.json dosyasına bir istek gönderir ve metnini sunucudan yükler:

fetch('/article/promise-chaining/user.json')
  // .then below runs when the remote server responds
  .then(function(response) {
    // response.text() returns a new promise that resolves with the full response text
    // when it loads
    return response.text();
  })
  .then(function(text) {
    // ...and here's the content of the remote file
    alert(text); // {"name": "iliakan", "isAdmin": true}
  });
The response object returned from fetch also includes the method response.json() that reads 
the remote data and parses it as JSON. In our case that’s even more convenient, so let’s 
switch to it.
fetch'ten döndürülen yanıt nesnesi, uzak verileri okuyup JSON olarak ayrıştıran response.json() 
yöntemini de içerir. Bizim durumumuzda bu daha da kullanışlı, o yüzden ona geçelim.

*/

/*
We’ll also use arrow functions for brevity:

 // same as above, but response.json() parses the remote content as JSON
fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => alert(user.name)); // iliakan, got user name

*/

/*
Now let’s do something with the loaded user.

For instance, we can make one more request to GitHub, load the user profile and show the avatar:

 // Make a request for user.json
fetch('/article/promise-chaining/user.json')
  // Load it as json
  .then(response => response.json())
  // Make a request to GitHub
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  // Load the response as json
  .then(response => response.json())
  // Show the avatar image (githubUser.avatar_url) for 3 seconds (maybe animate it)
  .then(githubUser => {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => img.remove(), 3000); // (*)
  });
The code works; see comments about the details. However, there’s a potential problem in it, 
a typical error for those who begin to use promises.

Look at the line (*): how can we do something after the avatar has finished showing and gets 
removed? For instance, we’d like to show a form for editing that user or something else.
 As of now, there’s no way.
Kod çalışıyor; ayrıntılarla ilgili yorumlara bakın. Ancak, potansiyel bir sorun var; söz vermeye
 yeni başlayanlar için tipik bir hata.

(*) satırına bakın: Avatar gösterildikten ve kaldırıldıktan sonra nasıl bir şey yapabiliriz? 
Örneğin, o kullanıcıyı düzenlemek için bir form veya başka bir şey göstermek istiyoruz. Şu anda 
bunun bir yolu yok.

*/


/*
To make the chain extendable, we need to return a promise that resolves when the avatar 
finishes showing.

Like this:

 fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  .then(response => response.json())
  .then(githubUser => new Promise(function(resolve, reject) { // (*)
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser); // (**)
    }, 3000);
  }))
  // triggers after 3 seconds
  .then(githubUser => alert(`Finished showing ${githubUser.name}`));
That is, the .then handler in line (*) now returns new Promise, that becomes settled only 
after the call of resolve(githubUser) in setTimeout (**). The next .then in the chain will
 wait for that.

As a good practice, an asynchronous action should always return a promise. That makes it 
possible to plan actions after it; even if we don’t plan to extend the chain now, we may 
need it later.

Yani, (*) satırındaki .then işleyicisi artık yeni bir Promise döndürüyor ve bu, yalnızca
 setTimeout (**) içindeki resolve(githubUser) çağrısından sonra çözümleniyor. Zincirdeki
  bir sonraki .then bunu bekleyecek.

İyi bir uygulama olarak, eşzamansız bir eylem her zaman bir söz döndürmelidir. Bu, sonrasında 
eylemler planlamayı mümkün kılar; zinciri şimdi genişletmeyi planlamasak bile, daha sonra buna 
ihtiyacımız olabilir.

*/


/*
Finally, we can split the code into reusable functions:

 function loadJson(url) {
  return fetch(url)
    .then(response => response.json());
}

function loadGithubUser(name) {
  return loadJson(`https://api.github.com/users/${name}`);
}

function showAvatar(githubUser) {
  return new Promise(function(resolve, reject) {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  });
}

// Use them:
loadJson('/article/promise-chaining/user.json')
  .then(user => loadGithubUser(user.name))
  .then(showAvatar)
  .then(githubUser => alert(`Finished showing ${githubUser.name}`));
  // ...
*/

/*
If a .then (or catch/finally, doesn’t matter) handler returns a promise, the rest
 of the chain waits until it settles. When it does, its result (or error) is passed 
 further.


*/

//Error handling with promises

/*
For instance, in the code below the URL to fetch is wrong (no such site) and .catch 
handles the error:

 fetch('https://no-such-server.blabla') // rejects
  .then(response => response.json())
  .catch(err => alert(err)) // TypeError: failed to fetch (the text may vary)
As you can see, the .catch doesn’t have to be immediate. It may appear after one or 
maybe several .then.

Or, maybe, everything is all right with the site, but the response is not valid JSON. 
The easiest way to catch all errors is to append .catch to the end of chain:

 fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  .then(response => response.json())
  .then(githubUser => new Promise((resolve, reject) => {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  }))
  .catch(error => alert(error.message));
Normally, such .catch doesn’t trigger at all. But if any of the promises above rejects 
(a network problem or invalid json or whatever), then it would catch it.


*/

//Implicit try…catch
/*
The code of a promise executor and promise handlers has an “invisible try..catch” 
around it. If an exception happens, it gets caught and treated as a rejection.

For instance, this code:

 new Promise((resolve, reject) => {
  throw new Error("Whoops!");
}).catch(alert); // Error: Whoops!
…Works exactly the same as this:

 new Promise((resolve, reject) => {
  reject(new Error("Whoops!"));
}).catch(alert); // Error: Whoops!
The “invisible try..catch” around the executor automatically catches the error and 
turns it into rejected promise.

This happens not only in the executor function, but in its handlers as well. If we 
throw inside a .then handler, that means a rejected promise, so the control jumps to 
the nearest error handler.

Here’s an example:

 new Promise((resolve, reject) => {
  resolve("ok");
}).then((result) => {
  throw new Error("Whoops!"); // rejects the promise
}).catch(alert); // Error: Whoops!
This happens for all errors, not just those caused by the throw statement. For example,
 a programming error:

 new Promise((resolve, reject) => {
  resolve("ok");
}).then((result) => {
  blabla(); // no such function
}).catch(alert); // ReferenceError: blabla is not defined
The final .catch not only catches explicit rejections, but also accidental errors in
 the handlers above.


*/


/*
Rethrowing

As we already noticed, .catch at the end of the chain is similar to try..catch. We 
may have as many .then handlers as we want, and then use a single .catch at the end 
to handle errors in all of them.

In a regular try..catch we can analyze the error and maybe rethrow it if it can’t 
be handled. The same thing is possible for promises.

If we throw inside .catch, then the control goes to the next closest error handler. 
And if we handle the error and finish normally, then it continues to the next closest 
successful .then handler.

In the example below the .catch successfully handles the error:

 // the execution: catch -> then
new Promise((resolve, reject) => {

  throw new Error("Whoops!");

}).catch(function(error) {

  alert("The error is handled, continue normally");

}).then(() => alert("Next successful handler runs"));
Here the .catch block finishes normally. So the next successful .then handler is called.

In the example below we see the other situation with .catch. The handler (*) 
catches the error and just can’t handle it (e.g. it only knows how to handle URIError), 
so it throws it again:

 // the execution: catch -> catch
new Promise((resolve, reject) => {

  throw new Error("Whoops!");

}).catch(function(error) { // (*)

  if (error instanceof URIError) {
    // handle it
  } else {
    alert("Can't handle such error");

    throw error; // throwing this or another error jumps to the next catch
  }

}).then(function() {
  // doesn't run here 
}).catch(error => { // (**)

  alert(`The unknown error has occurred: ${error}`);
  // don't return anything => execution goes the normal way

});
The execution jumps from the first .catch (*) to the next one (**) down the chain.


*/

/*
Unhandled rejections

What happens when an error is not handled? For instance, we forgot to append 
.catch to the end of the chain, like here:

 new Promise(function() {
  noSuchFunction(); // Error here (no such function)
})
  .then(() => {
    // successful promise handlers, one or more
  }); // without .catch at the end!
In case of an error, the promise becomes rejected, and the execution should 
jump to the closest rejection handler. But there is none. So the error gets 
“stuck”. There’s no code to handle it.

In practice, just like with regular unhandled errors in code, it means that 
something has gone terribly wrong.

What happens when a regular error occurs and is not caught by try..catch? The
 script dies with a message in the console. A similar thing happens with unhandled
  promise rejections.

The JavaScript engine tracks such rejections and generates a global error in that 
case. You can see it in the console if you run the example above.

In the browser we can catch such errors using the event unhandledrejection:

 window.addEventListener('unhandledrejection', function(event) {
  // the event object has two special properties:
  alert(event.promise); // [object Promise] - the promise that generated the error
  alert(event.reason); // Error: Whoops! - the unhandled error object
});

new Promise(function() {
  throw new Error("Whoops!");
}); // no catch to handle the error
The event is the part of the HTML standard.

If an error occurs, and there’s no .catch, the unhandledrejection handler triggers,
 and gets the event object with the information about the error, so we can do something.

Usually such errors are unrecoverable, so our best way out is to inform the user 
about the problem and probably report the incident to the server.

In non-browser environments like Node.js there are other ways to track unhandled errors.


*/

/*
.catch handles errors in promises of all kinds: be it a reject() call, or an error thrown in a handler.
.then also catches errors in the same manner, if given the second argument (which is the error handler).
We should place .catch exactly in places where we want to handle errors and know how to handle them. The 
handler should analyze errors (custom error classes help) and rethrow unknown ones (maybe they are programming mistakes).
It’s ok not to use .catch at all, if there’s no way to recover from an error.
In any case we should have the unhandledrejection event handler (for browsers, and analogs for other
 environments) to track unhandled errors and inform the user (and probably our server) about them, so
  that our app never “just dies”.

.catch, reject() çağrısı olsun ya da bir işleyicide fırlatılan bir hata olsun, her türlü Promise hatasını
 yakalar. .then de aynı şekilde, eğer ikinci argüman olarak bir hata işleyici verilirse hataları yakalar. 
 .catch'i, hataları gerçekten ele almak ve nasıl ele alacağımızı bildiğimiz yerlere koymalıyız. İşleyici 
 hataları analiz etmeli (özel hata sınıfları yardımcı olur) ve tanımadığı hataları tekrar fırlatmalı 
 (belki de bunlar programlama hatalarıdır). Eğer bir hatadan kurtulmanın bir yolu yoksa, .catch kullanmamak 
 da sorun değildir. Her durumda, (tarayıcılar için) unhandledrejection olay işleyicisine (ve diğer
  ortamlardaki benzerlerine) sahip olmalıyız ki, ele alınmayan hataları takip edelim ve kullanıcıyı 
  (ve muhtemelen sunucumuzu) bu konuda bilgilendirelim; böylece uygulamamız asla “aniden ölmesin”.  
*/

/*
Will the .catch trigger? Explain your answer.

new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert);

The answer is: no, it won’t:

As said in the chapter, there’s an “implicit try..catch” around the function code. 
So all synchronous errors are handled.

But here the error is generated not while the executor is running, but later. So 
the promise can’t handle it.
Bölümde de belirtildiği gibi, fonksiyon kodunda "örtük try..catch" vardır. Bu sayede 
tüm eşzamanlı hatalar işlenir.

Ancak burada hata, yürütücü çalışırken değil, daha sonra üretilir. Bu yüzden söz, 
hatayla başa çıkamaz.


Eğer hatanın .catch ile yakalanmasını istiyorsan, throw yerine reject kullanmalısın:


new Promise(function(resolve, reject) {
  setTimeout(() => {
    reject(new Error("Whoops!"));
  }, 1000);
}).catch(alert); // Bu durumda .catch çalışır ve hatayı yakalar
Yani, asenkron bir hata için throw yerine reject(error) kullanmalısın.
throw sadece executor fonksiyonu içinde, senkron olarak çalışırsa .catch tarafından
 yakalanır. Asenkron kodda reject ile hatayı Promise’e iletmelisin.

*/




//Promise API

/*
Promise.all

Let’s say we want many promises to execute in parallel and wait until all of them
 are ready.

For instance, download several URLs in parallel and process the content once they 
are all done.

That’s what Promise.all is for.

The syntax is:

let promise = Promise.all(iterable);
Promise.all takes an iterable (usually, an array of promises) and returns a new promise.

The new promise resolves when all listed promises are resolved, and the array of their 
results becomes its result.

For instance, the Promise.all below settles after 3 seconds, and then its result is an 
array [1, 2, 3]:

 Promise.all([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
  new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
  new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
]).then(alert); // 1,2,3 when promises are ready: each promise contributes an array member
Please note that the order of the resulting array members is the same as in its source 
promises. Even though the first promise takes the longest time to resolve, it’s still 
first in the array of results.

A common trick is to map an array of job data into an array of promises, and then wrap 
that into Promise.all.
//promise.all verilen arraydaki tüm promise'lerin tamamlanmasını bekler ve sonuçları 
// bir dizi olarak döndürür.
*/

/*
For instance, if we have an array of URLs, we can fetch them all like this:

 let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://api.github.com/users/jeresig'
];

// map every url to the promise of the fetch
let requests = urls.map(url => fetch(url));

// Promise.all waits until all jobs are resolved
Promise.all(requests)
  .then(responses => responses.forEach(
    response => alert(`${response.url}: ${response.status}`)
  ));
A bigger example with fetching user information for an array of GitHub users by their 
names (we could fetch an array of goods by their ids, the logic is identical):

 let names = ['iliakan', 'remy', 'jeresig'];

let requests = names.map(name => fetch(`https://api.github.com/users/${name}`));

Promise.all(requests)
  .then(responses => {
    // all responses are resolved successfully
    for(let response of responses) {
      alert(`${response.url}: ${response.status}`); // shows 200 for every url
    }

    return responses;
  })
  // map array of responses into an array of response.json() to read their content
  .then(responses => Promise.all(responses.map(r => r.json())))
  // all JSON answers are parsed: "users" is the array of them
  .then(users => users.forEach(user => alert(user.name)));
*/

/*
If any of the promises is rejected, the promise returned by Promise.all immediately
 rejects with that error.

For instance:

 Promise.all([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).catch(alert); // Error: Whoops!
Here the second promise rejects in two seconds. That leads to an immediate rejection of
 Promise.all, so .catch executes: the rejection error becomes the outcome of the entire
  Promise.all.

In case of an error, other promises are ignored
If one promise rejects, Promise.all immediately rejects, completely forgetting about the
 other ones in the list. Their results are ignored.

For example, if there are multiple fetch calls, like in the example above, and one fails,
 the others will still continue to execute, but Promise.all won’t watch them anymore. They
  will probably settle, but their results will be ignored.

Promise.all does nothing to cancel them, as there’s no concept of “cancellation” in promises.
In another chapter we’ll cover AbortController that can help with that, but it’s not a part 
of the Promise API.

Promise.all(iterable) allows non-promise “regular” values in iterable
Normally, Promise.all(...) accepts an iterable (in most cases an array) of promises. But if 
any of those objects is not a promise, it’s passed to the resulting array “as is”.

For instance, here the results are [1, 2, 3]:

 Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000)
  }),
  2,
  3
]).then(alert); // 1, 2, 3
So we are able to pass ready values to Promise.all where convenient.
*/

/*
//Promise.allSettled
Promise.all rejects as a whole if any promise rejects. That’s good for “all or 
nothing” cases, when we need all results successful to proceed:

Promise.all([
  fetch('/template.html'),
  fetch('/style.css'),
  fetch('/data.json')
]).then(render); // render method needs results of all fetches
Promise.allSettled just waits for all promises to settle, regardless of the result.
 The resulting array has:

{status:"fulfilled", value:result} for successful responses,
{status:"rejected", reason:error} for errors.
For example, we’d like to fetch the information about multiple users. Even if one
 request fails, we’re still interested in the others.

Let’s use Promise.allSettled:

 let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://no-such-url'
];

Promise.allSettled(urls.map(url => fetch(url)))
  .then(results => { // (*)
    results.forEach((result, num) => {
      if (result.status == "fulfilled") {
        alert(`${urls[num]}: ${result.value.status}`);
      }
      if (result.status == "rejected") {
        alert(`${urls[num]}: ${result.reason}`);
      }
    });
  });
The results in the line (*) above will be:

[
  {status: 'fulfilled', value: ...response...},
  {status: 'fulfilled', value: ...response...},
  {status: 'rejected', reason: ...error object...}
]
So for each promise we get its status and value/error.


*/

/*
Polyfill

If the browser doesn’t support Promise.allSettled, it’s easy to polyfill:

if (!Promise.allSettled) {
  const rejectHandler = reason => ({ status: 'rejected', reason });

  const resolveHandler = value => ({ status: 'fulfilled', value });

  Promise.allSettled = function (promises) {
    const convertedPromises = promises.map(p => Promise.resolve(p).then(resolveHandler,
     rejectHandler));
    return Promise.all(convertedPromises);
  };
}
In this code, promises.map takes input values, turns them into promises (just in case 
a non-promise was passed) with p => Promise.resolve(p), and then adds .then handler 
to every one.

That handler turns a successful result value into {status:'fulfilled', value}, and 
an error reason into {status:'rejected', reason}. That’s exactly the format of
 Promise.allSettled.

Now we can use Promise.allSettled to get the results of all given promises, even if 
some of them reject.


*/


/*
Promise.race

Similar to Promise.all, but waits only for the first settled promise and gets its 
result (or error).

The syntax is:

let promise = Promise.race(iterable);
For instance, here the result will be 1:

 Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1
The first promise here was fastest, so it became the result. After the first settled promise
 “wins the race”, all further results/errors are ignored.

//yarisi ilk kazanan gibi, ilk yerlesmis olani gosteriyor dogru ya da hatali
*/

/*
Promise.any

Similar to Promise.race, but waits only for the first fulfilled promise and gets its 
result. If all of the given promises are rejected, then the returned promise is 
rejected with AggregateError – a special error object that stores all promise errors
 in its errors property.

The syntax is:

let promise = Promise.any(iterable);
For instance, here the result will be 1:

 Promise.any([
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 1000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1
The first promise here was fastest, but it was rejected, so the second promise became 
the result. After the first fulfilled promise “wins the race”, all further results 
are ignored.

Here’s an example when all promises fail:

 Promise.any([
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ouch!")), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Error!")), 2000))
]).catch(error => {
  console.log(error.constructor.name); // AggregateError
  console.log(error.errors[0]); // Error: Ouch!
  console.log(error.errors[1]); // Error: Error!
});
OUTPUT
"AggregateError"
Error: Ouch!
Error: Error!
As you can see, error objects for failed promises are available in the errors property 
of the AggregateError object.

promise.any ilk fullfilled olan promise'i bekler ve sonucunu alır.,  ilk basarili olani alir,
 hatali gelirse atlar baskasina
Eğer verilen tüm promise'ler rejected ise, döndürülen promise AggregateError ile reddedilir
*/

/*
Promise.resolve

Promise.resolve(value) creates a resolved promise with the result value.

Same as:

let promise = new Promise(resolve => resolve(value));
The method is used for compatibility, when a function is expected to return a promise.

For example, the loadCached function below fetches a URL and remembers (caches) its 
content. For future calls with the same URL it immediately gets the previous content 
from cache, but uses Promise.resolve to make a promise of it, so the returned value is 
always a promise:

let cache = new Map();

function loadCached(url) {
  if (cache.has(url)) {
    return Promise.resolve(cache.get(url)); // (*)
  }

  return fetch(url)
    .then(response => response.text())
    .then(text => {
      cache.set(url,text);
      return text;
    });
}
We can write loadCached(url).then(…), because the function is guaranteed to return a 
promise. We can always use .then after loadCached. That’s the purpose of Promise.resolve 
in the line (*).

Promise.reject

Promise.reject(error) creates a rejected promise with error.

Same as:

let promise = new Promise((resolve, reject) => reject(error));
In practice, this method is almost never used.


*/

/*
There are 6 static methods of Promise class:

Promise.all(promises) – waits for all promises to resolve and returns an array of their
 results. If any of the given promises rejects, it becomes the error of Promise.all, and
  all other results are ignored.
Promise.allSettled(promises) (recently added method) – waits for all promises to settle
and returns their results as an array of objects with:
status: "fulfilled" or "rejected"
value (if fulfilled) or reason (if rejected).
Promise.race(promises) – waits for the first promise to settle, and its result/error 
becomes the outcome.
Promise.any(promises) (recently added method) – waits for the first promise to fulfill, 
and its result becomes the outcome. If all of the given promises are rejected, 
AggregateError becomes the error of Promise.any.
Promise.resolve(value) – makes a resolved promise with the given value.
Promise.reject(error) – makes a rejected promise with the given error.
Of all these, Promise.all is probably the most common in practice.


*/

//Promisification

/*
“Promisification” is a long word for a simple transformation. It’s the conversion of 
a function that accepts a callback into a function that returns a promise.

Such transformations are often required in real-life, as many functions and libraries 
are callback-based. But promises are more convenient, so it makes sense to promisify them.

For better understanding, let’s see an example.

For instance, we have loadScript(src, callback) from the chapter Introduction: callbacks.
"Vaat etme", basit bir dönüşüm için kullanılan uzun bir kelimedir. Geri çağırmayı kabul 
eden bir fonksiyonun, söz döndüren bir fonksiyona dönüştürülmesidir.

Bu tür dönüşümler gerçek hayatta sıklıkla gereklidir, çünkü birçok fonksiyon ve kütüphane 
geri çağırmaya dayalıdır. Ancak vaatler daha kullanışlıdır, bu yüzden onları vaat 
etmek mantıklıdır.

Daha iyi anlamak için bir örneğe bakalım.

Örneğin, Giriş: geri çağırmalar bölümünden loadScript(src, callback) fonksiyonumuz var.
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}

// usage:
// loadScript('path/script.js', (err, script) => {...})
The function loads a script with the given src, and then calls callback(err) in case 
of an error, or callback(null, script) in case of successful loading. That’s a widespread
 agreement for using callbacks, we saw it before.

Let’s promisify it.

We’ll make a new function loadScriptPromise(src), that does the same (loads the script), 
but returns a promise instead of using callbacks.

In other words, we pass it only src (no callback) and get a promise in return, that 
resolves with script when the load is successful, and rejects with the error otherwise.
Aynı şeyi yapan (betiği yükleyen) ancak geri çağırmalar kullanmak yerine bir söz döndüren 
yeni bir loadScriptPromise(src) fonksiyonu oluşturacağız.

Başka bir deyişle, ona yalnızca src iletiyoruz (geri çağırma yok) ve karşılığında bir söz 
alıyoruz; bu söz, yükleme başarılı olduğunda betikle çözümleniyor, aksi takdirde hatayla 
reddediliyor.
Here it is:

let loadScriptPromise = function(src) {
  return new Promise((resolve, reject) => {
    loadScript(src, (err, script) => {
      if (err) reject(err);
      else resolve(script);
    });
  });
};

// usage:
// loadScriptPromise('path/script.js').then(...)
As we can see, the new function is a wrapper around the original loadScript function. 
It calls it providing its own callback that translates to promise resolve/reject.

Now loadScriptPromise fits well in promise-based code. If we like promises more than 
callbacks (and soon we’ll see more reasons for that), then we will use it instead.


*/

/*
In practice we may need to promisify more than one function, so it makes sense to 
use a helper.

We’ll call it promisify(f): it accepts a to-promisify function f and returns 
a wrapper function.

function promisify(f) {
  return function (...args) { // return a wrapper-function (*)
    return new Promise((resolve, reject) => {
      function callback(err, result) { // our custom callback for f (**)
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }

      args.push(callback); // append our custom callback to the end of f arguments

      f.call(this, ...args); // call the original function
    });
  };
}

// usage:
let loadScriptPromise = promisify(loadScript);
loadScriptPromise(...).then(...);
The code may look a bit complex, but it’s essentially the same that we wrote above, 
while promisifying loadScript function.

A call to promisify(f) returns a wrapper around f (*). That wrapper returns a promise 
and forwards the call to the original f, tracking the result in the custom callback (**).

Here, promisify assumes that the original function expects a callback with exactly two 
arguments (err, result). That’s what we encounter most often. Then our custom callback 
is in exactly the right format, and promisify works great for such a case.

Kod biraz karmaşık görünebilir, ancak temelde yukarıda yazdığımızla aynı, loadScript
 fonksiyonunu söz verirken.

promisify(f) çağrısı, f (*) etrafında bir sarmalayıcı döndürür. Bu sarmalayıcı bir söz 
döndürür ve çağrıyı orijinal f'ye ileterek sonucu özel geri çağırmada (**) izler.

Burada, promisify, orijinal fonksiyonun tam olarak iki argümanlı (err, result) bir geri 
çağırma beklediğini varsayar. En sık karşılaştığımız şey budur. Bu durumda, özel geri 
çağırmamız tam olarak doğru biçimdedir ve promisify böyle bir durum için harika çalışır.
*/

/*
But what if the original f expects a callback with more arguments callback(err, res1, res2, ...)?

We can improve our helper. Let’s make a more advanced version of promisify.

When called as promisify(f) it should work similar to the version above.
When called as promisify(f, true), it should return the promise that resolves with 
the array of callback results. That’s exactly for callbacks with many arguments.
// promisify(f, true) to get array of results
function promisify(f, manyArgs = false) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function callback(err, ...results) { // our custom callback for f
        if (err) {
          reject(err);
        } else {
          // resolve with all callback results if manyArgs is specified
          resolve(manyArgs ? results : results[0]);
        }
      }

      args.push(callback);

      f.call(this, ...args);
    });
  };
}

// usage:
f = promisify(f, true);
f(...).then(arrayOfResults => ..., err => ...);
As you can see it’s essentially the same as above, but resolve is called with only one 
or all arguments depending on whether manyArgs is truthy.

For more exotic callback formats, like those without err at all: callback(result), we can
 promisify such functions manually without using the helper.

There are also modules with a bit more flexible promisification functions, e.g. es6-promisify.
 In Node.js, there’s a built-in util.promisify function for that.

Please note:
Promisification is a great approach, especially when you use async/await (covered later in 
the chapter Async/await), but not a total replacement for callbacks.

Remember, a promise may have only one result, but a callback may technically be called many times.

So promisification is only meant for functions that call the callback once. Further 
calls will be ignored.
Lütfen dikkat:
Promisifikasyon, özellikle async/await (Async/await bölümünde daha sonra ele alınacaktır) 
kullandığınızda harika bir yaklaşımdır, ancak geri aramaların tamamen yerini tutmaz.

Unutmayın, bir sözün yalnızca bir sonucu olabilir, ancak bir geri arama teknik olarak birçok
kez çağrılabilir.

Bu nedenle, promisifikasyon yalnızca geri aramayı bir kez çağıran işlevler için tasarlanmıştır.
 Sonraki çağrılar göz ardı edilecektir.

*/

//Microtasks
/*
Promise handlers .then/.catch/.finally are always asynchronous.

Even when a Promise is immediately resolved, the code on the lines below .then/.catch/.finally
 will still execute before these handlers.

Here’s a demo:

 let promise = Promise.resolve();

promise.then(() => alert("promise done!"));

alert("code finished"); // this alert shows first
If you run it, you see code finished first, and then promise done!.

That’s strange, because the promise is definitely done from the beginning.

Why did the .then trigger afterwards? What’s going on?


*/

/*
Asynchronous tasks need proper management. For that, the ECMA standard specifies an internal
 queue PromiseJobs, more often referred to as the “microtask queue” (V8 term).

As stated in the specification:

The queue is first-in-first-out: tasks enqueued first are run first.
Execution of a task is initiated only when nothing else is running.
Or, to put it more simply, when a promise is ready, its .then/catch/finally handlers are put 
into the queue; they are not executed yet. When the JavaScript engine becomes free from the
 current code, it takes a task from the queue and executes it.

That’s why “code finished” in the example above shows first.

Kuyruk ilk giren ilk çıkar: ilk kuyruğa alınan görevler ilk çalıştırılır.
Bir görevin yürütülmesi yalnızca başka hiçbir şey çalışmıyorken başlatılır.
Ya da daha basit bir ifadeyle, bir söz hazır olduğunda, .then/catch/finally 
işleyicileri kuyruğa alınır; henüz yürütülmemişlerdir. JavaScript motoru mevcut koddan 
kurtulduğunda, kuyruktan bir görev alır ve yürütür.

Bu nedenle yukarıdaki örnekte "kod tamamlandı" ifadesi ilk olarak gösterilir.

*/

/*
Promise handlers always go through this internal queue.

If there’s a chain with multiple .then/catch/finally, then every one of them is executed
 asynchronously. That is, it first gets queued, then executed when the current code is 
 complete and previously queued handlers are finished.

What if the order matters for us? How can we make code finished appear after promise done?

Easy, just put it into the queue with .then:

 Promise.resolve()
  .then(() => alert("promise done!"))
  .then(() => alert("code finished"));
Now the order is as intended.


*/

/*
//Unhandled rejection
An “unhandled rejection” occurs when a promise error is not handled at the end of 
the microtask queue.

Normally, if we expect an error, we add .catch to the promise chain to handle it:
Mikro görev kuyruğunun sonunda bir söz hatası işlenmediğinde "işlenmemiş reddetme" 
meydana gelir.

Normalde, bir hata bekliyorsak, bunu işlemek için söz zincirine .catch ekleriz:


 let promise = Promise.reject(new Error("Promise Failed!"));
promise.catch(err => alert('caught'));

// doesn't run: error handled
window.addEventListener('unhandledrejection', event => alert(event.reason));
But if we forget to add .catch, then, after the microtask queue is empty, the engine 
triggers the event:

 let promise = Promise.reject(new Error("Promise Failed!"));

// Promise Failed!
window.addEventListener('unhandledrejection', event => alert(event.reason));
What if we handle the error later? Like this:

 let promise = Promise.reject(new Error("Promise Failed!"));
setTimeout(() => promise.catch(err => alert('caught')), 1000);

// Error: Promise Failed!
window.addEventListener('unhandledrejection', event => alert(event.reason));
Now, if we run it, we’ll see Promise Failed! first and then caught.

If we didn’t know about the microtasks queue, we could wonder: “Why did unhandledrejection 
handler run? We did catch and handle the error!”

But now we understand that unhandledrejection is generated when the microtask queue is complete: 
the engine examines promises and, if any of them is in the “rejected” state, then the event triggers.

In the example above, .catch added by setTimeout also triggers. But it does so later, after 
unhandledrejection has already occurred, so it doesn’t change anything.


Mikrogörev kuyruğunu bilmeseydik, "İşlenmemiş reddetme işleyicisi neden çalıştı? Hatayı yakaladık 
ve işledik!" diye merak edebilirdik.

Ancak artık, işlenmemiş reddetmenin mikrogörev kuyruğu tamamlandığında üretildiğini anlıyoruz: 
motor, vaatleri inceler ve bunlardan herhangi biri "reddedildi" durumundaysa, olay tetiklenir.

Yukarıdaki örnekte, setTimeout tarafından eklenen .catch de tetiklenir. Ancak bunu daha sonra, 
işlenmemiş reddetme gerçekleştikten sonra yapar, bu nedenle hiçbir şeyi değiştirmez.
*/

/*
Promise handling is always asynchronous, as all promise actions pass through the internal
 “promise jobs” queue, also called “microtask queue” (V8 term).
So .then/catch/finally handlers are always called after the current code is finished.
If we need to guarantee that a piece of code is executed after .then/catch/finally, we can
 add it into a chained .then call.
 Promise işlemleri her zaman eşzamansızdır, çünkü tüm promise eylemleri dahili "promise jobs" 
 kuyruğundan, yani "mikro görev kuyruğu"ndan (V8 terimi) geçer.
Bu nedenle, .then/catch/finally işleyicileri her zaman geçerli kod tamamlandıktan sonra çağrılır.
Bir kod parçasının .then/catch/finally'den sonra çalıştırılmasını garantilememiz gerekiyorsa, 
onu zincirleme bir .then çağrısına ekleyebiliriz.
 */

//Async/await

/*
Async functions

Let’s start with the async keyword. It can be placed before a function, like this:

async function f() {
  return 1;
}
The word “async” before a function means one simple thing: a function always returns 
a promise. Other values are wrapped in a resolved promise automatically.

For instance, this function returns a resolved promise with the result of 1; let’s test it:

/*
async kelimesi, bir fonksiyonun her zaman bir Promise döndüreceğini garanti eder.

Yani, normalde bir fonksiyondan return 1; dersek bu doğrudan 1 döner.
Ama async ile yazarsan, bu değer otomatik olarak Promise.resolve(1) haline gelir.


*/

/*
 async function f() {
  return 1;
}

f().then(alert); // 1
…We could explicitly return a promise, which would be the same:

 async function f() {
  return Promise.resolve(1);
}

f().then(alert); // 1
So, async ensures that the function returns a promise, and wraps non-promises in it. 
Simple enough, right? But not only that. There’s another keyword, await, that works only 
inside async functions, and it’s pretty cool.

/*
şu şekilde işler:

f() çağrıldığında, JavaScript bu fonksiyondan dönen değeri otomatik olarak 
Promise.resolve(1) şeklinde sarar.
Yani f() aslında şunu döner:
Promise.resolve(1)
Bu yüzden .then(alert) çalışır ve ekrana 1 yazar.


Aynı fonksiyonu açıkça Promise döndürerek de yazabilirsin:
async function f() {
  return Promise.resolve(1);
}
Bu versiyon da tamamen aynıdır. Çünkü async fonksiyonlar zaten döndüğün her değeri
 otomatik olarak bir Promise haline getirir.

await sadece async fonksiyonların içinde kullanılabilir.

Görevi, bir Promise'in çözülmesini beklemek ve sonucunu almak.

Ör
*/


/*
Await

The syntax:

// works only inside async functions
let value = await promise;
The keyword await makes JavaScript wait until that promise settles and returns its result.

Here’s an example with a promise that resolves in 1 second:

 async function f() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000)
  });

  let result = await promise; // wait until the promise resolves (*)

  alert(result); // "done!"
}

f();
The function execution “pauses” at the line (*) and resumes when the promise settles, 
with result becoming its result. So the code above shows “done!” in one second.

Let’s emphasize: await literally suspends the function execution until the promise settles,
 and then resumes it with the promise result. That doesn’t cost any CPU resources, because 
 the JavaScript engine can do other jobs in the meantime: execute other scripts, handle events, etc.

It’s just a more elegant syntax of getting the promise result than promise.then. And, 
it’s easier to read and write.

Fonksiyonun yürütülmesi (*) satırında "duraklıyor" ve söz verilen sonuç yerine oturduğunda
 devam ediyor ve sonuç, onun sonucu oluyor. Dolayısıyla yukarıdaki kod bir saniyede 
 "tamamlandı!" mesajını gösteriyor.

Şunu vurgulayalım: await, söz verilen sonuç yerine oturana kadar fonksiyon yürütmesini 
askıya alır ve ardından söz verilen sonuçla devam ettirir. Bu, herhangi bir CPU kaynağına 
mal olmaz çünkü JavaScript motoru bu arada başka işler de yapabilir: diğer betikleri yürütmek,
 olayları işlemek vb.

Bu, söz verilen sonucu elde etmenin promise.then'den daha zarif bir sözdizimidir. Ayrıca, 
okuması ve yazması daha kolaydır.

*/

/*
Can’t use await in regular functions
If we try to use await in a non-async function, there would be a syntax error:

 function f() {
  let promise = Promise.resolve(1);
  let result = await promise; // Syntax error
}
We may get this error if we forget to put async before a function. As stated earlier, 
await only works inside an async function.
*/

/*
Let’s take the showAvatar() example from the chapter Promises chaining and rewrite 
it using async/await:

We’ll need to replace .then calls with await.
Also we should make the function async for them to work.
 async function showAvatar() {

  // read our JSON
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();

  // read github user
  let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
  let githubUser = await githubResponse.json();

  // show the avatar
  let img = document.createElement('img');
  img.src = githubUser.avatar_url;
  img.className = "promise-avatar-example";
  document.body.append(img);

  // wait 3 seconds
  await new Promise((resolve, reject) => setTimeout(resolve, 3000));

  img.remove();

  return githubUser;
}

showAvatar();
Pretty clean and easy to read, right? Much better than before.


*/

/*
Modern browsers allow top-level await in modules
In modern browsers, await on top level works just fine, when we’re inside a module. 
We’ll cover modules in article Modules, introduction.

For instance:

 // we assume this code runs at top level, inside a module
let response = await fetch('/article/promise-chaining/user.json');
let user = await response.json();

console.log(user);
OUTPUT
{name: "iliakan", isAdmin: true}
If we’re not using modules, or older browsers must be supported, there’s a universal 
recipe: wrapping into an anonymous async function.

Like this:

(async () => {
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();
  ...
})();
*/

/*
await accepts “thenables”
Like promise.then, await allows us to use thenable objects (those with a callable then method). 
The idea is that a third-party object may not be a promise, but promise-compatible: if it 
supports .then, that’s enough to use it with await.
promise.then gibi, await de thenable nesnelerini (çağrılabilir bir then metoduna sahip nesneleri)
 kullanmamıza olanak tanır. Buradaki fikir, üçüncü taraf bir nesnenin promise olmaması, ancak 
 promise ile uyumlu olmasıdır: .then'i destekliyorsa, await ile kullanmak için yeterlidir.
Here’s a demo Thenable class; the await below accepts its instances:
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve);
    // resolve with this.num*2 after 1000ms
    setTimeout(() => resolve(this.num * 2), 1000); // (*)
  }
}

async function f() {
  // waits for 1 second, then result becomes 2
  let result = await new Thenable(1);
  alert(result);
}

f();
If await gets a non-promise object with .then, it calls that method providing the built-in 
functions resolve and reject as arguments (just as it does for a regular Promise executor). 
Then await waits until one of them is called (in the example above it happens in the line
 (*)) and then proceeds with the result.


Eğer await, .then ile bir Promise dışı nesne alırsa, yerleşik resolve ve reject fonksiyonlarını
 argüman olarak kullanarak bu metodu çağırır (tıpkı normal bir Promise yürütücüsü için yaptığı 
 gibi). Ardından await, bunlardan biri çağrılana kadar bekler (yukarıdaki örnekte bu (*) 
 satırında gerçekleşir) ve ardından sonuçla devam eder.

*/

/*
Async class methods
To declare an async class method, just prepend it with async:

 class Waiter {
  async wait() {
    return await Promise.resolve(1);
  }
}

new Waiter()
  .wait()
  .then(alert); // 1 (this is the same as (result => alert(result)))
The meaning is the same: it ensures that the returned value is a promise and enables await.
*/

/*

Error handling

If a promise resolves normally, then await promise returns the result. But in the 
case of a rejection, it throws the error, just as if there were a throw statement at that line.

This code:

async function f() {
  await Promise.reject(new Error("Whoops!"));
}
…is the same as this:

async function f() {
  throw new Error("Whoops!");
}
In real situations, the promise may take some time before it rejects. In that case 
there will be a delay before await throws an error.

We can catch that error using try..catch, the same way as a regular throw:

 async function f() {

  try {
    let response = await fetch('http://no-such-url');
  } catch(err) {
    alert(err); // TypeError: failed to fetch
  }
}

f();
In the case of an error, the control jumps to the catch block. We can also wrap
 multiple lines:

 async function f() {

  try {
    let response = await fetch('/no-user-here');
    let user = await response.json();
  } catch(err) {
    // catches errors both in fetch and response.json
    alert(err);
  }
}

f();
If we don’t have try..catch, then the promise generated by the call of the async 
function f() becomes rejected. We can append .catch to handle it:

 async function f() {
  let response = await fetch('http://no-such-url');
}

// f() becomes a rejected promise
f().catch(alert); // TypeError: failed to fetch // (*)
If we forget to add .catch there, then we get an unhandled promise error (viewable 
in the console). We can catch such errors using a global unhandledrejection event 
handler as described in the chapter Error handling with promises.


*/

/*
async/await and promise.then/catch
When we use async/await, we rarely need .then, because await handles the waiting for us. And 
we can use a regular try..catch instead of .catch. That’s usually (but not always) more convenient.

But at the top level of the code, when we’re outside any async function, we’re syntactically 
unable to use await, so it’s a normal practice to add .then/catch to handle the final result 
or falling-through error, like in the line (*) of the example above.

async/await ve promise.then/catch
async/await kullandığımızda, .then'e nadiren ihtiyaç duyarız, çünkü await beklemeyi bizim 
yerimize halleder. .catch yerine normal bir try..catch kullanabiliriz. Bu genellikle 
(ama her zaman değil) daha kullanışlıdır.

Ancak kodun en üst seviyesinde, herhangi bir async fonksiyonun dışında olduğumuzda, await'i 
sözdizimsel olarak kullanamayız, bu nedenle yukarıdaki örnekteki (*) satırında olduğu gibi,
 nihai sonucu veya hata ayıklamayı halletmek için .then/catch eklemek normal bir uygulamadır.
*/

/*
async/await works well with Promise.all
When we need to wait for multiple promises, we can wrap them in Promise.all and then await:

// wait for the array of results
let results = await Promise.all([
  fetch(url1),
  fetch(url2),
  ...
]);
In the case of an error, it propagates as usual, from the failed promise to
 Promise.all, and 
then becomes an exception that we can catch using try..catch around the call.
*/

/*
The async keyword before a function has two effects:

Makes it always return a promise.
Allows await to be used in it.
The await keyword before a promise makes JavaScript wait until that promise settles, 
and then:

If it’s an error, an exception is generated — same as if throw error were called at 
that very place.
Otherwise, it returns the result.
Together they provide a great framework to write asynchronous code that is easy to
 both read and write.

With async/await we rarely need to write promise.then/catch, but we still shouldn’t 
forget that they are based on promises, because sometimes (e.g. in the outermost scope) 
we have to use these methods. Also Promise.all is nice when we are waiting for many 
tasks simultaneously.



*/

/*
Rewrite this example code from the chapter Promises chaining using async/await instead of .then/catch:

 function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    });
}

loadJson('https://javascript.info/no-such-user.json')
  .catch(alert); // Error: 404
solution
The notes are below the code:

 async function loadJson(url) { // (1)
  let response = await fetch(url); // (2)

  if (response.status == 200) {
    let json = await response.json(); // (3)
    return json;
  }

  throw new Error(response.status);
}

loadJson('https://javascript.info/no-such-user.json')
  .catch(alert); // Error: 404 (4)
Notes:

The function loadJson becomes async.

All .then inside are replaced with await.

We can return response.json() instead of awaiting for it, like this:

if (response.status == 200) {
  return response.json(); // (3)
}
Then the outer code would have to await for that promise to resolve. In our case it
 doesn’t matter.

The error thrown from loadJson is handled by .catch. We can’t use await loadJson(…) 
there, because we’re not in an async function.
*/

/*
Below you can find the “rethrow” example. Rewrite it using async/await instead of .then/catch.

And get rid of the recursion in favour of a loop in demoGithubUser: with 
async/await that becomes easy to do.

 class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new HttpError(response);
      }
    });
}

// Ask for a user name until github returns a valid user
function demoGithubUser() {
  let name = prompt("Enter a name?", "iliakan");

  return loadJson(`https://api.github.com/users/${name}`)
    .then(user => {
      alert(`Full name: ${user.name}.`);
      return user;
    })
    .catch(err => {
      if (err instanceof HttpError && err.response.status == 404) {
        alert("No such user, please reenter.");
        return demoGithubUser();
      } else {
        throw err;
      }
    });
}

demoGithubUser();
solution
There are no tricks here. Just replace .catch with try..catch inside 
demoGithubUser and add async/await where needed:

 class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

async function loadJson(url) {
  let response = await fetch(url);
  if (response.status == 200) {
    return response.json();
  } else {
    throw new HttpError(response);
  }
}

// Ask for a user name until github returns a valid user
async function demoGithubUser() {

  let user;
  while(true) {
    let name = prompt("Enter a name?", "iliakan");

    try {
      user = await loadJson(`https://api.github.com/users/${name}`);
      break; // no error, exit loop
    } catch(err) {
      if (err instanceof HttpError && err.response.status == 404) {
        // loop continues after the alert
        alert("No such user, please reenter.");
      } else {
        // unknown error, rethrow
        throw err;
      }
    }
  }


  alert(`Full name: ${user.name}.`);
  return user;
}

demoGithubUser();
*/

 /*
 Call async from non-async
We have a “regular” function called f. How can you call the async function wait()
 and use its result inside of f?

async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
  // ...what should you write here?
  // we need to call async wait() and wait to get 10
  // remember, we can't use "await"
}
P.S. The task is technically very simple, but the question is quite common for 
developers new to async/await.

solution
That’s the case when knowing how it works inside is helpful.

Just treat async call as promise and attach .then to it:

 async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
  // shows 10 after 1 second
  wait().then(result => alert(result));
}

f();
 */

/*
Dangerous Promise.all
Promise.all is a great way to parallelize multiple operations. It’s especially 
useful when we need to make parallel requests to multiple services.

However, there’s a hidden danger. We’ll see an example in this task and explore
 how to avoid it.

Let’s say we have a connection to a remote service, such as a database.

There’re two functions: connect() and disconnect().

When connected, we can send requests using database.query(...) – an async function 
which usually returns the result but also may throw an error.

Here’s a simple implementation:

let database;

function connect() {
  database = {
    async query(isOk) {
      if (!isOk) throw new Error('Query failed');
    }
  };
}

function disconnect() {
  database = null;
}

// intended usage:
// connect()
// ...
// database.query(true) to emulate a successful call
// database.query(false) to emulate a failed call
// ...
// disconnect()
Now here’s the problem.

We wrote the code to connect and send 3 queries in parallel (all of them take 
different time, e.g. 100, 200 and 300ms), then disconnect:

// Helper function to call async function `fn` after `ms` milliseconds
function delay(fn, ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => fn().then(resolve, reject), ms);
  });
}

async function run() {
  connect();

  try {
    await Promise.all([
      // these 3 parallel jobs take different time: 100, 200 and 300 ms
      // we use the `delay` helper to achieve this effect
      delay(() => database.query(true), 100),
      delay(() => database.query(false), 200),
      delay(() => database.query(false), 300)
    ]);
  } catch(error) {
    console.log('Error handled (or was it?)');
  }

  disconnect();
}

run();
Two of these queries happen to be unsuccessful, but we’re smart enough to wrap 
the Promise.all call into a try..catch block.

However, this doesn’t help! This script actually leads to an uncaught error in console!

Why? How to avoid it?

An ideal solution would be to cancel all unfinished queries when one of them fails. This way 
we avoid any potential errors.

However, the bad news is that service calls (such as database.query) are often implemented by
 a 3rd-party library which doesn’t support cancellation. Then there’s no way to cancel a call.

As an alternative, we can write our own wrapper function around Promise.all which adds a custom
 then/catch handler to each promise to track them: results are gathered and, if an error occurs, 
 all subsequent promises are ignored.

İdeal bir çözüm, biri başarısız olduğunda tamamlanmamış tüm sorguları iptal etmektir. Bu şekilde 
olası hataların önüne geçeriz.

Ancak kötü haber şu ki, servis çağrıları (örneğin database.query) genellikle iptali desteklemeyen 
üçüncü taraf bir kütüphane tarafından uygulanır. Bu durumda bir çağrıyı iptal etmenin bir yolu yoktur.

Alternatif olarak, Promise.all etrafında, her bir söze özel bir then/catch işleyicisi ekleyerek 
sonuçları takip eden kendi sarmalayıcı fonksiyonumuzu yazabiliriz: sonuçlar toplanır ve bir hata
 oluşursa, sonraki tüm söz vermeler yok sayılır.

 function customPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let resultsCount = 0;
    let hasError = false; // we'll set it to true upon first error

    promises.forEach((promise, index) => {
      promise
        .then(result => {
          if (hasError) return; // ignore the promise if already errored
          results[index] = result;
          resultsCount++;
          if (resultsCount === promises.length) {
            resolve(results); // when all results are ready - successs
          }
        })
        .catch(error => {
          if (hasError) return; // ignore the promise if already errored
          hasError = true; // wops, error!
          reject(error); // fail with rejection
        });
    });
  });
}
This approach has an issue of its own – it’s often undesirable to disconnect() when 
queries are still in the process.

It may be important that all queries complete, especially if some of them make important 
updates.

So we should wait until all promises are settled before going further with the 
execution and eventually disconnecting.

Here’s another implementation. It behaves similar to Promise.all – also resolves with 
the first error, but waits until all promises are settled.

function customPromiseAllWait(promises) {
  return new Promise((resolve, reject) => {
    const results = new Array(promises.length);
    let settledCount = 0;
    let firstError = null;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(result => {
          results[index] = result;
        })
        .catch(error => {
          if (firstError === null) {
            firstError = error;
          }
        })
        .finally(() => {
          settledCount++;
          if (settledCount === promises.length) {
            if (firstError !== null) {
              reject(firstError);
            } else {
              resolve(results);
            }
          }
        });
    });
  });
}
Now await customPromiseAllWait(...) will stall the execution until all queries are processed.

This is a more reliable approach, as it guarantees a predictable execution flow.


*/

/*
Lastly, if we’d like to process all errors, we can use either use Promise.allSettled 
or write a wrapper around it to gathers all errors in a single AggregateError object 
and rejects with it.

// wait for all promises to settle
// return results if no errors
// throw AggregateError with all errors if any
function allOrAggregateError(promises) {
  return Promise.allSettled(promises).then(results => {
    const errors = [];
    const values = [];

    results.forEach((res, i) => {
      if (res.status === 'fulfilled') {
        values[i] = res.value;
      } else {
        errors.push(res.reason);
      }
    });

    if (errors.length > 0) {
      throw new AggregateError(errors, 'One or more promises failed');
    }

    return values;
  });
}
*/

/*
Özellik
customPromiseAll	
İlk hatada durur mu?	✅ Evet, hemen reject
Hataları döndürür mü?	❌ Sadece ilk hatayı döner	
Başarıları döndürür mü?	✅ Evet
Hangi durumlar için ideal?	Hızlı başarısızlık yeterliyse


customPromiseAllWait
İlk hatada durur mu?	❌ Hayır, hepsini bekler
Hataları döndürür mü?	❌ Sadece ilk hatayı döner
Başarıları döndürür mü?	✅ Evet
Hangi durumlar için ideal? Her işlemi tamamlamak gerekliyse ama sadece ilk hataya bakılacaksa


allOrAggregateError
❌ Hayır, hepsini bekler
✅ Tüm hataları döner (AggregateError)
✅ Evet
Tüm işlemler önemliyse, tüm hatalar görülmek isteniyorsa

*/

//Generators
/*
Regular functions return only one, single value (or nothing).

Generators can return (“yield”) multiple values, one after another, on-demand. They work great with iterables, 
allowing to create data streams with ease.

Normal fonksiyonlar yalnızca tek bir değer döndürür (veya hiçbir değer döndürmez).

Üreticiler, isteğe bağlı olarak art arda birden fazla değer döndürebilir ("verebilir"). Yinelemeli 
fonksiyonlarla harika çalışırlar ve veri akışlarını kolayca oluşturmanıza olanak tanırlar.
*/

/*
Generator functions

To create a generator, we need a special syntax construct: function*, so-called 
“generator function”.

It looks like this:

function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}
Generator functions behave differently from regular ones. When such function is called,
 it doesn’t run its code. Instead it returns a special object, called “generator 
 object”, to manage the execution.

Here, take a look:

 function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

// "generator function" creates "generator object"
let generator = generateSequence();
alert(generator); // [object Generator]
The function code execution hasn’t started yet:


*/

/*
The main method of a generator is next(). When called, it runs the execution until 
the nearest yield <value> statement (value can be omitted, then it’s undefined). 
Then the function execution pauses, and the yielded value is returned to the outer code.

The result of next() is always an object with two properties:

value: the yielded value.
done: true if the function code has finished, otherwise false.
For instance, here we create the generator and get its first yielded value:

 function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

let generator = generateSequence();

let one = generator.next();

alert(JSON.stringify(one)); // {value: 1, done: false}
As of now, we got the first value only, and the function execution is on the second line:
Let’s call generator.next() again. It resumes the code execution and returns the next yield:

let two = generator.next();

alert(JSON.stringify(two)); // {value: 2, done: false}

And, if we call it a third time, the execution reaches the return statement that finishes
 the function:

let three = generator.next();

alert(JSON.stringify(three)); // {value: 3, done: true}
Now the generator is done. We should see it from done:true and process value:3 as the
 final result.

New calls to generator.next() don’t make sense any more. If we do them, they return 
the same object: {done: true}.

*/

/*
function* f(…) or function *f(…)?
Both syntaxes are correct.

But usually the first syntax is preferred, as the star * denotes that it’s a generator 
function, it describes the kind, not the name, so it should stick with the function keyword.
*/

/*
Generators are iterable

As you probably already guessed looking at the next() method, generators are iterable.

We can loop over their values using for..of:

 function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

let generator = generateSequence();

for(let value of generator) {
  alert(value); // 1, then 2
}
Looks a lot nicer than calling .next().value, right?

…But please note: the example above shows 1, then 2, and that’s all. It doesn’t show 3!

It’s because for..of iteration ignores the last value, when done: true. So, if 
we want all results to be shown by for..of, we must return them with yield:

 function* generateSequence() {
  yield 1;
  yield 2;
  yield 3;
}

let generator = generateSequence();

for(let value of generator) {
  alert(value); // 1, then 2, then 3
}
As generators are iterable, we can call all related functionality, e.g. the spread syntax ...:

 function* generateSequence() {
  yield 1;
  yield 2;
  yield 3;
}

let sequence = [0, ...generateSequence()];

alert(sequence); // 0, 1, 2, 3
In the code above, ...generateSequence() turns the iterable generator object into an array of items
*/


//Using generators for iterables
/*
Some time ago, in the chapter Iterables we created an iterable range object that returns values from..to.

Here, let’s remember the code:

 let range = {
  from: 1,
  to: 5,

  // for..of range calls this method once in the very beginning
  [Symbol.iterator]() {
    // ...it returns the iterator object:
    // onward, for..of works only with that object, asking it for next values
    return {
      current: this.from,
      last: this.to,

      // next() is called on each iteration by the for..of loop
      next() {
        // it should return the value as an object {done:.., value :...}
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

// iteration over range returns numbers from range.from to range.to
alert([...range]); // 1,2,3,4,5
We can use a generator function for iteration by providing it as Symbol.iterator.

Here’s the same range, but much more compact:

 let range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() { // a shorthand for [Symbol.iterator]: function*()
    for(let value = this.from; value <= this.to; value++) {
      yield value;
    }
  }
};

alert( [...range] ); // 1,2,3,4,5
That works, because range[Symbol.iterator]() now returns a generator, and generator 
methods are exactly what for..of expects:

it has a .next() method
that returns values in the form {value: ..., done: true/false}
That’s not a coincidence, of course. Generators were added to JavaScript language with 
iterators in mind, to implement them easily.

The variant with a generator is much more concise than the original iterable code of 
range, and keeps the same functionality.


*/

/*
Generators may generate values forever
In the examples above we generated finite sequences, but we can also make a
 generator that yields values forever. For instance, an unending sequence of 
 pseudo-random numbers.

That surely would require a break (or return) in for..of over such generator. 
Otherwise, the loop would repeat forever and hang.
*/

/*
Generator composition

Generator composition is a special feature of generators that allows to 
transparently “embed” generators in each other.

For instance, we have a function that generates a sequence of numbers:

function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}
Now we’d like to reuse it to generate a more complex sequence:

first, digits 0..9 (with character codes 48…57),
followed by uppercase alphabet letters A..Z (character codes 65…90)
followed by lowercase alphabet letters a..z (character codes 97…122)
We can use this sequence e.g. to create passwords by selecting characters from 
it (could add syntax characters as well), but let’s generate it first.

In a regular function, to combine results from multiple other functions, we call 
them, store the results, and then join at the end.
*/

/*
For generators, there’s a special yield* syntax to “embed” (compose) one generator into another.

The composed generator:

 function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

function* generatePasswordCodes() {

  // 0..9
  yield* generateSequence(48, 57);

  // A..Z
  yield* generateSequence(65, 90);

  // a..z
  yield* generateSequence(97, 122);

}

let str = '';

for(let code of generatePasswordCodes()) {
  str += String.fromCharCode(code);
}

alert(str); // 0..9A..Za..z
The yield* directive delegates the execution to another generator. This term means that
 yield* gen iterates over the generator gen and transparently forwards its yields outside.
  As if the values were yielded by the outer generator.

The result is the same as if we inlined the code from nested generators:

 function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

function* generateAlphaNum() {

  // yield* generateSequence(48, 57);
  for (let i = 48; i <= 57; i++) yield i;

  // yield* generateSequence(65, 90);
  for (let i = 65; i <= 90; i++) yield i;

  // yield* generateSequence(97, 122);
  for (let i = 97; i <= 122; i++) yield i;

}

let str = '';

for(let code of generateAlphaNum()) {
  str += String.fromCharCode(code);
}

alert(str); // 0..9A..Za..z
A generator composition is a natural way to insert a flow of one generator into another.
 It doesn’t use extra memory to store intermediate results.


*/

/*
“yield” is a two-way street

Until this moment, generators were similar to iterable objects, with a special syntax 
to generate values. But in fact they are much more powerful and flexible.

That’s because yield is a two-way street: it not only returns the result to the outside, 
but also can pass the value inside the generator.

To do so, we should call generator.next(arg), with an argument. That argument becomes the 
result of yield.

Let’s see an example:

 function* gen() {
  // Pass a question to the outer code and wait for an answer
  let result = yield "2 + 2 = ?"; // (*)

  alert(result);
}

let generator = gen();

let question = generator.next().value; // <-- yield returns the value

generator.next(4); // --> pass the result into the generator


The first call generator.next() should be always made without an argument
(the argument is ignored if passed). It starts the execution and returns the 
result of the first yield "2+2=?". At this point the generator pauses the execution, 
while staying on the line (*).
Then, as shown at the picture above, the result of yield gets into the question variable 
in the calling code.
On generator.next(4), the generator resumes, and 4 gets in as the result: let result = 4.
Please note, the outer code does not have to immediately call next(4). It may take time.
 That’s not a problem: the generator will wait.

For instance:

// resume the generator after some time
setTimeout(() => generator.next(4), 1000);
As we can see, unlike regular functions, a generator and the calling code can exchange
 results by passing values in next/yield.


*/

/*
To make things more obvious, here’s another example, with more calls:

 function* gen() {
  let ask1 = yield "2 + 2 = ?";

  alert(ask1); // 4

  let ask2 = yield "3 * 3 = ?"

  alert(ask2); // 9
}

let generator = gen();

alert( generator.next().value ); // "2 + 2 = ?"

alert( generator.next(4).value ); // "3 * 3 = ?"

alert( generator.next(9).done ); // true

The first .next() starts the execution… It reaches the first yield.
The result is returned to the outer code.
The second .next(4) passes 4 back to the generator as the result of the 
first yield, and resumes the execution.
…It reaches the second yield, that becomes the result of the generator call.
The third next(9) passes 9 into the generator as the result of the second 
yield and resumes the execution that reaches the end of the function, so done: true.
It’s like a “ping-pong” game. Each next(value) (excluding the first one) 
passes a value into the generator, that becomes the result of the current
 yield, and then gets back the result of the next yield.


*/


/*
generator.throw

As we observed in the examples above, the outer code may pass a value into 
the generator, as the result of yield.

…But it can also initiate (throw) an error there. That’s natural, as an error is a kind of result.

To pass an error into a yield, we should call generator.throw(err). In that case, 
the err is thrown in the line with that yield.

For instance, here the yield of "2 + 2 = ?" leads to an error:

 function* gen() {
  try {
    let result = yield "2 + 2 = ?"; // (1)

    alert("The execution does not reach here, because the exception is thrown above");
  } catch(e) {
    alert(e); // shows the error
  }
}

let generator = gen();

let question = generator.next().value;

generator.throw(new Error("The answer is not found in my database")); // (2)
The error, thrown into the generator at line (2) leads to an exception in line (1)
 with yield. In the example above, try..catch catches it and shows it.

If we don’t catch it, then just like any exception, it “falls out” the generator 
into the calling code.

The current line of the calling code is the line with generator.throw, labelled as 
(2). So we can catch it here, like this:

 function* generate() {
  let result = yield "2 + 2 = ?"; // Error in this line
}

let generator = generate();

let question = generator.next().value;

try {
  generator.throw(new Error("The answer is not found in my database"));
} catch(e) {
  alert(e); // shows the error
}
If we don’t catch the error there, then, as usual, it falls through to the outer calling 
code (if any) and, if uncaught, kills the script.


*/

/*
generator.return

generator.return(value) finishes the generator execution and return the given value.

function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

const g = gen();

g.next();        // { value: 1, done: false }
g.return('foo'); // { value: "foo", done: true }
g.next();        // { value: undefined, done: true }
If we again use generator.return() in a completed generator, it will return that 
value again (MDN).

Often we don’t use it, as most of time we want to get all returning values, but 
it can be useful when we want to stop generator in a specific condition.


*/

//Generator, JavaScript'te çalışması durdurulup sonra kaldığı yerden devam ettirilebilen özel fonksiyonlardır.

/*
Generators are created by generator functions function* f(…) {…}.
Inside generators (only) there exists a yield operator.
The outer code and the generator may exchange results via next/yield calls.

*/

/*
function* pseudoRandom(seed) {
  let value = seed;

  while(true) {
    value = value * 16807 % 2147483647;
    yield value;
  }

};

let generator = pseudoRandom(1);

alert(generator.next().value); // 16807
alert(generator.next().value); // 282475249
alert(generator.next().value); // 1622650073
Please note, the same can be done with a regular function, like this:

 function pseudoRandom(seed) {
  let value = seed;

  return function() {
    value = value * 16807 % 2147483647;
    return value;
  }
}

let generator = pseudoRandom(1);

alert(generator()); // 16807
alert(generator()); // 282475249
alert(generator()); // 1622650073
That also works. But then we lose ability to iterate with for..of and to use generator 
composition, that may be useful elsewhere.

//for of ile yineleme yapiyor generator 
*/

//Async iteration and generators

/*
Asynchronous iteration allow us to iterate over data that comes asynchronously, on-demand. 
Like, for instance, when we download something chunk-by-chunk over a network. And 
asynchronous generators make it even more convenient.

Eşzamansız yineleme, eşzamansız olarak gelen veriler üzerinde istek üzerine yineleme 
yapmamızı sağlar. Örneğin, bir şeyi ağ üzerinden parça parça indirdiğimizde. Eşzamansız
 üreteçler ise bunu daha da kullanışlı hale getirir.

*/


/*
Recall iterables

Let’s recall the topic about iterables.

The idea is that we have an object, such as range here:

let range = {
  from: 1,
  to: 5
};
…And we’d like to use for..of loop on it, such as for(value of range), to get values 
from 1 to 5.

In other words, we want to add an iteration ability to the object.

That can be implemented using a special method with the name Symbol.iterator:

This method is called in by the for..of construct when the loop is started, and it 
should return an object with the next method.
For each iteration, the next() method is invoked for the next value.
The next() should return a value in the form {done: true/false, value:<loop value>},
 where done:true means the end of the loop.
Here’s an implementation for the iterable range:

 let range = {
  from: 1,
  to: 5,

  [Symbol.iterator]() { // called once, in the beginning of for..of
    return {
      current: this.from,
      last: this.to,

      next() { // called every iteration, to get the next value
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

for(let value of range) {
  alert(value); // 1 then 2, then 3, then 4, then 5
}

*/

/*
Async iterables

Asynchronous iteration is needed when values come asynchronously: after setTimeout or 
another kind of delay.

The most common case is that the object needs to make a network request to deliver the 
next value, we’ll see a real-life example of it a bit later.

To make an object iterable asynchronously:

Use Symbol.asyncIterator instead of Symbol.iterator.
The next() method should return a promise (to be fulfilled with the next value).
The async keyword handles it, we can simply make async next().
To iterate over such an object, we should use a for await (let item of iterable) loop.
Note the await word.
As a starting example, let’s make an iterable range object, similar like the one before, 
but now it will return values asynchronously, one per second.

All we need to do is to perform a few replacements in the code above:

 let range = {
  from: 1,
  to: 5,

  [Symbol.asyncIterator]() { // (1)
    return {
      current: this.from,
      last: this.to,

      async next() { // (2)

        // note: we can use "await" inside the async next:
        await new Promise(resolve => setTimeout(resolve, 1000)); // (3)
      //Bu, JavaScript'te çok yaygın bir teknik: "uyutma" (sleep / delay) yapmak için kullanılır.
      //Yani bu satırda program 1 saniyeliğine durur.


        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

(async () => {

  for await (let value of range) { // (4)
    alert(value); // 1,2,3,4,5
  }

})()
As we can see, the structure is similar to regular iterators:

To make an object asynchronously iterable, it must have a method Symbol.asyncIterator (1).
This method must return the object with next() method returning a promise (2).
The next() method doesn’t have to be async, it may be a regular method returning a promise,
 but async allows us to use await, so that’s convenient. Here we just delay for a second (3).
To iterate, we use for await(let value of range) (4), namely add “await” after “for”. It 
calls range[Symbol.asyncIterator]() once, and then its next() for values.

*/


/*

                                        Iterators	                            Async iterators
Object method to provide iterator	      Symbol.iterator	                      Symbol.asyncIterator
next() return value is	                    any value                       	Promise
to loop, use	                          for..of	                              for await..of

*/

/*
The spread syntax ... doesn’t work asynchronously
Features that require regular, synchronous iterators, don’t work with asynchronous ones.

For instance, a spread syntax won’t work:

alert( [...range] ); // Error, no Symbol.iterator
That’s natural, as it expects to find Symbol.iterator, not Symbol.asyncIterator.

It’s also the case for for..of: the syntax without await needs Symbol.iterator.


*/


/*
Recall generators

Now let’s recall generators, as they allow to make iteration code much shorter. Most of 
the time, when we’d like to make an iterable, we’ll use generators.

For sheer simplicity, omitting some important stuff, they are “functions that generate 
(yield) values”. They are explained in detail in the chapter Generators.

Generators are labelled with function* (note the star) and use yield to generate a value, 
then we can use for..of to loop over them.

This example generates a sequence of values from start to end:

 function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

for(let value of generateSequence(1, 5)) {
  alert(value); // 1, then 2, then 3, then 4, then 5
}
As we already know, to make an object iterable, we should add Symbol.iterator to it.

let range = {
  from: 1,
  to: 5,
  [Symbol.iterator]() {
    return <object with next to make range iterable>
  }
}
A common practice for Symbol.iterator is to return a generator, it makes the code 
shorter, as you can see:

 let range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() { // a shorthand for [Symbol.iterator]: function*()
    for(let value = this.from; value <= this.to; value++) {
      yield value;
    }
  }
};

for(let value of range) {
  alert(value); // 1, then 2, then 3, then 4, then 5
}
Please see the chapter Generators if you’d like more details.

In regular generators we can’t use await. All values must come synchronously, as
 required by the for..of construct.

What if we’d like to generate values asynchronously? From network requests, for instance.

Let’s switch to asynchronous generators to make it possible.


*/

/*
Async generators (finally)

For most practical applications, when we’d like to make an object that asynchronously 
generates a sequence of values, we can use an asynchronous generator.

The syntax is simple: prepend function* with async. That makes the generator asynchronous.

And then use for await (...) to iterate over it, like this:

 async function* generateSequence(start, end) {

  for (let i = start; i <= end; i++) {

    // Wow, can use await!
    await new Promise(resolve => setTimeout(resolve, 1000));

    yield i;
  }

}

(async () => {

  let generator = generateSequence(1, 5);
  for await (let value of generator) {
    alert(value); // 1, then 2, then 3, then 4, then 5 (with delay between)
  }

})();
As the generator is asynchronous, we can use await inside it, rely on promises, perform 
network requests and so on.
*/

/*
Under-the-hood difference
Technically, if you’re an advanced reader who remembers the details about 
generators, there’s an internal difference.

For async generators, the generator.next() method is asynchronous, it returns promises.

In a regular generator we’d use result = generator.next() to get values. In an 
async generator, we should add await, like this:

result = await generator.next(); // result = {value: ..., done: true/false}
That’s why async generators work with for await...of.
*/

/*
Async iterable range

Regular generators can be used as Symbol.iterator to make the iteration code shorter.

Similar to that, async generators can be used as Symbol.asyncIterator to implement 
the asynchronous iteration.

For instance, we can make the range object generate values asynchronously, once per 
second, by replacing synchronous Symbol.iterator with asynchronous Symbol.asyncIterator:

 let range = {
  from: 1,
  to: 5,

  // this line is same as [Symbol.asyncIterator]: async function*() {
  async *[Symbol.asyncIterator]() {
    for(let value = this.from; value <= this.to; value++) {

      // make a pause between values, wait for something
      await new Promise(resolve => setTimeout(resolve, 1000));

      yield value;
    }
  }
};

(async () => {

  for await (let value of range) {
    alert(value); // 1, then 2, then 3, then 4, then 5
  }

})();
Now values come with a delay of 1 second between them.


*/

/*
Technically, we can add both Symbol.iterator and Symbol.asyncIterator to the object, 
so it’s both synchronously (for..of) and asynchronously (for await..of) iterable.

In practice though, that would be a weird thing to do.
*/

/*
Real-life example: paginated data

So far we’ve seen basic examples, to gain understanding. Now let’s review a real-life use case.

There are many online services that deliver paginated data. For instance, when we need 
a list of users, a request returns a pre-defined count (e.g. 100 users) – “one page”, 
and provides a URL to the next page.

This pattern is very common. It’s not about users, but just about anything.

For instance, GitHub allows us to retrieve commits in the same, paginated fashion:

We should make a request to fetch in the form https://api.github.com/repos/<repo>/commits.
It responds with a JSON of 30 commits, and also provides a link to the next page in the Link header.
Then we can use that link for the next request, to get more commits, and so on.
For our code, we’d like to have a simpler way to get commits.

Let’s make a function fetchCommits(repo) that gets commits for us, making requests 
whenever needed. And let it care about all pagination stuff. For us it’ll be a simple 
async iteration for await..of.

So the usage will be like this:

for await (let commit of fetchCommits("username/repository")) {
  // process commit
}
Here’s such function, implemented as async generator:

async function* fetchCommits(repo) {
  let url = `https://api.github.com/repos/${repo}/commits`;

  while (url) {
    const response = await fetch(url, { // (1)
      headers: {'User-Agent': 'Our script'}, // github needs any user-agent header
    });

    const body = await response.json(); // (2) response is JSON (array of commits)

    // (3) the URL of the next page is in the headers, extract it
    let nextPage = response.headers.get('Link').match(/<(.*?)>; rel="next"/);
    nextPage = nextPage?.[1];

    url = nextPage;

    for(let commit of body) { // (4) yield commits one by one, until the page ends
      yield commit;
    }
  }
}
More explanations about how it works:

We use the browser fetch method to download the commits.

The initial URL is https://api.github.com/repos/<repo>/commits, and the next page will be 
in the Link header of the response.
The fetch method allows us to supply authorization and other headers if needed – here GitHub 
requires User-Agent.
The commits are returned in JSON format.

We should get the next page URL from the Link header of the response. It has a special format,
 so we use a regular expression for that (we will learn this feature in Regular expressions).

The next page URL may look like https://api.github.com/repositories/93253246/commits?page=2.
 It’s generated by GitHub itself.
Then we yield the received commits one by one, and when they finish, the next while(url) 
iteration will trigger, making one more request.


*/

/*
An example of use (shows commit authors in console):

 (async () => {

  let count = 0;

  for await (const commit of fetchCommits('javascript-tutorial/en.javascript.info')) {

    console.log(commit.author.login);

    if (++count == 100) { // let's stop at 100 commits
      break;
    }
  }

})();

// Note: If you are running this in an external sandbox, you'll need to paste
//  here the function fetchCommits described above
*/

/*
That’s just what we wanted.

The internal mechanics of paginated requests is invisible from the outside. 
For us it’s just an async generator that returns commits.
*/

/*
Regular iterators and generators work fine with the data that doesn’t take time to generate.

When we expect the data to come asynchronously, with delays, their async counterparts can 
be used, and for await..of instead of for..of.


*/

/*
Syntax differences between async and regular iterators:
                                  Iterable                          	Async Iterable
Method to provide iterator	      Symbol.iterator	                    Symbol.asyncIterator
next() return value is	          {value:…, done: true/false}	        Promise that resolves to {value:…, done: true/false}

Syntax differences between async and regular generators:
                                    Generators	                       Async generators
Declaration	                        function*	                         async function*
next() return value is	              {value:…, done: true/false}	      Promise that resolves to {value:…, done: true/false}

In web-development we often meet streams of data, when it flows chunk-by-chunk. For instance, 
downloading or uploading a big file.
We can use async generators to process such data. It’s also noteworthy that in some 
environments, like in browsers, there’s also another API called Streams, that provides 
special interfaces to work with such streams, to transform the data and to pass it from 
one stream to another (e.g. download from one place and immediately send elsewhere).
*/

