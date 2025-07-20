
//ninja style code style

/* // altta ki kod gibi kisa yazmaya calis 
i = i ? i < 0 ? Math.max(0, len + i) : i : 0;

list → lst.
userAgent → ua.
browser → brsr.
Only the one with truly good intuition will be able to understand such names. 
Try to shorten everything. Only a worthy person should be able to uphold the development 
of your code.

Only a truly attentive programmer should be able to understand your code.

The purpose is to develop the intuition and memory of a person reading the code.
 A person with weak intuition would have to analyze the code line-by-line and track 
the changes through every code branch.
Ayrıca nereden geldiğini de. Amaç, kodu okuyan bir kişinin sezgisini ve hafızasını
 geliştirmektir. Zayıf sezgiye sahip bir kişi, kodu satır satır analiz etmeli ve her
 kod dalındaki değişiklikleri izlemelidir.

Don’t limit the function by what’s written in its name. Be broader.
For instance, a function validateEmail(email) could (besides checking the email for 
correctness) show an error message and ask to re-enter the email.
Additional actions should not be obvious from the function name. A true ninja coder will 
make them not obvious from the code as well.
Joining several actions into one protects your code from reuse.
Imagine, another developer wants only to check the email, and not output any message. Your 
function validateEmail(email) that does both will not suit them. So they won’t break your 
meditation by asking anything about it.
Normalde beklenen:
Bir fonksiyon, ismine uygun tek bir iş yapmalı. Örneğin: validateEmail() → sadece email’i doğrular.
Buradaki alaycı öneri:
Fonksiyon ismi sizi sınırlamasın! Daha fazla iş yaptırın! (Bu aslında kötü bir şey.)
Yani:
Fonksiyon sadece email geçerli mi diye bakmakla kalmasın...
Hatalıysa hata mesajı göstersin, kullanıcıya yeniden girmesini söylesin vs...
👉 Bu, tek sorumluluk prensibine (Single Responsibility Principle) aykırıdır.
Alay ediyor:
Kodun ne yaptığını ne isimden, ne koddan anlamasın kimse. Bir “ninja coder” böyle yapar (!)
😄 Gerçekte: Bu, kötü okunabilirlik, sürpriz yan etkiler ve bakımı zor kod anlamına gelir.
Bir fonksiyon birden fazla şey yapıyorsa, kimse onu başka yerde kullanamaz.
❗ Gerçek Hayattaki Sorun:
Başka bir geliştirici sadece email geçerli mi kontrol etmek istiyor. Ama senin validateEmail() 
fonksiyonun ayrıca alert veriyor, input odaklıyor, log atıyor... Bu kişi senin fonksiyonunu 
kullanamaz, mecburen yeniden yazar.
Yani: Kodu başkalarının yeniden kullanmasını engellemiş oluyorsun.
"Fonksiyonlarınız birden fazla iş yapmasın. Ne yaptığı ismiyle ve içeriğiyle açık olsun. Tek 
sorumluluğa odaklansın. Yeniden kullanılabilir olsun."
Ama bunu alaycı (ironik) bir şekilde ifade ediyor. Sanki “iyi bir şeymiş” gibi gösteriyor,
 ama aslında dalga geçiyor.
"Gerçek ninja kodcu" denerek, aslında "sakın böyle yapma" demek istiyor. 😄

Fonksiyonlar temiz, sade ve tek amaçlı olmalıdır.

Doğru:

function validateEmail(email) {
  return someCheck(email);
}

function showEmailError() {
  alert("Invalid email");
}
Yanlış (bu yazının alay ettiği):

function validateEmail(email) {
  if (!someCheck(email)) {
    alert("Invalid email");
    focusEmailInput();
    logError(email);
    return false;
  }
  return true;
}
 */



/* //transpilers

A transpiler would analyze our code and rewrite height ?? 100 into 
(height !== undefined && height !== null) ? height : 100.

// before running the transpiler
height = height ?? 100;
//Eğer userInput null veya undefined değilse, onu kullan; değilse 100.
//❌ Sorun:
//Eski tarayıcılar (IE, eski Node.js) bu ?? operatörünü anlamaz.


// after running the transpiler , 📤 Çıktı (transpile edilmiş):

height = (height !== undefined && height !== null) ? height : 100;
//Now the rewritten code is suitable for older JavaScript engines.
//Aynı mantık, ama daha eski yazım şekliyle.


//Transpiler, bir programlama dilinden aynı seviyedeki başka bir dile çeviri yapan araçtır.
//JavaScript dünyasında en yaygın transpiler'lar:
//Babel
//TypeScript compiler (tsc)
//Yani: Modern JavaScript yazarsın → transpiler bunu eski tarayıcıların anlayacağı şekilde çevirir.
 */


//polyfiils
/* 
For example, Math.trunc(n) is a function that “cuts off” the decimal part of a number, 
e.g Math.trunc(1.23) returns 1.
In some (very outdated) JavaScript engines, there’s no Math.trunc, so such code will fail.
As we’re talking about new functions, not syntax changes, there’s no need to transpile anything
 here. We just need to declare the missing function.
A script that updates/adds new functions is called “polyfill”. It “fills in” the gap and adds 
missing implementations.
For this particular case, the polyfill for Math.trunc is a script that implements it, like this:
*/


/* if (!Math.trunc) { // if no such function
  // implement it
  Math.trunc = function(number) {
    // Math.ceil and Math.floor exist even in ancient JavaScript engines
    // they are covered later in the tutorial
    return number < 0 ? Math.ceil(number) : Math.floor(number);
  };
}



//Just don’t forget to use a transpiler (if using modern syntax or operators) and polyfills 
// (to add functions that may be missing). They’ll ensure that the code works.

Modern sözdizimi (syntax) veya operatörler kullanıyorsan, bir transpiler (örneğin Babel) kullanmayı unutma.
Ayrıca bazı fonksiyonlar eksik olabilir, bunları tamamlamak için polyfill eklemeyi unutma.
Bu ikisi sayesinde kodun her ortamda düzgün çalışır.
 */ 