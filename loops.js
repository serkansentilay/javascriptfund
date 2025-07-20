//loops while and for 

//While the condition is truthy, the code from the loop body is executed.

//For instance, the loop below outputs i while i < 3:
// let i = 0;
//while (i < 3) { // shows 0, then 1, then 2
//  alert( i );
//  i++;
//}

//A single execution of the loop body is called an iteration. The loop in the example above makes three iterations.
//If i++ was missing from the example above, the loop would repeat (in theory) forever. In practice, 
// the browser provides ways to stop such loops, and in server-side JavaScript, we can kill the process.
//Any expression or variable can be a loop condition, not just comparisons: the condition is evaluated and 
// converted to a boolean by while.
//For instance, a shorter way to write while (i != 0) is while (i):
//Döngü gövdesinin tek bir yürütülmesine yineleme denir. Yukarıdaki örnekteki döngü üç yineleme yapar.
//Yukarıdaki örnekte i ++ eksik olsaydı, döngü (teoride) sonsuza kadar tekrar ederdi. Uygulamada, tarayıcı bu
//  tür döngüleri durdurmanın yollarını sağlar ve sunucu tarafı JavaScript'te işlemi öldürebiliriz.
//Herhangi bir ifade veya değişken, yalnızca karşılaştırmalar değil, bir döngü koşulu olabilir: koşul, while 
// tarafından değerlendirilir ve bir boolean değerine dönüştürülür.
//Örneğin, yazmak için daha kısa bir yol (ben!= 0) ise (i):

//let i = 3;
//while (i) { // when i becomes 0, the condition becomes falsy, and the loop stops
//  alert( i );
//  i--;
//}

//If the loop body has a single statement, we can omit the curly braces {…}:
// let i = 3;
//while (i) alert(i--);

//The loop will first execute the body, then check the condition, and, while it’s truthy, execute it again and again.
// let i = 0;
//do {
//  alert( i );
//  i++;
//} while (i < 3);

//This form of syntax should only be used when you want the body of the loop to execute at least 
// once regardless of the condition being truthy. Usually, the other form is preferred: while(…) {…}.

//The loop below runs alert(i) for i from 0 up to (but not including) 3:
// for (let i = 0; i < 3; i++) { // shows 0, then 1, then 2
//  alert(i);
//}

//part		
//begin	        let i = 0	Executes once upon entering the loop.
//condition	    i < 3	    Checked before every loop iteration. If false, the loop stops.
//body	        alert(i)	Runs again and again while the condition is truthy.
//step	        i++	        Executes after the body on each iteration.

//That is, begin executes once, and then it iterates: after each condition test, body and step are executed.

//Inline variable declaration
//Here, the “counter” variable i is declared right in the loop. This is called an “inline” variable declaration. 
// Such variables are visible only inside the loop.

// for (let i = 0; i < 3; i++) {
//  alert(i); // 0, 1, 2
//}
//alert(i); // error, no such variable

//Instead of defining a variable, we could use an existing one:

// let i = 0;

//for (i = 0; i < 3; i++) { // use an existing variable
//  alert(i); // 0, 1, 2
//}

//alert(i); // 3, visible, because declared outside of the loop


//Any part of for can be skipped.
//For example, we can omit begin if we don’t need to do anything at the loop start.

// let i = 0; // we have i already declared and assigned
//for (; i < 3; i++) { // no need for "begin"
//  alert( i ); // 0, 1, 2
//}

//We can also remove the step part:

// let i = 0;

//for (; i < 3;) {
//  alert( i++ );
//}
//This makes the loop identical to while (i < 3).

//We can actually remove everything, creating an infinite loop:

//for (;;) {
//  // repeats without limits, sonsuza kadar calisir
//}
//Please note that the two for semicolons ; must be present. Otherwise, there would be a syntax error.

//Breaking the loop
//Normally, a loop exits when its condition becomes falsy.
//But we can force the exit at any time using the special break directive.
//For example, the loop below asks the user for a series of numbers, “breaking” when no number is entered:

