//modules

//As our application grows bigger, we want to split it into multiple files, so called 
// “modules”. A module may contain a class or a library of functions for a specific purpose.


/*
A module is just a file. One script is one module. As simple as that.

Modules can load each other and use special directives export and import to 
interchange functionality, call functions of one module from another one:

export keyword labels variables and functions that should be accessible from 
outside the current module.
import allows the import of functionality from other modules.
For instance, if we have a file sayHi.js exporting a function:

// 📁 sayHi.js
export function sayHi(user) {
  alert(`Hello, ${user}!`);
}
…Then another file may import and use it:

// 📁 main.js
import {sayHi} from './sayHi.js';

alert(sayHi); // function...
sayHi('John'); // Hello, John!
The import directive loads the module by path ./sayHi.js relative to the current 
file, and assigns exported function sayHi to the corresponding variable.


*/

/*
Let’s run the example in-browser.

As modules support special keywords and features, we must tell the browser 
that a script should be treated as a module, by using the attribute <script type="module">.
index.html
<!doctype html>
<script type="module">
  import {sayHi} from './say.js';

  document.body.innerHTML = sayHi('John');
</script>

say.js
export function sayHi(user) {
  return `Hello, ${user}!`;
}

result
Hello, John!

The browser automatically fetches and evaluates the imported module 
(and its imports if needed), and then runs the script.

*/


/*
Core module features
What’s different in modules, compared to “regular” scripts?

There are core features, valid both for browser and server-side JavaScript.

Always “use strict”

Modules always work in strict mode. E.g. assigning to an undeclared 
variable will give an error.

 <script type="module">
  a = 5; // error
</script>
*/

/*
Module-level scope

Each module has its own top-level scope. In other words, top-level variables and functions 
from a module are not seen in other scripts.

In the example below, two scripts are imported, and hello.js tries to use user variable 
declared in user.js. It fails, because it’s a separate module (you’ll see the error in the console):

index.html
<!doctype html>
<script type="module" src="user.js"></script>
<script type="module" src="hello.js"></script>

user.js
let user = "John";


hello.js
alert(user); // no such variable (each module has independent variables)

result
Uncaught ReferenceError: user is not defined

*/


/*
Modules should export what they want to be accessible from outside and import what they need.

user.js should export the user variable.
hello.js should import it from user.js module.
In other words, with modules we use import/export instead of relying on global variables.

This is the correct variant:

index.html
<!doctype html>
<script type="module" src="hello.js"></script>

user.js
export let user = "John";

hello.js
import {user} from './user.js';

document.body.innerHTML = user; // John

result
John
*/

/*
In the browser, if we talk about HTML pages, independent top-level scope also 
exists for each <script type="module">.

Here are two scripts on the same page, both type="module". They don’t see each 
other’s top-level variables:

 <script type="module">
  // The variable is only visible in this module script
  let user = "John";
</script>

<script type="module">
  alert(user); // Error: user is not defined
</script>

Please note:
In the browser, we can make a variable window-level global by explicitly assigning
 it to a window property, e.g. window.user = "John".

Then all scripts will see it, both with type="module" and without it.

That said, making such global variables is frowned upon. Please try to avoid them.
*/

