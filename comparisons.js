//comparisons

//alert( 2 > 1 );  // true (correct)
//alert( 2 == 1 ); // false (wrong)
//alert( 2 != 1 ); // true (correct)

//let result = 5 > 4; // assign the result of the comparison
//alert( result ); // true

//To see whether a string is greater than another, JavaScript uses the so-called “dictionary”
//  or “lexicographical” order.
//In other words, strings are compared letter-by-letter.

//alert( 'Z' > 'A' ); // true
//alert( 'Glow' > 'Glee' ); // true
//alert( 'Bee' > 'Be' ); // true

//When comparing values of different types, JavaScript converts the values to numbers.
//alert( '2' > 1 ); // true, string '2' becomes a number 2
//alert( '01' == 1 ); // true, string '01' becomes a number 1

//From JavaScript’s standpoint, this result is quite normal. An equality check converts 
// values using the numeric conversion (hence "0" becomes 0), while the explicit Boolean 
// conversion uses another set of rules.
//JavaScript açısından bu sonuç oldukça normaldir. Eşitlik denetimi, sayısal dönüşümü 
// kullanarak değerleri dönüştürür (dolayısıyla "0" 0 olur), açık Boole dönüşümü ise 
// başka bir kurallar kümesi kullanır.
//let a = 0;
//alert( Boolean(a) ); // false
//let b = "0";
//alert( Boolean(b) ); // true
//alert(a == b); // true!

/*
truthy ve Falsy Değerler

🔴 Falsy Olanlar (sadece 7 tanedir):
Değer	Açıklama
false	Boolean false
0	Sayısal sıfır
-0	Negatif sıfır
0n	BigInt sıfır
""	Boş string
null	Boş değer
undefined	Tanımsız
NaN	Sayı değil
Bunlar haricindeki her şey truthy kabul edilir.
✅ Örnek Truthy Değerler:
Boolean("1")         // true (non-empty string)
Boolean("false")     // true (hala bir string)
Boolean([])          // true (boş array bile truthy)
Boolean({})          // true (boş object de truthy)
Boolean(42)          // true (sıfır olmayan sayı)
*/

//A regular equality check == has a problem. It cannot differentiate 0 from false:

// alert( 0 == false ); // true
//The same thing happens with an empty string:

// alert( '' == false ); // true
//This happens because operands of different types are converted to numbers by the equality operator ==.
//  An empty string, just like false, becomes a zero.
/*
Neden true döndü?
Çünkü == operatörü iki değeri kendi türlerine dönüştürerek karşılaştırır.

Karşılaştırma	Ne Oluyor?
0 == false	false → 0 olur ⇒ 0 == 0 ⇒ true
'' == false	'' → 0, false → 0 ⇒ 0 == 0 ⇒ true
🔸 Yani == tip farkını önemsemez. Bu nedenle beklenmeyen sonuçlar doğurabilir.


*/


//What to do if we’d like to differentiate 0 from false?

//A strict equality operator === checks the equality without type conversion.
//Tipler farklıysa, hiç dönüştürmeden direkt false döner.

//In other words, if a and b are of different types, then a === b immediately returns false without 
// an attempt to convert them.
// alert( 0 === false ); // false, because the types are different
//There is also a “strict non-equality” operator !== analogous to !=.

//The strict equality operator is a bit longer to write, but makes it obvious what’s going on and 
// leaves less room for errors.

//There’s a non-intuitive behavior when null or undefined are compared to other values.

//For a strict equality check ===
//These values are different, because each of them is a different type.

// alert( null === undefined ); // false
//For a non-strict check ==
//There’s a special rule. These two are a “sweet couple”: they equal each other (in the sense of ==), 
// but not any other value.

// alert( null == undefined ); // true

/*
== kullandığında: null ve undefined birbirine eşittir, ama başka hiçbir şeye eşit değildir.
=== kullandığında: Tipleri farklı olduğu için false.
Karşılaştırma	Sonuç	Neden?
null == undefined	true	JavaScript özel kuralıyla eşit
null === undefined	false	Biri null, diğeri undefined

*/


//For maths and other comparisons < > <= >=
//null/undefined are converted to numbers: null becomes 0, while undefined becomes NaN.

//alert( null > 0 );  // (1) false
//alert( null == 0 ); // (2) false
//alert( null >= 0 ); // (3) true