//let sum = 0;
//while (true) {
//  let value = +prompt("Enter a number", '');
//  if (!value) break; // (*)
//  sum += value;
//}
//alert( 'Sum: ' + sum );

//The break directive is activated at the line (*) if the user enters an empty line or cancels the input.
//  It stops the loop immediately, passing control to the first line after the loop. Namely, alert.
//The combination “infinite loop + break as needed” is great for situations when a loop’s condition must be 
// checked not in the beginning or end of the loop, but in the middle or even in several places of its body.
//Kullanıcı boş bir satır girerse veya girişi iptal ederse break yönergesi satırda (*) etkinleştirilir. 
// Döngüyü hemen durdurur ve kontrolü döngüden sonraki ilk satıra geçirir. Yani, uyarı.
//“Gerektiği gibi sonsuz döngü + kopma" kombinasyonu, bir döngünün durumunun döngünün başında veya 
// sonunda değil, ortasında veya hatta vücudunun çeşitli yerlerinde kontrol edilmesi gereken durumlar için harikadır.

//The continue directive is a “lighter version” of break. It doesn’t stop the whole loop. Instead, 
// it stops the current iteration and forces the loop to start a new one (if the condition allows).
//We can use it if we’re done with the current iteration and would like to move on to the next one.
//Devam yönergesi, break öğesinin "daha hafif bir sürümüdür". Tüm döngüyü durdurmaz. Bunun yerine, 
// geçerli yinelemeyi durdurur ve döngüyü yenisini başlatmaya zorlar (koşul izin veriyorsa).
//Mevcut yinelemeyle işimiz bittiyse ve bir sonrakine geçmek istiyorsak bunu kullanabiliriz.

//Aşağıdaki döngü, yalnızca tek değerler çıkarmaya devam eder:
//The loop below uses continue to output only odd values:
//for (let i = 0; i < 10; i++) {

  // if true, skip the remaining part of the body
//  if (i % 2 == 0) continue;

//  alert(i); // 1, then 3, 5, 7, 9
//}
//For even values of i, the continue directive stops executing the body and passes control to the next 
// iteration of for (with the next number). So the alert is only called for odd values.
//The continue directive helps decrease nesting
//A loop that shows odd values could look like this:

// for (let i = 0; i < 10; i++) {

//  if (i % 2) {
//    alert( i );
//  }

//}
//From a technical point of view, this is identical to the example above. Surely, we can just wrap the code 
// in an if block instead of using continue.

//But as a side effect, this created one more level of nesting (the alert call inside the curly braces). 
// If the code inside of if is longer than a few lines, that may decrease the overall readability.

//Teknik açıdan bakıldığında, bu yukarıdaki örnekle aynıdır. Elbette, kodu continue kullanmak yerine bir 
// if bloğuna sarabiliriz.

//Ancak bir yan etki olarak, bu bir tane daha yuvalama düzeyi yarattı (küme parantezlerinin içindeki uyarı 
// çağrısı). If'nin içindeki kod birkaç satırdan uzunsa, bu genel okunabilirliği azaltabilir.


//continue ile:
//Fazla girintili (nested) yazımdan kurtulursun.
//Ana işlemi öne çıkartırsın.
//Özellikle koşullar çoğaldığında daha okunabilir kod elde edersin.



//No break/continue to the right side of ‘?’
//Please note that syntax constructs that are not expressions cannot be used with 
//the ternary operator ?. In particular, directives such as break/continue aren’t allowed there.

//İfade olmayan sözdizimi yapılarının üçlü işleçle kullanılamayacağını lütfen unutmayın.. 
// Özellikle, break /continue gibi direktiflere burada izin verilmez.

//if (i > 5) {
//  alert(i);
//} else {
//  continue;
//}
//…and rewrite it using a question mark:

//(i > 5) ? alert(i) : continue; // continue isn't allowed here
//…it stops working: there’s a syntax error.

//This is just another reason not to use the question mark operator ? instead of if.
//Labels for break/continue

//Sometimes we need to break out from multiple nested loops at once.