/*
A module code is evaluated only the first time when imported

If the same module is imported into multiple other modules, its code is executed 
only once, upon the first import. Then its exports are given to all further importers.

The one-time evaluation has important consequences, that we should be aware of.

Let’s see a couple of examples.

First, if executing a module code brings side-effects, like showing a message, then 
importing it multiple times will trigger it only once – the first time:

Bir modül kodu yalnızca içe aktarıldığında ilk kez değerlendirilir.

Aynı modül birden fazla modüle içe aktarılırsa, kodu yalnızca ilk içe aktarmada 
bir kez çalıştırılır. Ardından dışa aktarımları diğer tüm içe aktarıcılara verilir.

Tek seferlik değerlendirmenin farkında olmamız gereken önemli sonuçları vardır.

Birkaç örneğe bakalım.

İlk olarak, bir modül kodunun çalıştırılması bir mesaj göstermek gibi yan etkilere 
yol açıyorsa, birden çok kez içe aktarmak yalnızca bir kez, yani ilk kez tetiklenir:

// 📁 alert.js
alert("Module is evaluated!");
// Import the same module from different files

// 📁 1.js
import `./alert.js`; // Module is evaluated!

// 📁 2.js
import `./alert.js`; // (shows nothing)


The second import shows nothing, because the module has already been evaluated.

There’s a rule: top-level module code should be used for initialization, creation of 
module-specific internal data structures. If we need to make something callable multiple
 times – we should export it as a function, like we did with sayHi above.


İkinci içe aktarma hiçbir şey göstermiyor çünkü modül zaten değerlendirilmiş.

Bir kural var: Üst düzey modül kodu, başlatma ve modüle özgü dahili veri yapılarının 
oluşturulması için kullanılmalıdır. Bir şeyi birden çok kez çağrılabilir hale getirmemiz
 gerekiyorsa, yukarıda sayHi'da yaptığımız gibi, onu bir fonksiyon olarak dışa aktarmalıyız.
*/


/*
Now, let’s consider a deeper example.

Let’s say, a module exports an object:

// 📁 admin.js
export let admin = {
  name: "John"
};
If this module is imported from multiple files, the module is only evaluated the first time,
 admin object is created, and then passed to all further importers.
Bu modül birden fazla dosyadan içe aktarılırsa, modül yalnızca ilk seferde değerlendirilir,
 yönetici nesnesi oluşturulur ve ardından diğer tüm içe aktarıcılara geçirilir.
All importers get exactly the one and only admin object:

// 📁 1.js
import {admin} from './admin.js';
admin.name = "Pete";

// 📁 2.js
import {admin} from './admin.js';
alert(admin.name); // Pete

// Both 1.js and 2.js reference the same admin object
// Changes made in 1.js are visible in 2.js
As you can see, when 1.js changes the name property in the imported admin, then 2.js can 
see the new admin.name.

That’s exactly because the module is executed only once. Exports are generated, and then 
they are shared between importers, so if something changes the admin object, other 
importers will see that.
Gördüğünüz gibi, 1.js içe aktarılan admin'deki name özelliğini değiştirdiğinde, 2.js yeni
 admin.name'i görebilir.

Bunun nedeni, modülün yalnızca bir kez çalıştırılmasıdır. Dışa aktarımlar oluşturulur ve 
ardından içe aktarıcılar arasında paylaşılır, böylece admin nesnesinde bir değişiklik olursa, 
diğer içe aktarıcılar bunu görür.

*/

/*
Such behavior is actually very convenient, because it allows us to configure modules.

In other words, a module can provide a generic functionality that needs a setup. 
E.g. authentication needs credentials. Then it can export a configuration object 
expecting the outer code to assign to it.

Here’s the classical pattern:

A module exports some means of configuration, e.g. a configuration object.
On the first import we initialize it, write to its properties. The top-level 
application script may do that.
Further imports use the module.

Bu tür bir davranış aslında oldukça kullanışlıdır, çünkü modülleri yapılandırmamıza 
olanak tanır.

Başka bir deyişle, bir modül kurulum gerektiren genel bir işlevsellik sağlayabilir. 
Örneğin, kimlik doğrulama kimlik bilgileri gerektirir. Ardından, dış kodun kendisine 
atama yapmasını bekleyerek bir yapılandırma nesnesi dışa aktarabilir.

Klasik model şöyledir:

Bir modül, bir yapılandırma nesnesi gibi bir yapılandırma aracını dışa aktarır.
İlk içe aktarmada modülü başlatır, özelliklerine yazarız. Üst düzey uygulama betiği 
bunu yapabilir.
Daha sonraki içe aktarmalar modülü kullanır.
*/

/*
For instance, the admin.js module may provide certain functionality (e.g. authentication), 
but expect the credentials to come into the config object from outside:

// 📁 admin.js
export let config = { };

export function sayHi() {
  alert(`Ready to serve, ${config.user}!`);
}
Here, admin.js exports the config object (initially empty, but may have default properties too).

Then in init.js, the first script of our app, we import config from it and set config.user:

// 📁 init.js
import {config} from './admin.js';
config.user = "Pete";
…Now the module admin.js is configured.

Further importers can call it, and it correctly shows the current user:

// 📁 another.js
import {sayHi} from './admin.js';

sayHi(); // Ready to serve, Pete!

*/