//Mathematically, that’s strange. The last result states that “null is greater than or equal to zero”, 
// so in one of the comparisons above it must be true, but they are both false.
//The reason is that an equality check == and comparisons > < >= <= work differently. Comparisons 
// convert null to a number, treating it as 0. That’s why (3) null >= 0 is true and (1) null > 0 is false.
//On the other hand, the equality check == for undefined and null is defined such that, without any
//  conversions, they equal each other and don’t equal anything else. That’s why (2) null == 0 is false.
//Matematiksel olarak, bu garip. Son sonuç, “null'un sıfırdan büyük veya ona eşit olduğunu” belirtir,
//  bu nedenle yukarıdaki karşılaştırmalardan birinde doğru olması gerekir, ancak ikisi de yanlıştır.
//Bunun nedeni, bir eşitlik kontrolü == ve karşılaştırmalar> <>= <= farklı çalışmasıdır. Karşılaştırmalar
// null'u bir sayıya dönüştürerek 0 olarak değerlendirir. Bu yüzden (3) null> = 0 doğrudur ve (1) null> 0 yanlıştır.
//Öte yandan, undefined ve null için eşitlik kontrolü ==, herhangi bir dönüşüm olmadan birbirlerine eşit 
//olacak ve başka hiçbir şeye eşit olmayacak şekilde tanımlanır. Bu yüzden (2) null == 0 yanlıştır.


//The value undefined shouldn’t be compared to other values:

// alert( undefined > 0 ); // false (1)
//alert( undefined < 0 ); // false (2)
//alert( undefined == 0 ); // false (3)
//Why does it dislike zero so much? Always false!
//We get these results because:
//Comparisons (1) and (2) return false because undefined gets converted to NaN and NaN is a special 
// numeric value which returns false for all comparisons.
//The equality check (3) returns false because undefined only equals null, undefined, and no other value.

//Treat any comparison with undefined/null except the strict equality === with exceptional care.
//Don’t use comparisons >= > < <= with a variable which may be null/undefined, unless you’re really 
// sure of what you’re doing. If a variable can have these values, check for them separately.

//alert(typeof(undefined))//undefined
//alert(typeof(null)) //object

//alert(0 == NaN); //false
//alert(0 === NaN); //false
//alert(typeof(NaN)); //number
//alert(typeof(0)); // number 
//alert(typeof(0==NaN)) //boolean
//alert(0==NaN) //false
//alert(0==null ? `null` : `degil`); //degil
//alert(0==undefined ? `undefined` : `degil`); //degil 
//alert(0==NaN ? `nan` : `degil`) //degil 
//NaN kendisine bile esit degil
//alert(NaN == NaN ? `nan` : `degil`) //degil . 
//0 == NaN // false
//NaN == NaN // false



//Ve == operatörü burada tip dönüşümü yapsa bile, NaN sayısal bir değerle 
// karşılaştırılamaz şekilde davranır. Bu yüzden:

//0 == NaN      // false
//0 === NaN     // false
//NaN == NaN    // false
//typeof(NaN)   // 'number'



//null == undefined → true (özel kural)
//0 == NaN → false
//NaN == NaN → false
//typeof(NaN) → 'number' (çünkü IEEE 754 standardı gereği, NaN bir tür "geçersiz sayı"dır)

//null == undefined	true	Özel kural
//null === undefined	false	Tip farkı
//0 == NaN	false	NaN hiçbir şeye eşit değildir
//NaN == NaN	false	Kendi kendine bile eşit değil
//typeof NaN	"number"	Teknik olarak "geçersiz sayı"

//null <= 0       // true   (çünkü 0 <= 0)
//undefined <= 0  // false  (çünkü NaN <= 0 → false)

// == karşılaştırma kuralları (özet):
//Eğer karşılaştırılan tipler aynıysa, doğrudan karşılaştırılır.
//Eğer biri null, diğeri undefined ise → true
//Eğer biri sayı, diğeri string ise → string sayıya çevrilir
//Eğer biri boolean ise → boolean sayıya çevrilir
//Eğer biri nesne, diğeri primitif ise → nesne primitive'e çevrilir
//Ama null ve undefined dışında bir değerle karşılaştırıldığında, null ve undefined hiçbir zaman 
// sayısal değere dönüşmezler!

//null == undefined      // ✅ true (özel kural)
//null == 0              // ❌ false (çünkü null sayıya dönüşmez burada)
//undefined == NaN       // ❌ false
//0 == NaN               // ❌ false

//Çünkü <, <=, > gibi karşılaştırmalar önce iki tarafı da Number(...) ile dönüştürür.

//Örnek:

//null <= 0   // → Number(null) <= 0 → 0 <= 0 → true
//Ama == böyle yapmaz; null == 0 → false


//5 > 4 //→ true
//"apple" > "pineapple"// → false , Dictionary comparison, hence false. "a" is smaller than "p".
//"2" > "12" //→ true// , dictionary comparison, first char "2" is greater than the first char "1".
//undefined == null //→ true //Values null and undefined equal each other only.
//undefined === null //→ false //Strict equality is strict. Different types from both sides lead to false.
//null == "\n0\n"// → false //Similar to (4), null only equals undefined.
//null === +"\n0\n"// → false //Strict equality of different types.



