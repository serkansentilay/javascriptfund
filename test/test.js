/*
describe("pow", function() {

  it("raises to n-th power", function() {
    assert.equal(pow(2, 3), 8);
  });

   it("3 raised to power 4 is 81", function() {
    assert.equal(pow(3, 4), 81);
  });

});
// As of now, the test fails, there’s an error. That’s logical: we have an empty function
//  code in pow, so pow(2,3) returns undefined instead of 8.
//
*/


/*
describe("pow", function() {

  describe("raises x to power 3", function() {

    function makeTest(x) {
      let expected = x * x * x;
      it(`${x} in the power 3 is ${expected}`, function() {
        assert.equal(pow(x, 3), expected);
      });
    }

    for (let x = 1; x <= 5; x++) {
      makeTest(x);
    }

  });

  // ... more tests to follow here, both describe and it can be added
});
*/

/*
 pow
raises x to power 3
1 in the power 3 is 1 ‣
2 in the power 3 is 8 ‣
3 in the power 3 is 27 ‣
4 in the power 3 is 64 ‣
5 in the power 3 is 125
*/


/*
 describe("test", function() {

   // Mocha usually waits for the tests for 2 seconds before considering them wrong

  this.timeout(200000); // With this code we increase this - in this case to 200,000 milliseconds

  // This is because of the "alert" function, because if you delay pressing the "OK" button the tests will not pass!

  before(() => alert("Testing started – before all tests"));
  after(() => alert("Testing finished – after all tests"));

  beforeEach(() => alert("Before a test – enter a test"));
  afterEach(() => alert("After a test – exit a test"));

  it('test 1', () => alert(1));
  it('test 2', () => alert(2));

});
*/

/*
describe("pow", function() {

  describe("raises x to power 3", function() {

    function makeTest(x) {
      let expected = x * x * x;
      it(`${x} in the power 3 is ${expected}`, function() {
        assert.equal(pow(x, 3), expected);
      });
    }

    for (let x = 1; x <= 5; x++) {
      makeTest(x);
    }

  });

  it("if n is negative, the result is NaN", function() {
    assert.isNaN(pow(2, -1));
  });

  it("if n is not integer, the result is NaN", function() {
    assert.isNaN(pow(2, 1.5));
  });

});
*/


/*
The newly added tests fail, because our implementation does not support them. That’s how BDD is done: first we write failing tests, and then make an implementation for them.

Other assertions
Please note the assertion assert.isNaN: it checks for NaN.

There are other assertions in Chai as well, for instance:

assert.equal(value1, value2) – checks the equality value1 == value2.
assert.strictEqual(value1, value2) – checks the strict equality value1 === value2.
assert.notEqual, assert.notStrictEqual – inverse checks to the ones above.
assert.isTrue(value) – checks that value === true
assert.isFalse(value) – checks that value === false
*/