/*
import.meta

The object import.meta contains the information about the current module.

Its content depends on the environment. In the browser, it contains the URL of 
the script, or a current webpage URL if inside HTML:

 <script type="module">
  alert(import.meta.url); // script URL
  // for an inline script - the URL of the current HTML-page
</script>
In a module, “this” is undefined

That’s kind of a minor feature, but for completeness we should mention it.

In a module, top-level this is undefined.

Compare it to non-module scripts, where this is a global object:

 <script>
  alert(this); // window
</script>

<script type="module">
  alert(this); // undefined
</script>
*/

/*
Browser-specific features
There are also several browser-specific differences of scripts with type="module" 
compared to regular ones.

Module scripts are deferred

Module scripts are always deferred, same effect as defer attribute (described in the 
chapter Scripts: async, defer), for both external and inline scripts.

In other words:

downloading external module scripts <script type="module" src="..."> doesn’t block HTML 
processing, they load in parallel with other resources.
module scripts wait until the HTML document is fully ready (even if they are tiny and 
load faster than HTML), and then run.
relative order of scripts is maintained: scripts that go first in the document, execute 
first.
As a side effect, module scripts always “see” the fully loaded HTML-page, including HTML 
elements below them.

For instance:

 <script type="module">
  alert(typeof button); // object: the script can 'see' the button below
  // as modules are deferred, the script runs after the whole page is loaded
</script>

Compare to regular script below:

<script>
  alert(typeof button); // button is undefined, the script can't see elements below
  // regular scripts run immediately, before the rest of the page is processed
</script>

<button id="button">Button</button>

Please note: the second script actually runs before the first! So we’ll see undefined
 first, and then object.

That’s because modules are deferred, so we wait for the document to be processed. The 
regular script runs immediately, so we see its output first.

When using modules, we should be aware that the HTML page shows up as it loads, and 
JavaScript modules run after that, so the user may see the page before the JavaScript 
application is ready. Some functionality may not work yet. We should put 
“loading indicators”, or otherwise ensure that the visitor won’t be confused by that.

Lütfen dikkat: İkinci betik aslında ilkinden önce çalışır! Yani önce undefined'ı, sonra da object'i göreceğiz.

Bunun nedeni, modüllerin ertelenmiş olması ve belgenin işlenmesini beklememizdir. Normal betik 
hemen çalıştığı için çıktısını önce görürüz.

Modülleri kullanırken, HTML sayfasının yüklenirken, JavaScript modüllerinin ise bundan sonra 
çalıştığını unutmamalıyız; bu nedenle kullanıcı, JavaScript uygulaması hazır olmadan önce sayfayı 
görebilir. Bazı işlevler henüz çalışmıyor olabilir. "Yükleme göstergeleri" eklemeli veya 
ziyaretçinin kafasının karışmamasını sağlamalıyız.
*/

/*
1. <script async type="module"> Inline Script Ne Yapar?
Normalde: Inline scriptler (yani <script>...</script>) HTML akışında hemen çalışır.
type="module": Modül scriptleri, HTML tamamen yüklendikten sonra (deferred gibi) çalışır.
async ile: <script async type="module"> yazarsanız, bu script ve içindeki import edilen 
modüller (ör: analytics.js) yüklendiği anda çalışır. Yani:
HTML’in tamamlanmasını beklemez.
Diğer scriptlerin bitmesini beklemez.
Import edilen dosyalar (ör: analytics.js) yüklendiği anda, script çalışır.

2. Neden Kullanılır?
Bağımsız işlevler için idealdir: Sayfa içeriğine veya başka bir script’e bağlı olmayan, örneğin:
Sayaçlar (counter)
Reklamlar
Analytics (istatistik toplama)
Global event listener’lar
Böylece, bu kodlar sayfa yüklenmesini veya diğer scriptleri beklemeden, mümkün olan en erken anda çalışır.

3. Async ve import Nasıl Çalışıyor?
async ile script, HTML’in veya diğer scriptlerin bitmesini beklemez.
Ama script’in içindeki import edilen dosyalar (ör: analytics.js) yüklenmeden script çalışmaz.
Yani:
Önce analytics.js dosyası yüklenir (import edilir).
analytics.js yüklendiği anda, script’iniz (ve içindeki kod) çalışır.
Bekleme: Script, sadece kendi import ettiği dosyaların yüklenmesini bekler. Ama HTML’in
 tamamlanmasını veya diğer scriptlerin bitmesini beklemez.

*/