//continue ve break birer komut (statement)’tır, ifade (expression) değildir.

//For example, in the code below we loop over i and j, prompting for the coordinates (i, j) from (0,0) to (2,2):

// for (let i = 0; i < 3; i++) {

//  for (let j = 0; j < 3; j++) {

//    let input = prompt(`Value at coords (${i},${j})`, '');

    // what if we want to exit from here to Done (below)?
//  }
//}

//alert('Done!');

//We need a way to stop the process if the user cancels the input.

//The ordinary break after input would only break the inner loop. That’s not 
// sufficient – labels, come to the rescue!

//A label is an identifier with a colon before a loop:
//labelName: for (...) {
//  ...
//}

//The break <labelName> statement in the loop below breaks out to the label:
//outer: for (let i = 0; i < 3; i++) {

//  for (let j = 0; j < 3; j++) {

//    let input = prompt(`Value at coords (${i},${j})`, '');

    // if an empty string or canceled, then break out of both loops
 //   if (!input) break outer; // (*)
  //outer: etiketi dış döngüyü etiketler.
//break outer direkt bu etikete gider ve her iki döngüden de çıkar.
//Eğer sadece break yazsaydın, sadece içteki for döngüsü kırılırdı.

    // do something with the value...
//  }
//}

//alert('Done!');

//In the code above, break outer looks upwards for the label named outer and breaks out of that loop.
//So the control goes straight from (*) to alert('Done!').
//We can also move the label onto a separate line:
//Yukarıdaki kodda, break outer , outer adlı etiketi yukarı doğru arar ve bu döngüden çıkar.
//Böylece kontrol doğrudan (*) 'dan uyarıya ('Bitti!').
//Etiketi ayrı bir satıra da taşıyabiliriz:
//outer:
//for (let i = 0; i < 3; i++) { ... }


//The continue directive can also be used with a label. In this case, code execution jumps to the next 
// iteration of the labeled loop.

//Labels do not allow to “jump” anywhere
//Labels do not allow us to jump into an arbitrary place in the code.
//For example, it is impossible to do this:
//break label; // jump to the label below (doesn't work)
//label: for (...)
//A break directive must be inside a code block. Technically, any labelled code block will do, e.g.:
//label: {
  // ...
//  break label; // works
  // ...
//}
//…Although, 99.9% of the time break is used inside loops, as we’ve seen in the examples above.
//A continue is only possible from inside a loop.
//break dongunun icinde olmali

//From 1 to 4
// let i = 0;
//while (++i < 5) alert( i );
//The first value is i = 1, because ++i first increments i and then returns the new value. So the first 
// comparison is 1 < 5 and the alert shows 1.
//Then follow 2, 3, 4… – the values show up one after another. The comparison always uses the incremented 
// value, because ++ is before the variable.
//Finally, i = 4 is incremented to 5, the comparison while(5 < 5) fails, and the loop stops. So 5 is not shown.

//From 1 to 5
// let i = 0;
//while (i++ < 5) alert( i );
//The first value is again i = 1. The postfix form of i++ increments i and then returns the old value, 
// so the comparison i++ < 5 will use i = 0 (contrary to ++i < 5).
//But the alert call is separate. It’s another statement which executes after the increment and the comparison. 
// So it gets the current i = 1.
//Then follow 2, 3, 4…
//Let’s stop on i = 4. The prefix form ++i would increment it and use 5 in the comparison. But here we have the
//  postfix form i++. So it increments i to 5, but returns the old value. Hence the comparison is
//  actually while(4 < 5) – true, and the control goes on to alert.
//The value i = 5 is the last one, because on the next step while(5 < 5) is false.

// from 0 to 4 in both cases.

// for (let i = 0; i < 5; ++i) alert( i );

//for (let i = 0; i < 5; i++) alert( i );
//That can be easily deducted from the algorithm of for:

//Execute once i = 0 before everything (begin).
//Check the condition i < 5
//If true – execute the loop body alert(i), and then i++
//The increment i++ is separated from the condition check (2). That’s just another statement.