/*
Async works on inline scripts

For non-module scripts, the async attribute only works on external scripts. Async scripts run 
immediately when ready, independently of other scripts or the HTML document.

For module scripts, it works on inline scripts as well.

For example, the inline script below has async, so it doesn’t wait for anything.

It performs the import (fetches ./analytics.js) and runs when ready, even if the HTML document
 is not finished yet, or if other scripts are still pending.

That’s good for functionality that doesn’t depend on anything, like counters, ads, 
document-level event listeners.

<!-- all dependencies are fetched (analytics.js), and the script runs -->
<!-- doesn't wait for the document or other <script> tags -->
<script async type="module">
  import {counter} from './analytics.js';

  counter.count();
</script>
*/

/*
External scripts

External scripts that have type="module" are different in two aspects:

External scripts with the same src run only once:

<!-- the script my.js is fetched and executed only once -->
<script type="module" src="my.js"></script>
<script type="module" src="my.js"></script>
External scripts that are fetched from another origin (e.g. another site) require CORS headers, 
as described in the chapter Fetch: Cross-Origin Requests. In other words, if a module script is 
fetched from another origin, the remote server must supply a header Access-Control-Allow-Origin 
allowing the fetch.

<!-- another-site.com must supply Access-Control-Allow-Origin -->
<!-- otherwise, the script won't execute -->
<script type="module" src="http://another-site.com/their.js"></script>
That ensures better security by default.


*/

/*
Eğer bir <script type="module" src="..."> ile başka bir siteden (farklı origin) modül
yüklemeye çalışırsan,
Tarayıcı, o sunucudan gelen cevabın HTTP başlıklarında Access-Control-Allow-Origin 
olup olmadığını kontrol eder.
Eğer bu başlık yoksa veya uygun değilse, tarayıcı güvenlik nedeniyle modülü yüklemez 
ve çalıştırmaz.
Kısacası, CORS (Cross-Origin Resource Sharing) kontrolü tamamen tarayıcı tarafından 
otomatik olarak yapılır. Senin ekstra bir şey yapmana gerek yoktur; tarayıcı güvenliği sağlar.
*/

/*
No “bare” modules allowed

In the browser, import must get either a relative or absolute URL. Modules without any 
path are called “bare” modules. Such modules are not allowed in import.

For instance, this import is invalid:

import {sayHi} from 'sayHi'; // Error, "bare" module
// the module must have a path, e.g. './sayHi.js' or wherever the module is
Certain environments, like Node.js or bundle tools allow bare modules, without any path, 
as they have their own ways for finding modules and hooks to fine-tune them. But browsers 
do not support bare modules yet.


*/

/*
Compatibility, “nomodule”

Old browsers do not understand type="module". Scripts of an unknown type are just ignored. 
For them, it’s possible to provide a fallback using the nomodule attribute:

 <script type="module">
  alert("Runs in modern browsers");
</script>

<script nomodule>
  alert("Modern browsers know both type=module and nomodule, so skip this")
  alert("Old browsers ignore script with unknown type=module, but execute this.");
</script>
*/

/*
Build tools
In real-life, browser modules are rarely used in their “raw” form. Usually, we bundle them
 together with a special tool such as Webpack and deploy to the production server.

One of the benefits of using bundlers – they give more control over how modules are resolved, 
allowing bare modules and much more, like CSS/HTML modules.

Build tools do the following:

Take a “main” module, the one intended to be put in <script type="module"> in HTML.
Analyze its dependencies: imports and then imports of imports etc.
Build a single file with all modules (or multiple files, that’s tunable), replacing native 
import calls with bundler functions, so that it works. “Special” module types like HTML/CSS 
modules are also supported.
In the process, other transformations and optimizations may be applied:
Unreachable code removed.
Unused exports removed (“tree-shaking”).
Development-specific statements like console and debugger removed.
Modern, bleeding-edge JavaScript syntax may be transformed to older one with similar 
functionality using Babel.
The resulting file is minified (spaces removed, variables replaced with shorter names, etc).
If we use bundle tools, then as scripts are bundled together into a single file (or few files),
 import/export statements inside those scripts are replaced by special bundler functions. So
  the resulting “bundled” script does not contain any import/export, it doesn’t require 
  type="module", and we can put it into a regular script:

<!-- Assuming we got bundle.js from a tool like Webpack -->
<script src="bundle.js"></script>
That said, native modules are also usable. So we won’t be using Webpack here: you can
 configure it later.


*/

/*
Gerçek projelerde modüller genellikle Webpack gibi araçlarla birleştirilip küçültülür, doğrudan
 tarayıcıya modül olarak verilmez. Bu araçlar, modülleri analiz eder, gerekirse tek dosyada
  toplar, gereksiz kodları çıkarır ve eski tarayıcılar için dönüştürür. Sonuçta, import/export 
  olmadan, normal script etiketiyle çalışan, optimize edilmiş bir dosya elde edilir.


*/

/*
Webpack (ve benzeri bundler araçları) ile çalışırken, "bare" module import (ör: import {sayHi}
 from 'sayHi';) kullanabilirsiniz. Çünkü Webpack, bu "bare" import'u çözmek için node_modules 
 klasörünü ve kendi yapılandırmasını kullanır. Yani, Webpack derleme sırasında bu import'u bulur, 
 gerekli dosyaları birleştirir ve tarayıcıya uygun tek bir dosya (bundle) üretir. Bu nedenle, 
 Webpack ile "bare" import kullanmak mümkündür ve yaygındır.

Ancak, tarayıcıda doğrudan ES Modules kullanırken (bundler olmadan), import ifadesinde mutlaka 
bir yol (ör: './sayHi.js') vermeniz gerekir. Tarayıcılar "bare" import'u çözemez, hata verir.

Özet:

Webpack/bundler: "bare" import (import {x} from 'modul') mümkündür, çünkü çözümleme derleme
 sırasında yapılır.
Tarayıcıda native module: Mutlaka yol vermelisiniz (import {x} from './modul.js'), "bare" 
import hata verir.

*/

/*
1. Klasik Script Yöntemi (<script src="...">)
Tüm kodlar global scope’ta çalışır, değişkenler ve fonksiyonlar çakışabilir.
Kodun sırası önemlidir; bir dosya diğerine bağımlıysa önce yüklenmeli.
Büyük projelerde yönetimi zordur.
Modülerlik yoktur, her şey tek bir global ortamda çalışır.
2. ES Modules (<script type="module" ..."> ve import/export)
Her dosya kendi scope’una sahiptir, global değişken kirliliği olmaz.
import/export ile bağımlılıklar açıkça tanımlanır.
Kodun okunabilirliği ve bakımı kolaylaşır.
Tek seferlik yükleme, paylaşılan nesneler, otomatik sıralama gibi avantajlar sağlar.
Modern tarayıcılar ve araçlar (bundler’lar) ile uyumludur.
CORS ve güvenlik avantajları vardır.

*/

/*
To summarize, the core concepts are:

A module is a file. To make import/export work, browsers need <script
 type="module">. Modules have several differences:
Deferred by default.
Async works on inline scripts.
To load external scripts from another origin (domain/protocol/port), CORS 
headers are needed.
Duplicate external scripts are ignored.
Modules have their own, local top-level scope and interchange functionality 
via import/export.
Modules always use strict.
Module code is executed only once. Exports are created once and shared 
between importers.
When we use modules, each module implements the functionality and exports it.
 Then we use import to directly import it where it’s needed. The browser loads 
 and evaluates the scripts automatically.

In production, people often use bundlers such as Webpack to bundle modules 
together for performance and other reasons.
*/