//The value returned by the increment is not used here, so there’s no difference between i++ and ++i.

//Use the for loop to output even numbers from 2 to 10.
//We use the “modulo” operator % to get the remainder and check for the evenness here.
//for (let i = 2; i <= 10; i++) {
//  if (i % 2 == 0) {
//    alert( i );
//  }
//}

//for (let i = 0; i < 3; i++) {
//  alert( `number ${i}!` );
//}

//let i = 0;
//while (i < 3) {
//  alert( `number ${i}!` );
//  i++;
//}

//let num;

//do {
//  num = prompt("Enter a number greater than 100?", 0);
//} while (num <= 100 && num);
//The loop do..while repeats while both checks are truthy:

//The check for num <= 100 – that is, the entered value is still not greater than 100.
//The check && num is false when num is null or an empty string. Then the while loop stops too.
//P.S. If num is null then num <= 100 is true, so without the 2nd check the loop wouldn’t stop 
// if the user clicks CANCEL. Both checks are required.

//asal sayilar
//let n = 10;

//nextPrime:
//for (let i = 2; i <= n; i++) { // for each i...

//  for (let j = 2; j < i; j++) { // look for a divisor..
//    if (i % j == 0) continue nextPrime; // not a prime, go next i
//  }

//  alert( i ); // a prime
//}

//for...of
//let fruits = ["Apple", "Orange", "Plum"];

// iterates over array elements
//for (let fruit of fruits) {
//  alert( fruit );
//}

//The for..of doesn’t give access to the number of the current element, 
// just its value, but in most cases that’s enough. And it’s shorter.
//for..of geçerli öğenin numarasına erişim sağlamaz, yalnızca değerine erişim sağlar, 
// ancak çoğu durumda bu yeterlidir. Ve daha kısadır.
//Technically, because arrays are objects, it is also possible to use for..in:

//✅ for...of — Diziler, Map, Set gibi iterable (yinelenebilir) yapılar için kullanılır.
//✅ for...in — Nesneler (object) veya dizilerin indeksleri / anahtarları (keys) üzerinde döner.



//for..in
//let arr = ["Apple", "Orange", "Pear"];

//for (let key in arr) {
//  alert( arr[key] ); // Apple, Orange, Pear
//}

//But that’s actually a bad idea. There are potential problems with it:
//The loop for..in iterates over all properties, not only the numeric ones.
//There are so-called “array-like” objects in the browser and in other environments, that look like arrays.
//  That is, they have length and indexes properties, but they may also have other non-numeric properties
//  and methods, which we usually don’t need. The for..in loop will list them though. So if we need to 
// work with array-like objects, then these “extra” properties can become a problem.
//The for..in loop is optimized for generic objects, not arrays, and thus is 10-100 times slower. Of course, 
// it’s still very fast. The speedup may only matter in bottlenecks. But still we should be aware of the difference.
//Generally, we shouldn’t use for..in for arrays.

//Ama bu aslında kötü bir fikir. Bununla ilgili potansiyel sorunlar var:
//for..in döngüsü yalnızca sayısal olanları değil, tüm özellikleri yineler.
//Tarayıcıda ve diğer ortamlarda dizilere benzeyen sözde "dizi benzeri" nesneler vardır. Yani, uzunluk ve
//  dizin özelliklerine sahiptirler, ancak genellikle ihtiyaç duymadığımız diğer sayısal olmayan özelliklere 
// ve yöntemlere de sahip olabilirler. Ancak for..in döngüsü bunları listeler. Yani dizi benzeri nesnelerle 
// çalışmamız gerekirse, bu "ekstra" özellikler sorun olabilir.
//for..in döngüsü diziler için değil, genel nesneler için optimize edilmiştir ve bu nedenle 10-100 kat daha yavaştır.
//  Elbette, yine de çok hızlıdır. Hızlanma yalnızca darboğazlarda önemli olabilir. Ama yine de farkın farkında 
// olmalıyız.
//Genel olarak, diziler için for..in kullanmamalıyız.