//Export and Import

/*
Export before declarations
We can label any declaration as exported by placing export before it, be it 
a variable, function or a class.

For instance, here all exports are valid:

// export an array
export let months = ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// export a constant
export const MODULES_BECAME_STANDARD_YEAR = 2015;

// export a class
export class User {
  constructor(name) {
    this.name = name;
  }
}
*/

/*
No semicolons after export class/function
Please note that export before a class or a function does not make it a function expression. 
It’s still a function declaration, albeit exported.

Most JavaScript style guides don’t recommend semicolons after function and class declarations.

That’s why there’s no need for a semicolon at the end of export class and export function:

export function sayHi(user) {
  alert(`Hello, ${user}!`);
}  // no ; at the end
*/

/*
Export apart from declarations
Also, we can put export separately.

Here we first declare, and then export:

// 📁 say.js
function sayHi(user) {
  alert(`Hello, ${user}!`);
}

function sayBye(user) {
  alert(`Bye, ${user}!`);
}

export {sayHi, sayBye}; // a list of exported variables
…Or, technically we could put export above functions as well.


*/

/*
Import *
Usually, we put a list of what to import in curly braces import {...}, like this:

// 📁 main.js
import {sayHi, sayBye} from './say.js';

sayHi('John'); // Hello, John!
sayBye('John'); // Bye, John!
But if there’s a lot to import, we can import everything as an object
 using import * as <obj>, for instance:

// 📁 main.js
import * as say from './say.js';

say.sayHi('John');
say.sayBye('John');
At first sight, “import everything” seems such a cool thing, short to write, why
 should we ever explicitly list what we need to import?

Well, there are few reasons.

Explicitly listing what to import gives shorter names: sayHi() instead of say.sayHi().
Explicit list of imports gives better overview of the code structure: what is used and 
where. It makes code support and refactoring easier.

*/

/*
Don’t be afraid to import too much
Modern build tools, such as webpack and others, bundle modules together and optimize them
 to speedup loading. They also remove unused imports.

For instance, if you import * as library from a huge code library, and then use only few
 methods, then unused ones will not be included into the optimized bundle.
*/

/*
Import “as”
We can also use as to import under different names.

For instance, let’s import sayHi into the local variable hi for brevity, and import sayBye as bye:

// 📁 main.js
import {sayHi as hi, sayBye as bye} from './say.js';

hi('John'); // Hello, John!
bye('John'); // Bye, John!

*/


/*
Export “as”
The similar syntax exists for export.

Let’s export functions as hi and bye:

// 📁 say.js
...
export {sayHi as hi, sayBye as bye};
Now hi and bye are official names for outsiders, to be used in imports:

// 📁 main.js
import * as say from './say.js';

say.hi('John'); // Hello, John!
say.bye('John'); // Bye, John!
*/

/*
Export default
In practice, there are mainly two kinds of modules.

Modules that contain a library, pack of functions, like say.js above.
Modules that declare a single entity, e.g. a module user.js exports only class User.
Mostly, the second approach is preferred, so that every “thing” resides in its own module.

Naturally, that requires a lot of files, as everything wants its own module, but 
that’s not a problem at all. Actually, code navigation becomes easier if files are
 well-named and structured into folders.

Modules provide a special export default (“the default export”) syntax to make 
the “one thing per module” way look better.

Put export default before the entity to export:

// 📁 user.js
export default class User { // just add "default"
  constructor(name) {
    this.name = name;
  }
}
There may be only one export default per file.

…And then import it without curly braces:

// 📁 main.js
import User from './user.js'; // not {User}, just User

new User('John');
Imports without curly braces look nicer. A common mistake when starting to use modules 
is to forget curly braces at all. So, remember, import needs curly braces for named
 exports and doesn’t need them for the default one.


*/


/*
Named export	                              Default export
export class User {...}	                        export default class User {...}
import {User} from ...	                        import User from ...

*/

/*
Technically, we may have both default and named exports in a single module, but in 
practice people usually don’t mix them. A module has either named exports or the default one.

As there may be at most one default export per file, the exported entity may have no name.

For instance, these are all perfectly valid default exports:

export default class { // no class name
  constructor() { ... }
}
export default function(user) { // no function name
  alert(`Hello, ${user}!`);
}
// export a single value, without making a variable
export default ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
Not giving a name is fine, because there is only one export default per file, so import 
without curly braces knows what to import.

Without default, such an export would give an error:

export class { // Error! (non-default export needs a name)
  constructor() {}
}
*/

/*
The “default” name

In some situations the default keyword is used to reference the default export.

For example, to export a function separately from its definition:

function sayHi(user) {
  alert(`Hello, ${user}!`);
}

// same as if we added "export default" before the function
export {sayHi as default};
Or, another situation, let’s say a module user.js exports one main “default” thing, 
and a few named ones (rarely the case, but it happens):

// 📁 user.js
export default class User {
  constructor(name) {
    this.name = name;
  }
}

export function sayHi(user) {
  alert(`Hello, ${user}!`);
}
Here’s how to import the default export along with a named one:

// 📁 main.js
import {default as User, sayHi} from './user.js';

new User('John');
And, finally, if importing everything * as an object, then the default property 
is exactly the default export:

// 📁 main.js
import * as user from './user.js';

let User = user.default; // the default export
new User('John');
*/

/*
A word against default exports

Named exports are explicit. They exactly name what they import, so we have that 
information from them; that’s a good thing.

Named exports force us to use exactly the right name to import:

import {User} from './user.js';
// import {MyUser} won't work, the name must be {User}
…While for a default export, we always choose the name when importing:

import User from './user.js'; // works
import MyUser from './user.js'; // works too
// could be import Anything... and it'll still work
So team members may use different names to import the same thing, and that’s not good.

Usually, to avoid that and keep the code consistent, there’s a rule that imported 
variables should correspond to file names, e.g:

import User from './user.js';
import LoginForm from './loginForm.js';
import func from '/path/to/func.js';
...
Still, some teams consider it a serious drawback of default exports. So they prefer 
to always use named exports. Even if only a single thing is exported, it’s still 
exported under a name, without default.


*/

/*
Re-export
“Re-export” syntax export ... from ... allows to import things and immediately 
export them (possibly under another name), like this:

export {sayHi} from './say.js'; // re-export sayHi

export {default as User} from './user.js'; // re-export default
Why would that be needed? Let’s see a practical use case.

Imagine, we’re writing a “package”: a folder with a lot of modules, with some of
 the functionality exported outside (tools like NPM allow us to publish and distribute
  such packages, but we don’t have to use them), and many modules are just “helpers”, 
  for internal use in other package modules.

The file structure could be like this:

auth/
    index.js
    user.js
    helpers.js
    tests/
        login.js
    providers/
        github.js
        facebook.js
        ...
We’d like to expose the package functionality via a single entry point.

In other words, a person who would like to use our package, should import 
only from the “main file” auth/index.js.

Like this:

import {login, logout} from 'auth/index.js'
The “main file”, auth/index.js exports all the functionality that we’d like to 
provide in our package.

The idea is that outsiders, other programmers who use our package, should not 
meddle with its internal structure, search for files inside our package folder. 
We export only what’s necessary in auth/index.js and keep the rest hidden from prying eyes.

As the actual exported functionality is scattered among the package, we can 
import it into auth/index.js and export from it:

// 📁 auth/index.js

// import login/logout and immediately export them
import {login, logout} from './helpers.js';
export {login, logout};

// import default as User and export it
import User from './user.js';
export {User};
...
Now users of our package can import {login} from "auth/index.js".

The syntax export ... from ... is just a shorter notation for such import-export:

// 📁 auth/index.js
// re-export login/logout
export {login, logout} from './helpers.js';

// re-export the default export as User
export {default as User} from './user.js';
...
The notable difference of export ... from compared to import/export is that
 re-exported modules aren’t available in the current file. So inside the above 
 example of auth/index.js we can’t use re-exported login/logout functions.


*/

/*
import ... export ...: Hem içerde kullanılır, hem dışarıya aktarılır.
export ... from ...: Sadece dışarıya aktarılır, içerde kullanılamaz.
Bu, paketlerin tek bir giriş noktası (index.js) üzerinden dışarıya sadece
 gerekli fonksiyonları/nesneleri açmak için kullanılır.

*/

/*
Re-exporting the default export

The default export needs separate handling when re-exporting.

Let’s say we have user.js with the export default class User and would like to 
re-export it:

// 📁 user.js
export default class User {
  // ...
}
We can come across two problems with it:

export User from './user.js' won’t work. That would lead to a syntax error.

To re-export the default export, we have to write export {default as User}, as in 
the example above.

export * from './user.js' re-exports only named exports, but ignores the default one.

If we’d like to re-export both named and default exports, then two statements are needed:

export * from './user.js'; // to re-export named exports
export {default} from './user.js'; // to re-export the default export
Such oddities of re-exporting a default export are one of the reasons why some 
developers don’t like default exports and prefer named ones.


*/

/*
We can put import/export statements at the top or at the bottom of a script, that doesn’t matter.

So, technically this code is fine:

sayHi();

// ...

import {sayHi} from './say.js'; // import at the end of the file
In practice imports are usually at the start of the file, but that’s only for more convenience.


*/

//Dynamic imports

/*
First, we can’t dynamically generate any parameters of import.

The module path must be a primitive string, can’t be a function call. This won’t work:

import ... from getModuleName(); // Error, only from "string" is allowed
Second, we can’t import conditionally or at run-time:

if(...) {
  import ...; // Error, not allowed!
}

{
  import ...; // Error, we can't put import in any block
}
That’s because import/export aim to provide a backbone for the code structure.
 That’s a good thing, as code structure can be analyzed, modules can be gathered 
 and bundled into one file by special tools, unused exports can be removed (“tree-shaken”).
  That’s possible only because the structure of imports/exports is simple and fixed.

But how can we import a module dynamically, on-demand?


*/

/*
The import() expression
The import(module) expression loads the module and returns a promise that resolves 
into a module object that contains all its exports. It can be called from any place in the code.

We can use it dynamically in any place of the code, for instance:

let modulePath = prompt("Which module to load?");

import(modulePath)
  .then(obj => <module object>)
  .catch(err => <loading error, e.g. if no such module>)

*/

/*
Or, we could use let module = await import(modulePath) if inside an async function.

For instance, if we have the following module say.js:

// 📁 say.js
export function hi() {
  alert(`Hello`);
}

export function bye() {
  alert(`Bye`);
}
  …Then dynamic import can be like this:

let {hi, bye} = await import('./say.js');

hi();
bye();

*/

/*
Or, if say.js has the default export:

// 📁 say.js
export default function() {
  alert("Module loaded (export default)!");
}
…Then, in order to access it, we can use default property of the module object:

let obj = await import('./say.js');
let say = obj.default;
// or, in one line: let {default: say} = await import('./say.js');

say();
*/


/*
index.html
<!doctype html>
<script>
  async function load() {
    let say = await import('./say.js');
    say.hi(); // Hello!
    say.bye(); // Bye!
    say.default(); // Module loaded (export default)!
  }
</script>
<button onclick="load()">Click me</button>


say.jsindex.html
export function hi() {
  alert(`Hello`);
}

export function bye() {
  alert(`Bye`);
}
export default function() {
  alert("Module loaded (export default)!");
}



*/

/*
Please note:
Dynamic imports work in regular scripts, they don’t require script type="module".

Please note:
Although import() looks like a function call, it’s a special syntax that just happens 
to use parentheses (similar to super()).

So we can’t copy import to a variable or use call/apply with it. It’s not a function.
içe aktarma() bir fonksiyon çağrısı gibi görünse de, parantez kullanan özel bir 
sözdizimidir (super()'e benzer).

Bu nedenle, içe aktarmayı bir değişkene kopyalayamayız veya onunla birlikte 
call/apply kullanamayız. Bu bir fonksiyon değildir.
*/

